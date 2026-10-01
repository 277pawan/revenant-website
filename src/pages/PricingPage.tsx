import { useMemo } from "react";
import { Check } from "lucide-react";
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
          <h1 className="ui-heading text-4xl sm:text-5xl">
            Simple pricing. Serious protection.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            Free CLI forever. Cloud plans billed monthly in INR. Starter includes
            a 30-day trial with no card at signup.
          </p>
          </div>
        </div>

        <TrialPromoBanner />

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const cta = planCheckoutTarget(
              plan.id,
              { href: plan.ctaHref, label: plan.cta },
              user,
            );

            return (
              <article
                key={plan.id}
                className={`ui-card flex flex-col p-6 ${
                  plan.featured ? "border-t-2 border-t-accent" : ""
                }`}
              >
                {plan.featured && (
                  <>
                    <StarterTrialBadge />
                  </>
                )}
                <h2 className="text-xl font-semibold text-foreground">{plan.name}</h2>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  {plan.priceNote && (
                    <p className="text-sm text-foreground-subtle">{plan.priceNote}</p>
                  )}
                </div>
                <p className="mt-3 text-sm text-foreground-muted">{plan.tagline}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {plan.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-foreground-muted">
                      <Check size={15} className="mt-0.5 shrink-0 text-accent-bright" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Button
                  href={cta.href}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {cta.label}
                </Button>
              </article>
            );
          })}
        </div>

        <div className="ui-card mx-auto mt-16 max-w-3xl p-6 text-sm text-foreground-muted">
          <h3 className="font-semibold text-foreground">What counts as a workflow?</h3>
          <p className="mt-2 leading-relaxed">
            One production database with a validation plan. Starter runs one
            managed AWS restore drill at a time. Pro runs up to three in parallel.
            The optional Docker agent is only for private-network Postgres on Pro+ —
            not required for AWS RDS.
          </p>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
