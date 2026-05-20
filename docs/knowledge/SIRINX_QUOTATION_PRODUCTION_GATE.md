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

## What The Gate Checks

1. TypeScript correctness with `pnpm check`.
2. Quotation, router, and auth SDK regression tests.
3. Production build integrity.
4. Quotation production readiness files, guards, and environment names.
5. Read-only database schema preflight for:
   - `leads`
   - `contact_submissions`
   - `quotations`

`pnpm quote:gate:local` intentionally stops after steps 1-3. It proves the code path is reviewable without requiring production secrets or a production database.

## Current External Blockers

Production operation is blocked until these are configured in the target runtime:

- `DATABASE_URL`
- `BUILT_IN_FORGE_API_URL` or `FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY` or `FORGE_API_KEY`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_APP_ID`

## Production Sequence

Run this sequence only after the target environment has the required variables:

```bash
pnpm quote:gate:local
pnpm quote:gate
pnpm db:push
pnpm quote:db:preflight
pnpm build
```

Then deploy through the approved Cloudflare pipeline and run one approved smoke quotation.

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
- Keep pull-request CI on `pnpm quote:gate:local`; production readiness stays a separate deployment gate.
