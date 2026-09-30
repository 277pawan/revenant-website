/**
 * Build-time SEO — no import.meta.env (safe to load from vite.config closeBundle).
 */
import { DOC_SECTIONS } from "../content/docs";
import type { DocBlock } from "../content/docs/types";

export type SeoBuildPage = {
  path: string;
  title: string;
  description: string;
  bodyHtml: string;
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
  bodyHtml: string;
  robots?: string;
}): SeoBuildPage {
  return {
    path: input.path,
    title: pageTitle(input.title),
    description: input.description,
    bodyHtml: input.bodyHtml,
    robots: input.robots ?? "index,follow,max-image-preview:large",
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderDocBlock(block: DocBlock): string {
  switch (block.type) {
    case "paragraph":
      return `<p>${escapeHtml(block.text)}</p>`;
    case "heading":
      return `<h${block.level}>${escapeHtml(block.text)}</h${block.level}>`;
    case "code":
      return `<pre><code>${escapeHtml(block.code)}</code></pre>`;
    case "list":
      return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    case "callout":
      return `<aside><p>${escapeHtml(block.text)}</p></aside>`;
  }
}

function renderDocsIndex(): string {
  return `<main><h1>Revenant documentation</h1><p>Guides for proving database recovery with the Revenant CLI, AWS RDS restore drills, evidence, and Revenant Cloud.</p>${DOC_SECTIONS.map(
    (section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.description)}</p><ul>${section.modules
      .map(
        (module) =>
          `<li><a href="/docs/${escapeHtml(section.id)}/${escapeHtml(module.slug)}">${escapeHtml(module.title)}</a><p>${escapeHtml(module.summary)}</p></li>`
      )
      .join("")}</ul></section>`
  ).join("")}</main>`;
}

function renderStaticPage(path: string, description: string): string {
  const copy: Record<string, { heading: string; sections: string[] }> = {
    "/": {
      heading: "Prove your backups actually recover",
      sections: [
        "Revenant restores a real database snapshot into an isolated sandbox, runs your validation checks, measures recovery time, and records evidence.",
        "Use the free CLI in your terminal or CI, or use Revenant Cloud for scheduled AWS RDS drills, workflow history, alerts, and an evidence vault.",
      ],
    },
    "/pricing": {
      heading: "Revenant pricing",
      sections: [
        "The Revenant CLI is free. Revenant Cloud offers a Starter trial for one production workflow and Pro for teams that need multiple workflows, parallel drills, and integrations.",
        "Choose the CLI for local and CI restore validation, Starter for managed scheduled drills, or Pro for fleet-level recovery readiness.",
      ],
    },
    "/cli": {
      heading: "Revenant CLI",
      sections: [
        "Run database recovery checks from your terminal or GitHub Actions. Revenant supports PostgreSQL and AWS RDS restore validation without requiring an application-language integration.",
        "Use doctor to check setup, init to scaffold a validation plan, verify to run checks, snapshot to create an RDS recovery point, and reap to clean up orphaned sandboxes.",
      ],
    },
    "/talk": {
      heading: "Talk to the Revenant team",
      sections: [
        "Contact Revenant about PostgreSQL disaster recovery, AWS RDS restore drills, enterprise pilots, or partnerships.",
        "Share your database environment and recovery goals so we can discuss a practical restore-validation path.",
      ],
    },
    "/coffee": {
      heading: "Support Revenant",
      sections: [
        "Revenant is open-source disaster recovery tooling. Contributions help sustain the CLI, documentation, and restore-validation work.",
        "Support the project with a one-time contribution, or use the free CLI and share feedback with the maintainers.",
      ],
    },
  };
  const pageCopy = copy[path] ?? { heading: "Revenant", sections: [description] };
  return `<main><article><h1>${escapeHtml(pageCopy.heading)}</h1><p>${escapeHtml(description)}</p>${pageCopy.sections
    .map((section) => `<p>${escapeHtml(section)}</p>`)
    .join("")}<nav aria-label="Revenant pages"><ul><li><a href="/docs">Documentation</a></li><li><a href="/cli">CLI</a></li><li><a href="/pricing">Pricing</a></li></ul></nav></article></main>`;
}

const STATIC_PAGES: SeoBuildPage[] = [
  page({
    path: "/",
    title: SITE,
    description:
      "Disaster recovery proof for PostgreSQL. Free CLI, managed AWS restore drills, signed evidence vault.",
    bodyHtml: renderStaticPage(
      "/",
      "Disaster recovery proof for PostgreSQL. Free CLI, managed AWS restore drills, signed evidence vault."
    ),
  }),
  page({
    path: "/pricing",
    title: "Pricing",
    description:
      "Simple INR pricing for Revenant Cloud. Free CLI forever. Starter trial, Pro restore drills, and Enterprise options for PostgreSQL disaster recovery.",
    bodyHtml: renderStaticPage(
      "/pricing",
      "Simple INR pricing for Revenant Cloud. Free CLI forever. Starter trial, Pro restore drills, and Enterprise options for PostgreSQL disaster recovery."
    ),
  }),
  page({
    path: "/cli",
    title: "revenant CLI",
    description:
      "Free PostgreSQL CLI for disaster recovery proof. Run revenant doctor, init, verify, snapshot, and reap — locally or in GitHub Actions with signed evidence exports.",
    bodyHtml: renderStaticPage(
      "/cli",
      "Free PostgreSQL CLI for disaster recovery proof. Run revenant doctor, init, verify, snapshot, and reap — locally or in GitHub Actions with signed evidence exports."
    ),
  }),
  page({
    path: "/talk",
    title: "Talk to us",
    description:
      "Contact the Revenant team about PostgreSQL disaster recovery, restore drills, enterprise pilots, and partnerships.",
    bodyHtml: renderStaticPage(
      "/talk",
      "Contact the Revenant team about PostgreSQL disaster recovery, restore drills, enterprise pilots, and partnerships."
    ),
  }),
  page({
    path: "/coffee",
    title: "Buy us a coffee",
    description:
      "Support Revenant open-source disaster recovery tooling. One-time Razorpay payments — card, UPI, or netbanking.",
    bodyHtml: renderStaticPage(
      "/coffee",
      "Support Revenant open-source disaster recovery tooling. One-time Razorpay payments — card, UPI, or netbanking."
    ),
  }),
  page({
    path: "/docs",
    title: "Documentation",
    description:
      "Revenant documentation: quickstart, CLI commands, AWS RDS restore drills, evidence exports, Slack and email alerts, and cloud schedules.",
    bodyHtml: renderDocsIndex(),
  }),
];

export function getSeoBuildPages(): SeoBuildPage[] {
  const docPages = DOC_SECTIONS.flatMap((section) =>
    section.modules.map((module) =>
      page({
        path: `/docs/${section.id}/${module.slug}`,
        title: module.title,
        description: module.summary,
        bodyHtml: `<main><article><nav aria-label="Breadcrumb"><a href="/docs">Documentation</a> / ${escapeHtml(section.title)}</nav><h1>${escapeHtml(module.title)}</h1><p>${escapeHtml(module.summary)}</p>${module.blocks
          .map(renderDocBlock)
          .join("")}</article></main>`,
      })
    )
  );
  return [...STATIC_PAGES, ...docPages];
}
