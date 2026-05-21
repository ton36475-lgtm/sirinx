import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_FILES = [
  {
    id: "node_server_source",
    file: "server/_core/index.ts",
    reason: "Express/tRPC Node backend entrypoint",
  },
  {
    id: "node_health_source",
    file: "server/_core/health.ts",
    reason: "safe liveness/readiness payload",
  },
  {
    id: "node_server_bundle",
    file: "dist/index.js",
    reason: "production Node bundle produced by pnpm build",
  },
  {
    id: "api_nginx_example",
    file: "infra/nginx/api.sirinx.co.conf.example",
    reason: "reverse proxy handoff for api.sirinx.co",
  },
  {
    id: "api_systemd_example",
    file: "infra/systemd/sirinx-api.service.example",
    reason: "long-running backend service handoff",
  },
  {
    id: "node_backend_runbook",
    file: "docs/knowledge/SIRINX_NODE_BACKEND_DEPLOYMENT.md",
    reason: "operator runbook before production deploy",
  },
];

const REQUIRED_ENV_GROUPS = [
  {
    id: "backend_origin",
    names: ["BACKEND_ORIGIN", "SIRINX_API_PUBLIC_ORIGIN", "SIRINX_API_ORIGIN"],
    reason: "approved public origin for the Node backend, expected to be https://api.sirinx.co",
  },
  {
    id: "database",
    names: ["DATABASE_URL"],
    reason: "writes leads, contact submissions, and quotations",
  },
  {
    id: "notification_url",
    names: ["BUILT_IN_FORGE_API_URL", "FORGE_API_URL"],
    reason: "sends team notification for quote and lead events",
  },
  {
    id: "notification_key",
    names: ["BUILT_IN_FORGE_API_KEY", "FORGE_API_KEY"],
    reason: "authorizes notification calls",
  },
  {
    id: "oauth_server",
    names: ["OAUTH_SERVER_URL"],
    reason: "validates admin auth callbacks",
  },
  {
    id: "oauth_portal",
    names: ["VITE_OAUTH_PORTAL_URL"],
    reason: "builds admin login links",
  },
  {
    id: "oauth_app",
    names: ["VITE_APP_ID"],
    reason: "identifies the website to the OAuth portal",
  },
  {
    id: "session_secret",
    names: ["JWT_SECRET"],
    reason: "signs and validates server-side session cookies",
  },
];

function exists(cwd, relativePath) {
  return fs.existsSync(path.join(cwd, relativePath));
}

function readJson(cwd, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(cwd, relativePath), "utf8"));
}

function checkFile(cwd, item) {
  const ok = exists(cwd, item.file);
  return {
    id: item.id,
    file: item.file,
    status: ok ? "ok" : "missing",
    reason: item.reason,
    nextAction: ok ? null : `Add ${item.file}: ${item.reason}`,
  };
}

function checkEnvGroup(env, group) {
  const configuredNames = group.names.filter(name => Boolean(env[name]));
  return {
    id: group.id,
    names: group.names,
    status: configuredNames.length > 0 ? "configured" : "missing",
    configured: configuredNames.length > 0,
    reason: group.reason,
    nextAction:
      configuredNames.length > 0
        ? null
        : `Configure one of ${group.names.join(" or ")}: ${group.reason}`,
  };
}

function normalizeOrigin(env) {
  const origin =
    env.BACKEND_ORIGIN ||
    env.SIRINX_API_PUBLIC_ORIGIN ||
    env.SIRINX_API_ORIGIN ||
    "";

  if (!origin) {
    return { status: "missing", safeOrigin: null, error: null };
  }

  try {
    const url = new URL(origin);
    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        status: "invalid",
        safeOrigin: null,
        error: "origin must use http or https",
      };
    }
    return {
      status: "configured",
      safeOrigin: `${url.protocol}//${url.host}`,
      error: null,
    };
  } catch {
    return {
      status: "invalid",
      safeOrigin: null,
      error: "origin is not a valid URL",
    };
  }
}

async function probeOrigin(origin, fetchImpl, timeoutMs = 5000) {
  if (!origin.safeOrigin) {
    return {
      status: "skipped",
      ok: false,
      reason: origin.error ?? "backend origin is missing",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(new URL("/readyz", origin.safeOrigin), {
      signal: controller.signal,
      headers: {
        accept: "application/json",
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : null;
    return {
      status: response.ok ? "ok" : "blocked",
      ok: response.ok,
      statusCode: response.status,
      service:
        typeof body === "object" && body !== null ? body.service : null,
      backendStatus:
        typeof body === "object" && body !== null ? body.status : null,
      readyForProduction:
        typeof body === "object" && body !== null
          ? body.readyForProduction
          : null,
    };
  } catch (error) {
    return {
      status: "blocked",
      ok: false,
      error: error instanceof Error ? error.message : "unknown error",
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function buildBackendProductionGateReport({
  cwd = process.cwd(),
  env = process.env,
  fetchImpl = globalThis.fetch,
  probe = true,
} = {}) {
  const packageJson = exists(cwd, "package.json")
    ? readJson(cwd, "package.json")
    : {};
  const fileChecks = REQUIRED_FILES.map(item => checkFile(cwd, item));
  const envChecks = REQUIRED_ENV_GROUPS.map(group => checkEnvGroup(env, group));
  const scripts = packageJson.scripts ?? {};
  const scriptChecks = [
    {
      id: "build_script",
      status: typeof scripts.build === "string" && scripts.build.includes("esbuild")
        ? "ok"
        : "missing",
      evidence: scripts.build ?? "",
      nextAction:
        "Keep package.json build bundling server/_core/index.ts into dist/index.js.",
    },
    {
      id: "start_script",
      status: typeof scripts.start === "string" && scripts.start.includes("node dist/index.js")
        ? "ok"
        : "missing",
      evidence: scripts.start ?? "",
      nextAction:
        "Keep package.json start running the production Node backend bundle.",
    },
  ];
  const origin = normalizeOrigin(env);
  const originProbe =
    probe && origin.status === "configured" && fetchImpl
      ? await probeOrigin(origin, fetchImpl)
      : {
          status: "skipped",
          ok: false,
          reason:
            origin.status === "configured"
              ? "origin probe disabled"
              : origin.error ?? "backend origin is missing",
        };

  const blockers = [
    ...fileChecks.filter(item => item.status !== "ok").map(item => ({
      id: item.id,
      status: item.status,
      nextAction: item.nextAction,
    })),
    ...scriptChecks.filter(item => item.status !== "ok").map(item => ({
      id: item.id,
      status: item.status,
      nextAction: item.nextAction,
    })),
    ...envChecks.filter(item => item.status !== "configured").map(item => ({
      id: item.id,
      status: item.status,
      nextAction: item.nextAction,
    })),
    ...(origin.status === "invalid"
      ? [
          {
            id: "backend_origin_format",
            status: "invalid",
            nextAction: origin.error,
          },
        ]
      : []),
    ...(origin.status === "configured" && originProbe.status !== "ok"
      ? [
          {
            id: "backend_origin_probe",
            status: originProbe.status,
            nextAction:
              "Start the Node backend at the approved origin and verify /readyz returns 200 before Cloudflare Pages points production traffic at it.",
          },
        ]
      : []),
  ];

  return {
    ready: blockers.length === 0,
    generatedAt: new Date().toISOString(),
    mode: "backend-production-gate",
    guardrail:
      "This command checks metadata, env names, and safe health endpoints only; it does not print secrets, run migrations, deploy, or write external SaaS.",
    backendStrategy: "Cloudflare Pages frontend + Node Express/tRPC backend origin",
    safeOrigin: origin.safeOrigin,
    files: fileChecks,
    scripts: scriptChecks,
    environment: envChecks,
    originProbe,
    blockers,
    nextActions:
      blockers.length === 0
        ? [
            "Run pnpm quote:db:preflight against the approved database.",
            "Set Cloudflare Pages SIRINX_API_ORIGIN to the same approved backend origin.",
            "Run pnpm quote:gate, then deploy and run one approved production smoke test.",
          ]
        : blockers.map(blocker => `${blocker.id}: ${blocker.nextAction}`),
  };
}

const isCli = process.argv[1] === fileURLToPath(import.meta.url);

if (isCli) {
  const report = await buildBackendProductionGateReport();
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.ready ? 0 : 1;
}
