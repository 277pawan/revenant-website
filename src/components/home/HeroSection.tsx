import { useEffect } from "react";
import { Terminal, ArrowRight } from "lucide-react";

import { Button } from "../ui/Button";
import { AnimatedWordPill } from "../ui/AnimatedWordPill";
import { HeroBackdrop, HeroRegionChips } from "./HeroBackdrop";
import { RestoreChamber } from "./RestoreChamber";

import {
  trackMarketingHeroView,
  trackMarketingVisitOnce,
} from "../../lib/engagement";

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
          <div className="mb-6 flex flex-col items-start gap-2.5 sm:mb-2">
            <p className="text-xs font-semibold leading-5 text-accent-bright sm:text-xl sm:leading-6">
              Database recovery assurance &nbsp;
              <AnimatedWordPill />
            </p>
          </div>

          <h1 className="mt-0 max-w-none text-[2.15rem] font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-5xl">
            Know your restore
            <br className="hidden sm:block" />
            {" "}works before an outage.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground-muted sm:mt-6 sm:text-lg">
            Run real AWS snapshot restores, verify recovered PostgreSQL data, and
            keep signed recovery evidence. No application code changes.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
            <Button variant="primary" href="/register" size="lg">
              Start cloud trial
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" href="/cli" size="lg">
              <Terminal size={18} />
              Explore free CLI
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-foreground-subtle sm:text-sm">
            <li>Runs in your AWS account</li>
            <li>Real snapshot restores</li>
            <li>Free CLI and GitHub Action</li>
          </ul>
        </div>

        <div className="relative">
          <RestoreChamber />
          <HeroRegionChips />
        </div>
      </div>
    </section>
  );
}