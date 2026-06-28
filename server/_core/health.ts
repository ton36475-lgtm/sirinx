import { ENV } from "./env";
import { getIntegrationHealth } from "./integration-health";

type HealthOptions = {
  now?: Date;
  envOverrides?: Partial<typeof ENV>;
};

export function createNodeBackendHealthReport(options: HealthOptions = {}) {
  const now = options.now ?? new Date();
  const integrations = getIntegrationHealth(options.envOverrides);
  const authReady = integrations.auth.status === "ready";
  const databaseReady = integrations.database.status === "ready";
  const notificationReady = integrations.chatbot.status === "ready";
  const readyForProduction = authReady && databaseReady && notificationReady;

  return {
    ok: true,
    service: "sirinx-node-backend",
    status: readyForProduction ? "ready" : "degraded",
    readyForProduction,
    mode: process.env.NODE_ENV ?? "development",
    generatedAt: now.toISOString(),
    guardrail: "No secret values are included in this health payload.",
    integrations: {
      auth: integrations.auth.status,
      database: integrations.database.status,
      leadCapture: integrations.leadCapture.status,
      chatbot: integrations.chatbot.status,
      chatbotFallback: integrations.chatbotFallback.status,
      analytics: integrations.analytics.status,
    },
    publicCapabilities: {
      leadCapture: integrations.publicLeadCaptureReady,
      chatbot: integrations.publicChatbotReady,
      localContinuation: integrations.localContinuationReady,
    },
  };
}
