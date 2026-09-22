import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function TrialPromoBanner() {
  return (
    <div className="mx-auto mb-10 max-w-4xl rounded-2xl border border-accent/30 bg-accent-muted/40 px-5 py-4 text-center sm:px-6">
      <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-bright">
        <Sparkles size={16} />
        Starter: 30-day free trial
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
        No credit card at signup. Managed AWS restore drills, evidence vault, and
        schedules included. Razorpay billing launches soon — until then, registering
        starts your trial instantly.
      </p>
      <Link
        to="/register"
        className="mt-3 inline-block text-sm font-semibold text-accent-bright hover:underline"
      >
        Start free trial →
      </Link>
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
      ₹999/mo after 30 days
    </div>
  );
}
