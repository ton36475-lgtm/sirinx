import { spawnSync } from "node:child_process";

const startedAt = new Date();

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

for (const step of steps) {
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
  localReady,
  productionReady,
  generatedAt: new Date().toISOString(),
  durationMs: Date.now() - startedAt.getTime(),
  steps: results,
  nextActions: productionReady
    ? [
        "Run pnpm db:push against the intended production database.",
        "Deploy with the same environment variables used by this gate.",
        "Create one approved production quotation smoke test.",
        "Confirm it appears in /admin/quotations with an admin session.",
      ]
    : [
        ...productionBlockers.map(
          result => `${result.id} is blocked; inspect ${result.command}`
        ),
      ],
};

console.log(JSON.stringify(report, null, 2));
process.exitCode = productionReady ? 0 : 1;
