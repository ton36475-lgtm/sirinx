import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CONFIG_FILES = ["wrangler.jsonc", "wrangler.json", "wrangler.toml"];
const FUNCTIONS_ENTRYPOINTS = [
  "functions",
  "_worker.js",
  "_worker.ts",
  "src/worker.ts",
  "src/worker.js",
];

function exists(cwd, relativePath) {
  return fs.existsSync(path.join(cwd, relativePath));
}

function check(cwd, id, ok, evidence, nextAction) {
  return {
    id,
    status: ok ? "ok" : "blocked",
    evidence,
    nextAction: ok ? null : nextAction,
  };
}

export function buildCloudflareDeployReadinessReport(cwd = process.cwd()) {
  const configFiles = CONFIG_FILES.filter(file => exists(cwd, file));
  const functionEntrypoints = FUNCTIONS_ENTRYPOINTS.filter(entry => exists(cwd, entry));
  const staticOutputExists = exists(cwd, "dist/public");
  const nodeServerBundleExists = exists(cwd, "dist/index.js");
  const packageJsonExists = exists(cwd, "package.json");
  const packageJson = packageJsonExists
    ? JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8"))
    : {};
  const buildScript = packageJson.scripts?.build ?? "";
  const startScript = packageJson.scripts?.start ?? "";

  const checks = [
    check(
      cwd,
      "cloudflare_config",
      configFiles.length > 0,
      configFiles.length > 0
        ? `Found ${configFiles.join(", ")}.`
        : "No wrangler.jsonc, wrangler.json, or wrangler.toml found at repo root.",
      "Download or create the Cloudflare project config before deploying so project name, output directory, compatibility settings, and env behavior are reviewable in git."
    ),
    check(
      cwd,
      "static_output",
      staticOutputExists,
      staticOutputExists
        ? "Found dist/public static output."
        : "dist/public does not exist in this checkout.",
      "Run pnpm build before Cloudflare Pages deployment readiness or deploy from CI after the build step."
    ),
    check(
      cwd,
      "api_runtime_strategy",
      !nodeServerBundleExists || functionEntrypoints.length > 0,
      nodeServerBundleExists
        ? functionEntrypoints.length > 0
          ? `Node server bundle exists and Cloudflare function entrypoint(s) exist: ${functionEntrypoints.join(", ")}.`
          : "Node server bundle exists at dist/index.js, but no Cloudflare Pages Functions or Worker entrypoint was found."
        : "No dist/index.js Node server bundle detected; static-only deployment path is plausible.",
      "Do not deploy API-dependent quotation features as static Pages only. Port the required API routes to Pages Functions/Workers or deploy the Node server on a separate backend host."
    ),
    check(
      cwd,
      "node_server_start_script",
      !startScript.includes("node dist/index.js") || functionEntrypoints.length > 0,
      startScript
        ? `start script: ${startScript}`
        : "No start script found.",
      "The start script targets a Node server bundle. Confirm the production host runs Node, or add a Cloudflare-native API adapter before Pages deployment."
    ),
  ];

  const blockers = checks.filter(item => item.status !== "ok");
  return {
    ready: blockers.length === 0,
    generatedAt: new Date().toISOString(),
    mode: "metadata-only",
    guardrail:
      "This command checks local deploy metadata only; it does not print secrets, run migrations, deploy, send notifications, or write external SaaS.",
    cloudflareConfigFiles: configFiles,
    cloudflareFunctionEntrypoints: functionEntrypoints,
    buildScript,
    startScript,
    checks,
    blockers,
    nextActions:
      blockers.length === 0
        ? [
            "Run pnpm quote:gate with target runtime env before production deploy.",
            "Deploy only through the approved Cloudflare pipeline.",
            "Run one approved quotation smoke test after deployment.",
          ]
        : blockers.map(blocker => `${blocker.id}: ${blocker.nextAction}`),
  };
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url);

if (isCli) {
  const report = buildCloudflareDeployReadinessReport();
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.ready ? 0 : 1;
}
