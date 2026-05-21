export const envGroups = [
  {
    id: "database",
    label: "Production database",
    names: ["DATABASE_URL"],
    requiredFor: ["migration", "db-preflight", "production-smoke"],
  },
  {
    id: "notification_endpoint",
    label: "Quotation notification endpoint",
    names: ["BUILT_IN_FORGE_API_URL", "FORGE_API_URL"],
    requiredFor: ["owner-team-alert"],
  },
  {
    id: "notification_auth",
    label: "Quotation notification auth",
    names: ["BUILT_IN_FORGE_API_KEY", "FORGE_API_KEY"],
    requiredFor: ["owner-team-alert"],
  },
  {
    id: "oauth_server",
    label: "Admin OAuth server",
    names: ["OAUTH_SERVER_URL"],
    requiredFor: ["admin-quotations"],
  },
  {
    id: "oauth_portal",
    label: "Admin OAuth portal",
    names: ["VITE_OAUTH_PORTAL_URL"],
    requiredFor: ["admin-login-url"],
  },
  {
    id: "oauth_app_id",
    label: "OAuth application id",
    names: ["VITE_APP_ID"],
    requiredFor: ["admin-login-url"],
  },
  {
    id: "cloudflare_api_origin",
    label: "Cloudflare API origin",
    names: ["SIRINX_API_ORIGIN"],
    requiredFor: ["pages-function-api-proxy", "production-smoke"],
  },
];

function hasAny(env, names) {
  return names.some(name => Boolean(env[name]));
}

function envGroupStatus(env, group) {
  const configuredNames = group.names.filter(name => Boolean(env[name]));
  return {
    id: group.id,
    label: group.label,
    status: configuredNames.length > 0 ? "configured" : "missing",
    acceptedNames: group.names,
    configuredNameCount: configuredNames.length,
    requiredFor: group.requiredFor,
  };
}

export function buildQuotationExternalGateReport(env = process.env) {
  const envChecks = envGroups.map(group => envGroupStatus(env, group));
  const missingEnv = envChecks.filter(check => check.status !== "configured");
  const databaseConfigured = hasAny(env, ["DATABASE_URL"]);
  const notificationConfigured =
    hasAny(env, ["BUILT_IN_FORGE_API_URL", "FORGE_API_URL"]) &&
    hasAny(env, ["BUILT_IN_FORGE_API_KEY", "FORGE_API_KEY"]);
  const oauthConfigured =
    hasAny(env, ["OAUTH_SERVER_URL"]) &&
    hasAny(env, ["VITE_OAUTH_PORTAL_URL"]) &&
    hasAny(env, ["VITE_APP_ID"]);
  const apiOriginConfigured = hasAny(env, ["SIRINX_API_ORIGIN"]);

  const gates = [
    {
      id: "github_actions_billing",
      status: "external_manual_check",
      owner: "GitHub account owner",
      evidence:
        "PR workflow is manual-only because GitHub previously reported an account billing lock before running CI steps.",
      nextAction:
        "Resolve GitHub billing/account lock, then re-enable pull_request/push triggers for quote-gate workflow.",
    },
    {
      id: "database_runtime",
      status: databaseConfigured ? "ready_to_preflight" : "blocked",
      owner: "Database steward",
      evidence: databaseConfigured
        ? "DATABASE_URL is present in this process; value was not printed."
        : "DATABASE_URL is missing from this process.",
      nextAction: databaseConfigured
        ? "Run pnpm quote:db:preflight before migration or traffic."
        : "Configure DATABASE_URL in the target runtime without committing or printing it.",
    },
    {
      id: "database_adapter_decision",
      status: "locked_mysql_adapter",
      owner: "Backend lead",
      evidence:
        "Current repository uses drizzle mysql dialect and mysql2 preflight. Supabase Postgres would require a separate adapter/migration plan.",
      nextAction:
        "Do not point this build at Supabase Postgres unless the schema, driver, SQL dialect, RLS policy, and migration plan are updated together.",
    },
    {
      id: "notification_delivery",
      status: notificationConfigured ? "ready_for_test_recipient" : "blocked",
      owner: "Sales ops / integration owner",
      evidence: notificationConfigured
        ? "Notification URL and auth env groups are present in this process; values were not printed."
        : "Notification URL and/or auth env groups are missing from this process.",
      nextAction: notificationConfigured
        ? "Run approved smoke with a test recipient before customer-facing delivery."
        : "Configure Forge notification endpoint and key in the target runtime.",
    },
    {
      id: "admin_oauth",
      status: oauthConfigured ? "ready_for_admin_smoke" : "blocked",
      owner: "Auth owner",
      evidence: oauthConfigured
        ? "Admin OAuth env groups are present in this process; values were not printed."
        : "Admin OAuth env groups are missing from this process.",
      nextAction: oauthConfigured
        ? "Verify /admin/quotations with an authenticated admin session."
        : "Configure OAUTH_SERVER_URL, VITE_OAUTH_PORTAL_URL, and VITE_APP_ID.",
    },
    {
      id: "cloudflare_deploy",
      status: apiOriginConfigured ? "external_manual_check" : "blocked",
      owner: "Cloudflare account owner",
      evidence: apiOriginConfigured
        ? "No deploy command is run by this status check. Production cutover must wait for quote:gate productionReady=true and deploy:cloudflare:readiness ready=true."
        : "SIRINX_API_ORIGIN is missing, so the Pages Function API proxy cannot reach the Node backend.",
      nextAction: apiOriginConfigured
        ? "Run pnpm deploy:cloudflare:readiness, confirm API hosting strategy, deploy only after quote:gate passes with target env and db preflight, then run one approved production smoke."
        : "Configure SIRINX_API_ORIGIN in the Cloudflare Pages project so /api/trpc can proxy to the approved Node backend.",
    },
  ];

  const blockedGates = gates.filter(gate => gate.status === "blocked");
  const manualGates = gates.filter(gate => gate.status === "external_manual_check");
  const machineReady = blockedGates.length === 0 && missingEnv.length === 0;
  const ready = machineReady && manualGates.length === 0;

  return {
    ready,
    machineReady,
    humanApprovalRequired: manualGates.length > 0,
    generatedAt: new Date().toISOString(),
    mode: "metadata-only",
    guardrail:
      "This command checks env presence and external-gate status only; it does not print values, run migrations, deploy, send notifications, or write external SaaS.",
    envChecks,
    gates,
    nextActions: ready
      ? [
          "Run pnpm quote:readiness with the same target runtime env.",
          "Confirm the target database and rollback plan.",
          "Run pnpm db:push, then pnpm quote:db:preflight and pnpm quote:gate before deployment.",
        ]
      : [
          ...missingEnv.map(
            check => `Configure env group ${check.id}: ${check.acceptedNames.join(" or ")}`
          ),
          ...blockedGates.map(gate => `${gate.id}: ${gate.nextAction}`),
          ...manualGates.map(gate => `${gate.id}: ${gate.nextAction}`),
        ],
  };
}
