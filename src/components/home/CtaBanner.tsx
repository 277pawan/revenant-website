import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { AmbientMotion } from "../ui/AmbientMotion";
import { useWebsiteSession } from "../../hooks/useWebsiteSession";
import { canAccessCloudDashboard, hasActiveCloudPlan } from "../../lib/subscription-access";

export function CtaBanner() {
  const { user } = useWebsiteSession();

  let href = "/register";
  let label = "Start free trial";

  if (user) {
    if (canAccessCloudDashboard(user)) {
      href = "/billing?open=cloud";
      label = "Open cloud dashboard";
    } else if (hasActiveCloudPlan(user)) {
      href = "/billing";
      label = "Set up autopay — ₹1";
    } else {
      href = "/billing";
      label = "Set up autopay — ₹1";
    }
  }

  return (
    <section className="relative isolate overflow-hidden px-4 pb-20 sm:px-6">
      <AmbientMotion variant="cta" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 border-y border-border-subtle py-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:py-14">
        <div>
          <h2 className="ui-heading max-w-2xl text-2xl sm:text-3xl">
            Don&apos;t wait for the outage to test recovery.
          </h2>
          <p className="mt-3 max-w-2xl ui-body">
            Run your first restore drill today. Free CLI in CI, or start a
            30-day cloud trial with managed AWS sandboxes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button href={href} size="lg">
            {label}
            <ArrowRight size={18} />
          </Button>
          <Button variant="secondary" href="/docs" size="lg">
            Read docs
          </Button>
        </div>
      </div>
    </section>
  );
}
