import { describe, expect, it } from "vitest";
import {
  calculatePanelLayout,
  calculateQuotation,
  generateQuotationNumber,
  getPanelSpec,
  quotationPricingRules,
  reserveLocalQuotationNumber,
  type StorageLike,
} from "../lib/quotation";

describe("quotation pricing rules", () => {
  it("keeps pricing rules outside the Quote page and includes solar services", () => {
    expect(quotationPricingRules.currency).toBe("THB");
    expect(quotationPricingRules.vat).toBe(0.07);
    expect(quotationPricingRules.services.length).toBeGreaterThanOrEqual(6);
    expect(quotationPricingRules.services.map(service => service.id)).toContain(
      "solar-carport-pro"
    );
    expect(quotationPricingRules.services.map(service => service.id)).toContain(
      "home-hybrid-bess"
    );
    expect(quotationPricingRules.defaultPanelId).toBe("aiko-comet-3n-620");
    expect(quotationPricingRules.panelCatalog.map(panel => panel.watts)).toContain(
      620
    );
  });
});

describe("calculateQuotation", () => {
  it("calculates subtotal, line discount, VAT, and grand total", () => {
    const totals = calculateQuotation([
      {
        serviceId: "solar-carport-start",
        quantity: 2,
        customUnitPrice: 1000,
        discountPercent: 10,
      },
    ]);

    expect(totals.subtotal).toBe(2000);
    expect(totals.discount).toBe(200);
    expect(totals.taxableAmount).toBe(1800);
    expect(totals.vat).toBe(126);
    expect(totals.grandTotal).toBe(1926);
  });

  it("ignores unknown services instead of crashing the page", () => {
    const totals = calculateQuotation([
      {
        serviceId: "missing-service",
        quantity: 1,
      },
    ]);

    expect(totals.lines).toHaveLength(0);
    expect(totals.grandTotal).toBe(0);
  });

  it("uses calculated kWp and AIKO panel specs for capacity-based quotes", () => {
    const totals = calculateQuotation([
      {
        serviceId: "solar-carport-pro",
        quantity: 1,
        targetKwp: 49.6,
        panelModelId: "aiko-comet-3n-620",
      },
    ]);

    expect(totals.lines[0]?.unitPrice).toBe(1934400);
    expect(totals.lines[0]?.panel?.watts).toBe(620);
    expect(totals.lines[0]?.panelLayout?.panelCount).toBe(80);
    expect(totals.lines[0]?.panelLayout?.actualKwp).toBe(49.6);
    expect(totals.grandTotal).toBe(2069808);
  });
});

describe("AIKO panel layout", () => {
  it("calculates panel count, actual capacity, area, and weight", () => {
    const panel = getPanelSpec("aiko-comet-3n-620");
    const layout = calculatePanelLayout(12.4, panel);

    expect(panel?.displayName).toContain("AIKO");
    expect(layout).toMatchObject({
      panelCount: 20,
      requestedKwp: 12.4,
      actualKwp: 12.4,
    });
    expect(layout?.moduleAreaM2).toBeGreaterThan(50);
    expect(layout?.totalWeightKg).toBe(670);
  });
});

describe("quotation number", () => {
  it("generates SIRINX-QT-YYYYMMDD-0001 format", () => {
    const date = new Date(2026, 4, 20);

    expect(generateQuotationNumber(date, 1)).toBe("SIRINX-QT-20260520-0001");
  });

  it("reserves a local daily sequence without external writes", () => {
    const store = new Map<string, string>();
    const storage: StorageLike = {
      getItem: key => store.get(key) ?? null,
      setItem: (key, value) => {
        store.set(key, value);
      },
    };
    const date = new Date(2026, 4, 20);

    expect(reserveLocalQuotationNumber(date, storage)).toBe(
      "SIRINX-QT-20260520-0001"
    );
    expect(reserveLocalQuotationNumber(date, storage)).toBe(
      "SIRINX-QT-20260520-0002"
    );
  });
});
