import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import {
  Loader2,
  Mail,
  Phone,
  Linkedin,
  Github,
  Check,
  CreditCard,
} from "lucide-react";
import { createFundingOrder, verifyFundingPayment } from "../lib/api";
import { loadRazorpayCheckout } from "../lib/razorpay";
import { PageMeta } from "../components/seo/PageMeta";
import { coffeeSeo } from "../lib/seo-pages";
import { site } from "../lib/site";
import { Button } from "../components/ui/Button";

const AMOUNTS = [
  { inr: 99, label: "₹99", note: "One coffee" },
  { inr: 299, label: "₹299", note: "A few coffees" },
  { inr: 999, label: "₹999", note: "Serious support" },
  { inr: 2499, label: "₹2,499", note: "Fuel a sprint" },
];

function Steam() {
  return (
    <div className="pointer-events-none absolute -top-7 left-1/2 flex -translate-x-1/2 gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="steam-wisp h-8 w-1 rounded-full bg-accent/50"
          style={{ animationDelay: `${i * 0.45}s` }}
        />
      ))}
    </div>
  );
}

export function CoffeePage() {
  const [amount, setAmount] = useState(299);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [paidAmount, setPaidAmount] = useState(0);
  const [error, setError] = useState("");

  const selected =
    custom.trim() && Number(custom) > 0 ? Number(custom) : amount;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!selected || selected < 1) {
      setError("Pick or enter an amount.");
      return;
    }
    setLoading(true);
    try {
      await loadRazorpayCheckout();
      const { order } = await createFundingOrder({
        name: name.trim(),
        email: email.trim(),
        amountInr: selected,
        note: note.trim() || undefined,
      });

      const Razorpay = window.Razorpay;
      if (!Razorpay) throw new Error("Razorpay failed to load");

      const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID?.trim() || order.keyId;

      await new Promise<void>((resolve, reject) => {
        const rzp = new Razorpay({
          key: keyId,
          name: "Revenant",
          description: order.description,
          amount: order.amount,
          currency: order.currency,
          order_id: order.orderId,
          prefill: { email: email.trim(), name: name.trim() },
          theme: { color: "#3b82f6" },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              const result = await verifyFundingPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              setPaidAmount(result.amountInr);
              setDone(true);
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
    <div className="px-4 py-16 sm:px-6 sm:py-20">
      <PageMeta {...coffeeSeo} />
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border-strong bg-accent-muted">
            <Steam />
            <span className="text-3xl" aria-hidden>
              ☕
            </span>
          </div>
          <h1 className="ui-heading text-4xl">Fund Revenant</h1>
          <p className="mx-auto mt-4 max-w-xl text-foreground-muted leading-relaxed">
            One-time support via Razorpay — card, UPI, or netbanking. Not a
            subscription. Helps us ship open-source DR tooling faster.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ui-card p-6"
          >
            {done ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success-muted text-success">
                  <Check size={24} />
                </div>
                <p className="mt-4 text-lg font-semibold text-foreground">
                  Thank you — payment received
                </p>
                <p className="mt-2 text-sm text-foreground-muted">
                  ₹{paidAmount.toLocaleString("en-IN")} from{" "}
                  <strong>{email}</strong>. We sent a confirmation email.
                </p>
                <Button
                  variant="secondary"
                  className="mt-6"
                  onClick={() => {
                    setDone(false);
                    setPaidAmount(0);
                  }}
                >
                  Support again
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium text-foreground-muted">
                    Choose amount
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {AMOUNTS.map((a) => {
                      const on = !custom && amount === a.inr;
                      return (
                        <button
                          key={a.inr}
                          type="button"
                          onClick={() => {
                            setAmount(a.inr);
                            setCustom("");
                          }}
                          className={`relative overflow-hidden rounded-xl border px-3 py-3 text-left transition ${
                            on
                              ? "border-accent ring-2 ring-accent/20"
                              : "border-border hover:border-border-strong"
                          }`}
                        >
                          <motion.span
                            className="absolute inset-x-0 bottom-0 bg-accent-muted"
                            initial={false}
                            animate={{ height: on ? "100%" : "0%" }}
                            transition={{ duration: 0.35 }}
                          />
                          <div className="relative font-semibold text-foreground">
                            {a.label}
                          </div>
                          <div className="relative text-[11px] text-foreground-subtle">
                            {a.note}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-3">
                    <label className="mb-1.5 block text-xs text-foreground-subtle">
                      Or custom amount (INR)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={custom}
                      onChange={(e) => setCustom(e.target.value)}
                      className="ui-input"
                      placeholder="e.g. 500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
                    Your name
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="ui-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
                    Email (receipt)
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ui-input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
                    Note (optional)
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="ui-input resize-none"
                    placeholder="Anything you want us to know"
                  />
                </div>

                {error && (
                  <p className="text-sm text-error" role="alert">
                    {error}
                  </p>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <CreditCard size={16} />
                  )}
                  Pay ₹{selected.toLocaleString("en-IN")} with Razorpay
                </Button>
                <p className="text-center text-xs text-foreground-subtle">
                  Secure checkout · one-time payment · no subscription
                </p>
              </form>
            )}
          </motion.div>

          <div className="space-y-4">
            <div className="ui-card p-6">
              <h3 className="font-semibold text-foreground">Contact</h3>
              <div className="mt-4 space-y-3 text-sm text-foreground-muted">
                <a
                  href={`mailto:${site.founder.email}`}
                  className="flex items-center gap-3 hover:text-accent-bright"
                >
                  <Mail size={16} className="text-accent-bright" />
                  {site.founder.email}
                </a>
                <a
                  href={`tel:+91${site.founder.phone}`}
                  className="flex items-center gap-3 hover:text-accent-bright"
                >
                  <Phone size={16} className="text-accent-bright" />
                  {site.founder.phoneDisplay}
                </a>
                <a
                  href={site.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent-bright"
                >
                  <Linkedin size={16} className="text-accent-bright" />
                  LinkedIn — Revenant
                </a>
                <a
                  href={site.githubCli}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent-bright"
                >
                  <Github size={16} className="text-accent-bright" />
                  revenant-cli on GitHub
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-border-strong bg-accent-muted p-6 text-sm text-foreground-muted">
              Building DR tooling takes real time and AWS spend. Stars on GitHub
              and funding both help keep Revenant moving.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
