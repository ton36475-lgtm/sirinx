import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { buildCloudflareDeployReadinessReport } from "../scripts/cloudflare-deploy-readiness.mjs";

const tempRoots: string[] = [];

function makeFixture(files: Record<string, string>) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sirinx-cf-ready-"));
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

describe("cloudflare deploy readiness", () => {
  it("blocks static Pages deploy when the Node API bundle has no Cloudflare function entrypoint", () => {
    const root = makeFixture({
      "package.json": JSON.stringify({
        scripts: {
          build: "vite build && esbuild server/_core/index.ts --outdir=dist",
          start: "node dist/index.js",
        },
      }),
      "dist/public/index.html": "<div>SIRINX</div>",
      "dist/index.js": "console.log('node api');",
    });

    const report = buildCloudflareDeployReadinessReport(root);

    expect(report.ready).toBe(false);
    expect(report.guardrail).toContain("does not print secrets");
    expect(report.blockers.map(blocker => blocker.id)).toEqual([
      "cloudflare_config",
      "api_runtime_strategy",
      "node_server_start_script",
    ]);
    expect(report.nextActions.join("\n")).toContain(
      "Do not deploy API-dependent quotation features as static Pages only"
    );
  });

  it("passes metadata readiness when Cloudflare config and a function entrypoint exist", () => {
    const root = makeFixture({
      "package.json": JSON.stringify({
        scripts: {
          build: "vite build",
          start: "node dist/index.js",
        },
      }),
      "wrangler.jsonc": [
        "{",
        "  \"name\": \"sirinx-preview\",",
        "  \"pages_build_output_dir\": \"./dist/public\"",
        "}",
      ].join("\n"),
      "client/public/_routes.json": JSON.stringify({
        version: 1,
        include: ["/api/*"],
        exclude: ["/*"],
      }),
      "functions/api/trpc.ts": "export const onRequest = () => new Response('ok');",
      "dist/public/index.html": "<div>SIRINX</div>",
      "dist/index.js": "console.log('node api');",
    });

    const report = buildCloudflareDeployReadinessReport(root);

    expect(report.ready).toBe(true);
    expect(report.cloudflareConfigFiles).toEqual(["wrangler.jsonc"]);
    expect(report.cloudflareFunctionEntrypoints).toEqual(["functions"]);
    expect(report.blockers).toEqual([]);
  });
});
