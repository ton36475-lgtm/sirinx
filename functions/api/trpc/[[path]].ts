type PagesContext = {
  request: Request;
  env: {
    SIRINX_API_ORIGIN?: string;
  };
  waitUntil?: (promise: Promise<unknown>) => void;
};

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "content-length",
  "host",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function copyRequestHeaders(headers: Headers) {
  const copied = new Headers();
  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      copied.set(key, value);
    }
  }
  return copied;
}

function copyResponseHeaders(headers: Headers) {
  const copied = new Headers();
  for (const [key, value] of headers.entries()) {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) {
      copied.set(key, value);
    }
  }
  copied.set("cache-control", "no-store");
  return copied;
}

function resolveBackendUrl(request: Request, apiOrigin: string) {
  const sourceUrl = new URL(request.url);
  const targetUrl = new URL(apiOrigin);
  targetUrl.pathname = sourceUrl.pathname;
  targetUrl.search = sourceUrl.search;
  return targetUrl;
}

export async function onRequest(context: PagesContext) {
  const apiOrigin = context.env.SIRINX_API_ORIGIN?.trim();

  if (!apiOrigin) {
    return json(503, {
      error: "SIRINX_API_ORIGIN is not configured for the quotation API proxy.",
    });
  }

  let targetUrl: URL;
  try {
    targetUrl = resolveBackendUrl(context.request, apiOrigin);
  } catch {
    return json(500, {
      error: "SIRINX_API_ORIGIN is not a valid URL.",
    });
  }

  if (!["https:", "http:"].includes(targetUrl.protocol)) {
    return json(500, {
      error: "SIRINX_API_ORIGIN must use http or https.",
    });
  }

  const headers = copyRequestHeaders(context.request.headers);
  headers.set("x-forwarded-host", new URL(context.request.url).host);
  headers.set("x-forwarded-proto", new URL(context.request.url).protocol.replace(":", ""));

  const response = await fetch(targetUrl, {
    method: context.request.method,
    headers,
    body:
      context.request.method === "GET" || context.request.method === "HEAD"
        ? undefined
        : context.request.body,
    redirect: "manual",
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: copyResponseHeaders(response.headers),
  });
}
