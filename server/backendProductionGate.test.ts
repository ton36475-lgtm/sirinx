import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildBackendProductionGateReport } from "../scripts/backend-production-gate.mjs";

const tempRoots: string[] = [];

function makeFixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sirinx-backend-gate-"));
  tempRoots.push(root);
  for (const [relativePath, contents] of Object.entries(files)) {
    const absolutePath = path.join(root, relativePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, contents);
  }
  return root;
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

const requiredFiles = {
  "package.json": JSON.stringify({
    scripts: {
      build:
        "vite build && esbuild server/_core/index.ts --platform=node --outdir=dist",
      start: "cross-env NODE_ENV=production node dist/index.js",
    },
  }),
  "server/_core/index.ts": [
    "app.set('trust proxy', 'loopback');",
    "process.once('SIGTERM', () => server.close());",
  ].join("\n"),
  "server/_core/health.ts": "export {};",
  "dist/index.js": "console.log('bundle');",
  "infra/nginx/api.sirinx.co.conf.example": "server_name api.sirinx.co;",
  "infra/systemd/sirinx-api.service.example": "ExecStart=/usr/bin/node dist/index.js",
  "infra/docker/Dockerfile.sirinx-api": "CMD [\"node\", \"dist/index.js\"]",
  "infra/docker/docker-compose.sirinx-api.example.yml": "services:",
  "infra/docker/api.env.example": "DATABASE_URL=\nJWT_SECRET=\n",
  ".dockerignore": ".env\nruntime-output\nnode_modules\n",
  "docs/knowledge/SIRINX_NODE_BACKEND_DEPLOYMENT.md": "# Backend",
};

const configuredEnv = {
  BACKEND_ORIGIN: "https://api.example.invalid",
  DATABASE_URL: "mysql://placeholder",
  BUILT_IN_FORGE_API_URL: "https://forge.example.invalid",
  BUILT_IN_FORGE_API_KEY: "placeholder",
  OAUTH_SERVER_URL: "https://auth.example.invalid",
  VITE_OAUTH_PORTAL_URL: "https://portal.example.invalid",
  VITE_APP_ID: "sirinx-placeholder",
  JWT_SECRET: "placeholder",
};

describe("backend production gate", () => {
  it("fails closed without backend files and runtime env", async () => {
    const root = makeFixture({
      "package.json": JSON.stringify({ scripts: {} }),
    });

    const report = await buildBackendProductionGateReport({
      cwd: root,
      env: {},
      probe: false,
    });

    expect(report.ready).toBe(false);
    expect(report.guardrail).toContain("does not print secrets");
    expect(report.blockers.map(blocker => blocker.id)).toContain("node_server_source");
    expect(report.blockers.map(blocker => blocker.id)).toContain("backend_origin");
    expect(report.blockers.map(blocker => blocker.id)).toContain("express_trust_proxy");
    expect(JSON.stringify(report)).not.toContain("placeholder");
  });

  it("passes when files, env names, and readiness endpoint are present", async () => {
    const root = makeFixture(requiredFiles);
    const fetchImpl = async () =>
      new Response(
        JSON.stringify({
          service: "sirinx-node-backend",
          status: "ready",
          readyForProduction: true,
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );

    const report = await buildBackendProductionGateReport({
      cwd: root,
      env: configuredEnv,
      fetchImpl,
    });

    expect(report.ready).toBe(true);
    expect(report.safeOrigin).toBe("https://api.example.invalid");
    expect(report.originProbe.status).toBe("ok");
    expect(report.originProbe.service).toBe("sirinx-node-backend");
    expect(report.source.every(check => check.status === "ok")).toBe(true);
    expect(report.blockers).toEqual([]);
    expect(JSON.stringify(report)).not.toContain("mysql://placeholder");
  });
});
