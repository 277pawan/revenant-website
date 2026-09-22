import type { AuthUser } from "./api";

export function canAccessCloudDashboard(
  user: Pick<AuthUser, "subscriptionActive"> | null | undefined
): boolean {
  return user?.subscriptionActive === true;
}
