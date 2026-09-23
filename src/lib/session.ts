import type { AuthUser } from "./api";
import { canAccessCloudDashboard, hasActiveCloudPlan } from "./subscription-access";

export const TOKEN_KEY = "revenant_token";

/** Persist JWT from `#token=` (cloud → website handoff) and strip it from the URL. */
export function consumeTokenFromHash(): string | null {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const token = hash.get("token");
  if (!token) return null;

  localStorage.setItem(TOKEN_KEY, token);
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}`,
  );
  return token;
}

export function clearSessionToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export type PlanCheckoutTarget = {
  href: string;
  label: string;
};

/** Pricing / trial CTAs — logged-in users go to billing or cloud, not register again. */
export function planCheckoutTarget(
  planId: string,
  defaults: { href: string; label: string },
  user: AuthUser | null,
): PlanCheckoutTarget {
  if (planId === "developer" || planId === "enterprise") {
    return defaults;
  }

  if (!user) {
    return { href: "/register", label: defaults.label };
  }

  if (canAccessCloudDashboard(user)) {
    return { href: "/billing?open=cloud", label: "Open cloud dashboard" };
  }

  if (hasActiveCloudPlan(user)) {
    return { href: "/billing", label: "Set up autopay — ₹1" };
  }

  return { href: "/billing", label: "Set up autopay — ₹1" };
}
