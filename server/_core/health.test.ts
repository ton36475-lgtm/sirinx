import { describe, expect, it } from "vitest";
import { createNodeBackendHealthReport } from "./health";

describe("node backend health report", () => {
  it("does not expose secret values and reports production readiness", () => {
    const report = createNodeBackendHealthReport({
      now: new Date("2026-05-21T00:00:00.000Z"),
      envOverrides: {
        appId: "app-123",
        cookieSecret: "jwt-secret-that-must-not-leak",
        oAuthServerUrl: "https://auth.example.invalid",
        databaseUrl: "mysql://user:password@example.invalid/db",
        forgeApiKey: "forge-secret-that-must-not-leak",
        forgeApiUrl: "https://forge.example.invalid",
      },
    });

    const serialized = JSON.stringify(report);

    expect(report.service).toBe("sirinx-node-backend");
    expect(report.readyForProduction).toBe(true);
    expect(report.status).toBe("ready");
    expect(serialized).not.toContain("jwt-secret-that-must-not-leak");
    expect(serialized).not.toContain("mysql://user:password@example.invalid/db");
    expect(serialized).not.toContain("forge-secret-that-must-not-leak");
  });

  it("keeps liveness ok while marking readiness degraded without critical integrations", () => {
    const report = createNodeBackendHealthReport({
      now: new Date("2026-05-21T00:00:00.000Z"),
      envOverrides: {
        appId: "",
        cookieSecret: "",
        oAuthServerUrl: "",
        databaseUrl: "",
        forgeApiKey: "",
        forgeApiUrl: "",
      },
    });

    expect(report.ok).toBe(true);
    expect(report.readyForProduction).toBe(false);
    expect(report.status).toBe("degraded");
    expect(report.publicCapabilities.leadCapture).toBe(true);
    expect(report.publicCapabilities.chatbot).toBe(true);
  });
});
