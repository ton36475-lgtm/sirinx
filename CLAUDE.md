# CLAUDE.md — SIRINX Canonical Repo

Read `AGENTS.md` first — it is the canonical, authoritative operating protocol for
this repository (roles, guardrails, locked business facts, handoff rules, stop
conditions). This file exists to orient an AI coding assistant on the *technical*
shape of the codebase; it does not override `AGENTS.md`.

Also check for a nested `AGENTS.md` in whichever directory you're editing
(`apps/web/`, `client/`, `server/`, `infra/`, `knowledge/`, `governance/`,
`docs/`, `docs/design/`, `schemas/`, `tests/`, `.ops/`) — each narrows the root
rules to that scope.

## What this project is

SIRINX is a B2B solar-energy company website/platform for the Thai market
(rooftop solar, Solar Carport, floating solar, BESS, AI energy management, O&M).
This repo is described in `AGENTS.md` as "the governed canonical repository" for:

- the public marketing/revenue-plane website (Thai-language, SEO-heavy)
- an internal admin/control-plane dashboard ("Omniscient Dashboard" scaffold)
- a multi-agent contract layer (Hermes Orchestrator → Cyber-Physical Analyst →
  Sovereign Creator → Validator → Delivery, plus Design Prototyper / Database
  Steward / Mentor-Apprentice support lanes) used for governed content and
  handoff-bundle generation
- a "handoff bundle" workflow (`04_deployment_bundle/`) for staging a
  deployable snapshot of the repo

The repo is **heavily governance-oriented**: a large fraction of the files are
Markdown policy/runbook/audit documents under `governance/`, `docs/`, `.ops/`,
`knowledge/`, `skills/`, plus JSON contracts under `schemas/` and `.ops/contracts/`.
Actual application code (the thing that runs) is a comparatively small
Vite + Express + tRPC full-stack app living in `client/`, `server/`, `shared/`,
and `drizzle/`.

**Be aware this is a live-look but heavily process-laden repo.** Read
`AGENTS.md` for the full list of guardrails (no gambling/casino content, no
deployment without approval, no mutating "locked business facts" outside an
approval packet, etc.) before making non-trivial changes.

## Directory structure (top levels)

```
client/                 Vite + React 19 SPA (the actual public site + admin UI)
  src/
    pages/               Route-level components (Home, Blog, Contact, SolarCarport, ...)
    pages/admin/         Internal admin dashboard pages (Leads, BlogCMS, Analytics, ...)
    components/          Shared UI (Layout, ErrorBoundary, AIChatBox, ...) + components/ui (shadcn/radix wrappers)
    components/ui/       shadcn-style Radix UI primitives (see components.json)
    contexts/            ThemeContext, LanguageContext, BrandContext (React context providers)
    hooks/                useAnalytics, useMobile, useComposition, usePersistFn
    i18n/                 Thai/English copy, i18n/pages/* per-page translations
    lib/                  trpc client, seo helpers, analytics loader, blogData, utils
    _core/                framework-ish helpers shared across the client app
  public/                 Static assets (client/public, incl. optimized images)

server/                 Express + tRPC backend
  routers.ts             The tRPC appRouter: lead, blog, project, contact, analytics, chatbot, auth, system
  db.ts                  Drizzle ORM (mysql2 driver) data-access functions used by routers.ts
  _core/                  index.ts (entrypoint), trpc.ts (procedures), context.ts, env.ts, llm.ts,
                          notification.ts, oauth.ts, chatbotFallback.ts, localLeadQueue.ts,
                          integration-health.ts, vite.ts (dev/prod Vite <-> Express glue), sdk.ts

shared/                 Code shared between client and server
  const.ts               Shared constants (cookie names, error messages, ...)
  types.ts               Shared TypeScript types
  chatbotIntelligence.ts Chatbot reply sanitization logic
  thaiProvinces.ts        Data for the 77-province solar-carport landing pages
  _core/                  agentContracts.ts, errors.ts

drizzle/                Drizzle ORM schema + generated SQL migrations (MySQL/TiDB dialect today)
  schema.ts, relations.ts, migrations/, meta/

agents/system_prompts/  Markdown system prompts for the 5 core multi-agent roles
apps/web/                Staging surface for imported design exports — NOT a second runtime
                         (see apps/web/AGENTS.md: canonical runtime stays in client/ until
                         explicitly migrated)

governance/             Policy, architecture blueprint, locked business facts, RBAC matrix,
                         ROI-claim governance, deployment/secrets policy, audit records (large)
knowledge/               shadow-vault (internal protocols) + standard-vault (brand truth)
schemas/                 JSON Schemas for inter-agent handoff payloads (validated by
                         infra/scripts/validate-json-schemas.sh)
.ops/                    contracts/ (JSON schemas for each agent role) + audit/ logs
docs/                    Product/architecture docs, docs/design (design-import workflow),
                         docs/migration (server handoff / cutover runbooks)
infra/                    scripts/ (bash + PowerShell ops/validation scripts), docker/, nginx/,
                          postgres/ (pgvector init SQL for a *future* Postgres target), backup/
skills/                  Markdown "skill" docs describing specific workflows (RAG memory,
                         Playwright E2E, n8n queue mode, observability, etc.)
tests/e2e/               Playwright-style spec files (handoff bundle, mobile layout, RBAC
                         isolation, track-record media, package facts) — no playwright config
                         found in repo root; check infra/scripts or docs/migration for how these run
04_deployment_bundle/    Generated handoff bundle (built by infra/scripts/build-handoff-bundle.ps1) —
                          treat as build output / snapshot, not a place to hand-edit source
brands/                  Brand-related assets/config (multi-brand support)
patches/                 pnpm patch for wouter@3.7.1 (see package.json pnpm.patchedDependencies)
```

Root also has a large number of standalone `*.md` planning/notes files
(`ideas.md`, `todo.md`, `swot-analysis.md`, `SIRINX_UPGRADE_REPORT*.md`,
`exec-summary-notes.md`, etc.) — these are working notes, not authoritative
docs; treat `AGENTS.md` and `governance/` as the source of truth when they
conflict.

## Tech stack

- **Frontend:** React 19, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`), wouter
  (routing, patched), TanStack Query, Radix UI primitives (shadcn-style, see
  `components.json`), Framer Motion, react-hook-form + zod, recharts,
  react-helmet-async (SEO).
- **Backend:** Express 4 + tRPC 11 (`@trpc/server`, `@trpc/client`,
  `@trpc/react-query`) with `superjson` transformer. Single Express app that
  either proxies to Vite dev middleware (`NODE_ENV=development`) or serves the
  built static bundle (production) — see `server/_core/index.ts`.
- **Database:** Drizzle ORM against **MySQL/TiDB** today (`drizzle-orm/mysql2`,
  `drizzle.config.ts` dialect `"mysql"`). `docker-compose.yml` also defines a
  `sirinx-postgres` (pgvector) service behind the `postgres-target` profile —
  this is an explicitly **future/target** migration, disabled by default; do
  not assume Postgres is live unless `governance/` docs say the migration
  happened.
- **Auth:** OAuth via an external "Manus"/"Forge" platform
  (`VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OAUTH_SERVER_URL`, `JWT_SECRET`),
  session cookie handled in `server/_core/cookies.ts` / `oauth.ts`.
- **LLM/chatbot:** `server/_core/llm.ts` (`invokeLLM`) backs the `chatbot`
  tRPC router; falls back to `chatbotFallback.ts` on error. Uses
  `BUILT_IN_FORGE_API_URL` / `BUILT_IN_FORGE_API_KEY`.
- **Build:** `vite build` (client) + `tsx server/staticSeoBuild.ts` (static SEO
  pre-render step) + `esbuild` bundling the server entrypoint to `dist/`.
- **Package manager:** pnpm (pinned via `packageManager` in `package.json`,
  `corepack pnpm ...` used throughout `AGENTS.md`). Lockfile is
  `pnpm-lock.yaml`.
- **Testing:** Vitest (`vitest.config.ts`) for server unit tests
  (`server/**/*.test.ts`) and client tests (`client/src/test/**`). Playwright
  spec files exist under `tests/e2e/` but no `playwright.config.*` was found at
  the repo root — check `infra/scripts/*` and `docs/migration/*` before
  assuming how to run them (they may depend on the handoff-bundle / server
  environment).
- **Path aliases** (both `tsconfig.json` and `vite.config.ts` /
  `vitest.config.ts`): `@/*` → `client/src/*`, `@shared/*` → `shared/*`,
  `@assets` → `attached_assets` (directory not present in a fresh checkout —
  only referenced by the Vite alias).

## Setup / dev / build / test / lint commands

Root-level, from `package.json` scripts (also documented in `AGENTS.md`, which
prefixes these with `corepack pnpm run ...`):

```bash
pnpm install                 # install deps (pnpm pinned; use corepack pnpm per AGENTS.md)
cp .env.example .env         # then fill in real values; never commit secrets
cp .env.local.example .env.local   # optional, Vite-only frontend overrides

pnpm run dev                 # tsx watch server/_core/index.ts (dev server, Vite middleware, NODE_ENV=development)
pnpm run build                # vite build && tsx server/staticSeoBuild.ts && esbuild bundle -> dist/
pnpm run start                # node dist/index.js (NODE_ENV=production; run after build)
pnpm run check                # tsc --noEmit (type-check only)
pnpm run format                # prettier --write .
pnpm run test                  # vitest run
pnpm run db:push               # drizzle-kit generate && drizzle-kit migrate (requires DATABASE_URL)
```

There is no `lint` script in `package.json` — `pnpm run check` (tsc) and
`pnpm run format` (prettier) are the closest equivalents. `.prettierrc` /
`.prettierignore` configure formatting.

`AGENTS.md` also lists additional validation scripts that are specific to the
governance/handoff workflow (not general app dev), e.g.:

```bash
python infra/scripts/validate-agent-contracts.py
bash infra/scripts/validate-real-files.sh
bash infra/scripts/validate-json-schemas.sh
bash infra/scripts/validate-sirinx-facts.sh
bash infra/scripts/validate-handoff-bundle.sh
bash infra/scripts/ultimate-validator.sh
```

These matter only when working on the handoff-bundle / governance layer, not
for ordinary feature work on the website.

No GitHub Actions workflows exist in this repo (`.github/` not present) — there
is no CI to check; rely on the commands above locally.

## Architecture patterns actually used

- **tRPC router composition** (`server/routers.ts`): one `appRouter` composed
  of sub-routers (`lead`, `blog`, `project`, `contact`, `analytics`,
  `chatbot`, `auth`, `system`). Each procedure is one of `publicProcedure`,
  `protectedProcedure` (requires `ctx.user`), or `adminProcedure` (requires
  `ctx.user.role === 'admin'`) — defined in `server/_core/trpc.ts`. Follow this
  pattern for new endpoints rather than adding raw Express routes.
- **Zod input validation** on every tRPC procedure input, with Thai-language
  validation messages (e.g. `"กรุณากรอกชื่อ"`) — keep user-facing validation
  errors in Thai to match existing UX.
- **Graceful DB-unavailable degradation**: `lead.submit` and the analytics
  mutations catch DB errors, check `isDatabaseUnavailableError` (from
  `server/_core/localLeadQueue.ts`), and fall back to a local file queue
  (`queueLocalLeadSubmission`) rather than failing the request outright. Follow
  this pattern for other public write-paths that should stay resilient when
  `DATABASE_URL` is unset/unreachable.
- **DB access layer**: all queries go through typed functions in `server/db.ts`
  (`getDb()`, `createLead`, `getLeads`, `getBlogPosts`, etc.) built on Drizzle
  schema from `drizzle/schema.ts` — routers never touch Drizzle directly.
- **Client routing**: `wouter` `Switch`/`Route`, with routes lazy-loaded via
  `React.lazy`. `client/src/App.tsx` gates an entire `AdminRouter` behind
  `isInternalHost()` (localhost / `dev.sirinx.co` / private IP ranges) so admin
  routes 404 on the public production host — be careful not to break this
  isolation when adding admin pages.
- **i18n**: Thai-first, with `LanguageContext` + `client/src/i18n/` structures;
  most in-app copy (including chatbot system prompt, lead-form validation) is
  Thai; code/comments are English. Match this convention.
- **SEO**: `RouteSeo` component + `react-helmet-async` + a separate static
  SEO build step (`server/staticSeoBuild.ts`, run as part of `pnpm run build`)
  — this repo cares a lot about SEO/AEO for Thai-market solar search, including
  a dedicated `shared/thaiProvinces.ts` dataset backing per-province
  `/solar-carport/:province` landing pages.
- **Chatbot**: `server/routers.ts` `chatbotRouter.chat` uses a large Thai
  system prompt (`SIRINX_SYSTEM_PROMPT`) with explicit anti-prompt-injection
  and no-guaranteed-numbers rules (never promise exact ROI/payback/tax
  figures — always defer to a site survey). `sanitizeChatbotReply` further
  filters the LLM output. Preserve these guardrails if touching chatbot logic.
- **Governed multi-agent layer**: `agents/system_prompts/*.md` +
  `schemas/*.schema.json` + `.ops/contracts/*.schema.json` define a JSON-backed
  handoff contract between Hermes Orchestrator → Cyber-Physical Analyst →
  Sovereign Creator → Validator → Delivery. This is a documentation/process
  layer (used by external agent tooling), not something invoked from the
  running Node app.
- **Build-time obfuscation**: `vite.config.ts` conditionally applies
  `vite-plugin-javascript-obfuscator` in production when
  `VITE_ENABLE_JS_OBFUSCATION=true` ("Anti-Copy"), and always disables
  sourcemaps in production — intentional, not an accident.
- **Vendor chunking**: manual Rollup `manualChunks` in `vite.config.ts` splits
  vendor code into `vendor-react`, `vendor-data`, `vendor-ui`, `vendor-motion`,
  `vendor-charts`, `vendor-markdown` — keep new large dependencies in mind for
  this splitting if bundle size matters.

## Environment variables

See `.env.example` (root config, server-loaded via `dotenv/config`) and
`.env.local.example` (Vite-only frontend overrides) for the full annotated
list. Do not print or commit real values. Key groups:

- Runtime: `PORT`, `PUBLIC_PRIMARY_HOST`, `PUBLIC_SERVER_ALIASES`,
  `OPS_PUBLIC_HOST`, `SIRINX_PUBLIC_BASE_URL`, `SIRINX_LOCAL_QUEUE_DIR` (local
  lead-queue fallback dir — may contain customer PII, keep untracked).
- Database: `DATABASE_URL` (MySQL/TiDB; required for DB-backed features,
  drizzle-kit commands, and admin data — app degrades gracefully without it).
- Auth/OAuth: `VITE_APP_ID`, `VITE_OAUTH_PORTAL_URL`, `OAUTH_SERVER_URL`,
  `JWT_SECRET`, `OWNER_OPEN_ID`.
- Forge/Manus platform services: `BUILT_IN_FORGE_API_URL`,
  `BUILT_IN_FORGE_API_KEY` (chatbot, notifications, storage, maps proxy, image
  generation, voice transcription).
- Frontend integrations: `VITE_LINE_OA_URL`, `VITE_FRONTEND_FORGE_API_URL`,
  `VITE_FRONTEND_FORGE_API_KEY`, `VITE_ANALYTICS_ENDPOINT`,
  `VITE_ANALYTICS_WEBSITE_ID`.
- Hermes/brain-skill bootstrap: `HERMES_RUNTIME_ROOT`, `BRAIN_SKILL_ROOT`,
  `AGENT_PACKET_ROOT`, `SIRINX_STAGE_DATABASE`, `SIRINX_STAGE_HERMES`.

## Repo-specific gotchas

1. **This is not a normal lean app repo.** Most of the file count is
   governance/knowledge/docs Markdown, not code. When asked to "find X", check
   whether X is documented as policy (`governance/`, `docs/`) vs. actually
   implemented (`client/`, `server/`, `shared/`, `drizzle/`) — they can
   describe aspirational/future state (e.g. Postgres+pgvector, Omniscient
   Dashboard) that isn't live in code yet.
2. **Database is MySQL/TiDB today, not Postgres**, despite `governance/` docs
   and `docker-compose.yml` describing Postgres+pgvector as the "v15 target."
   Don't assume pgvector/RAG features are wired up in `server/db.ts` just
   because they're documented under `knowledge/` or `skills/`.
3. **`apps/web/` is explicitly not a second runtime** — it's a staging area for
   imported design ZIPs. The canonical, live frontend is `client/`.
4. **`04_deployment_bundle/`** looks like a full repo copy (it mirrors
   `agents/`, `client/`, `docs/`, `governance/`, etc.) — it's a generated
   handoff snapshot, not a second place to edit source. Treat it as build
   output produced by `infra/scripts/build-handoff-bundle.ps1`.
5. **Admin routes are host-gated at runtime**, not just auth-gated:
   `client/src/App.tsx`'s `isInternalHost()` hides `/admin/*` entirely (renders
   `NotFound`) unless the hostname is localhost, `dev.sirinx.co`, or a private
   IP range. Server-side `adminProcedure` auth is a separate, additional gate.
6. **Locked business facts** (brand name, slogan, Thai headlines, package
   terms) live in `governance/LOCKED_BUSINESS_FACTS.md` and must not be edited
   outside an approval packet per `AGENTS.md` — this includes chatbot copy and
   marketing page text.
7. **No ROI/payback/tax guarantees** — `AGENTS.md` and the chatbot system
   prompt both require treating ROI examples as scenario/model language only
   ("250k → 50k-70k THB" is explicitly flagged as a *scenario*, not a
   guarantee). Don't harden these into fixed promises in copy or code.
8. **No `lint` script** and no CI workflows — `pnpm run check` (tsc) +
   `pnpm run test` (vitest) + `pnpm run build` are the practical
   pre-commit/pre-handoff gates; `AGENTS.md`'s "Test Commands" section lists
   exactly these three plus a `docker compose config` sanity check.
9. **Deployment/production changes require explicit human approval** —
   `AGENTS.md` prohibits deploying, mutating cloud resources, sending customer
   messages, exposing local AI services publicly, or changing real secrets
   without approval, and defines a `SERVER-READY HOLD MODE` stop condition.
   Treat `infra/scripts/*deploy*`, `*cutover*`, and `*handoff*` scripts as
   describe-don't-run unless the user has explicitly authorized it.
10. **`@assets` alias points to `attached_assets`**, a directory that does not
    exist in this checkout — only touch it if you're intentionally adding that
    directory; it's not dead config to "fix."
11. **pnpm patch**: `wouter@3.7.1` is patched via `patches/wouter@3.7.1.patch`
    (referenced in `package.json` `pnpm.patchedDependencies`) — if wouter
    routing behaves unexpectedly, check the patch before assuming upstream
    behavior.
