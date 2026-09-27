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

function userOrgPlan(user: AuthUser): "starter" | "pro" | "enterprise" {
  if (user.organizationPlan === "pro") return "pro";
  if (user.organizationPlan === "enterprise") return "enterprise";
  return "starter";
}

export function billingHref(options?: {
  plan?: "starter" | "pro";
  upgrade?: boolean;
  openCloud?: boolean;
}): string {
  const params = new URLSearchParams();
  if (options?.plan) params.set("plan", options.plan);
  if (options?.upgrade) params.set("upgrade", "1");
  if (options?.openCloud) params.set("open", "cloud");
  const query = params.toString();
  return query ? `/billing?${query}` : "/billing";
}

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
    if (planId === "pro") {
      return { href: "/register?plan=pro", label: defaults.label };
    }
    return { href: "/register", label: defaults.label };
  }

  const currentPlan = userOrgPlan(user);

  if (planId === "pro") {
    if (currentPlan === "pro") {
      if (canAccessCloudDashboard(user)) {
        return { href: billingHref({ openCloud: true }), label: "Open cloud dashboard" };
      }
      return { href: billingHref({ plan: "pro" }), label: "Set up Pro autopay — ₹1" };
    }

    if (canAccessCloudDashboard(user)) {
      return { href: billingHref({ plan: "pro", upgrade: true }), label: "Upgrade to Pro" };
    }

    return { href: billingHref({ plan: "pro" }), label: defaults.label };
  }

  if (planId === "starter") {
    if (canAccessCloudDashboard(user)) {
      return { href: billingHref({ openCloud: true }), label: "Open cloud dashboard" };
    }
    if (hasActiveCloudPlan(user)) {
      return { href: "/billing", label: "Set up autopay — ₹1" };
    }
    return { href: "/billing", label: "Set up autopay — ₹1" };
  }

  return defaults;
}
