import { useEffect } from "react";
import { Shield, Terminal, ArrowRight } from "lucide-react";

import { Button } from "../ui/Button";
import { HeroLogo3D } from "./HeroLogo3D";

import {
  trackMarketingHeroView,
  trackMarketingVisitOnce,
} from "../../lib/engagement";

const STATS = [
  {
    value: "4m 12s",
    label: "avg restore RTO",
  },
  {
    value: "Free",
    label: "CLI forever",
  },
  {
    value: "30 days",
    label: "cloud trial",
  },
];

export function HeroSection() {
  useEffect(() => {
    trackMarketingVisitOnce();
    trackMarketingHeroView();
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-20">
      {/* =========================================================
          ATMOSPHERIC LIGHTS
          ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 bg-hero-mesh"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-hero-glow"
        aria-hidden="true"
      />

      {/* =========================================================
          GRID
          ========================================================= */}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[516px] bg-grid-fade bg-grid opacity-40"
        aria-hidden="true"
      />

      {/* =========================================================
          CONTENT
          ========================================================= */}

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT */}
        <div>
          {/* Badge */}
          <div className="ui-badge mb-8">
            <Shield size={14} className="text-accent-bright" />

            <span>PostgreSQL DR proof · AWS RDS · signed evidence</span>
          </div>

          {/* Heading */}
          <h1 className="text-[2.75rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl">
            Your backups are not proof
            <span
              className="
                mt-1
                block
                bg-gradient-to-r
                from-violet-400
                via-cyan-400
                to-emerald-300
                bg-clip-text
                text-transparent
              "
            >
              until they restore.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            Revenant runs real restore drills on PostgreSQL — free in CI,
            managed in the cloud — and gives your team signed evidence auditors
            can trust.
          </p>

          {/* Buttons */}
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

          {/* Stats */}
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-border-subtle pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-lg font-semibold text-accent-bright">
                  {stat.value}
                </dt>

                <dd className="mt-0.5 text-xs text-foreground-subtle">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* RIGHT */}
        <HeroLogo3D />
      </div>
    </section>
  );
}
