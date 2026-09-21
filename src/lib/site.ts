import { DEVELOPMENT_URLS, PRODUCTION_URLS } from "./env.defaults";

const defaults = import.meta.env.PROD ? PRODUCTION_URLS : DEVELOPMENT_URLS;

const API_URL =
  import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "") || defaults.apiUrl;
const APP_URL =
  import.meta.env.VITE_APP_URL?.trim().replace(/\/$/, "") || defaults.appUrl;
const SITE_URL =
  import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, "") || defaults.siteUrl;

export const site = {
  name: "Revenant",
  tagline: "Prove your backups actually recover",
  description:
    "Disaster recovery proof for PostgreSQL. Free CLI, managed AWS restore drills, signed evidence vault.",
  url: SITE_URL,
  appUrl: APP_URL,
  apiUrl: API_URL,
  githubCli: "https://github.com/277pawan/revenant-cli",
  githubAction: "https://github.com/277pawan/revenant-action",
  founder: {
    name: "Pawan",
    email: "bpawan277@gmail.com",
    phone: "9068509220",
    phoneDisplay: "+91 90685 09220",
    linkedin:
      "https://www.linkedin.com/company/revenant-verify/?viewAsMember=true",
  },
} as const;

export function appLink(path = ""): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site.appUrl}${p}`;
}
