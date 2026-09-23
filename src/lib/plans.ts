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
      "revenant CLI + GitHub Action",
      "AWS snapshot restore in your account",
      "YAML in git — no cloud account",
    ],
    cta: "Get the CLI",
    ctaHref: "/docs/cli/install",
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹499",
    priceNote: "/ month after first month free",
    tagline: "One production workflow — Revenant runs restore drills for you.",
    highlights: [
      "First month free — no credit card at signup",
      "1 RDS workflow, managed AWS drill",
      "Evidence vault, schedules, email alerts",
      "No Docker — cloud executes drills",
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
    tagline: "Fleet DR proof — parallel drills, optional private-network agent.",
    highlights: [
      "Up to 10 production workflows",
      "3 parallel restore drills",
      "Slack, HTTP, 1-year evidence",
      "Agent for private VPC Postgres only",
    ],
    cta: "Start with Pro",
    ctaHref: "/register",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact us",
    tagline: "SSO, custom SLAs, compliance packaging.",
    highlights: [
      "Unlimited workflows (fair use)",
      "Dedicated support & retention",
      "SSO and custom contracts",
    ],
    cta: "Talk to us",
    ctaHref: "/talk",
  },
];
