import { useEffect } from "react";
import { Shield, Terminal, ArrowRight } from "lucide-react";

import { Button } from "../ui/Button";
import { HeroBackdrop } from "./HeroBackdrop";
import { RestoreChamber } from "./RestoreChamber";
import { RestoreProofRail } from "./RestoreProofRail";

import {
  trackMarketingHeroView,
  trackMarketingVisitOnce,
} from "../../lib/engagement";

const STATS = [
  { value: "4m 12s", label: "avg restore RTO" },
  { value: "Free", label: "CLI forever" },
  { value: "7 checks", label: "yaml plan types" },
];

export function HeroSection() {
  useEffect(() => {
    trackMarketingVisitOnce();
    trackMarketingHeroView();
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-xl lg:max-w-none">
          <div className="ui-badge mb-5 sm:mb-6">
            <Shield size={14} className="text-accent-bright" />
            <span>PostgreSQL · AWS RDS · language-agnostic</span>
          </div>

          <h1 className="text-[2.15rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Prove your backups
            <span className="hero-headline-accent mt-1 block">
              actually restore.
            </span>
          </h1>

          <RestoreProofRail />

          <p className="mt-5 text-base leading-relaxed text-foreground-muted sm:mt-6 sm:text-lg">
            Not that they exist. Revenant connects to live PostgreSQL, runs
            checks from{" "}
            <code className="hero-inline-code rounded px-1.5 py-0.5 font-mono text-[0.85em]">
              revenant.yaml
            </code>
            , measures recovery time, writes evidence, and tears the sandbox
            down.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
            <Button variant="primary" href="/register" size="lg">
              Start 30-day trial
              <ArrowRight size={18} />
            </Button>
            <Button
              variant="secondary"
              href="/docs/getting-started/local-quickstart"
              size="lg"
            >
              <Terminal size={18} />
              Quick start
            </Button>
          </div>

          <p className="mt-4 text-xs text-foreground-subtle sm:text-sm">
            Free CLI + GitHub Action. Node, Python, Go, Rails — we never read
            your source.
          </p>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-border-subtle pt-6 sm:gap-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-base font-semibold text-accent-bright sm:text-lg">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-[11px] text-foreground-subtle sm:text-xs">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <RestoreChamber />
      </div>
    </section>
  );
}
