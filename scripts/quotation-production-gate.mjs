import { spawnSync } from "node:child_process";

const startedAt = new Date();
const localOnly = process.argv.includes("--local-only");

const steps = [
  {
    id: "typecheck",
    command: ["pnpm", "check"],
    requiredForLocalCommit: true,
    requiredForProduction: true,
  },
  {
    id: "targeted-tests",
    command: [
      "pnpm",
      "test",
      "client/src/test/quotation.test.ts",
      "server/cloudflareApiProxy.test.ts",
      "server/cloudflareDeployReadiness.test.ts",
      "server/quotationGateState.test.ts",
      "server/routers.test.ts",
      "server/_core/sdk.test.ts",
    ],
    requiredForLocalCommit: true,
    requiredForProduction: true,
  },
  {
    id: "production-build",
    command: ["pnpm", "build"],
    requiredForLocalCommit: true,
    requiredForProduction: true,
  },
  {
    id: "cloudflare-deploy-readiness",
    command: ["pnpm", "deploy:cloudflare:readiness"],
    requiredForLocalCommit: false,
    requiredForProduction: true,
  },
  {
    id: "environment-readiness",
    command: ["pnpm", "quote:readiness"],
    requiredForLocalCommit: false,
    requiredForProduction: true,
  },
  {
    id: "database-schema-preflight",
    command: ["pnpm", "quote:db:preflight"],
    requiredForLocalCommit: false,
    requiredForProduction: true,
  },
];
const activeSteps = localOnly
  ? steps.filter(step => step.requiredForLocalCommit)
  : steps;

function runStep(step) {
  const [command, ...args] = step.command;
  const started = Date.now();
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env,
  });

  const stdout = result.stdout?.trim() ?? "";
  const stderr = result.stderr?.trim() ?? "";
  const status = result.status === 0 ? "passed" : "blocked";

  return {
    id: step.id,
    command: step.command.join(" "),
    status,
    exitCode: result.status ?? 1,
    durationMs: Date.now() - started,
    requiredForLocalCommit: step.requiredForLocalCommit,
    requiredForProduction: step.requiredForProduction,
    stdoutTail: stdout.split("\n").slice(-16).join("\n"),
    stderrTail: stderr.split("\n").slice(-16).join("\n"),
  };
}

const results = [];

for (const step of activeSteps) {
  console.error(`[quote:gate] ${step.id}: ${step.command.join(" ")}`);
  results.push(runStep(step));
}

const localBlockers = results.filter(
  result => result.requiredForLocalCommit && result.status !== "passed"
);
const productionBlockers = results.filter(
  result => result.requiredForProduction && result.status !== "passed"
);
const localReady = localBlockers.length === 0;
const productionReady = productionBlockers.length === 0;

const report = {
  mode: localOnly ? "local-only" : "production",
  localReady,
  productionReady: localOnly ? null : productionReady,
  generatedAt: new Date().toISOString(),
  durationMs: Date.now() - startedAt.getTime(),
  steps: results,
  nextActions: localOnly
    ? localReady
      ? [
          "Local quotation gate is ready for code review.",
          "Run pnpm quote:gates:external and pnpm quote:readiness with target runtime variables before migration or deploy.",
        ]
      : [
          ...localBlockers.map(
            result => `${result.id} is blocked; inspect ${result.command}`
          ),
        ]
    : productionReady
    ? [
        "Production gate passed for the current runtime environment.",
        "Deploy with the same environment variables used by this gate.",
        "Create one approved production quotation smoke test after deploy.",
        "Confirm it appears in /admin/quotations with an admin session.",
      ]
    : [
        ...productionBlockers.map(
          result => `${result.id} is blocked; inspect ${result.command}`
        ),
      ],
};

console.log(JSON.stringify(report, null, 2));
process.exitCode = localOnly
  ? localReady
    ? 0
    : 1
  : productionReady
    ? 0
    : 1;
