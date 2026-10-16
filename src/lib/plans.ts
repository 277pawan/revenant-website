export type PlanId = "developer" | "starter" | "pro" | "enterprise";

export const STARTER_PRICE_INR = 499;
export const PRO_PRICE_INR = 1499;

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  priceNote?: string;
  tagline: string;
  highlights: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "developer",
    name: "Developer",
    price: "Free forever",
    tagline: "CLI + GitHub Action — your pipeline, your AWS sandbox.",
    highlights: [
      "revenant CLI + GitHub Action (no cloud account)",
      "AWS snapshot restore in your own AWS account",
      "Run Redis restore proofs locally — no Revenant Cloud storage",
      "YAML in git — no dashboard or evidence vault",
    ],
    cta: "Get the CLI",
    ctaHref: "/docs/cli/install",
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹499",
    priceNote: "/ month after 30-day free trial",
    tagline: "One production workflow — Revenant runs restore drills for you.",
    highlights: [
      "30-day free trial, then ₹499 / month",
      "1 production RDS workflow — managed AWS restore drill",
      "No Docker — Revenant cloud executes drills",
      "1 Redis instance — 4 restore proofs/mo, opt-in snapshots up to 24h",
      "Evidence (30 days), schedules, Proof Composer, email",
    ],
    cta: "Start free trial",
    ctaHref: "/register",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹1,499",
    priceNote: "/ month",
    tagline: "Fleet DR proof — Revenant still runs AWS drills automatically.",
    highlights: [
      "Up to 10 production workflows",
      "Revenant-managed AWS drills (no Docker by default)",
      "3 parallel restore drills",
      "Optional agent for private-network Postgres only",
      "MongoDB read-only validation checks — separate from SQL and AWS restore drills",
      "10 Redis instances — 30 restore proofs/mo, opt-in snapshots up to 7 days",
      "Slack, email, HTTP · 1-year evidence + audit",
    ],
    cta: "Start with Pro",
    ctaHref: "/register",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact us",
    tagline: "SSO, custom SLAs, and compliance packaging.",
    highlights: [
      "Unlimited production workflows (fair use)",
      "Managed drills + optional private-network agents",
      "SSO, dedicated support, custom retention",
    ],
    cta: "Talk to us",
    ctaHref: "/talk",
  },
];
