import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildSirinxOperationalReviewReport } from "../scripts/sirinx-operational-review.mjs";

const tempRoots: string[] = [];

function makeFixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sirinx-ops-review-"));
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

const fullArtifactFixture = {
  "package.json": JSON.stringify({
    scripts: {
      build:
        "vite build && esbuild server/_core/index.ts --platform=node --outdir=dist",
      start: "cross-env NODE_ENV=production node dist/index.js",
    },
  }),
  "wrangler.jsonc": JSON.stringify({
    pages_build_output_dir: "./dist/public",
  }),
  "client/public/_routes.json": JSON.stringify({
    version: 1,
    include: ["/api/*"],
    exclude: ["/*"],
  }),
  "functions/api/trpc/[[path]].ts": "export const onRequest = () => new Response('ok');",
  "dist/public/index.html": "<div>SIRINX</div>",
  "dist/index.js": "console.log('server bundle');",
  "server/_core/index.ts": [
    "app.set('trust proxy', 'loopback');",
    "process.once('SIGTERM', () => server.close());",
  ].join("\n"),
  "server/_core/health.ts": "export {};",
  "shared/quotation.ts": "export {};",
  "server/_core/localQuotationQueue.ts": "export {};",
  "drizzle/0003_real_quotation_pipeline.sql": "-- migration",
  "client/src/pages/Quote.tsx": "export default function Quote() { return null }",
  "client/src/pages/admin/Quotations.tsx": "export default function Quotations() { return null }",
  "infra/nginx/api.sirinx.co.conf.example": "server_name api.sirinx.co;",
  "infra/systemd/sirinx-api.service.example": "EnvironmentFile=/etc/sirinx/api.env",
  "infra/docker/Dockerfile.sirinx-api": "CMD [\"node\", \"dist/index.js\"]",
  "infra/docker/docker-compose.sirinx-api.example.yml": "services:",
  "infra/docker/api.env.example": "DATABASE_URL=\nJWT_SECRET=\n",
  ".dockerignore": ".env\nruntime-output\nnode_modules\n",
  "docs/knowledge/SIRINX_NODE_BACKEND_DEPLOYMENT.md": "# Backend",
};

const configuredEnv = {
  BACKEND_ORIGIN: "https://api.example.invalid",
  SIRINX_API_ORIGIN: "https://api.example.invalid",
  DATABASE_URL: "mysql://placeholder",
  BUILT_IN_FORGE_API_URL: "https://forge.example.invalid",
  BUILT_IN_FORGE_API_KEY: "placeholder",
  OAUTH_SERVER_URL: "https://auth.example.invalid",
  VITE_OAUTH_PORTAL_URL: "https://portal.example.invalid",
  VITE_APP_ID: "sirinx-placeholder",
  JWT_SECRET: "placeholder",
};

describe("sirinx operational review", () => {
  it("summarizes current blockers without exposing env values", async () => {
    const root = makeFixture({
      "package.json": JSON.stringify({ scripts: {} }),
    });

    const report = await buildSirinxOperationalReviewReport({
      cwd: root,
      env: {},
    });

    expect(report.productionDeployAllowed).toBe(false);
    expect(report.recommendation).toBe("do_not_deploy_until_external_gates_close");
    expect(report.blockers.length).toBeGreaterThan(0);
    expect(JSON.stringify(report)).not.toContain("mysql://placeholder");
    expect(report.guardrail).toContain("does not print secret values");
  });

  it("keeps deploy blocked when metadata and env groups exist but backend probe is skipped", async () => {
    const root = makeFixture(fullArtifactFixture);

    const report = await buildSirinxOperationalReviewReport({
      cwd: root,
      env: configuredEnv,
      probeBackend: false,
    });

    expect(report.gates.cloudflare.ready).toBe(true);
    expect(report.gates.backend.ready).toBe(false);
    expect(report.gates.backend.blockers.map(blocker => blocker.id)).toContain(
      "backend_origin_probe"
    );
    expect(report.gates.quotation.machineReady).toBe(true);
    expect(report.productionDeployAllowed).toBe(false);
    expect(report.gates.quotation.humanApprovalRequired).toBe(true);
    expect(report.nextActions.join("\n")).toContain("GitHub billing/account lock");
    expect(JSON.stringify(report)).not.toContain("mysql://placeholder");
  });
});
