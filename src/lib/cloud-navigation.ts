import { fetchSessionToken } from "./api";
import { site } from "./site";
import { TOKEN_KEY } from "./session";

export async function openCloudDashboard(token?: string | null): Promise<void> {
  let sessionToken = token ?? localStorage.getItem(TOKEN_KEY);
  if (!sessionToken) {
    sessionToken = await fetchSessionToken();
  }
  if (!sessionToken) {
    window.location.href = "/login?next=/billing";
    return;
  }
  localStorage.setItem(TOKEN_KEY, sessionToken);
  window.location.href = `${site.appUrl}/auth/oauth/complete#token=${encodeURIComponent(sessionToken)}`;
}
