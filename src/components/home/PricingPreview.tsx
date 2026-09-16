import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PLANS } from "../../lib/plans";
import { Button } from "../ui/Button";

export function PricingPreview() {
  const preview = PLANS.filter((p) => p.id !== "enterprise");

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="ui-heading text-3xl sm:text-4xl">Start free. Scale when ready.</h2>
          <p className="mx-auto mt-4 max-w-xl ui-body">
            Developer tier is free forever. Cloud Starter includes a 30-day trial
            — no card at signup.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {preview.map((plan) => (
            <article
              key={plan.id}
              className={`ui-card relative flex flex-col p-6 ${
                plan.featured ? "border-border-strong shadow-glow" : ""
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-accent-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.priceNote && (
                  <span className="ml-1 text-sm text-foreground-subtle">{plan.priceNote}</span>
                )}
              </div>
              <p className="mt-3 text-sm text-foreground-muted">{plan.tagline}</p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-foreground-muted">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              <Button
                href={
                  plan.id === "developer"
                    ? "/docs/cli/install"
                    : "/register"
                }
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-6 w-full"
              >
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-foreground-subtle">
          <Link to="/pricing" className="text-accent-bright hover:underline">
            Compare all plans including Enterprise →
          </Link>
        </p>
      </div>
    </section>
  );
}
