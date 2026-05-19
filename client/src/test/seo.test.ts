import { describe, expect, it } from "vitest";
import { absoluteUrl, getSeoMeta } from "../lib/seo";

describe("client SEO metadata", () => {
  it("keeps the Home Solution route indexable after client hydration", () => {
    const meta = getSeoMeta("/home-solution/");

    expect(meta.path).toBe("/home-solution");
    expect(meta.title).toContain("Home Solar Solution");
    expect(meta.description).toContain("บ้านขนาดใหญ่");
    expect(meta.noindex).toBeUndefined();
    expect(absoluteUrl(meta.path)).toBe("https://www.sirinx.co/home-solution/");
  });

  it("marks unknown routes as noindex", () => {
    expect(getSeoMeta("/missing-route").noindex).toBe(true);
  });
});
