import fs from "node:fs";
import path from "node:path";
import {
  PRODUCTION_BASE_URL,
  getPageMeta,
  getStaticSeoRoutes,
  injectOgTags,
  thaiProvinces,
} from "./ogTags";

const distPublic = path.resolve(import.meta.dirname, "..", "dist", "public");
const indexPath = path.join(distPublic, "index.html");
const now = new Date().toISOString();

function writeFile(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

function routeToIndexPath(route: string) {
  if (route === "/") return indexPath;
  return path.join(distPublic, route.replace(/^\//, ""), "index.html");
}

function priorityForRoute(route: string) {
  if (route === "/") return "1.0";
  if (route === "/solar-carport") return "0.95";
  if (route.startsWith("/solar-carport/")) return "0.75";
  if (["/assessment", "/contact", "/pricing", "/projects", "/home-solution"].includes(route)) return "0.85";
  return "0.70";
}

function changefreqForRoute(route: string) {
  if (route === "/" || route === "/solar-carport") return "weekly";
  if (route.startsWith("/solar-carport/")) return "monthly";
  return "monthly";
}

function buildSitemap(routes: string[]) {
  const urls = routes
    .map(route => {
      const loc =
        route === "/"
          ? `${PRODUCTION_BASE_URL}/`
          : `${PRODUCTION_BASE_URL}${route.replace(/\/$/, "")}/`;
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${now}</lastmod>`,
        `    <changefreq>${changefreqForRoute(route)}</changefreq>`,
        `    <priority>${priorityForRoute(route)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "",
    `Sitemap: ${PRODUCTION_BASE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build index: ${indexPath}`);
}

const baseHtml = fs.readFileSync(indexPath, "utf-8");
const routes = Array.from(new Set(getStaticSeoRoutes()));

for (const route of routes) {
  const html = injectOgTags(baseHtml, route, PRODUCTION_BASE_URL);
  writeFile(routeToIndexPath(route), html);
}

writeFile(path.join(distPublic, "sitemap.xml"), buildSitemap(routes));
writeFile(path.join(distPublic, "robots.txt"), buildRobots());

console.log(
  JSON.stringify(
    {
      generatedSeoRoutes: routes.length,
      provinceRoutes: thaiProvinces.length,
      sampleProvinceMeta: getPageMeta("/solar-carport/phitsanulok"),
    },
    null,
    2
  )
);
