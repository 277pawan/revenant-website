/**
 * Build-time SEO — no import.meta.env (safe to load from vite.config closeBundle).
 */
import { DOC_SECTIONS } from "../content/docs";

export type SeoBuildPage = {
  path: string;
  title: string;
  description: string;
  robots?: string;
};

const SITE = "Revenant";

function pageTitle(short: string): string {
  const t = short.trim();
  if (!t || t.toLowerCase() === SITE.toLowerCase()) {
    return `${SITE} — Prove your backups actually recover`;
  }
  return `${t} — ${SITE}`;
}

function page(input: {
  path: string;
  title: string;
  description: string;
  robots?: string;
}): SeoBuildPage {
  return {
    path: input.path,
    title: pageTitle(input.title),
    description: input.description,
    robots: input.robots ?? "index,follow,max-image-preview:large",
  };
}

const STATIC_PAGES: SeoBuildPage[] = [
  page({
    path: "/",
    title: SITE,
    description:
      "Disaster recovery proof for PostgreSQL. Free CLI, managed AWS restore drills, signed evidence vault.",
  }),
  page({
    path: "/pricing",
    title: "Pricing",
    description:
      "Simple INR pricing for Revenant Cloud. Free CLI forever. Starter trial, Pro restore drills, and Enterprise options for PostgreSQL disaster recovery.",
  }),
  page({
    path: "/cli",
    title: "revenant CLI",
    description:
      "Free PostgreSQL CLI for disaster recovery proof. Run revenant doctor, init, verify, snapshot, and reap — locally or in GitHub Actions with signed evidence exports.",
  }),
  page({
    path: "/talk",
    title: "Talk to us",
    description:
      "Contact the Revenant team about PostgreSQL disaster recovery, restore drills, enterprise pilots, and partnerships.",
  }),
  page({
    path: "/coffee",
    title: "Buy us a coffee",
    description:
      "Support Revenant open-source disaster recovery tooling. One-time Razorpay payments — card, UPI, or netbanking.",
  }),
  page({
    path: "/docs",
    title: "Documentation",
    description:
      "Revenant documentation: quickstart, CLI commands, AWS RDS restore drills, evidence exports, Slack and email alerts, and cloud schedules.",
  }),
];

export function getSeoBuildPages(): SeoBuildPage[] {
  const docPages = DOC_SECTIONS.flatMap((section) =>
    section.modules.map((module) =>
      page({
        path: `/docs/${section.id}/${module.slug}`,
        title: module.title,
        description: module.summary,
      })
    )
  );
  return [...STATIC_PAGES, ...docPages];
}
