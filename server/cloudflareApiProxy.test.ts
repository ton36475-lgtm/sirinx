import { afterEach, describe, expect, it, vi } from "vitest";
import { onRequest } from "../functions/api/trpc/[[path]]";

describe("Cloudflare Pages API proxy", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fails closed when SIRINX_API_ORIGIN is not configured", async () => {
    const response = await onRequest({
      request: new Request("https://www.sirinx.co/api/trpc/quotation.create"),
      env: {},
    });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      error: expect.stringContaining("SIRINX_API_ORIGIN"),
    });
  });

  it("proxies /api/trpc requests to the approved Node backend origin", async () => {
    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await onRequest({
      request: new Request(
        "https://www.sirinx.co/api/trpc/quotation.create?batch=1",
        {
          method: "POST",
          body: JSON.stringify({ payload: true }),
          headers: { "content-type": "application/json" },
        }
      ),
      env: { SIRINX_API_ORIGIN: "https://api.sirinx.co" },
    });

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [targetUrl, init] = fetchMock.mock.calls[0];
    expect(String(targetUrl)).toBe(
      "https://api.sirinx.co/api/trpc/quotation.create?batch=1"
    );
    expect(init).toMatchObject({ method: "POST", redirect: "manual" });
  });
});
