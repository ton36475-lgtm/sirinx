import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildBackendProductionGateReport } from "./backend-production-gate.mjs";
import { buildCloudflareDeployReadinessReport } from "./cloudflare-deploy-readiness.mjs";
import { buildQuotationExternalGateReport } from "./quotation-gate-state.mjs";

const coreArtifacts = [
  {
    id: "public_frontend",
    label: "Cloudflare Pages public frontend",
    files: ["wrangler.jsonc", "client/public/_routes.json", "dist/public"],
  },
  {
    id: "pages_api_proxy",
    label: "Cloudflare Pages /api/trpc proxy",
    files: ["functions/api/trpc/[[path]].ts", "client/public/_routes.json"],
  },
  {
    id: "node_backend",
    label: "Node Express/tRPC backend origin",
    files: ["server/_core/index.ts", "server/_core/health.ts", "dist/index.js"],
  },
  {
    id: "quotation_pipeline",
    label: "Lead and quotation pipeline",
    files: [
      "shared/quotation.ts",
      "server/_core/localQuotationQueue.ts",
      "drizzle/0003_real_quotation_pipeline.sql",
      "client/src/pages/Quote.tsx",
      "client/src/pages/admin/Quotations.tsx",
    ],
  },
  {
    id: "self_host_handoff",
    label: "Self-host backend handoff",
    files: [
      "infra/nginx/api.sirinx.co.conf.example",
      "infra/systemd/sirinx-api.service.example",
      "infra/docker/Dockerfile.sirinx-api",
      "infra/docker/docker-compose.sirinx-api.example.yml",
      "docs/knowledge/SIRINX_NODE_BACKEND_DEPLOYMENT.md",
    ],
  },
];

function exists(cwd, relativePath) {
  return fs.existsSync(path.join(cwd, relativePath));
}

function artifactStatus(cwd, artifact) {
  const missingFiles = artifact.files.filter(file => !exists(cwd, file));
  return {
    id: artifact.id,
    label: artifact.label,
    status: missingFiles.length === 0 ? "complete" : "partial",
    files: artifact.files,
    missingFiles,
  };
}

function collectBlockers({ cloudflare, backend, quotation }) {
  return [
    ...cloudflare.blockers.map(blocker => ({
      source: "cloudflare",
      id: blocker.id,
      status: blocker.status,
      nextAction: blocker.nextAction,
    })),
    ...backend.blockers.map(blocker => ({
      source: "backend",
      id: blocker.id,
      status: blocker.status,
      nextAction: blocker.nextAction,
    })),
    ...quotation.gates
      .filter(gate => gate.status === "blocked")
      .map(gate => ({
        source: "quotation",
        id: gate.id,
        status: gate.status,
        nextAction: gate.nextAction,
      })),
  ];
}

function dedupeActions(actions) {
  return [...new Set(actions.filter(Boolean))];
}

export async function buildSirinxOperationalReviewReport({
  cwd = process.cwd(),
  env = process.env,
  probeBackend = false,
} = {}) {
  const cloudflare = buildCloudflareDeployReadinessReport(cwd);
  const backend = await buildBackendProductionGateReport({
    cwd,
    env,
    probe: probeBackend,
  });
  const quotation = buildQuotationExternalGateReport(env);
  const artifacts = coreArtifacts.map(artifact => artifactStatus(cwd, artifact));
  const blockers = collectBlockers({ cloudflare, backend, quotation });
  const manualGates = quotation.gates
    .filter(gate => gate.status === "external_manual_check")
    .map(gate => ({
      source: "quotation",
      id: gate.id,
      owner: gate.owner,
      nextAction: gate.nextAction,
    }));
  const productionDeployAllowed =
    cloudflare.ready &&
    backend.ready &&
    quotation.ready &&
    blockers.length === 0 &&
    manualGates.length === 0;

  return {
    generatedAt: new Date().toISOString(),
    mode: "operator-review",
    guardrail:
      "This command reviews local metadata and env-name readiness only; it does not print secret values, run migrations, deploy, send notifications, or write external SaaS.",
    productionDeployAllowed,
    recommendation: productionDeployAllowed
      ? "ready_for_approved_deploy_and_smoke"
      : "do_not_deploy_until_external_gates_close",
    artifacts,
    gates: {
      cloudflare: {
        ready: cloudflare.ready,
        blockers: cloudflare.blockers,
      },
      backend: {
        ready: backend.ready,
        safeOrigin: backend.safeOrigin,
        blockers: backend.blockers,
        originProbe: backend.originProbe,
      },
      quotation: {
        ready: quotation.ready,
        machineReady: quotation.machineReady,
        humanApprovalRequired: quotation.humanApprovalRequired,
        blockedGates: quotation.gates.filter(gate => gate.status === "blocked"),
        manualGates,
      },
    },
    blockers,
    nextActions: productionDeployAllowed
      ? [
          "Run pnpm quote:gate with the same production runtime environment.",
          "Deploy through the approved Cloudflare Pages pipeline.",
          "Run one approved production quote smoke test and verify /admin/quotations.",
        ]
      : dedupeActions([
          ...blockers.map(blocker => blocker.nextAction),
          ...manualGates.map(gate => gate.nextAction),
          "Keep PR #2 in draft until api.sirinx.co, backend env, Cloudflare SIRINX_API_ORIGIN, and DB preflight are verified.",
        ]),
  };
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url);

if (isCli) {
  const strict = process.argv.includes("--strict");
  const report = await buildSirinxOperationalReviewReport({
    probeBackend: process.argv.includes("--probe-backend"),
  });
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = strict && !report.productionDeployAllowed ? 1 : 0;
}
