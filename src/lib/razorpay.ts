const CHECKOUT_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

let scriptPromise: Promise<void> | null = null;

export function loadRazorpayCheckout(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay checkout is only available in the browser"));
  }
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });

  return scriptPromise;
}

/**
 * Checkout must use the same key that created the order/subscription on the API.
 * VITE_RAZORPAY_KEY_ID is optional fallback only — never override a mismatched env key.
 */
export function resolveRazorpayKeyId(apiKeyId: string): string {
  const envKey = import.meta.env.VITE_RAZORPAY_KEY_ID?.trim();
  if (!envKey || envKey === apiKeyId) return apiKeyId;
  if (import.meta.env.DEV) {
    console.warn(
      "[razorpay] VITE_RAZORPAY_KEY_ID does not match API keyId — using API key (live/test must match backend)"
    );
  }
  return apiKeyId;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
    };
  }
}
