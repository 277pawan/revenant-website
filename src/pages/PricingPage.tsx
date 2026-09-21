import { Check } from "lucide-react";
import { PLANS } from "../lib/plans";
import { Button } from "../components/ui/Button";
import { CtaBanner } from "../components/home/CtaBanner";
import { PageMeta } from "../components/seo/PageMeta";
import { pricingSeo } from "../lib/seo-pages";

export function PricingPage() {
  return (
    <>
      <PageMeta {...pricingSeo} />
      <section className="px-4 pb-8 pt-16 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="ui-heading text-4xl sm:text-5xl">
            Simple pricing. Serious protection.
          </h1>
          <p className="mt-4 text-lg text-foreground-muted">
            Free CLI forever. Cloud plans billed monthly in INR. Starter includes
            a 30-day trial with no card at signup.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={`ui-card flex flex-col p-6 ${
                plan.featured ? "border-accent/40 ring-2 ring-accent/15 lg:scale-[1.02]" : ""
              }`}
            >
              {plan.featured && (
                <span className="mb-3 w-fit rounded-full bg-accent-muted px-2.5 py-0.5 text-[11px] font-semibold text-accent-bright">
                  Recommended
                </span>
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
                href={plan.ctaHref}
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {plan.cta}
              </Button>
            </article>
          ))}
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
