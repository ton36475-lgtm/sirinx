# SIRINX Node Backend Deployment

## Decision

The public website stays on Cloudflare Pages at `www.sirinx.co`. Dynamic API work runs on a separate Node backend origin, expected to be `https://api.sirinx.co`.

Cloudflare Pages invokes `/api/*` through Pages Functions. The Pages Function proxies `/api/trpc/*` to `SIRINX_API_ORIGIN`. The backend origin runs the existing Express/tRPC bundle from `dist/index.js`.

## Backend Scope

The Node backend owns:

- tRPC API at `/api/trpc`
- quotation creation
- lead capture
- contact submission audit rows
- owner/team notification calls
- OAuth callback routes
- admin data access
- health endpoints

The backend does not own the static public homepage assets. Those remain Cloudflare Pages static output from `dist/public`.

## Health Endpoints

- `/healthz` and `/api/healthz`: liveness. Returns HTTP 200 and a non-secret integration status payload.
- `/readyz` and `/api/readyz`: production readiness. Returns HTTP 200 only when auth, database, and notification integrations are configured. Returns HTTP 503 when degraded.

The health payload intentionally reports statuses only. It must not include `.env` values, database URLs, API keys, session secrets, customer records, or raw logs.

## Commands

Build the deployable backend bundle:

```bash
pnpm build
```

Check backend production readiness without printing secrets:

```bash
pnpm backend:gate
```

Run a safe health smoke against the approved origin:

```bash
BACKEND_ORIGIN=https://api.sirinx.co pnpm backend:smoke
```

Check quotation production readiness after backend readiness:

```bash
pnpm quote:gate
```

Review all deploy gates and current blockers without mutating production:

```bash
pnpm ops:review
```

Build the dedicated backend container image:

```bash
docker build -f infra/docker/Dockerfile.sirinx-api -t sirinx/api:local .
```

Run the container example on a self-hosted box after `/etc/sirinx/api.env` is written:

```bash
docker compose -f infra/docker/docker-compose.sirinx-api.example.yml up -d
```

The checked-in compose file uses `infra/docker/api.env.example` so `docker compose config`
can validate locally without real secrets. For production, copy that file to a private
host path, fill values there, and update `env_file` during host setup.

## Required Runtime Environment

Configure these in the backend runtime. Do not commit or print values.

- `DATABASE_URL`
- `BUILT_IN_FORGE_API_URL` or `FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY` or `FORGE_API_KEY`
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `VITE_APP_ID`
- `JWT_SECRET`

Configure this in Cloudflare Pages production variables:

- `SIRINX_API_ORIGIN=https://api.sirinx.co`

Optional backend metadata:

- `PORT=3000`
- `SIRINX_TRUST_PROXY=loopback`
- `SIRINX_API_PUBLIC_ORIGIN=https://api.sirinx.co`
- `SIRINX_PUBLIC_BASE_URL=https://www.sirinx.co`
- `PUBLIC_PRIMARY_HOST=www.sirinx.co`

## Host Files

Use these as reviewed templates. Replace paths and users only on the target host.

- `infra/systemd/sirinx-api.service.example`
- `infra/nginx/api.sirinx.co.conf.example`
- `infra/docker/Dockerfile.sirinx-api`
- `infra/docker/docker-compose.sirinx-api.example.yml`
- `infra/docker/api.env.example`

## Deployment Sequence

1. Build locally or in CI with `pnpm build`.
2. Copy the built release to the backend host.
3. Write backend secrets to the target host environment file, for example `/etc/sirinx/api.env`.
4. Start or restart the systemd service.
5. Confirm `https://api.sirinx.co/healthz` returns HTTP 200.
6. Confirm `https://api.sirinx.co/readyz` returns HTTP 200.
7. Set Cloudflare Pages `SIRINX_API_ORIGIN` to the approved backend origin.
8. Run `pnpm backend:gate`.
9. Run `pnpm quote:db:preflight` against the approved database.
10. Run `pnpm quote:gate`.
11. Deploy the Cloudflare Pages frontend only after the gate reports `productionReady=true`.
12. Run one approved production quotation smoke test.

## Current Blockers

Production remains blocked until:

- `api.sirinx.co` DNS resolves to the backend host.
- Backend runtime env is configured on the host.
- Cloudflare Pages production env includes `SIRINX_API_ORIGIN`.
- The target database is confirmed and rollback is documented.
- `pnpm quote:db:preflight` passes.
- `pnpm quote:gate` reports `productionReady=true`.

## Guardrails

- Do not read or print `.env` values.
- Do not run `pnpm db:push` before database target and rollback approval.
- Do not point `SIRINX_API_ORIGIN` at a developer tunnel.
- Do not deploy API-dependent quote features as static-only Pages.
- Do not send real customer notifications until the smoke recipient is approved.

## Runtime Hardening

- Express `trust proxy` is explicit. Default production value is `loopback`; override with `SIRINX_TRUST_PROXY` only when the reverse-proxy chain is known.
- `SIGTERM` and `SIGINT` close the HTTP server before exit, so systemd and container restarts are controlled.
- Docker builds use `.dockerignore` to exclude `.env`, runtime output, local caches, and source-control metadata from the image context.
- `/readyz` should be used for deploy gating; `/healthz` is only liveness.
