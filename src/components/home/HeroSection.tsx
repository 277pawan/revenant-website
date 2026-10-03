import { useEffect } from "react";
import { Terminal, ArrowRight } from "lucide-react";

import { Button } from "../ui/Button";
import { HeroBackdrop } from "./HeroBackdrop";
import { RestoreChamber } from "./RestoreChamber";
import { ProofHeadline } from "./ProofHeadline";

import {
  trackMarketingHeroView,
  trackMarketingVisitOnce,
} from "../../lib/engagement";

const PROOF_POINTS = [
  {
    title: "Runs in your AWS account",
    body: "Restores happen where your data already lives.",
  },
  {
    title: "A real restore, not a status check",
    body: "We bring the database up and query it before saying it works.",
  },
  {
    title: "Evidence you can hand over",
    body: "Signed PDF and JSON proof for auditors and leadership.",
  },
] as const;

export function HeroSection() {
  useEffect(() => {
    trackMarketingVisitOnce();
    trackMarketingHeroView();
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
      <HeroBackdrop />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="max-w-xl">
            <ProofHeadline />

            <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-foreground-muted sm:text-lg">
              Revenant runs your PostgreSQL recovery on a schedule and keeps the
              evidence, so you find out it works before an outage asks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="primary" href="/register" size="lg">
                Start 30-day trial
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" href="/cli" size="lg">
                <Terminal size={18} />
                Run the free CLI
              </Button>
            </div>
          </div>

          <RestoreChamber />
        </div>

        <ul className="mt-16 grid gap-8 border-t border-border pt-8 sm:mt-20 sm:grid-cols-3 sm:gap-10">
          {PROOF_POINTS.map((p) => (
            <li key={p.title}>
              <p className="text-sm font-semibold text-foreground">{p.title}</p>
              <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-foreground-muted">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

