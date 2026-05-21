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

function readFirstExisting(cwd, relativePaths) {
  const relativePath = relativePaths.find(file => exists(cwd, file));
  if (!relativePath) {
    return { relativePath: null, content: "" };
  }
  return {
    relativePath,
    content: fs.readFileSync(path.join(cwd, relativePath), "utf8"),
  };
}

function hasPagesBuildOutputDir(configContent) {
  return /pages_build_output_dir["']?\s*[=:]\s*["']\.\/dist\/public["']/.test(configContent);
}

function hasApiProxyRoute(routesContent) {
  return /"include"\s*:\s*\[[^\]]*"\/api\/\*"/s.test(routesContent);
}

export function buildCloudflareDeployReadinessReport(cwd = process.cwd()) {
  const configFiles = CONFIG_FILES.filter(file => exists(cwd, file));
  const config = readFirstExisting(cwd, CONFIG_FILES);
  const functionEntrypoints = FUNCTIONS_ENTRYPOINTS.filter(entry => exists(cwd, entry));
  const routes = readFirstExisting(cwd, [
    "client/public/_routes.json",
    "dist/public/_routes.json",
  ]);
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
      configFiles.length > 0 && hasPagesBuildOutputDir(config.content),
      configFiles.length > 0
        ? hasPagesBuildOutputDir(config.content)
          ? `Found ${configFiles.join(", ")} with pages_build_output_dir set to ./dist/public.`
          : `Found ${configFiles.join(", ")}, but pages_build_output_dir is missing or not ./dist/public.`
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
    check(
      cwd,
      "function_invocation_routes",
      functionEntrypoints.length === 0 || hasApiProxyRoute(routes.content),
      routes.relativePath
        ? hasApiProxyRoute(routes.content)
          ? `Found ${routes.relativePath} with /api/* function invocation route.`
          : `Found ${routes.relativePath}, but it does not include /api/*.`
        : "No _routes.json found for Pages Functions invocation control.",
      "Add client/public/_routes.json with include /api/* so static assets do not invoke the Pages Function unnecessarily."
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
