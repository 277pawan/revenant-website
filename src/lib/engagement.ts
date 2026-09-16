import { site } from "./site";

const VISITOR_KEY = "revenant_visitor_id";
const VISIT_SESSION_KEY = "revenant_visit_tracked";

export function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `v_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function currentVisibility(): "visible" | "hidden" {
  if (typeof document === "undefined") return "visible";
  return document.visibilityState === "hidden" ? "hidden" : "visible";
}

type TrackInput = {
  eventType: "visit" | "hero_view" | "page_view" | "login" | "register";
  path?: string;
  userId?: string;
  userEmail?: string;
  meta?: Record<string, unknown>;
};

export async function trackEngagement(
  siteName: "marketing" | "app",
  input: TrackInput
): Promise<void> {
  try {
    const token = localStorage.getItem("revenant_token");
    await fetch(`${site.apiUrl}/api/v1/public/engagement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        site: siteName,
        eventType: input.eventType,
        path: input.path ?? window.location.pathname,
        visitorId: getVisitorId(),
        userId: input.userId,
        userEmail: input.userEmail,
        visibility: currentVisibility(),
        meta: input.meta,
      }),
      credentials: "include",
      keepalive: true,
    });
  } catch {
    /* never block UX */
  }
}

/** One visit per browser session for marketing homepage */
export function trackMarketingVisitOnce(): void {
  if (sessionStorage.getItem(VISIT_SESSION_KEY)) return;
  sessionStorage.setItem(VISIT_SESSION_KEY, "1");
  void trackEngagement("marketing", { eventType: "visit" });
}

export function trackMarketingHeroView(): void {
  void trackEngagement("marketing", {
    eventType: "hero_view",
    meta: { section: "hero" },
  });
}
