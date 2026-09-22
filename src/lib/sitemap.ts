import { DOC_SECTIONS } from "../content/docs";

export type SitemapEntry = {
  loc: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

const STATIC_ROUTES: SitemapEntry[] = [
  { loc: "/", changefreq: "weekly", priority: 1 },
  { loc: "/docs", changefreq: "weekly", priority: 0.95 },
  { loc: "/cli", changefreq: "monthly", priority: 0.9 },
  { loc: "/pricing", changefreq: "monthly", priority: 0.9 },
  { loc: "/talk", changefreq: "monthly", priority: 0.7 },
  { loc: "/coffee", changefreq: "monthly", priority: 0.6 },
];

export function getSitemapEntries(): SitemapEntry[] {
  const docRoutes: SitemapEntry[] = DOC_SECTIONS.flatMap((section) =>
    section.modules.map((module) => ({
      loc: `/docs/${section.id}/${module.slug}`,
      changefreq: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...STATIC_ROUTES, ...docRoutes];
}

export function renderSitemapXml(
  baseUrl = "https://revenant-verify-933e4.web.app"
): string {
  const entries = getSitemapEntries();
  const today = new Date().toISOString().slice(0, 10);

  const urls = entries
    .map((entry) => {
      const loc = `${baseUrl.replace(/\/$/, "")}${entry.loc === "/" ? "/" : entry.loc}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
