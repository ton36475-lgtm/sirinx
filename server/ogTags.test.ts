import { describe, it, expect } from "vitest";
import { getPageMeta, injectOgTags } from "./ogTags";

describe("getPageMeta", () => {
  it("returns Solar Carport-focused meta for homepage", () => {
    const meta = getPageMeta("/");
    expect(meta.title).toContain("Solar Carport");
    expect(meta.title).toContain("ลดค่าไฟ");
    expect(meta.description).toContain("Solar Carport");
    expect(meta.description).toContain("EV Charger");
  });

  it("returns dedicated meta for /solar-carport", () => {
    const meta = getPageMeta("/solar-carport");
    expect(meta.title).toContain("Solar Carport");
    expect(meta.title).toContain("SIRINX");
    expect(meta.description).toContain("ผลิตไฟฟ้า");
    expect(meta.description).toContain("EV Charging");
  });

  it("returns promotional meta for /contact", () => {
    const meta = getPageMeta("/contact");
    expect(meta.title).toContain("นัดสำรวจหน้างานฟรี");
    expect(meta.description).toContain("ปรึกษาฟรี");
    expect(meta.description).toContain("ใบเสนอราคา");
  });

  it("returns keyword-rich meta for /solutions", () => {
    const meta = getPageMeta("/solutions");
    expect(meta.title).toContain("โซลาร์เซลล์");
    expect(meta.title).toContain("Rooftop Solar");
    expect(meta.description).toContain("ลดค่าไฟ");
  });

  it("returns SEO meta for /blog", () => {
    const meta = getPageMeta("/blog");
    expect(meta.title).toContain("โซลาร์เซลล์");
    expect(meta.description).toContain("ROI");
  });

  it("returns promotional meta for /about", () => {
    const meta = getPageMeta("/about");
    expect(meta.title).toContain("SIRINX");
    expect(meta.description).toContain("ลดต้นทุนพลังงาน");
  });

  it("returns industry-focused meta for /industries", () => {
    const meta = getPageMeta("/industries");
    expect(meta.title).toContain("โรงงาน");
    expect(meta.description).toContain("โรงแรม");
  });

  it("returns investment-focused meta for /investment", () => {
    const meta = getPageMeta("/investment");
    expect(meta.title).toContain("คุ้มค่า");
    expect(meta.description).toContain("BOI");
  });

  it("returns project portfolio meta for /projects", () => {
    const meta = getPageMeta("/projects");
    expect(meta.title).toContain("ผลงานติดตั้ง");
    expect(meta.description).toContain("Rooftop Solar");
  });

  it("returns assessment-focused meta for /assessment", () => {
    const meta = getPageMeta("/assessment");
    expect(meta.title).toContain("คำนวณค่าไฟ");
    expect(meta.description).toContain("ROI");
  });

  it("returns strategy meta for /strategy", () => {
    const meta = getPageMeta("/strategy");
    expect(meta.title).toContain("ลดค่าไฟระยะยาว");
  });

  it("handles blog slug pattern with SEO copy", () => {
    const meta = getPageMeta("/blog/rooftop-solar-roi-2025");
    expect(meta.title).toContain("โซลาร์เซลล์ SIRINX");
    expect(meta.description).toContain("rooftop solar roi 2025");
  });

  it("strips query params and hash", () => {
    const meta = getPageMeta("/contact?ref=line#form");
    expect(meta.title).toContain("นัดสำรวจหน้างานฟรี");
  });

  it("strips trailing slash", () => {
    const meta = getPageMeta("/solutions/");
    expect(meta.title).toContain("โซลาร์เซลล์");
  });

  it("returns default Solar Carport meta for unknown routes", () => {
    const meta = getPageMeta("/unknown-page");
    expect(meta.title).toContain("Solar Carport");
    expect(meta.description).toContain("Solar Carport");
  });
});

describe("injectOgTags", () => {
  const sampleHtml = `<!doctype html>
<html lang="th">
  <head>
    <title>SIRINX | ติดตั้งโซลาร์เซลล์ ลดค่าไฟ 30-100% คืนทุน 3-5 ปี — Solar, BESS, AI Energy</title>
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

  it("injects promotional title for /contact", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain("<title>นัดสำรวจหน้างานฟรี");
  });

  it("injects og:title with SEO keywords for /contact", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('og:title" content="นัดสำรวจหน้างานฟรี');
  });

  it("injects og:description with promotional copy for /contact", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('og:description" content="ปรึกษาฟรี');
  });

  it("injects og:url with full URL", () => {
    const result = injectOgTags(sampleHtml, "/contact", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('og:url" content="https://sirinxsolar-dfabnh7l.manus.space/contact"');
  });

  it("injects og:image with CDN URL", () => {
    const result = injectOgTags(sampleHtml, "/", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('og:image" content="https://d2xsxph8kpxj0f.cloudfront.net');
  });

  it("injects twitter:title for /solutions", () => {
    const result = injectOgTags(sampleHtml, "/solutions", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('twitter:title" content="โซลูชันโซลาร์เซลล์ครบวงจร');
  });

  it("injects canonical URL", () => {
    const result = injectOgTags(sampleHtml, "/blog", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('canonical" href="https://sirinxsolar-dfabnh7l.manus.space/blog"');
  });

  it("handles homepage URL without trailing slash", () => {
    const result = injectOgTags(sampleHtml, "/", "https://sirinxsolar-dfabnh7l.manus.space");
    expect(result).toContain('og:url" content="https://sirinxsolar-dfabnh7l.manus.space"');
  });
});
