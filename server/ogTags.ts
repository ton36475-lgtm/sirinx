/**
 * Server-side Open Graph tag injection for social media crawlers.
 * LINE, Facebook, Messenger, Twitter crawlers don't execute JavaScript,
 * so we need to inject route-specific OG tags into the HTML before serving.
 *
 * Content strategy: SEO/AEO-focused promotional copy with high-value keywords.
 */

const OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663541525436/DfaBNh7LYBahFVi2JKfAUv/sirinx-og-image-hbNko5JADXArPGo26hmGrN.png";

const SITE_NAME = "SIRINX";
const DEFAULT_TITLE =
  "SIRINX | Solar Carport วางแผนลดค่าไฟองค์กร พร้อม EV Charger, BESS & AI Energy";
const DEFAULT_DESC =
  "SIRINX Solar Carport ผลิตไฟฟ้าจากที่จอดรถ รองรับ EV Charger + BESS + AI Energy พร้อมประเมินผลประหยัดและคืนทุนจากข้อมูลไซต์จริง";

// Route-specific metadata map — SEO/AEO promotional copy
interface PageMeta {
  title: string;
  description: string;
  image?: string;
}

const routeMetaMap: Record<string, PageMeta> = {
  "/": {
    title:
      "SIRINX | Solar Carport วางแผนลดค่าไฟองค์กร พร้อม EV Charger, BESS & AI Energy",
    description:
      "SIRINX Solar Carport ผลิตไฟฟ้าจากที่จอดรถ รองรับ EV Charger + BESS + AI Energy พร้อมประเมินผลประหยัดและคืนทุนจากข้อมูลไซต์จริง",
  },
  "/solar-carport": {
    title:
      "Solar Carport โดย SIRINX | เปลี่ยนที่จอดรถเป็นโรงไฟฟ้า ผลิตไฟฟ้า+ร่มเงา+EV Charger",
    description:
      "Solar Carport ผลิตไฟฟ้าจากที่จอดรถ ให้ร่มเงา รองรับ EV Charging + BESS + AI Energy และประเมินความคุ้มค่าตามข้อมูลไซต์จริง",
  },
  "/about": {
    title: "SIRINX คือใคร? บริษัทติดตั้งโซลาร์เซลล์ + AI Energy ครบวงจรของไทย",
    description:
      "SIRINX ผู้เชี่ยวชาญโซลาร์เซลล์ครบวงจร ออกแบบ ติดตั้ง ดูแลระบบด้วย AI ตลอด 25 ปี ช่วยธุรกิจไทยลดต้นทุนพลังงานด้วยเทคโนโลยีสะอาด",
  },
  "/solutions": {
    title:
      "โซลูชันโซลาร์เซลล์ครบวงจร | Rooftop Solar, Floating Solar, BESS, AI Energy",
    description:
      "เลือกโซลูชันที่เหมาะกับธุรกิจคุณ — โซลาร์หลังคา, โซลาร์ลอยน้ำ, Solar Carport, แบตเตอรี่กักเก็บพลังงาน BESS และ AI วิเคราะห์การใช้ไฟฟ้าแบบ Real-time ลดค่าไฟทันที",
  },
  "/industries": {
    title: "โซลาร์เซลล์สำหรับโรงงาน โรงแรม เกษตร ภาครัฐ | ลดค่าไฟเฉพาะทาง",
    description:
      "โซลูชันโซลาร์เซลล์เฉพาะอุตสาหกรรม — โรงงาน โรงแรม เกษตร สถานศึกษา อาคารพาณิชย์ ภาครัฐ ออกแบบระบบตามรูปแบบการใช้ไฟจริง ลดค่าไฟทันที",
  },
  "/investment": {
    title:
      "ลงทุนโซลาร์เซลล์ คุ้มค่าแค่ไหน? ROI, สิทธิ์ BOI, ค่าเสื่อมเร่ง | SIRINX",
    description:
      "วิเคราะห์ความคุ้มค่าลงทุนโซลาร์เซลล์ — ซื้อขาด PPA Leasing พร้อมตรวจสิทธิ BOI ภาษี ค่าเสื่อม และสมมติฐานคืนทุนตามเงื่อนไขล่าสุด",
  },
  "/projects": {
    title: "ผลงานติดตั้ง Solar Carport & โซลาร์เซลล์จริง | ภาพโครงการ | SIRINX",
    description:
      "ผลงานจริง SIRINX — Solar Carport, Rooftop Solar, Floating Solar, Solar Farm พร้อมภาพถ่ายจริงจากหน้างานและตัวเลขผลประหยัดค่าไฟ",
  },
  "/strategy": {
    title: "วางแผนลดค่าไฟระยะยาว | กลยุทธ์ Solar + BESS + AI Energy | SIRINX",
    description:
      "วางกลยุทธ์พลังงานสะอาดสำหรับธุรกิจ — เริ่มจาก Solar Rooftop ต่อยอดด้วย BESS กักเก็บพลังงาน และ AI Energy Management ลดค่าไฟได้ทุกปีตลอด 25 ปี",
  },
  "/blog": {
    title:
      "บทความโซลาร์เซลล์ & พลังงานสะอาด | ความรู้ ROI, BESS, AI Energy | SIRINX",
    description:
      "อัพเดตความรู้พลังงานสะอาดล่าสุด — วิเคราะห์ ROI โซลาร์เซลล์, เทคโนโลยี BESS แบตเตอรี่, AI Energy Management, แนวโน้มราคาแผงโซลาร์ และสิทธิประโยชน์ทางภาษี",
  },
  "/contact": {
    title: "นัดสำรวจหน้างานฟรี | ขอใบเสนอราคาโซลาร์เซลล์ | SIRINX",
    description:
      "ปรึกษาฟรี! นัดทีมวิศวกร SIRINX สำรวจหน้างาน ประเมินค่าไฟ ออกแบบระบบโซลาร์เซลล์เฉพาะอาคารของคุณ พร้อมใบเสนอราคาภายใน 3 วัน โทร, LINE หรือกรอกแบบฟอร์ม",
  },
  "/assessment": {
    title:
      "คำนวณค่าไฟที่ประหยัดได้ | ประเมินความคุ้มค่าโซลาร์เซลล์ฟรี | SIRINX",
    description:
      "กรอกข้อมูลค่าไฟรายเดือนเพื่อรับผลประเมินเบื้องต้น — คำนวณสมมติฐาน ROI ระยะเวลาคืนทุน และขนาดระบบ Solar ที่เหมาะกับธุรกิจคุณ",
  },
  "/pricing": {
    title:
      "แพ็คเกจราคา Solar Carport | Start / Pro / Enterprise พร้อม EV Charger | SIRINX",
    description:
      "เปรียบเทียบแพ็คเกจ Solar Carport 3 ระดับ Start / Pro / Enterprise (10-500+ kWp) — ผลิตไฟฟ้า ให้ร่มเงา รองรับ EV Charger และประเมินคืนทุนตามไซต์จริง",
  },
};

/**
 * Get metadata for a given URL path.
 * Supports exact matches and blog slug patterns.
 */
export function getPageMeta(urlPath: string): PageMeta {
  // Clean the path
  const cleanPath =
    urlPath.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";

  // Check exact match first
  if (routeMetaMap[cleanPath]) {
    return routeMetaMap[cleanPath];
  }

  // Blog post pattern: /blog/:slug
  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace("/blog/", "");
    const readableSlug = slug.replace(/-/g, " ");
    return {
      title: `${readableSlug.replace(/\b\w/g, c => c.toUpperCase())} | บทความโซลาร์เซลล์ SIRINX`,
      description: `อ่านบทความ "${readableSlug}" — ความรู้เชิงลึกเกี่ยวกับโซลาร์เซลล์ พลังงานสะอาด BESS และ AI Energy Management จากทีมวิศวกร SIRINX`,
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
export function injectOgTags(
  html: string,
  urlPath: string,
  baseUrl: string
): string {
  const meta = getPageMeta(urlPath);
  const image = meta.image || OG_IMAGE;
  const fullUrl = `${baseUrl}${urlPath === "/" ? "" : urlPath}`;

  // Replace title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

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
