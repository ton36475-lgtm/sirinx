import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
  "shared/pricing-rules.json",
  "shared/quotation.ts",
  "client/src/pages/Quote.tsx",
  "client/src/pages/admin/Quotations.tsx",
  "server/_core/localQuotationQueue.ts",
  "drizzle/0003_real_quotation_pipeline.sql",
];

const requiredEnv = [
  {
    name: "DATABASE_URL",
    reason: "writes leads, contact submissions, and quotations to the production database",
  },
  {
    name: "BUILT_IN_FORGE_API_URL",
    aliases: ["FORGE_API_URL"],
    reason: "sends owner/team notifications when a quotation is created",
  },
  {
    name: "BUILT_IN_FORGE_API_KEY",
    aliases: ["FORGE_API_KEY"],
    reason: "authorizes the notification service call",
  },
  {
    name: "OAUTH_SERVER_URL",
    reason: "validates admin sessions and protects /admin/quotations",
  },
  {
    name: "VITE_OAUTH_PORTAL_URL",
    reason: "builds the admin login URL in the browser",
  },
  {
    name: "VITE_APP_ID",
    reason: "identifies this website to the OAuth portal",
  },
];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function envStatus(item) {
  const names = [item.name, ...(item.aliases ?? [])];
  return names.some(name => process.env[name]) ? "configured" : "missing";
}

const fileChecks = requiredFiles.map(file => ({
  file,
  status: exists(file) ? "ok" : "missing",
}));

const envChecks = requiredEnv.map(item => ({
  name: item.aliases?.length
    ? `${item.name} or ${item.aliases.join(" or ")}`
    : item.name,
  status: envStatus(item),
  reason: item.reason,
}));

const gitignore = exists(".gitignore")
  ? fs.readFileSync(path.join(root, ".gitignore"), "utf8")
  : "";

const guardChecks = [
  {
    name: "runtime-output ignored",
    status: gitignore.includes("runtime-output/") ? "ok" : "missing",
    reason: "fallback quotation queues must not be committed",
  },
  {
    name: "env files ignored",
    status: gitignore.includes(".env") ? "ok" : "missing",
    reason: "database and notification secrets must stay outside git",
  },
];

const missingFiles = fileChecks.filter(item => item.status !== "ok");
const missingEnv = envChecks.filter(item => item.status !== "configured");
const missingGuards = guardChecks.filter(item => item.status !== "ok");
const ready =
  missingFiles.length === 0 &&
  missingEnv.length === 0 &&
  missingGuards.length === 0;

const report = {
  ready,
  generatedAt: new Date().toISOString(),
  checks: {
    files: fileChecks,
    environment: envChecks,
    guards: guardChecks,
  },
  nextActions: ready
    ? [
        "Confirm the intended target database and rollback plan.",
        "Run pnpm db:push against the approved target database.",
        "Re-run pnpm quote:db:preflight and pnpm quote:gate before deployment.",
      ]
    : [
        ...missingFiles.map(item => `Add missing file: ${item.file}`),
        ...missingEnv.map(item => `Configure ${item.name}: ${item.reason}`),
        ...missingGuards.map(item => `Fix guard: ${item.name}`),
      ],
};

console.log(JSON.stringify(report, null, 2));
process.exitCode = ready ? 0 : 1;
