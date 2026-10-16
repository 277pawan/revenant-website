import { useMemo } from "react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  Container,
  Database,
  HardDrive,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { applyCatalogToPlans } from "../lib/catalog";
import { PLANS } from "../lib/plans";
import { Button } from "../components/ui/Button";
import { CtaBanner } from "../components/home/CtaBanner";
import { PageMeta } from "../components/seo/PageMeta";
import { pricingSeo } from "../lib/seo-pages";
import { TrialPromoBanner } from "../components/pricing/TrialPromoBanner";
import { usePublicCatalog } from "../hooks/usePublicCatalog";
import { useWebsiteSession } from "../hooks/useWebsiteSession";
import { planCheckoutTarget } from "../lib/session";

const HERO_CHIPS = [
  "Free CLI",
  "Billed monthly in INR",
  "Starter: 30-day trial",
];

const REDIS_TIERS = [
  {
    name: "Starter",
    highlight: false,
    stats: [
      { value: "1", label: "Redis instance" },
      { value: "4", label: "Proofs / month" },
      { value: "24h", label: "Max snapshot retention" },
    ],
  },
  {
    name: "Pro",
    highlight: true,
    stats: [
      { value: "10", label: "Redis instances" },
      { value: "30", label: "Proofs / month" },
      { value: "7d", label: "Max snapshot retention" },
    ],
  },
];

const WORKFLOW_NOTES = [
  {
    icon: Layers,
    title: "What is a workflow?",
    body: "One production PostgreSQL database paired with a validation plan.",
  },
  {
    icon: CalendarClock,
    title: "Managed AWS restore drills",
    body: "Starter runs one drill at a time. Pro runs up to three in parallel.",
  },
  {
    icon: Database,
    title: "MongoDB validation",
    body: "Pro includes separate, read-only MongoDB checks. They don't use SQL or AWS restore drills.",
  },
  {
    icon: Container,
    title: "Optional Docker agent",
    body: "Only for private-network PostgreSQL on Pro+. Not required for AWS RDS.",
  },
];

function planLabel(id: string) {
  if (id === "developer") return "For individual builders";
  if (id === "enterprise") return "For larger teams";
  return "Managed cloud";
}

export function PricingPage() {
  const { user } = useWebsiteSession();
  const { catalog } = usePublicCatalog();
  const plans = useMemo(() => applyCatalogToPlans(PLANS, catalog), [catalog]);

  return (
    <>
      <PageMeta {...pricingSeo} />
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pt-8">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        {/* Hero */}
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-muted/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
            PostgreSQL + Redis recovery proof
          </p>
          <h1 className="ui-heading mx-auto max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            Simple plans. Know your data comes back.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Start with a free CLI, or choose a cloud plan for managed PostgreSQL
            restore drills and separate Redis recovery proofs.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {HERO_CHIPS.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface/60 px-3 py-1.5 text-xs font-medium text-foreground-muted"
              >
                <Check
                  size={12}
                  className="text-accent-bright"
                  aria-hidden="true"
                />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <TrialPromoBanner />
        </div>

        {/* Plans */}
        <div className="relative mx-auto mt-10 grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const cta = planCheckoutTarget(
              plan.id,
              { href: plan.ctaHref, label: plan.cta },
              user,
            );

            return (
              <article
                key={plan.id}
                className={`ui-card group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                  plan.featured
                    ? "border-accent/60 shadow-lg ring-1 ring-accent/40 xl:-mt-3 xl:pb-9"
                    : "hover:border-border-strong"
                }`}
              >
                {plan.featured && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-bright to-accent"
                  />
                )}

                <div className="flex min-h-7 items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    {planLabel(plan.id)}
                  </span>
                  {plan.featured && (
                    <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-background">
                      Most popular
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  {plan.name}
                </h2>

                <div className="mt-4 min-h-[4.5rem]">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.priceNote && (
                    <p className="mt-1.5 text-sm text-foreground-subtle">
                      {plan.priceNote}
                    </p>
                  )}
                </div>

                <p className="mt-3 min-h-10 text-sm leading-relaxed text-foreground-muted">
                  {plan.tagline}
                </p>

                <div className="my-5 border-t border-border-subtle" />

                <ul className="flex-1 space-y-3">
                  {plan.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground-muted"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-muted text-accent-bright">
                        <Check size={12} strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href={cta.href}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  {cta.label} <ArrowRight size={16} />
                </Button>
              </article>
            );
          })}
        </div>

        {/* Redis */}
        <section
          className="relative mx-auto mt-20 max-w-6xl"
          aria-labelledby="redis-pricing-title"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-muted/50 px-3 py-1.5 text-xs font-semibold text-accent-bright">
                  <HardDrive size={14} aria-hidden="true" />
                  Separate from PostgreSQL workflows
                </div>
                <h2
                  id="redis-pricing-title"
                  className="ui-heading mt-5 text-2xl sm:text-3xl"
                >
                  Redis backup restore proof, built into cloud plans.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
                  Revenant captures a Redis RDB and verifies recovery in an
                  isolated Redis server, then keeps the proof. It is not a Redis
                  hosting service or a replacement for your primary backup
                  strategy.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border-subtle bg-background/60 p-4 transition-colors hover:border-accent/30">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent-bright">
                      <Database size={18} aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      A distinct recovery workflow
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      Redis instances and restore-proof quotas are listed
                      separately from your AWS/PostgreSQL databases.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-background/60 p-4 transition-colors hover:border-accent/30">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent-bright">
                      <ShieldCheck size={18} aria-hidden="true" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      Opt-in, expiring storage
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      Snapshot storage is optional. Stored artifacts are
                      compressed by default and hard-expire within the plan
                      retention limit.
                    </p>
                  </div>
                </div>

                <Link
                  to="/docs/redis/restore-proof"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-bright hover:underline"
                >
                  Read the Redis feature guide{" "}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <div className="grid content-center gap-4">
                {REDIS_TIERS.map((tier) => (
                  <div
                    key={tier.name}
                    className={`rounded-2xl border p-5 ${
                      tier.highlight
                        ? "border-accent/30 bg-accent-muted/30"
                        : "border-border-subtle bg-background/60"
                    }`}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {tier.name}
                    </p>
                    <dl className="mt-4 grid grid-cols-3 gap-3">
                      {tier.stats.map((s) => (
                        <div key={s.label}>
                          <dt className="sr-only">{s.label}</dt>
                          <dd className="text-2xl font-bold tracking-tight text-foreground">
                            {s.value}
                          </dd>
                          <p className="mt-1 text-[11px] leading-snug text-foreground-subtle">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
                <p className="text-xs leading-relaxed text-foreground-subtle">
                  Retention is a maximum, not a promise to retain every snapshot
                  for the full period. You can run verification without keeping
                  snapshot bytes in Revenant.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PostgreSQL workflow notes */}
        <section
          className="relative mx-auto mt-12 max-w-6xl"
          aria-labelledby="workflow-limits-title"
        >
          <h3
            id="workflow-limits-title"
            className="text-sm font-semibold uppercase tracking-wider text-foreground-subtle"
          >
            PostgreSQL workflow limits are separate
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {WORKFLOW_NOTES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border-subtle bg-surface/60 p-5 transition-colors hover:border-border-strong"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent-bright">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h4 className="mt-3 text-sm font-semibold text-foreground">
                  {title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
      <CtaBanner />
    </>
  );
}
