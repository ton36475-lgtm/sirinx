# SIRINX Quotation Approval Packet

## Purpose

This packet summarizes the current deployment approval state for the SIRINX website quotation pipeline.
It is generated from local metadata only. It does not print secrets, run migrations, deploy, send notifications, or write to external SaaS.

## Snapshot

- Generated at: 2026-05-21T15:01:09.165Z
- Branch: codex/home-solution-seo-hydration
- Ready: no
- Machine-ready: no
- Human approval required: yes
- Mode: metadata-only

## Environment Groups

| Gate | Status | Accepted env names | Configured count | Required for |
| --- | --- | --- | --- | --- |
| database | missing | DATABASE_URL | 0 | migration, db-preflight, production-smoke |
| notification_endpoint | missing | BUILT_IN_FORGE_API_URL or FORGE_API_URL | 0 | owner-team-alert |
| notification_auth | missing | BUILT_IN_FORGE_API_KEY or FORGE_API_KEY | 0 | owner-team-alert |
| oauth_server | missing | OAUTH_SERVER_URL | 0 | admin-quotations |
| oauth_portal | missing | VITE_OAUTH_PORTAL_URL | 0 | admin-login-url |
| oauth_app_id | missing | VITE_APP_ID | 0 | admin-login-url |

## Approval Gates

| Gate | Status | Owner | Next action |
| --- | --- | --- | --- |
| github_actions_billing | external_manual_check | GitHub account owner | Resolve GitHub billing/account lock, then re-enable pull_request/push triggers for quote-gate workflow. |
| database_runtime | blocked | Database steward | Configure DATABASE_URL in the target runtime without committing or printing it. |
| database_adapter_decision | locked_mysql_adapter | Backend lead | Do not point this build at Supabase Postgres unless the schema, driver, SQL dialect, RLS policy, and migration plan are updated together. |
| notification_delivery | blocked | Sales ops / integration owner | Configure Forge notification endpoint and key in the target runtime. |
| admin_oauth | blocked | Auth owner | Configure OAUTH_SERVER_URL, VITE_OAUTH_PORTAL_URL, and VITE_APP_ID. |
| cloudflare_deploy | external_manual_check | Cloudflare account owner | Run pnpm deploy:cloudflare:readiness, confirm API hosting strategy, deploy only after quote:gate passes with target env and db preflight, then run one approved production smoke. |

## Required Sequence

### Phase 1 - Local Review

```bash
pnpm quote:gate:local
pnpm quote:smoke
pnpm deploy:cloudflare:readiness
pnpm quote:gates:external
pnpm quote:approval:packet
```

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

```bash
pnpm quote:gates:external
pnpm deploy:cloudflare:readiness
pnpm quote:readiness
pnpm quote:db:preflight
```

The DB preflight may fail before migration if the target schema does not exist yet. Record the blocker and confirm the target database before running any migration.

### Phase 4 - Migration And Post-Migration Gate

```bash
pnpm db:push
pnpm quote:db:preflight
pnpm quote:gate
```

Run this phase only after the target database and rollback plan are approved.

### Phase 5 - Deploy And Smoke

```bash
pnpm build
# Deploy through the approved Cloudflare pipeline only after
# pnpm deploy:cloudflare:readiness and pnpm quote:gate pass.
SIRINX_QUOTE_SMOKE_APPROVED=1 \
QUOTE_SMOKE_BASE_URL=https://preview-or-production.example \
QUOTE_SMOKE_EXPECT_QUEUED=0 \
QUOTE_SMOKE_EXPECT_NOTIFICATION=1 \
pnpm quote:smoke
```

After smoke, confirm the quotation appears in `/admin/quotations` with an authenticated admin session.

## Adapter Decision

The current implementation is MySQL through Drizzle and `mysql2`. Supabase Postgres is not a drop-in replacement for `DATABASE_URL` in this branch.
Using Supabase Postgres requires a separate adapter, schema, SQL dialect, migration, RLS, and preflight plan.

## Cloudflare Runtime Decision

Cloudflare Pages static upload serves `dist/public`; it does not automatically run the Node/Express bundle generated at `dist/index.js`.
Before production deployment, either port the required quotation API routes to Pages Functions/Workers or run `node dist/index.js` on a separate backend host and route API traffic there.

## Current Next Actions

- Configure env group database: DATABASE_URL
- Configure env group notification_endpoint: BUILT_IN_FORGE_API_URL or FORGE_API_URL
- Configure env group notification_auth: BUILT_IN_FORGE_API_KEY or FORGE_API_KEY
- Configure env group oauth_server: OAUTH_SERVER_URL
- Configure env group oauth_portal: VITE_OAUTH_PORTAL_URL
- Configure env group oauth_app_id: VITE_APP_ID
- database_runtime: Configure DATABASE_URL in the target runtime without committing or printing it.
- notification_delivery: Configure Forge notification endpoint and key in the target runtime.
- admin_oauth: Configure OAUTH_SERVER_URL, VITE_OAUTH_PORTAL_URL, and VITE_APP_ID.
- github_actions_billing: Resolve GitHub billing/account lock, then re-enable pull_request/push triggers for quote-gate workflow.
- cloudflare_deploy: Run pnpm deploy:cloudflare:readiness, confirm API hosting strategy, deploy only after quote:gate passes with target env and db preflight, then run one approved production smoke.
