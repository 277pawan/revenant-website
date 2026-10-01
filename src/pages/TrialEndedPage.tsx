import { AlertTriangle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/seo/PageMeta";
import { site } from "../lib/site";

export function TrialEndedPage() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl content-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.7fr)] md:items-center">
      <PageMeta
        title="Starter trial required"
        description="Start or renew your Revenant Cloud Starter trial to access the dashboard."
        path="/trial-ended"
        robots="noindex,nofollow"
      />
      <section>
        <div className="mb-5 flex items-center gap-3 text-warning">
          <AlertTriangle size={21} />
          <span className="text-sm font-semibold">Revenant Cloud</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Cloud access paused</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-foreground-muted">
          The Revenant Cloud dashboard needs an active <strong>Starter</strong> trial
          or paid plan. Your trial may have ended, or this account never started one.
        </p>
      </section>
      <aside className="border-t border-border-subtle pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
        <p className="text-sm leading-relaxed text-foreground-muted">
          A ₹1 card check activates dashboard access. Your plan charge begins after the
          30-day trial.
        </p>
        <div className="mt-5 flex flex-col items-start gap-3">
          <Button href="/billing">Set up autopay — ₹1</Button>
          <Button href="/login" variant="secondary">Sign in</Button>
          <a href="/pricing" className="text-sm font-medium text-accent-bright hover:underline">
            View pricing
          </a>
        </div>
        <p className="mt-6 text-sm text-foreground-subtle">
          Already paid?{" "}
          <a href={`${site.appUrl}/login`} className="text-accent-bright hover:underline">
            Open cloud dashboard
          </a>
        </p>
      </aside>
    </div>
  );
}
