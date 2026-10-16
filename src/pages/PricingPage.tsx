import { useMemo } from "react";
import { ArrowRight, Check, Database, HardDrive, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { applyCatalogToPlans } from "../lib/catalog";
import { PLANS } from "../lib/plans";
import { Button } from "../components/ui/Button";
import { CtaBanner } from "../components/home/CtaBanner";
import { PageMeta } from "../components/seo/PageMeta";
import { pricingSeo } from "../lib/seo-pages";
import { StarterTrialBadge, TrialPromoBanner } from "../components/pricing/TrialPromoBanner";
import { usePublicCatalog } from "../hooks/usePublicCatalog";
import { useWebsiteSession } from "../hooks/useWebsiteSession";
import { planCheckoutTarget } from "../lib/session";

export function PricingPage() {
  const { user } = useWebsiteSession();
  const { catalog } = usePublicCatalog();
  const plans = useMemo(() => applyCatalogToPlans(PLANS, catalog), [catalog]);

  return (
    <>
      <PageMeta {...pricingSeo} />
      <section className="px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent-bright">
              PostgreSQL + Redis recovery proof
            </p>
            <h1 className="ui-heading text-4xl sm:text-5xl">
              Simple plans. Know your data comes back.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
              Start with a free CLI, or choose a cloud plan for managed PostgreSQL
              restore drills and separate Redis recovery proofs. Cloud plans are
              billed monthly in INR; Starter includes a 30-day trial.
            </p>
          </div>
        </div>

        <TrialPromoBanner />

        <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const cta = planCheckoutTarget(
              plan.id,
              { href: plan.ctaHref, label: plan.cta },
              user,
            );

            return (
              <article
                key={plan.id}
                className={`ui-card group flex flex-col rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${plan.featured ? "border-accent/50 ring-1 ring-accent/30 shadow-lg" : "hover:border-border-strong"
                  }`}
              >
                <div className="flex min-h-7 items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                    {plan.id === "developer"
                      ? "For individual builders"
                      : plan.id === "enterprise"
                        ? "For larger teams"
                        : "Managed cloud"}
                  </span>
                  {plan.featured && (
                    <span className="rounded-full bg-accent-muted px-2.5 py-1 text-[11px] font-semibold text-accent-bright">
                      Most popular
                    </span>
                  )}
                </div>
                {plan.featured && (
                  <div className="mt-4">
                    <StarterTrialBadge />
                  </div>
                )}
                <h2
                  className={`${plan.featured ? "mt-1" : "mt-4"} text-xl font-semibold text-foreground`}
                >
                  {plan.name}
                </h2>
                <div className="mt-3 min-h-[4.5rem]">
                  <span className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</span>
                  {plan.priceNote && (
                    <p className="mt-1 text-sm text-foreground-subtle">{plan.priceNote}</p>
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
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground-muted"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-bright" aria-hidden="true" />
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

        <section className="mx-auto mt-16 max-w-6xl" aria-labelledby="redis-pricing-title">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-muted/50 px-3 py-1.5 text-xs font-semibold text-accent-bright">
                  <HardDrive size={14} aria-hidden="true" />
                  Separate from PostgreSQL workflows
                </div>
                <h2 id="redis-pricing-title" className="ui-heading mt-5 text-2xl sm:text-3xl">
                  Redis backup restore proof, built into cloud plans.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted sm:text-base">
                  Revenant captures a Redis RDB and verifies recovery in an isolated
                  Redis server, then keeps the proof. It is not a Redis hosting service
                  or a replacement for your primary backup strategy.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border-subtle bg-background/60 p-4">
                    <Database size={18} className="text-accent-bright" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      A distinct recovery workflow
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      Redis instances and restore-proof quotas are listed separately
                      from your AWS/PostgreSQL databases.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border-subtle bg-background/60 p-4">
                    <ShieldCheck size={18} className="text-accent-bright" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-foreground">
                      Opt-in, expiring storage
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
                      Snapshot storage is optional. Stored artifacts are compressed
                      by default and hard-expire within the plan retention limit.
                    </p>
                  </div>
                </div>
                <Link
                  to="/docs/redis/restore-proof"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-bright hover:underline"
                >
                  Read the Redis feature guide <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              <div className="grid content-center gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-border-subtle bg-background/60 p-5">
                  <p className="text-sm font-semibold text-foreground">Starter</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    1 Redis instance · 4 restore proofs per month · up to 24 hours
                    of opt-in snapshot retention
                  </p>
                </div>
                <div className="rounded-2xl border border-accent/25 bg-accent-muted/30 p-5">
                  <p className="text-sm font-semibold text-foreground">Pro</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    10 Redis instances · 30 restore proofs per month · up to 7 days
                    of opt-in snapshot retention
                  </p>
                </div>
                <p className="text-xs leading-relaxed text-foreground-subtle sm:col-span-2 lg:col-span-1">
                  Retention is a maximum, not a promise to retain every snapshot for
                  the full period. You can run verification without keeping snapshot
                  bytes in Revenant.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-8 max-w-6xl rounded-2xl border border-border-subtle bg-surface/60 p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-foreground">PostgreSQL workflow limits are separate</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            A workflow is one production PostgreSQL database with a validation plan.
            Starter runs one managed AWS restore drill at a time; Pro runs up to three
            in parallel. Pro also includes separate, read-only MongoDB validation
            checks; MongoDB checks do not use SQL or AWS restore drills. The optional
            Docker agent is only for private-network PostgreSQL on Pro+ — it is not
            required for AWS RDS.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
