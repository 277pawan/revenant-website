import { writeFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { renderSitemapXml } from "./src/lib/sitemap";

function sitemapPlugin(): Plugin {
  return {
    name: "revenant-sitemap",
    buildStart() {
      const baseUrl =
        process.env.VITE_SITE_URL?.trim().replace(/\/$/, "") ||
        "https://revenant-verify-933e4.web.app";
      writeFileSync("public/sitemap.xml", renderSitemapXml(baseUrl));
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: { port: 3000 },
});
