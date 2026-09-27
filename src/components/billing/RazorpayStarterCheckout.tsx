import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import {
  createBillingOrder,
  createProUpgradeCheckout,
  me,
  verifyBillingPayment,
  type AuthUser,
} from "../../lib/api";
import { openRazorpayCheckout } from "../../lib/open-razorpay-checkout";
import { loadRazorpayCheckout } from "../../lib/razorpay";
import { PRO_PRICE_INR, STARTER_PRICE_INR } from "../../lib/plans";

type CheckoutKind = "autopay_setup" | "pro_upgrade";

type Props = {
  user: AuthUser;
  billingPlan?: "starter" | "pro";
  checkoutKind?: CheckoutKind;
  onSuccess?: (user: AuthUser) => void;
};

export function RazorpayStarterCheckout({
  user,
  billingPlan,
  checkoutKind = "autopay_setup",
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const plan =
    billingPlan ?? (user.organizationPlan === "pro" ? "pro" : "starter");
  const monthlyInr = plan === "pro" ? PRO_PRICE_INR : STARTER_PRICE_INR;
  const isUpgrade = checkoutKind === "pro_upgrade";

  async function startCheckout() {
    if (user.role !== "admin") {
      setError("Only organization admins can set up billing.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await loadRazorpayCheckout();
      const { order } = isUpgrade
        ? await createProUpgradeCheckout()
        : await createBillingOrder(plan);

      await openRazorpayCheckout({
        order,
        prefill: { email: user.email, name: user.organizationName },
        onPaid: async (response) => {
          await verifyBillingPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            razorpay_subscription_id: response.razorpay_subscription_id,
            razorpay_order_id: response.razorpay_order_id,
          });
          const { user: refreshed } = await me();
          onSuccess?.(refreshed);
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment failed";
      if (message !== "Payment cancelled") setError(message);
    } finally {
      setLoading(false);
    }
  }

  const buttonLabel = isUpgrade
    ? loading
      ? "Opening Razorpay…"
      : "Pay ₹1 — upgrade to Pro"
    : loading
      ? "Opening Razorpay…"
      : "Pay ₹1 — set up autopay";

  const helperText = isUpgrade
    ? `Same Razorpay modal as Starter. ₹${PRO_PRICE_INR}/month starts after your trial.`
    : `₹${monthlyInr}/month starts automatically after your 30-day trial.`;

  return (
    <div>
      <button
        type="button"
        disabled={loading}
        onClick={() => void startCheckout()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {loading ? <Loader2 size={16} className="animate-spin" /> : <CreditCard size={16} />}
        {buttonLabel}
      </button>
      <p className="mt-2 text-xs text-foreground-subtle">{helperText}</p>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
