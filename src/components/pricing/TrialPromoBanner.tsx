import { Fragment, useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { STARTER_PRICE_INR } from "../../lib/plans";
import { useWebsiteSession } from "../../hooks/useWebsiteSession";
import { openCloudDashboard } from "../../lib/cloud-navigation";
import {
  canAccessCloudDashboard,
  hasActiveCloudPlan,
} from "../../lib/subscription-access";

const ctaClass =
  "group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-background shadow-md shadow-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-bright hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const FLOW = [
  "No card at signup",
  "₹1 card check",
  `₹${STARTER_PRICE_INR}/mo from day 31`,
];

export function TrialPromoBanner() {
  const { user, token } = useWebsiteSession();
  const rootRef = useRef<HTMLDivElement>(null);

  let ctaHref = "/register";
  let ctaLabel = "Start free trial";
  let onCloudClick: (() => void) | undefined;

  if (user) {
    if (canAccessCloudDashboard(user)) {
      ctaHref = "/billing?open=cloud";
      ctaLabel = "Open cloud dashboard";
      onCloudClick = () => void openCloudDashboard(token);
    } else if (hasActiveCloudPlan(user)) {
      ctaHref = "/billing";
      ctaLabel = "Set up autopay — ₹1";
    } else {
      ctaHref = "/billing";
      ctaLabel = "Set up autopay — ₹1";
    }
  }

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".tb-card", { y: 20, opacity: 0, duration: 0.6 })
        .from(
          ".tb-item",
          { x: -24, opacity: 0, duration: 0.5, stagger: 0.08 },
          "-=0.3",
        )
        .from(".tb-cta", { x: 24, opacity: 0, duration: 0.5 }, "<0.1");

      // Shiny sweep across the strip after it lands
      gsap.fromTo(
        ".tb-shine",
        { xPercent: 0, opacity: 1 },
        { xPercent: 450, duration: 1.4, ease: "power2.inOut", delay: 0.9 },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const cta = onCloudClick ? (
    <button type="button" onClick={onCloudClick} className={ctaClass}>
      {ctaLabel}
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </button>
  ) : (
    <Link to={ctaHref} className={ctaClass}>
      {ctaLabel}
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );

  return (
    <div ref={rootRef} className="mx-auto mt-10 max-w-6xl">
      <div className="tb-card relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-r from-accent-muted/50 via-surface/60 to-surface/30 px-5 py-5 sm:px-7">
        <div
          aria-hidden="true"
          className="tb-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
        />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <div className="tb-item flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border border-accent/30 bg-background/60">
            <span className="text-xl font-bold leading-none text-accent-bright">
              30
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground-subtle">
              days
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="tb-item text-base font-semibold text-foreground">
              Starter: 30-day free trial
            </p>
            <p className="tb-item mt-1 text-sm leading-relaxed text-foreground-muted">
              Managed AWS restore drills, evidence vault, and schedules
              included.
            </p>
            <ul className="tb-item mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
              {FLOW.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && (
                    <li aria-hidden="true" className="text-foreground-subtle">
                      <ArrowRight size={12} />
                    </li>
                  )}
                  <li className="rounded-full border border-border-subtle bg-background/50 px-3 py-1 text-xs font-medium text-foreground-muted">
                    {step}
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>

          <div className="tb-cta">{cta}</div>
        </div>
      </div>
    </div>
  );
}

export function StarterTrialBadge() {
  return (
    <div className="rounded-xl border border-accent/25 bg-accent-muted/50 px-3 py-2 text-center text-xs leading-relaxed text-foreground-muted">
      <span className="font-semibold text-accent-bright">First month free</span>
      {" · "}
      No credit card today
      {" · "}₹{STARTER_PRICE_INR}/mo after 30 days
    </div>
  );
}
