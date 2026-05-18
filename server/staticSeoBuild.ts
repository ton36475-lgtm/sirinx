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
const distAssets = path.join(distPublic, "assets");
const indexPath = path.join(distPublic, "index.html");
const now = new Date().toISOString();
let initialRuntimeAssets = new Set<string>();

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

const routeChunkPrefixes = new Map<string, string[]>([
  ["/", ["Home-"]],
  ["/about", ["About-"]],
  ["/assessment", ["SolarAssessment-"]],
  ["/blog", ["Blog-"]],
  ["/contact", ["Contact-"]],
  ["/cookies", ["Cookies-"]],
  ["/home-solution", ["HomeSolution-"]],
  ["/industries", ["Industries-"]],
  ["/investment", ["InvestmentTaxHub-"]],
  ["/partner", ["Partner-"]],
  ["/pricing", ["Pricing-"]],
  ["/privacy", ["Privacy-"]],
  ["/projects", ["Projects-"]],
  ["/solar-carport", ["SolarCarport-"]],
  ["/solutions", ["Solutions-"]],
  ["/strategy", ["Strategy-"]],
  ["/terms", ["Terms-"]],
]);

function getRouteChunkPrefixes(route: string) {
  if (route.startsWith("/solar-carport/")) return routeChunkPrefixes.get("/solar-carport") ?? [];
  if (route.startsWith("/blog/")) return ["BlogPost-"];
  return routeChunkPrefixes.get(route) ?? [];
}

function findBuiltAsset(prefix: string) {
  if (!fs.existsSync(distAssets)) return null;

  const match = fs
    .readdirSync(distAssets)
    .find((fileName) => fileName.startsWith(prefix) && fileName.endsWith(".js"));

  return match ?? null;
}

function collectStaticImports(fileName: string, visited = new Set<string>()) {
  if (initialRuntimeAssets.has(fileName)) return [];
  if (visited.has(fileName)) return [];
  visited.add(fileName);

  const filePath = path.join(distAssets, fileName);
  if (!fs.existsSync(filePath)) return [fileName];

  const source = fs.readFileSync(filePath, "utf-8");
  const imports = new Set<string>();
  const patterns = [
    /from"\.\/([^"]+\.js)"/g,
    /import\("\.\/([^"]+\.js)"\)/g,
  ];

  for (const pattern of patterns) {
    for (const match of Array.from(source.matchAll(pattern))) {
      imports.add(match[1]);
    }
  }

  const collected = [fileName];
  for (const importedFile of Array.from(imports)) {
    if (initialRuntimeAssets.has(importedFile)) continue;
    collected.push(...collectStaticImports(importedFile, visited));
  }

  return collected;
}

function getInitialRuntimeAssets(html: string) {
  const assets = new Set<string>();
  const patterns = [
    /<script[^>]+src="\/assets\/([^"]+\.js)"/g,
    /<link[^>]+rel="modulepreload"[^>]+href="\/assets\/([^"]+\.js)"/g,
  ];

  for (const pattern of patterns) {
    for (const match of Array.from(html.matchAll(pattern))) {
      assets.add(match[1]);
    }
  }

  return assets;
}

function injectRouteModulePreloads(html: string, route: string) {
  const seedFiles = getRouteChunkPrefixes(route)
    .map(findBuiltAsset)
    .filter((fileName): fileName is string => Boolean(fileName));

  if (seedFiles.length === 0) return html;

  const files = Array.from(
    new Set(seedFiles.flatMap((fileName) => collectStaticImports(fileName)))
  ).filter((fileName) => !html.includes(`/assets/${fileName}`));

  if (files.length === 0) return html;

  const tags = files
    .map((fileName) => `    <link rel="modulepreload" crossorigin href="/assets/${fileName}">`)
    .join("\n");

  return html.replace("</head>", `${tags}\n  </head>`);
}

if (!fs.existsSync(indexPath)) {
  throw new Error(`Missing build index: ${indexPath}`);
}

const baseHtml = fs.readFileSync(indexPath, "utf-8");
initialRuntimeAssets = getInitialRuntimeAssets(baseHtml);
const routes = Array.from(new Set(getStaticSeoRoutes()));

for (const route of routes) {
  const html = injectRouteModulePreloads(
    injectOgTags(baseHtml, route, PRODUCTION_BASE_URL),
    route
  );
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
