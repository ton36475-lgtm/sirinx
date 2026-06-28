import mysql from "mysql2/promise";

const requiredTables = {
  leads: [
    "id",
    "source",
    "status",
    "name",
    "phone",
    "email",
    "systemSize",
    "systemType",
    "createdAt",
  ],
  contact_submissions: ["id", "leadId", "formData", "sourcePage", "createdAt"],
  quotations: [
    "id",
    "leadId",
    "quoteNumber",
    "status",
    "sourceAction",
    "customerName",
    "lineItems",
    "totals",
    "primaryPanelModel",
    "primaryPanelWatts",
    "grandTotal",
    "issuedAt",
    "validUntil",
    "createdAt",
  ],
};

function quoteIdentifier(identifier) {
  return `\`${identifier.replaceAll("`", "``")}\``;
}

function redactMessage(message) {
  const secret = process.env.DATABASE_URL;
  return secret ? message.replaceAll(secret, "[redacted]") : message;
}

function missingDatabaseReport() {
  return {
    ready: false,
    mode: "read-only",
    generatedAt: new Date().toISOString(),
    checks: [],
    blockers: [
      {
        name: "DATABASE_URL",
        status: "missing",
        reason: "required to inspect the live quotation database schema",
      },
    ],
  };
}

async function describeTable(connection, tableName) {
  const [rows] = await connection.query(
    `SHOW COLUMNS FROM ${quoteIdentifier(tableName)}`
  );
  return rows.map(row => String(row.Field));
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.log(JSON.stringify(missingDatabaseReport(), null, 2));
    process.exitCode = 1;
    return;
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const checks = [];

  try {
    for (const [tableName, requiredColumns] of Object.entries(requiredTables)) {
      try {
        const columns = await describeTable(connection, tableName);
        const missingColumns = requiredColumns.filter(
          column => !columns.includes(column)
        );
        checks.push({
          table: tableName,
          status: missingColumns.length === 0 ? "ok" : "missing_columns",
          missingColumns,
        });
      } catch (error) {
        checks.push({
          table: tableName,
          status: "missing_or_unreadable",
          error:
            error instanceof Error
              ? redactMessage(error.message)
              : "unknown error",
        });
      }
    }
  } finally {
    await connection.end();
  }

  const blockers = checks.filter(check => check.status !== "ok");
  const ready = blockers.length === 0;

  console.log(
    JSON.stringify(
      {
        ready,
        mode: "read-only",
        generatedAt: new Date().toISOString(),
        checks,
        blockers,
        nextActions: ready
          ? [
              "Run pnpm quote:readiness with production notification and OAuth env configured.",
              "Start the deployed app and create one approved smoke quotation.",
              "Confirm the smoke quotation appears in /admin/quotations with an admin session.",
            ]
          : [
              "Run the pending Drizzle migration against the intended database.",
              "Re-run pnpm quote:db:preflight before enabling production quotation traffic.",
            ],
      },
      null,
      2
    )
  );

  process.exitCode = ready ? 0 : 1;
}

main().catch(error => {
  console.error(
    JSON.stringify(
      {
        ready: false,
        mode: "read-only",
        generatedAt: new Date().toISOString(),
        error:
          error instanceof Error
            ? redactMessage(error.message)
            : "unknown error",
      },
      null,
      2
    )
  );
  process.exitCode = 1;
});
