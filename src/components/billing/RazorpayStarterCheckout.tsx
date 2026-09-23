import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { createBillingOrder, me, verifyBillingPayment, type AuthUser } from "../../lib/api";
import { PRO_PRICE_INR, STARTER_PRICE_INR } from "../../lib/plans";
import { loadRazorpayCheckout } from "../../lib/razorpay";

type Props = {
  user: AuthUser;
  onSuccess?: (user: AuthUser) => void;
};

export function RazorpayStarterCheckout({ user, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const monthlyInr = user.organizationPlan === "pro" ? PRO_PRICE_INR : STARTER_PRICE_INR;

  async function startCheckout() {
    if (user.role !== "admin") {
      setError("Only organization admins can set up billing.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await loadRazorpayCheckout();
      const { order } = await createBillingOrder();
      const Razorpay = window.Razorpay;
      if (!Razorpay) throw new Error("Razorpay failed to load");

      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID?.trim() || order.keyId;

      await new Promise<void>((resolve, reject) => {
        const useSubscription =
          order.checkoutMode === "subscription" && Boolean(order.subscriptionId);

        const rzp = new Razorpay({
          key: keyId,
          name: "Revenant",
          description: order.description,
          prefill: { email: user.email, name: user.organizationName },
          theme: { color: "#3b82f6" },
          ...(useSubscription
            ? { subscription_id: order.subscriptionId }
            : {
                amount: order.amount,
                currency: order.currency,
                order_id: order.orderId,
              }),
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id?: string;
            razorpay_subscription_id?: string;
            razorpay_signature: string;
          }) => {
            try {
              await verifyBillingPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_order_id: response.razorpay_order_id,
              });
              const { user: refreshed } = await me();
              onSuccess?.(refreshed);
              resolve();
            } catch (err) {
              reject(err instanceof Error ? err : new Error("Verification failed"));
            }
          },
          modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
        });
        rzp.on("payment.failed", (r) => {
          reject(new Error(r.error?.description ?? "Payment failed"));
        });
        rzp.open();
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment failed";
      if (message !== "Payment cancelled") setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={() => void startCheckout()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
        {loading ? "Opening Razorpay…" : "Pay ₹1 — set up autopay"}
      </button>
      <p className="mt-2 text-xs text-foreground-subtle">
        ₹{monthlyInr}/month starts automatically after your 30-day trial.
      </p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
