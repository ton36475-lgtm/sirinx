const origin =
  process.env.BACKEND_ORIGIN ||
  process.env.SIRINX_API_PUBLIC_ORIGIN ||
  process.env.SIRINX_API_ORIGIN ||
  "";
const path = process.env.BACKEND_SMOKE_PATH || "/healthz";
const timeoutMs = Number(process.env.BACKEND_SMOKE_TIMEOUT_MS || "5000");

function normalizeUrl(value) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

function redactUrl(url) {
  return url ? `${url.protocol}//${url.host}` : "";
}

async function main() {
  const baseUrl = normalizeUrl(origin);

  if (!baseUrl) {
    console.log(
      JSON.stringify(
        {
          ready: false,
          generatedAt: new Date().toISOString(),
          mode: "safe-network-smoke",
          guardrail:
            "This command checks backend health only; it does not print secrets, run migrations, deploy, or write external SaaS.",
          blocker:
            "Set BACKEND_ORIGIN, SIRINX_API_PUBLIC_ORIGIN, or SIRINX_API_ORIGIN to the approved Node backend origin.",
        },
        null,
        2
      )
    );
    process.exitCode = 1;
    return;
  }

  const healthUrl = new URL(path, baseUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(healthUrl, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
      },
    });
    const contentType = response.headers.get("content-type") ?? "";
    const body = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    console.log(
      JSON.stringify(
        {
          ready: response.ok,
          generatedAt: new Date().toISOString(),
          mode: "safe-network-smoke",
          origin: redactUrl(baseUrl),
          path,
          statusCode: response.status,
          service:
            typeof body === "object" && body !== null ? body.service : null,
          backendStatus:
            typeof body === "object" && body !== null ? body.status : null,
          readyForProduction:
            typeof body === "object" && body !== null
              ? body.readyForProduction
              : null,
        },
        null,
        2
      )
    );
    process.exitCode = response.ok ? 0 : 1;
  } catch (error) {
    console.log(
      JSON.stringify(
        {
          ready: false,
          generatedAt: new Date().toISOString(),
          mode: "safe-network-smoke",
          origin: redactUrl(baseUrl),
          path,
          error: error instanceof Error ? error.message : "unknown error",
        },
        null,
        2
      )
    );
    process.exitCode = 1;
  } finally {
    clearTimeout(timeout);
  }
}

main();
