import { describe, expect, it } from "vitest";
import { buildQuotationExternalGateReport } from "../scripts/quotation-gate-state.mjs";

const configuredEnv = {
  DATABASE_URL: "mysql://placeholder",
  BUILT_IN_FORGE_API_URL: "https://example.invalid",
  BUILT_IN_FORGE_API_KEY: "placeholder",
  OAUTH_SERVER_URL: "https://auth.example.invalid",
  VITE_OAUTH_PORTAL_URL: "https://portal.example.invalid",
  VITE_APP_ID: "sirinx-placeholder",
};

describe("quotation external gate state", () => {
  it("fails closed when target runtime environment groups are missing", () => {
    const report = buildQuotationExternalGateReport({});

    expect(report.ready).toBe(false);
    expect(report.machineReady).toBe(false);
    expect(report.humanApprovalRequired).toBe(true);
    expect(report.mode).toBe("metadata-only");
    expect(report.guardrail).toContain("does not print values");
    expect(report.envChecks.every(check => check.status === "missing")).toBe(true);
    expect(report.gates.find(gate => gate.id === "database_runtime")?.status).toBe(
      "blocked",
    );
    expect(report.nextActions).toContain("Configure env group database: DATABASE_URL");
  });

  it("keeps ready false when env groups exist but manual gates still require approval", () => {
    const report = buildQuotationExternalGateReport(configuredEnv);

    expect(report.ready).toBe(false);
    expect(report.machineReady).toBe(true);
    expect(report.humanApprovalRequired).toBe(true);
    expect(report.envChecks.every(check => check.status === "configured")).toBe(true);
    expect(report.gates.find(gate => gate.id === "database_runtime")?.status).toBe(
      "ready_to_preflight",
    );
    expect(report.gates.find(gate => gate.id === "github_actions_billing")?.status).toBe(
      "external_manual_check",
    );
    expect(report.gates.find(gate => gate.id === "cloudflare_deploy")?.status).toBe(
      "external_manual_check",
    );
    expect(report.nextActions).toEqual([
      "github_actions_billing: Resolve GitHub billing/account lock, then re-enable pull_request/push triggers for quote-gate workflow.",
      "cloudflare_deploy: Deploy only after quote:gate passes with target env and db preflight, then run one approved production smoke.",
    ]);
  });
});
