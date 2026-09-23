import { site } from "./site";
import { TOKEN_KEY, clearSessionToken } from "./session";
import { openCloudDashboard } from "./cloud-navigation";
import { canAccessCloudDashboard } from "./subscription-access";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

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
  options: RequestInit = {},
  retriedWithoutBearer = false,
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
    if (
      res.status === 401 &&
      !retriedWithoutBearer &&
      headers.Authorization
    ) {
      clearSessionToken();
      const { Authorization: _drop, ...rest } = headers;
      return request<T>(path, { ...options, headers: rest }, true);
    }

    const body = data as { error?: string; message?: string; code?: string };
    const message =
      body.error ??
      body.message ??
      (body.code === "MIGRATION_REQUIRED"
        ? "API database migration required — run npm run db:migrate in revenant-cloud"
        : `Request failed (${res.status})`);
    throw new ApiError(message, res.status);
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
  autopaySetup?: boolean;
};

export type BillingCreateOrderResponse = {
  checkoutMode?: "subscription" | "order";
  subscriptionId?: string;
  orderId?: string;
  amount: number;
  currency: string;
  keyId: string;
  description: string;
  trialEndsAt?: string | null;
  recurringAmountInr?: number;
};

export type BillingVerifyPaymentRequest = {
  razorpay_payment_id: string;
  razorpay_signature: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
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
  const token = localStorage.getItem(TOKEN_KEY);
  return request("/api/v1/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

/** Cookie session → JWT for cross-app redirect (marketing → cloud). */
export async function fetchSessionToken(): Promise<string | null> {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const { token: issued } = await request<{ token: string }>("/api/v1/auth/session-token", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (issued) localStorage.setItem(TOKEN_KEY, issued);
    return issued;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem(TOKEN_KEY);
  try {
    await request("/api/v1/auth/logout", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  } catch {
    /* clear local session even if API call fails */
  }
  clearSessionToken();
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

/** After marketing auth — billing on website first, then cloud with same token. */
export function goToAppWithSession(token: string, user?: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  if (user && canAccessCloudDashboard(user)) {
    void openCloudDashboard(token);
    return;
  }
  window.location.href = "/billing";
}

export async function createBillingOrder(): Promise<{ order: BillingCreateOrderResponse }> {
  const token = localStorage.getItem(TOKEN_KEY);
  return request("/api/v1/billing/create-order", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify({}),
  });
}

export async function verifyBillingPayment(body: BillingVerifyPaymentRequest) {
  const token = localStorage.getItem(TOKEN_KEY);
  return request<{ ok: true; autopaySetup: boolean }>("/api/v1/billing/verify-payment", {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(body),
  });
}
