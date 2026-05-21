import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

type QueueMeta = {
  ipAddress?: string | null;
  userAgent?: string | null;
};

function getQueueFile() {
  const queueDir = process.env.SIRINX_LOCAL_QUEUE_DIR
    ? path.resolve(process.env.SIRINX_LOCAL_QUEUE_DIR)
    : path.resolve(process.cwd(), "runtime-output", "local-recovery-inbox");

  return path.join(queueDir, "quotations.jsonl");
}

export async function queueLocalQuotationSubmission(
  data: unknown,
  meta: QueueMeta = {}
) {
  const queueFile = getQueueFile();
  await fs.mkdir(path.dirname(queueFile), { recursive: true });

  const record = {
    id: `local-quote-${randomUUID()}`,
    queuedAt: new Date().toISOString(),
    reason: "DATABASE_URL not configured or quotation database unavailable",
    data,
    meta,
  };

  await fs.appendFile(queueFile, `${JSON.stringify(record)}\n`, "utf-8");

  return {
    id: record.id,
    path: path.relative(process.cwd(), queueFile).replace(/\\/g, "/"),
  };
}
