import { describe, it, expect } from "vitest";
import { getPageMeta, injectOgTags } from "./ogTags";

describe("getPageMeta", () => {
  it("returns default meta for homepage", () => {
    const meta = getPageMeta("/");
    expect(meta.title).toContain("SIRINX");
    expect(meta.description).toContain("Solar Digital Agentic Company");
  });

  it("returns route-specific meta for /contact", () => {
    const meta = getPageMeta("/contact");
    expect(meta.title).toContain("ติดต่อเรา");
    expect(meta.description).toContain("นัดสำรวจหน้างานฟรี");
  });

  it("returns route-specific meta for /solutions", () => {
    const meta = getPageMeta("/solutions");
    expect(meta.title).toContain("โซลูชันพลังงาน");
    expect(meta.description).toContain("Rooftop Solar");
  });

  it("returns route-specific meta for /blog", () => {
    const meta = getPageMeta("/blog");
    expect(meta.title).toContain("บทความ");
  });

  it("returns route-specific meta for /about", () => {
    const meta = getPageMeta("/about");
    expect(meta.title).toContain("เกี่ยวกับเรา");
  });

  it("returns route-specific meta for /industries", () => {
    const meta = getPageMeta("/industries");
    expect(meta.title).toContain("อุตสาหกรรม");
  });

  it("returns route-specific meta for /investment", () => {
    const meta = getPageMeta("/investment");
    expect(meta.title).toContain("การลงทุน");
  });

  it("returns route-specific meta for /projects", () => {
    const meta = getPageMeta("/projects");
    expect(meta.title).toContain("ผลงาน");
  });

  it("returns route-specific meta for /assessment", () => {
    const meta = getPageMeta("/assessment");
    expect(meta.title).toContain("ประเมินความคุ้มค่า");
  });

  it("handles blog slug pattern", () => {
    const meta = getPageMeta("/blog/rooftop-solar-roi-2025");
    expect(meta.title).toContain("SIRINX Blog");
    expect(meta.description).toContain("rooftop solar roi 2025");
  });

  it("strips query params and hash", () => {
    const meta = getPageMeta("/contact?ref=line#form");
    expect(meta.title).toContain("ติดต่อเรา");
  });

  it("strips trailing slash", () => {
    const meta = getPageMeta("/solutions/");
    expect(meta.title).toContain("โซลูชันพลังงาน");
  });

  it("returns default for unknown routes", () => {
    const meta = getPageMeta("/unknown-page");
    expect(meta.title).toContain("SIRINX");
    expect(meta.description).toContain("Solar Digital Agentic Company");
  });
});

describe("injectOgTags", () => {
  const sampleHtml = `<!doctype html>
<html lang="th">
  <head>
    <title>SIRINX — พลังงานสะอาด โครงสร้างพื้นฐานอัจฉริยะ เพื่อธุรกิจไทย</title>
    <meta name="description" content="default desc" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="default title" />
    <meta property="og:description" content="default desc" />
    <meta property="og:image" content="default.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="default title" />
    <meta name="twitter:description" content="default desc" />
    <meta name="twitter:image" content="default.png" />
    <link rel="canonical" href="https://example.com/" />
  </head>
  <body></body>
</html>`;

  it("injects route-specific title for /contact", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar.manus.space");
    expect(result).toContain("<title>ติดต่อเรา — นัดสำรวจหน้างานฟรี | SIRINX</title>");
  });

  it("injects og:title for /contact", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar.manus.space");
    expect(result).toContain('og:title" content="ติดต่อเรา');
  });

  it("injects og:description for /contact", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar.manus.space");
    expect(result).toContain('og:description" content="ติดต่อ SIRINX');
  });

  it("injects og:url with full URL", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar.manus.space");
    expect(result).toContain('og:url" content="https://sirinxsolar.manus.space/contact"');
  });

  it("injects og:image with CDN URL", () => {
    const result = injectOgTags(sampleHtml, "/", "https://sirinxsolar.manus.space");
    expect(result).toContain('og:image" content="https://d2xsxph8kpxj0f.cloudfront.net');
  });

  it("injects twitter:title for /solutions", () => {
    const result = injectOgTags(sampleHtml, "/solutions", "https://sirinxsolar.manus.space");
    expect(result).toContain('twitter:title" content="โซลูชันพลังงาน');
  });

  it("injects canonical URL", () => {
    const result = injectOgTags(sampleHtml, "/blog", "https://sirinxsolar.manus.space");
    expect(result).toContain('canonical" href="https://sirinxsolar.manus.space/blog"');
  });

  it("handles homepage URL without trailing slash", () => {
    const result = injectOgTags(sampleHtml, "/", "https://sirinxsolar.manus.space");
    expect(result).toContain('og:url" content="https://sirinxsolar.manus.space"');
  });
});
