import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { STARTER_PRICE_INR } from "../../lib/plans";
import { useWebsiteSession } from "../../hooks/useWebsiteSession";
import { openCloudDashboard } from "../../lib/cloud-navigation";
import { canAccessCloudDashboard, hasActiveCloudPlan } from "../../lib/subscription-access";

export function TrialPromoBanner() {
  const { user, token } = useWebsiteSession();

  let ctaHref = "/register";
  let ctaLabel = "Start free trial →";
  let onCloudClick: (() => void) | undefined;

  if (user) {
    if (canAccessCloudDashboard(user)) {
      ctaHref = "/billing?open=cloud";
      ctaLabel = "Open cloud dashboard →";
      onCloudClick = () => void openCloudDashboard(token);
    } else if (hasActiveCloudPlan(user)) {
      ctaHref = "/billing";
      ctaLabel = "Set up autopay — ₹1 →";
    } else {
      ctaHref = "/billing";
      ctaLabel = "Set up autopay — ₹1 →";
    }
  }

  return (
    <div className="mx-auto mb-10 max-w-4xl rounded-2xl border border-accent/30 bg-accent-muted/40 px-5 py-4 text-center sm:px-6">
      <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-bright">
        <Sparkles size={16} />
        Starter: 30-day free trial
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        No credit card at signup. Managed AWS restore drills, evidence vault, and
        schedules included. Complete a one-time <strong>₹1</strong> card check to unlock
        the cloud dashboard.
      </p>
      {onCloudClick ? (
        <button
          type="button"
          onClick={onCloudClick}
          className="mt-3 inline-block text-sm font-semibold text-accent-bright hover:underline"
        >
          {ctaLabel}
        </button>
      ) : (
        <Link
          to={ctaHref}
          className="mt-3 inline-block text-sm font-semibold text-accent-bright hover:underline"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}

export function StarterTrialBadge() {
  return (
    <div className="mb-3 rounded-xl border border-accent/25 bg-accent-muted/50 px-3 py-2 text-center text-xs leading-relaxed text-foreground-muted">
      <span className="font-semibold text-accent-bright">First month free</span>
      {" · "}
      No credit card today
      {" · "}
      ₹{STARTER_PRICE_INR}/mo after 30 days
    </div>
  );
}
