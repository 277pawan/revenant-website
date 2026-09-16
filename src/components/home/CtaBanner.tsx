import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

export function CtaBanner() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-border-strong bg-cta-glow bg-surface px-8 py-16 text-center shadow-glow sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-60" />
          <div className="relative">
            <h2 className="ui-heading text-2xl sm:text-3xl">
              Don&apos;t wait for the outage to test recovery.
            </h2>
            <p className="mx-auto mt-4 max-w-lg ui-body">
              Run your first restore drill today. Free CLI in CI, or start a
              30-day cloud trial with managed AWS sandboxes.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/register" size="lg">
                Start free trial
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" href="/docs" size="lg">
                Read docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
