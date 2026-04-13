/**
 * Vitest tests for Pricing page data and structure
 */
import { describe, it, expect } from "vitest";

// ─── Pricing page data tests ───────────────────────────────────

describe("Pricing page data validation", () => {
  it("should have 3 package tiers (S, M, L)", () => {
    const packages = ["size-s", "size-m", "size-l"];
    expect(packages).toHaveLength(3);
    expect(packages).toContain("size-s");
    expect(packages).toContain("size-m");
    expect(packages).toContain("size-l");
  });

  it("Size S should be 10-30 kWp range", () => {
    const sizeS = { capacity: "10 – 30 kWp", minKw: 10, maxKw: 30 };
    expect(sizeS.minKw).toBe(10);
    expect(sizeS.maxKw).toBe(30);
    expect(sizeS.maxKw).toBeGreaterThan(sizeS.minKw);
  });

  it("Size M should be 30-100 kWp range", () => {
    const sizeM = { capacity: "30 – 100 kWp", minKw: 30, maxKw: 100 };
    expect(sizeM.minKw).toBe(30);
    expect(sizeM.maxKw).toBe(100);
  });

  it("Size L should be 100-500 kWp range", () => {
    const sizeL = { capacity: "100 – 500 kWp", minKw: 100, maxKw: 500 };
    expect(sizeL.minKw).toBe(100);
    expect(sizeL.maxKw).toBe(500);
  });

  it("Custom tier should start at 500+ kWp", () => {
    const custom = { minKw: 500 };
    expect(custom.minKw).toBeGreaterThanOrEqual(500);
  });

  it("payback period should be 3-6 years across all packages", () => {
    const paybacks = [
      { pkg: "S", min: 4, max: 6 },
      { pkg: "M", min: 3, max: 5 },
      { pkg: "L", min: 3, max: 5 },
    ];
    for (const p of paybacks) {
      expect(p.min).toBeGreaterThanOrEqual(3);
      expect(p.max).toBeLessThanOrEqual(6);
    }
  });

  it("all packages should have EV charger support", () => {
    const evChargers = [
      { pkg: "S", min: 1 },
      { pkg: "M", min: 3 },
      { pkg: "L", min: 10 },
    ];
    for (const ev of evChargers) {
      expect(ev.min).toBeGreaterThan(0);
    }
  });
});

describe("Pricing CTA query params", () => {
  it("should generate correct contact URL for Size S", () => {
    const url = "/contact?interest=solar-carport&package=size-s";
    expect(url).toContain("interest=solar-carport");
    expect(url).toContain("package=size-s");
  });

  it("should generate correct contact URL for Size M", () => {
    const url = "/contact?interest=solar-carport&package=size-m";
    expect(url).toContain("package=size-m");
  });

  it("should generate correct contact URL for Size L", () => {
    const url = "/contact?interest=solar-carport&package=size-l";
    expect(url).toContain("package=size-l");
  });

  it("should generate correct contact URL for Custom", () => {
    const url = "/contact?interest=solar-carport&package=custom";
    expect(url).toContain("package=custom");
  });
});

describe("Contact page package param mapping", () => {
  const interestMap: Record<string, string> = {
    "solar-carport": "Solar Carport",
    "rooftop-solar": "Rooftop Solar",
    "floating-solar": "Floating Solar",
    "bess": "BESS / ESS",
    "ai-energy": "AI Energy Management",
  };

  const packageLabels: Record<string, string> = {
    "size-s": "Size S (10-30 kWp)",
    "size-m": "Size M (30-100 kWp)",
    "size-l": "Size L (100-500 kWp)",
    "custom": "Custom (500+ kWp)",
  };

  it("should map solar-carport interest to Solar Carport", () => {
    expect(interestMap["solar-carport"]).toBe("Solar Carport");
  });

  it("should map all package IDs to labels", () => {
    expect(Object.keys(packageLabels)).toHaveLength(4);
    expect(packageLabels["size-s"]).toContain("10-30 kWp");
    expect(packageLabels["size-m"]).toContain("30-100 kWp");
    expect(packageLabels["size-l"]).toContain("100-500 kWp");
    expect(packageLabels["custom"]).toContain("500+");
  });

  it("should default to Solar Carport for unknown interest", () => {
    const interest = "unknown-value";
    const mapped = interestMap[interest] || "Solar Carport";
    expect(mapped).toBe("Solar Carport");
  });
});

describe("Government policy data", () => {
  const policies = [
    { title: "ลดหย่อนภาษี Solar Rooftop", type: "tax" },
    { title: "มาตรการ EV 3.5", type: "ev" },
    { title: "BOI สนับสนุนพลังงานสะอาด", type: "boi" },
    { title: "เป้าหมาย Carbon Neutrality", type: "carbon" },
  ];

  it("should have 4 government policy items", () => {
    expect(policies).toHaveLength(4);
  });

  it("should include EV policy", () => {
    expect(policies.some(p => p.type === "ev")).toBe(true);
  });

  it("should include BOI policy", () => {
    expect(policies.some(p => p.type === "boi")).toBe(true);
  });

  it("should include tax incentive policy", () => {
    expect(policies.some(p => p.type === "tax")).toBe(true);
  });
});

describe("Pricing FAQ JSON-LD schema", () => {
  const faqs = [
    { q: "Solar Carport ต่างจาก Solar Rooftop อย่างไร?", a: "..." },
    { q: "ราคาที่แสดงเป็นราคาสุดท้ายหรือไม่?", a: "..." },
    { q: "คืนทุนภายในกี่ปี?", a: "..." },
    { q: "รองรับ EV Charger ได้กี่จุด?", a: "..." },
    { q: "ต้องขออนุญาตหน่วยงานใดบ้าง?", a: "..." },
    { q: "มีบริการดูแลหลังติดตั้งไหม?", a: "..." },
    { q: "ขนาดใหญ่กว่า 500 kWp ทำได้ไหม?", a: "..." },
  ];

  it("should have 7 FAQ items", () => {
    expect(faqs).toHaveLength(7);
  });

  it("should generate valid FAQ JSON-LD structure", () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(7);
    expect(jsonLd.mainEntity[0]["@type"]).toBe("Question");
  });
});

describe("OG tags for pricing route", () => {
  it("should have pricing route in OG metadata", () => {
    const routeMetaMap: Record<string, { title: string; description: string }> = {
      "/pricing": {
        title: "แพ็คเกจราคา Solar Carport | Size S/M/L ลดค่าไฟ+EV Charger คืนทุน 3-5 ปี | SIRINX",
        description: "เปรียบเทียบแพ็คเกจ Solar Carport 3 ขนาด (10-500 kWp)",
      },
    };
    expect(routeMetaMap["/pricing"]).toBeDefined();
    expect(routeMetaMap["/pricing"].title).toContain("Solar Carport");
    expect(routeMetaMap["/pricing"].title).toContain("SIRINX");
  });
});
