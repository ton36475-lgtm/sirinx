import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { buildQuotationExternalGateReport } from "./quotation-gate-state.mjs";

const outputPath = "docs/knowledge/SIRINX_QUOTATION_APPROVAL_PACKET.md";

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
  });
  return result.status === 0 ? result.stdout.trim() : "unknown";
}

function table(rows, columns) {
  const header = `| ${columns.join(" | ")} |`;
  const separator = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows.map(row => {
    return `| ${columns.map(column => String(row[column] ?? "").replaceAll("\n", " ")).join(" | ")} |`;
  });
  return [header, separator, ...body].join("\n");
}

function checked(value) {
  return value ? "yes" : "no";
}

const report = buildQuotationExternalGateReport();
const branch = run("git", ["branch", "--show-current"]);
const generatedAt = new Date().toISOString();

const envRows = report.envChecks.map(check => ({
  Gate: check.id,
  Status: check.status,
  "Accepted env names": check.acceptedNames.join(" or "),
  "Configured count": check.configuredNameCount,
  "Required for": check.requiredFor.join(", "),
}));

const gateRows = report.gates.map(gate => ({
  Gate: gate.id,
  Status: gate.status,
  Owner: gate.owner,
  "Next action": gate.nextAction,
}));

const markdown = `# SIRINX Quotation Approval Packet

## Purpose

This packet summarizes the current deployment approval state for the SIRINX website quotation pipeline.
It is generated from local metadata only. It does not print secrets, run migrations, deploy, send notifications, or write to external SaaS.

## Snapshot

- Generated at: ${generatedAt}
- Branch: ${branch}
- Ready: ${checked(report.ready)}
- Machine-ready: ${checked(report.machineReady)}
- Human approval required: ${checked(report.humanApprovalRequired)}
- Mode: ${report.mode}

## Environment Groups

${table(envRows, ["Gate", "Status", "Accepted env names", "Configured count", "Required for"])}

## Approval Gates

${table(gateRows, ["Gate", "Status", "Owner", "Next action"])}

## Required Sequence

### Phase 1 - Local Review

\`\`\`bash
pnpm quote:gate:local
pnpm quote:smoke
pnpm deploy:cloudflare:readiness
pnpm quote:gates:external
pnpm quote:approval:packet
\`\`\`

### Phase 2 - Target Runtime Setup

Configure the required environment groups in the target runtime. Do not commit or print their values.

Required groups:

- DATABASE_URL
- BUILT_IN_FORGE_API_URL or FORGE_API_URL
- BUILT_IN_FORGE_API_KEY or FORGE_API_KEY
- OAUTH_SERVER_URL
- VITE_OAUTH_PORTAL_URL
- VITE_APP_ID

### Phase 3 - Pre-Migration Approval

\`\`\`bash
pnpm quote:gates:external
pnpm deploy:cloudflare:readiness
pnpm quote:readiness
pnpm quote:db:preflight
\`\`\`

The DB preflight may fail before migration if the target schema does not exist yet. Record the blocker and confirm the target database before running any migration.

### Phase 4 - Migration And Post-Migration Gate

\`\`\`bash
pnpm db:push
pnpm quote:db:preflight
pnpm quote:gate
\`\`\`

Run this phase only after the target database and rollback plan are approved.

### Phase 5 - Deploy And Smoke

\`\`\`bash
pnpm build
# Deploy through the approved Cloudflare pipeline only after
# pnpm deploy:cloudflare:readiness and pnpm quote:gate pass.
SIRINX_QUOTE_SMOKE_APPROVED=1 \\
QUOTE_SMOKE_BASE_URL=https://preview-or-production.example \\
QUOTE_SMOKE_EXPECT_QUEUED=0 \\
QUOTE_SMOKE_EXPECT_NOTIFICATION=1 \\
pnpm quote:smoke
\`\`\`

After smoke, confirm the quotation appears in \`/admin/quotations\` with an authenticated admin session.

## Adapter Decision

The current implementation is MySQL through Drizzle and \`mysql2\`. Supabase Postgres is not a drop-in replacement for \`DATABASE_URL\` in this branch.
Using Supabase Postgres requires a separate adapter, schema, SQL dialect, migration, RLS, and preflight plan.

## Cloudflare Runtime Decision

Cloudflare Pages static upload serves \`dist/public\`; it does not automatically run the Node/Express bundle generated at \`dist/index.js\`.
Before production deployment, either port the required quotation API routes to Pages Functions/Workers or run \`node dist/index.js\` on a separate backend host and route API traffic there.

## Current Next Actions

${report.nextActions.map(action => `- ${action}`).join("\n")}
`;

fs.writeFileSync(outputPath, markdown);

console.log(
  JSON.stringify(
    {
      success: true,
      outputPath,
      ready: report.ready,
      machineReady: report.machineReady,
      humanApprovalRequired: report.humanApprovalRequired,
    },
    null,
    2
  )
);
