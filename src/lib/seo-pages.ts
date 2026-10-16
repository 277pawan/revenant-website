import {
  faqPageJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
  type PageMetaInput,
} from "./seo";

export const homeSeo: PageMetaInput = {
  title: "PostgreSQL Backup Recovery Testing",
  description:
    "Test PostgreSQL and Redis backup recovery with real restore drills, recovered-data validation, measured recovery time, and signed evidence. Free CLI and managed cloud plans.",
  path: "/",
  keywords: [
    "PostgreSQL backup verification",
    "disaster recovery",
    "restore drill",
    "RDS restore test",
    "backup recovery proof",
    "RTO",
    "evidence vault",
    "GitHub Actions DR",
    "Redis backup restore testing",
  ],
  jsonLd: [
    organizationJsonLd(),
    websiteJsonLd(),
    softwareApplicationJsonLd(),
    faqPageJsonLd([
      {
        question: "What is Revenant?",
        answer:
          "Revenant proves PostgreSQL and Redis backups actually restore by running isolated restore drills and capturing evidence with real recovery measurements.",
      },
      {
        question: "Do I need Revenant Cloud to use the CLI?",
        answer:
          "No. The revenant CLI is free and runs locally or in CI. Revenant Cloud adds schedules, team alerts, and a managed evidence vault.",
      },
      {
        question: "Does Revenant work with AWS RDS?",
        answer:
          "Yes. Revenant can snapshot RDS instances, restore to an isolated sandbox, run checks, and reap temporary resources automatically.",
      },
    ]),
  ],
};

export const pricingSeo: PageMetaInput = {
  title: "Pricing",
  description:
    "Simple INR pricing for Revenant Cloud. Free CLI forever, managed PostgreSQL drills, and separate Redis restore proofs with opt-in, time-limited snapshot storage.",
  path: "/pricing",
  keywords: [
    "PostgreSQL DR pricing",
    "backup verification pricing",
    "restore drill SaaS",
    "disaster recovery plans",
    "Revenant Cloud pricing",
    "Redis restore proof pricing",
  ],
};

export const cliSeo: PageMetaInput = {
  title: "revenant CLI",
  description:
    "Free PostgreSQL CLI for disaster recovery proof. Run revenant doctor, init, verify, snapshot, and reap — locally or in GitHub Actions with signed evidence exports.",
  path: "/cli",
  keywords: [
    "revenant CLI",
    "PostgreSQL CLI",
    "backup verify",
    "revenant verify",
    "RDS snapshot",
    "restore drill CLI",
    "open source DR",
  ],
  jsonLd: softwareApplicationJsonLd(),
};

export const talkSeo: PageMetaInput = {
  title: "Talk to us",
  description:
    "Contact the Revenant team about PostgreSQL disaster recovery, restore drills, enterprise pilots, and partnerships.",
  path: "/talk",
  keywords: [
    "contact Revenant",
    "PostgreSQL DR consulting",
    "restore drill demo",
    "enterprise disaster recovery",
  ],
};

export const coffeeSeo: PageMetaInput = {
  title: "Buy us a coffee",
  description:
    "Support Revenant open-source disaster recovery tooling. One-time Razorpay payments — card, UPI, or netbanking.",
  path: "/coffee",
  keywords: ["support Revenant", "open source funding", "PostgreSQL DR tools"],
};

export const docsIndexSeo: PageMetaInput = {
  title: "Documentation",
  description:
    "Revenant documentation: PostgreSQL and Redis restore proofs, CLI commands, AWS RDS drills, evidence exports, alerts, and cloud schedules.",
  path: "/docs",
  keywords: [
    "Revenant docs",
    "PostgreSQL restore drill guide",
    "revenant.yaml",
    "GitHub Actions backup test",
    "RDS DR documentation",
  ],
};

export const loginSeo: PageMetaInput = {
  title: "Sign in",
  description: "Sign in to Revenant Cloud to manage PostgreSQL restore drills, schedules, and evidence.",
  path: "/login",
  robots: "noindex,nofollow",
};

export const registerSeo: PageMetaInput = {
  title: "Create account",
  description: "Create a Revenant Cloud account to run managed PostgreSQL restore drills and store signed evidence.",
  path: "/register",
  robots: "noindex,nofollow",
};

export const oauthCompleteSeo: PageMetaInput = {
  title: "Completing sign-in",
  description: "Finishing OAuth sign-in to Revenant Cloud.",
  path: "/auth/oauth/complete",
  robots: "noindex,nofollow",
};
