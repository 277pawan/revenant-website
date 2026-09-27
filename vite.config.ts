import fs, { writeFileSync } from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { renderSitemapXml } from "./src/lib/sitemap";
import type { SeoBuildPage } from "./src/lib/seo-build";

function escapeHtmlAttr(value: string): string {
  return value.replace(/"/g, "&quot;");
}

function replaceNamed(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string
): string {
  const pattern = new RegExp(
    `(${attribute}="${key}"[\\s\\S]*?content=")[^"]*(")`,
    "i"
  );
  return html.replace(pattern, `$1${escapeHtmlAttr(content)}$2`);
}

function applyPageSeo(html: string, page: SeoBuildPage, siteUrl: string): string {
  const url = `${siteUrl}${page.path === "/" ? "/" : page.path}`;
  let next = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtmlAttr(page.title)}</title>`
  );
  next = next.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${url}$2`
  );
  next = replaceNamed(next, "name", "description", page.description);
  next = replaceNamed(next, "name", "robots", page.robots ?? "index,follow");
  next = replaceNamed(next, "property", "og:title", page.title);
  next = replaceNamed(next, "property", "og:description", page.description);
  next = replaceNamed(next, "property", "og:url", url);
  next = replaceNamed(next, "name", "twitter:title", page.title);
  next = replaceNamed(next, "name", "twitter:description", page.description);
  return next;
}

/** Pre-render per-route index.html with correct meta (same pattern as react-form-toaster). */
function seoHtmlShells(siteUrl: string): Plugin {
  return {
    name: "revenant-seo-html-shells",
    apply: "build",
    async closeBundle() {
      const dist = path.resolve(import.meta.dirname, "dist");
      const indexPath = path.join(dist, "index.html");
      if (!fs.existsSync(indexPath)) return;

      const { getSeoBuildPages } = await import("./src/lib/seo-build.ts");
      const indexHtml = fs.readFileSync(indexPath, "utf8");
      const pages = getSeoBuildPages();

      for (const page of pages) {
        const html = applyPageSeo(indexHtml, page, siteUrl);
        if (page.path === "/") {
          fs.writeFileSync(indexPath, html);
          continue;
        }
        const outDir = path.join(dist, page.path.replace(/^\//, ""));
        fs.mkdirSync(outDir, { recursive: true });
        fs.writeFileSync(path.join(outDir, "index.html"), html);
      }

      writeFileSync(path.join(dist, "sitemap.xml"), renderSitemapXml(siteUrl));
    },
  };
}

function sitemapPlugin(siteUrl: string): Plugin {
  return {
    name: "revenant-sitemap",
    buildStart() {
      writeFileSync("public/sitemap.xml", renderSitemapXml(siteUrl));
    },
  };
}

export default defineConfig(() => {
  const siteUrl =
    process.env.VITE_SITE_URL?.trim().replace(/\/$/, "") ||
    "https://revenant-verify-933e4.web.app";

  return {
    plugins: [react(), sitemapPlugin(siteUrl), seoHtmlShells(siteUrl)],
    server: { port: 3000 },
  };
});
