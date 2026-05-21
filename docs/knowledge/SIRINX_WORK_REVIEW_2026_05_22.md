# SIRINX Work Review - 2026-05-22

## Current Source Of Truth

- Public website repo: `ton36475-lgtm/sirinx`
- Current local path: `/Users/sirinx/restore-sources/ton36475-lgtm-sirinx`
- Current branch: `codex/home-solution-seo-hydration`
- Active PR: `https://github.com/ton36475-lgtm/sirinx/pull/2`
- Public frontend target: `www.sirinx.co`
- Backend origin target: `api.sirinx.co`

## Completed Work

### Public Website

- Restored the SIRINX solar website direction from the public solar repo instead of the internal AI-warroom homepage.
- Kept `www.sirinx.co` as the public company website surface.
- Preserved the dark premium solar UI direction and SEO/AEO province strategy.
- Generated production static output under `dist/public`.
- Kept API-dependent behavior blocked from static-only deployment.

### Quotation And Lead Pipeline

- Built the customer quote flow around real lead and quotation records.
- Added AIKO panel math through shared quotation rules.
- Added local fallback queue behavior when the database is unavailable.
- Added admin quotation listing path.
- Added production gates for DB preflight, notification env, OAuth env, and Cloudflare API proxy env.

### Cloudflare Frontend Strategy

- Added `wrangler.jsonc` for the Cloudflare Pages project.
- Set `pages_build_output_dir` to `./dist/public`.
- Added Pages Functions invocation routing for `/api/*`.
- Added a fail-closed Pages Function proxy for `/api/trpc` that requires `SIRINX_API_ORIGIN`.
- Added `pnpm deploy:cloudflare:readiness` to prevent accidental static-only deployment.

### Node Backend Strategy

- Selected first production API path: Cloudflare Pages static frontend plus separate Node Express/tRPC backend origin.
- Added `/healthz`, `/api/healthz`, `/readyz`, and `/api/readyz`.
- Added `pnpm backend:gate` and `pnpm backend:smoke`.
- Added explicit Express `trust proxy` behavior.
- Added graceful shutdown for systemd/container restarts.
- Added self-host handoff files for NGINX, systemd, Dockerfile, Docker Compose, and a blank env template.

### Operator Review

- Added `pnpm ops:review` as the single non-mutating operator report for Hermes and Command Center.
- The report combines Cloudflare metadata, backend readiness, quotation external gates, completed artifacts, blockers, and next actions.
- `pnpm ops:review:strict` can fail non-zero when production deploy is not allowed.

## Current Verification

Local-safe verification has passed:

- `pnpm check`
- targeted backend and gate tests
- `pnpm quote:gate:local`
- `docker compose -f infra/docker/docker-compose.sirinx-api.example.yml config`
- local `/healthz` smoke
- local `/readyz` degraded behavior without production env

Known local environment blocker:

- Docker image build cannot run until the Docker/OrbStack daemon socket is available.

## Current Production Blockers

Production deploy remains blocked by external gates:

1. `api.sirinx.co` DNS/backend origin is not confirmed.
2. Backend runtime env is not configured on a real host.
3. Cloudflare Pages production env does not yet have confirmed `SIRINX_API_ORIGIN`.
4. `DATABASE_URL` is not available to run read-only DB preflight.
5. Forge notification env is not configured for real quote alerts.
6. OAuth env is not configured for protected admin quotation review.
7. GitHub Actions PR checks remain unavailable until the account/billing issue is cleared.
8. Production smoke test has not been run because deploy is still blocked.

## Do Not Do Yet

- Do not deploy `www.sirinx.co` with API-dependent quote features until `pnpm quote:gate` reports `productionReady=true`.
- Do not run `pnpm db:push` until target database and rollback plan are confirmed.
- Do not point `SIRINX_API_ORIGIN` at a developer tunnel.
- Do not send real quote notifications until the recipient/test channel is approved.
- Do not merge PR #2 while it remains draft and external gates are open.

## Next Exact Sequence

1. Confirm `api.sirinx.co` hosting target and DNS.
2. Start the Node backend on the approved host.
3. Configure backend runtime env on the host without printing values.
4. Confirm `https://api.sirinx.co/healthz` returns 200.
5. Confirm `https://api.sirinx.co/readyz` returns 200.
6. Configure Cloudflare Pages `SIRINX_API_ORIGIN=https://api.sirinx.co`.
7. Run `pnpm backend:gate`.
8. Run `pnpm quote:db:preflight`.
9. Run `pnpm quote:gate`.
10. Deploy Cloudflare Pages only after `productionReady=true`.
11. Run one approved production quote smoke test.
12. Verify the quote appears in `/admin/quotations`.

## Operator Commands

```bash
pnpm ops:review
pnpm deploy:cloudflare:readiness
pnpm backend:gate
pnpm quote:gates:external
pnpm quote:readiness
pnpm quote:db:preflight
pnpm quote:gate
```

Use `pnpm ops:review` first when resuming work from Codex Mobile, Hermes, or Command Center.
