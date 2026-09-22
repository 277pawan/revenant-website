import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/seo/PageMeta";
import { site } from "../lib/site";

export function TrialEndedPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <PageMeta
        title="Starter trial required"
        description="Start or renew your Revenant Cloud Starter trial to access the dashboard."
        path="/trial-ended"
        robots="noindex,nofollow"
      />
      <div className="ui-card w-full max-w-lg p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-600">
          <AlertTriangle size={24} />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Cloud access paused</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          The Revenant Cloud dashboard needs an active <strong>Starter</strong> trial
          or paid plan. Your trial may have ended, or this account never started one.
        </p>
        <p className="mt-2 text-sm text-foreground-subtle">
          New organizations get <strong>30 days free</strong> — no credit card at signup.
          Razorpay checkout is coming soon.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button href="/register">Start free trial</Button>
          <Button href="/pricing" variant="secondary">View pricing</Button>
          <Button href="/docs/cli/install" variant="secondary">Free CLI</Button>
        </div>
        <p className="mt-6 text-xs text-foreground-subtle">
          Already subscribed?{" "}
          <a href={`${site.appUrl}/login`} className="text-accent-bright hover:underline">
            Sign in on the dashboard
          </a>
        </p>
      </div>
    </div>
  );
}
