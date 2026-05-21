# SIRINX Quotation Production Gate

## Purpose

This gate verifies whether the website quotation pipeline is ready to move from local-safe operation to production operation.

The gate is intentionally fail-closed. It does not run migrations, deploy code, push git branches, send notifications, or print secret values.

## One Command

```bash
pnpm quote:gate
```

For pull-request CI and code review without production secrets:

```bash
pnpm quote:gate:local
```

To see the remaining external approval gates without printing secrets:

```bash
pnpm quote:gates:external
```

To generate the reviewer-facing approval packet:

```bash
pnpm quote:approval:packet
```

To verify that the Cloudflare deploy target is not accidentally static-only:

```bash
pnpm deploy:cloudflare:readiness
```

To verify the separate Node backend origin for `api.sirinx.co`:

```bash
pnpm backend:gate
```

## What The Gate Checks

1. TypeScript correctness with `pnpm check`.
2. Quotation, router, and auth SDK regression tests.
3. Production build integrity.
4. Cloudflare deploy metadata:
   - root `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml`
   - `dist/public` static output
   - Pages Functions or Worker entrypoint when a Node server bundle exists
5. Node backend production gate:
   - `dist/index.js` backend bundle
   - `/healthz` and `/readyz` readiness endpoints
   - `api.sirinx.co` reverse-proxy/systemd handoff templates
   - backend runtime env names without printing values
6. Quotation production readiness files, guards, and environment names.
7. Read-only database schema preflight for:
   - `leads`
   - `contact_submissions`
   - `quotations`

`pnpm quote:gate:local` intentionally stops after steps 1-3. It proves the code path is reviewable without requiring production secrets or a production database.

## GitHub Actions Status

`.github/workflows/quote-gate.yml` is currently manual-only because GitHub reported:

> The job was not started because your account is locked due to a billing issue.

After billing is healthy, re-enable pull request and push triggers for this workflow so PR #2 can show the local quotation gate automatically.

## Current External Blockers

Production operation is blocked until these are configured in the target runtime:

- `DATABASE_URL`
- `BUILT_IN_FORGE_API_URL` or `FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY` or `FORGE_API_KEY`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_APP_ID`
- `SIRINX_API_ORIGIN`

`pnpm quote:gates:external` reports these groups as `configured` or `missing`
without printing values. It also keeps two manual gates visible: GitHub Actions
billing/account status and Cloudflare production deploy approval.

Current database adapter is MySQL through Drizzle and `mysql2`. Do not point this
build at Supabase Postgres without a separate adapter/migration plan covering SQL
dialect, driver, schema, RLS policy, and preflight changes.

Cloudflare Pages static upload only serves `dist/public`; it does not run the
Node/Express bundle generated at `dist/index.js`. Keep quotation API deployment
blocked until one of these is true:

- The required `/api/trpc/quotation.*` paths are ported to Pages Functions or a Worker.
- A separate Node backend host runs `node dist/index.js` and the public site routes API traffic to it.

Current first-production strategy is **Cloudflare Pages static frontend plus a
Pages Function proxy for `/api/trpc`**. The proxy must fail closed until
`SIRINX_API_ORIGIN` points at the approved Node backend origin, for example an
`api.sirinx.co` host that runs the existing Express/tRPC server.

`pnpm deploy:cloudflare:readiness` is intentionally metadata-only. It does not
deploy, mutate Cloudflare settings, read secrets, or send traffic.

## Production Sequence

### Phase 1 - Local Review

```bash
pnpm quote:gate:local
pnpm quote:smoke
pnpm deploy:cloudflare:readiness
pnpm quote:gates:external
pnpm quote:approval:packet
```

### Phase 2 - Target Runtime Setup

Configure the required runtime variables in the target environment. Do not commit
or print their values.

Required groups:

- DATABASE_URL
- BUILT_IN_FORGE_API_URL or FORGE_API_URL
- BUILT_IN_FORGE_API_KEY or FORGE_API_KEY
- OAUTH_SERVER_URL
- VITE_OAUTH_PORTAL_URL
- VITE_APP_ID
- SIRINX_API_ORIGIN

The backend runtime also requires `JWT_SECRET`. Cloudflare Pages requires
`SIRINX_API_ORIGIN=https://api.sirinx.co`, while the backend host may set
`SIRINX_API_PUBLIC_ORIGIN=https://api.sirinx.co` for operator metadata.

### Phase 3 - Pre-Migration Approval

```bash
pnpm quote:gates:external
pnpm deploy:cloudflare:readiness
pnpm backend:gate
pnpm quote:readiness
pnpm quote:db:preflight
```

`pnpm quote:db:preflight` may fail before the migration exists. Treat that as a
recorded blocker, confirm the target database, and verify rollback before running
any migration.

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
```

Then deploy through the approved Cloudflare pipeline and run one approved smoke quotation.

## Smoke Command

Dry run; does not write:

```bash
pnpm quote:smoke
```

Approved write against a confirmed preview or production target:

```bash
SIRINX_QUOTE_SMOKE_APPROVED=1 \
QUOTE_SMOKE_BASE_URL=https://preview-or-production.example \
QUOTE_SMOKE_EXPECT_QUEUED=0 \
QUOTE_SMOKE_EXPECT_NOTIFICATION=1 \
pnpm quote:smoke
```

For local fallback testing where no database/notification service is configured:

```bash
SIRINX_QUOTE_SMOKE_APPROVED=1 \
QUOTE_SMOKE_BASE_URL=http://127.0.0.1:4177 \
QUOTE_SMOKE_EXPECT_QUEUED=1 \
QUOTE_SMOKE_EXPECT_NOTIFICATION=0 \
pnpm quote:smoke
```

`QUOTE_SMOKE_EXPECT_QUEUED` and `QUOTE_SMOKE_EXPECT_NOTIFICATION` accept `1/0`,
`true/false`, or `yes/no`. Use the explicit expectations so the smoke test fails
closed if the selected environment changes from fallback queue mode to live
database/notification mode.

## Smoke Acceptance

The smoke quotation must prove:

- A lead row is created.
- A quotation row is created.
- A contact submission audit row is created.
- `notificationSent` is `true`.
- The quotation appears in `/admin/quotations` for an authenticated admin.
- AIKO panel math is correct for the tested system size.

## Guardrails

- Do not read or print `.env` values.
- Do not run `pnpm db:push` without confirming the target database.
- Do not send a real customer notification without a test recipient or explicit production approval.
- Do not deploy if `pnpm quote:gate` reports `productionReady=false`.
- Do not deploy API-dependent quotation features as static Pages only.
- Do not point `SIRINX_API_ORIGIN` at an unapproved host or a developer tunnel.
- Keep pull-request CI on `pnpm quote:gate:local`; production readiness stays a separate deployment gate.
