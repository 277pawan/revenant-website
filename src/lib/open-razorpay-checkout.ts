import type { BillingCreateOrderResponse } from "./api";
import { resolveRazorpayKeyId } from "./razorpay";

type RazorpayHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature: string;
};

type OpenRazorpayCheckoutInput = {
  order: BillingCreateOrderResponse;
  prefill: { email: string; name?: string };
  onPaid: (response: RazorpayHandlerResponse) => Promise<void>;
};

/** Opens the standard Razorpay modal overlay (order or subscription checkout). */
export async function openRazorpayCheckout({
  order,
  prefill,
  onPaid,
}: OpenRazorpayCheckoutInput): Promise<void> {
  const Razorpay = window.Razorpay;
  if (!Razorpay) throw new Error("Razorpay failed to load");

  const keyId = resolveRazorpayKeyId(order.keyId);
  const useSubscription =
    order.checkoutMode === "subscription" && Boolean(order.subscriptionId);

  await new Promise<void>((resolve, reject) => {
    const logoUrl = `${window.location.origin}/revenant_logo.svg`;

    const options: Record<string, unknown> = {
      key: keyId,
      name: "Revenant",
      description: order.description,
      image: logoUrl,
      prefill: {
        ...prefill,
        email: prefill.email,
      },
      theme: { color: "#2563eb", backdrop_color: "#07080bcc" },
      handler: async (response: RazorpayHandlerResponse) => {
        try {
          await onPaid(response);
          resolve();
        } catch (err) {
          reject(err instanceof Error ? err : new Error("Verification failed"));
        }
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled")),
        escape: true,
        backdropclose: true,
        confirm_close: true,
      },
    };

    if (useSubscription) {
      options.subscription_id = order.subscriptionId;
    } else {
      options.amount = order.amount;
      options.currency = order.currency;
      options.order_id = order.orderId;
    }

    const rzp = new Razorpay(options);
    rzp.on("payment.failed", (r) => {
      reject(new Error(r.error?.description ?? "Payment failed"));
    });
    rzp.open();
  });
}
