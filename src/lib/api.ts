import { site } from "./site";

export type ContactType = "talk" | "coffee";

export type ContactPayload = {
  type: ContactType;
  name: string;
  email: string;
  message?: string;
  amountInr?: number;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };
  if (options.body) headers["Content-Type"] = "application/json";

  const res = await fetch(`${site.apiUrl}${path}`, {
    ...options,
    credentials: "include",
    headers,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (data as { message?: string }).message ?? `Request failed (${res.status})`
    );
  }
  return data as T;
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  await request("/api/v1/public/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type AuthUser = {
  id: string;
  email: string;
  role?: string;
  organizationId?: string;
  organizationName?: string;
  organizationPlan?: string;
  subscriptionStatus?: string;
  trialEndsAt?: string | null;
  subscriptionActive?: boolean;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type AuthProviderInfo = {
  id: "google" | "github" | "microsoft";
  label: string;
  status: "live" | "coming_soon";
  authorizePath?: string;
};

export async function getAuthProviders(): Promise<{
  providers: AuthProviderInfo[];
}> {
  return request("/api/v1/auth/providers");
}

export async function me(): Promise<{ user: AuthUser }> {
  const token = localStorage.getItem("revenant_token");
  return request("/api/v1/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

export async function login(email: string, password: string) {
  return request<LoginResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(body: {
  email: string;
  password: string;
  organizationName: string;
}) {
  return request<LoginResponse>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** After marketing auth, hand off token to cloud app when Starter trial is active. */
export function goToAppWithSession(token: string, user?: AuthUser) {
  localStorage.setItem("revenant_token", token);
  if (user && user.subscriptionActive === false) {
    window.location.href = "/trial-ended";
    return;
  }
  window.location.href = `${site.appUrl}/auth/oauth/complete#token=${encodeURIComponent(token)}`;
}
