import { useEffect } from "react";
import { Shield, Terminal, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { HeroLogo3D } from "./HeroLogo3D";
import {
  trackMarketingHeroView,
  trackMarketingVisitOnce,
} from "../../lib/engagement";

const STATS = [
  { value: "4m 12s", label: "avg restore RTO" },
  { value: "Free", label: "CLI forever" },
  { value: "30 days", label: "cloud trial" },
];

export function HeroSection() {
  useEffect(() => {
    trackMarketingVisitOnce();
    trackMarketingHeroView();
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-hero-glow" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-grid-fade bg-grid opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="ui-badge mb-8">
            <Shield size={14} className="text-accent-bright" />
            PostgreSQL DR proof · AWS RDS · signed evidence
          </div>

          <h1 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Your backups are not proof
            <span className="mt-1 block bg-gradient-to-r from-accent-bright via-accent to-[#a88620] bg-clip-text text-transparent">
              until they restore.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Revenant runs real restore drills on PostgreSQL — free in CI,
            managed in the cloud — and gives your team signed evidence auditors
            can trust.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button variant="surface" href="/register" size="lg">
              Start 30-day trial
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" href="/docs" size="lg">
              <Terminal size={18} />
              Read the docs
            </Button>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border-subtle pt-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-lg font-semibold text-accent-bright">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-xs text-foreground-subtle">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroLogo3D />
      </div>
    </section>
  );
}
