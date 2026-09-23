import type { AuthUser } from "./api";

/** ₹1 autopay completed — required to use cloud features. */
export function canAccessCloudDashboard(
  user: Pick<AuthUser, "autopaySetup"> | null | undefined
): boolean {
  return user?.autopaySetup === true;
}

/** Trial or paid plan — show cloud dashboard entry in marketing nav. */
export function hasActiveCloudPlan(
  user: Pick<AuthUser, "autopaySetup" | "subscriptionActive" | "subscriptionStatus"> | null | undefined
): boolean {
  if (!user) return false;
  if (user.autopaySetup) return true;
  if (user.subscriptionActive) return true;
  return user.subscriptionStatus === "trialing" || user.subscriptionStatus === "active";
}
