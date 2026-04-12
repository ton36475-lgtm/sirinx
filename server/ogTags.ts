/**
 * Server-side Open Graph tag injection for social media crawlers.
 * LINE, Facebook, Messenger, Twitter crawlers don't execute JavaScript,
 * so we need to inject route-specific OG tags into the HTML before serving.
 */

const OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-og-image-hbNko5JADXArPGo26hmGrN.png";

const SITE_NAME = "SIRINX";
const DEFAULT_TITLE = "SIRINX — พลังงานสะอาด โครงสร้างพื้นฐานอัจฉริยะ เพื่อธุรกิจไทย";
const DEFAULT_DESC = "Solar Digital Agentic Company — ออกแบบ ติดตั้ง บริหารระบบพลังงานครบวงจร Solar, BESS, AI Energy Management ลดค่าไฟ 30-100% คืนทุน 3-5 ปี อายุใช้งาน 25+ ปี";

// Route-specific metadata map
interface PageMeta {
  title: string;
  description: string;
  image?: string;
}

const routeMetaMap: Record<string, PageMeta> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  },
  "/about": {
    title: "เกี่ยวกับเรา — SIRINX Solar Digital Agentic Company",
    description: "รู้จัก SIRINX บริษัทพลังงานสะอาดที่ผสาน AI และเทคโนโลยีดิจิทัล เพื่อสร้างโครงสร้างพื้นฐานพลังงานอัจฉริยะสำหรับธุรกิจไทย",
  },
  "/solutions": {
    title: "โซลูชันพลังงาน — Rooftop Solar, Floating Solar, BESS, AI Energy | SIRINX",
    description: "โซลูชันพลังงานครบวงจร Rooftop Solar, Floating Solar, Solar Carport, BESS, AI Energy Management และ Physical AI O&M สำหรับทุกอุตสาหกรรม",
  },
  "/industries": {
    title: "โซลูชันเฉพาะอุตสาหกรรม — โรงงาน, โรงแรม, เกษตร, ภาครัฐ | SIRINX",
    description: "โซลูชันพลังงานสะอาดออกแบบเฉพาะทาง สำหรับโรงงาน เกษตรกรรม โรงแรม สถานศึกษา อาคารพาณิชย์ และภาครัฐ",
  },
  "/investment": {
    title: "การลงทุน & สิทธิประโยชน์ทางภาษี — Solar Investment | SIRINX",
    description: "รูปแบบการลงทุน Solar ที่หลากหลาย ตั้งแต่ซื้อขาด PPA ไปจนถึง Leasing พร้อมสิทธิประโยชน์ทางภาษี BOI และค่าเสื่อมราคาเร่ง",
  },
  "/projects": {
    title: "ผลงานของเรา — โครงการ Solar ที่ติดตั้งจริง | SIRINX",
    description: "รวมผลงานโครงการ Solar ที่ SIRINX ออกแบบและติดตั้ง ทั้ง Rooftop Solar, Floating Solar และ Solar Farm พร้อมภาพจริงจากหน้างาน",
  },
  "/strategy": {
    title: "กลยุทธ์พลังงาน — Energy Strategy & Roadmap | SIRINX",
    description: "กลยุทธ์การเปลี่ยนผ่านพลังงานสำหรับธุรกิจ วางแผนลดต้นทุนพลังงานระยะยาวด้วย Solar, BESS และ AI Energy Management",
  },
  "/blog": {
    title: "บทความ — ความรู้พลังงานสะอาด Solar & BESS | SIRINX",
    description: "บทความและความรู้เกี่ยวกับพลังงานสะอาด Solar, BESS, AI Energy Management แนวโน้มตลาด และเทคโนโลยีล่าสุด",
  },
  "/contact": {
    title: "ติดต่อเรา — นัดสำรวจหน้างานฟรี | SIRINX",
    description: "ติดต่อ SIRINX เพื่อนัดสำรวจหน้างานฟรี ขอใบเสนอราคา หรือปรึกษาเรื่องพลังงานสะอาด โทร, LINE, หรือกรอกแบบฟอร์ม",
  },
  "/assessment": {
    title: "ประเมินความคุ้มค่า Solar — Solar Assessment | SIRINX",
    description: "ประเมินความคุ้มค่าการติดตั้ง Solar สำหรับธุรกิจของคุณ คำนวณ ROI ระยะเวลาคืนทุน และค่าไฟที่ประหยัดได้",
  },
};

/**
 * Get metadata for a given URL path.
 * Supports exact matches and blog slug patterns.
 */
export function getPageMeta(urlPath: string): PageMeta {
  // Clean the path
  const cleanPath = urlPath.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";

  // Check exact match first
  if (routeMetaMap[cleanPath]) {
    return routeMetaMap[cleanPath];
  }

  // Blog post pattern: /blog/:slug
  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace("/blog/", "");
    return {
      title: `${slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} | SIRINX Blog`,
      description: `อ่านบทความเกี่ยวกับ ${slug.replace(/-/g, " ")} จาก SIRINX — ความรู้พลังงานสะอาด Solar, BESS และ AI Energy Management`,
    };
  }

  // Default fallback
  return {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
  };
}

/**
 * Inject OG meta tags into HTML template based on the requested URL.
 * Replaces existing meta tags in the template with route-specific values.
 */
export function injectOgTags(html: string, urlPath: string, baseUrl: string): string {
  const meta = getPageMeta(urlPath);
  const image = meta.image || OG_IMAGE;
  const fullUrl = `${baseUrl}${urlPath === "/" ? "" : urlPath}`;

  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${meta.title}</title>`
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${image}" />`
  );

  // Add og:url if not present, or replace
  if (html.includes('property="og:url"')) {
    html = html.replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${fullUrl}" />`
    );
  } else {
    html = html.replace(
      /<meta property="og:type"/,
      `<meta property="og:url" content="${fullUrl}" />\n    <meta property="og:type"`
    );
  }

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${image}" />`
  );

  // Replace canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${fullUrl}" />`
  );

  return html;
}
