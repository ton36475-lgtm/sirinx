const approved = process.env.SIRINX_QUOTE_SMOKE_APPROVED === "1";
const baseUrl = process.env.QUOTE_SMOKE_BASE_URL || "";
const expectedQueued = process.env.QUOTE_SMOKE_EXPECT_QUEUED;
const expectedNotification = process.env.QUOTE_SMOKE_EXPECT_NOTIFICATION;

const quoteNumber = `SIRINX-QT-SMOKE-${new Date()
  .toISOString()
  .replace(/\D/g, "")
  .slice(0, 14)}`;

const payload = {
  0: {
    json: {
      customer: {
        name: "SIRINX Quote Smoke",
        company: "SIRINX Internal Smoke Test",
        phone: "0000000000",
        email: "quote-smoke@example.com",
        lineId: "@smoke",
        address: "Smoke test target",
        note: "Approved smoke test for quotation pipeline. Remove or mark test data after verification.",
      },
      lines: [
        {
          serviceId: "solar-carport-pro",
          quantity: 1,
          targetKwp: 49.6,
          panelModelId: "aiko-comet-3n-620",
        },
      ],
      sourceAction: "preview",
      clientQuoteNumber: quoteNumber,
      issuedAt: new Date().toISOString(),
    },
  },
};

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

function fail(message, details = {}) {
  console.error(
    JSON.stringify(
      {
        success: false,
        message,
        ...details,
      },
      null,
      2
    )
  );
  process.exitCode = 1;
}

function pass(report) {
  console.log(JSON.stringify({ success: true, ...report }, null, 2));
}

function expectationMatches(actual, expected) {
  if (expected === undefined) return true;
  return String(actual) === expected;
}

if (!approved) {
  pass({
    mode: "dry-run",
    message:
      "No quotation was submitted. Set SIRINX_QUOTE_SMOKE_APPROVED=1 and QUOTE_SMOKE_BASE_URL to run a real smoke write.",
    targetRequired: "QUOTE_SMOKE_BASE_URL",
    quoteNumber,
    expectedPanelMath: {
      panelModelId: "aiko-comet-3n-620",
      panelWatts: 620,
      panelCount: 80,
      actualKwp: 49.6,
      grandTotal: 2069808,
    },
  });
  process.exit(0);
}

if (!baseUrl) {
  fail("QUOTE_SMOKE_BASE_URL is required when smoke approval is enabled.");
  process.exit();
}

const endpoint = `${normalizeBaseUrl(baseUrl)}/api/trpc/quotation.create?batch=1`;

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    fail("Smoke endpoint did not return JSON.", {
      status: response.status,
      statusText: response.statusText,
      bodyPreview: text.slice(0, 500),
    });
    process.exit();
  }

  if (!response.ok) {
    fail("Smoke endpoint returned a non-2xx response.", {
      status: response.status,
      statusText: response.statusText,
      body: parsed,
    });
    process.exit();
  }

  const result = parsed?.[0]?.result?.data?.json;
  if (!result?.success) {
    fail("Smoke response did not report success.", { body: parsed });
    process.exit();
  }

  const line = result.totals?.lines?.[0];
  const observed = {
    quoteNumber: result.quoteNumber,
    queued: Boolean(result.queued),
    notificationSent: Boolean(result.notificationSent),
    grandTotal: result.totals?.grandTotal,
    panelWatts: line?.panel?.watts,
    panelCount: line?.panelLayout?.panelCount,
    actualKwp: line?.panelLayout?.actualKwp,
  };

  const failures = [];
  if (observed.panelWatts !== 620) failures.push("panelWatts must be 620");
  if (observed.panelCount !== 80) failures.push("panelCount must be 80");
  if (observed.actualKwp !== 49.6) failures.push("actualKwp must be 49.6");
  if (observed.grandTotal !== 2069808) failures.push("grandTotal must be 2069808");
  if (!expectationMatches(observed.queued, expectedQueued)) {
    failures.push(`queued must match QUOTE_SMOKE_EXPECT_QUEUED=${expectedQueued}`);
  }
  if (!expectationMatches(observed.notificationSent, expectedNotification)) {
    failures.push(
      `notificationSent must match QUOTE_SMOKE_EXPECT_NOTIFICATION=${expectedNotification}`
    );
  }

  if (failures.length > 0) {
    fail("Smoke response failed acceptance checks.", {
      observed,
      failures,
    });
    process.exit();
  }

  pass({
    mode: "approved-write",
    target: normalizeBaseUrl(baseUrl),
    observed,
    reminder:
      "If this was a production smoke, confirm the row in /admin/quotations and remove or mark smoke data according to sales ops policy.",
  });
} catch (error) {
  fail("Smoke request failed.", {
    error: error instanceof Error ? error.message : "unknown error",
  });
}
