import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ApiError, me, selectBillingPlan, type AuthUser } from "../lib/api";
import { RazorpayStarterCheckout } from "../components/billing/RazorpayStarterCheckout";
import { openCloudDashboard } from "../lib/cloud-navigation";
import { canAccessCloudDashboard } from "../lib/subscription-access";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/seo/PageMeta";
import { PRO_PRICE_INR, STARTER_PRICE_INR } from "../lib/plans";
import {
  consumeTokenFromHash,
  clearSessionToken,
  TOKEN_KEY,
} from "../lib/session";

function orgPlan(user: AuthUser): "starter" | "pro" {
  return user.organizationPlan === "pro" ? "pro" : "starter";
}

export function BillingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetPlan = searchParams.get("plan") === "pro" ? "pro" : "starter";
  const upgradeMode = searchParams.get("upgrade") === "1";
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const planSelected = useRef(false);

  const loadSession = useCallback(async () => {
    consumeTokenFromHash();

    try {
      const { user: sessionUser } = await me();
      setUser(sessionUser);
      setError("");
      return sessionUser;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearSessionToken();
        navigate("/login?next=/billing", { replace: true });
        return null;
      }
      setError(
        err instanceof Error ? err.message : "Could not load your session",
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (loading || !user || searchParams.get("open") !== "cloud") return;
    if (!canAccessCloudDashboard(user)) return;
    void openCloudDashboard(localStorage.getItem(TOKEN_KEY));
  }, [loading, user, searchParams]);

  useEffect(() => {
    if (
      loading ||
      !user ||
      upgradeMode ||
      canAccessCloudDashboard(user) ||
      planSelected.current
    ) {
      return;
    }
    if (targetPlan === "pro" && orgPlan(user) !== "pro") {
      planSelected.current = true;
      void selectBillingPlan("pro")
        .then(() => loadSession())
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Could not select Pro plan");
        });
    }
  }, [loading, user, targetPlan, upgradeMode, loadSession]);

  function handlePaid(refreshed: AuthUser) {
    setUser(refreshed);
    if (canAccessCloudDashboard(refreshed)) {
      void openCloudDashboard(localStorage.getItem(TOKEN_KEY));
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-foreground-muted">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <p className="text-sm text-red-600">
          {error || "Could not load billing."}
        </p>
        <Button href="/login?next=/billing" className="mt-4">
          Sign in
        </Button>
      </div>
    );
  }

  const ready = canAccessCloudDashboard(user);
  const currentPlan = orgPlan(user);
  const showProUpgrade =
    upgradeMode && ready && currentPlan === "starter" && user.role === "admin";
  const checkoutPlan = targetPlan === "pro" || currentPlan === "pro" ? "pro" : "starter";
  const monthlyInr = checkoutPlan === "pro" ? PRO_PRICE_INR : STARTER_PRICE_INR;

  return (
    <div className="billing-page mx-auto max-w-lg px-4 py-12 sm:px-6">
      <PageMeta
        title={showProUpgrade ? "Upgrade to Pro" : "Starter billing"}
        description="Set up Revenant Cloud autopay with a one-time ₹1 card verification."
        path="/billing"
        robots="noindex,nofollow"
      />

      <div className="ui-card p-8">
        {showProUpgrade ? (
          <>
            <h1 className="text-2xl font-bold text-foreground">Upgrade to Pro</h1>
            <p className="mt-2 text-sm text-foreground-muted">
              {user.organizationName} · {user.email}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
              <li>· Up to 10 workflows and 3 parallel restore drills</li>
              <li>· Slack, HTTP integrations, and 1-year evidence retention</li>
              <li>
                · <strong>₹1 today</strong> in Razorpay to authorize the Pro subscription
              </li>
              <li>
                · <strong>₹{PRO_PRICE_INR}/month</strong> after your current trial
              </li>
            </ul>
            <div className="mt-6">
              <RazorpayStarterCheckout
                user={user}
                billingPlan="pro"
                checkoutKind="pro_upgrade"
                onSuccess={(refreshed) => {
                  setUser(refreshed);
                  setError("");
                }}
              />
            </div>
            <div className="mt-4">
              <Button href="/pricing" variant="secondary">
                Compare plans
              </Button>
            </div>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </>
        ) : ready ? (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Autopay is active
            </h1>
            <p className="mt-2 text-sm text-foreground-muted">
              {user.organizationName} · {user.email}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              You are on <strong>{currentPlan === "pro" ? "Pro" : "Starter"}</strong>.
              ₹{monthlyInr}/month starts after your trial.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() =>
                  void openCloudDashboard(localStorage.getItem(TOKEN_KEY))
                }
              >
                Open cloud dashboard
              </Button>
              {currentPlan === "starter" && user.role === "admin" && (
                <Button href="/billing?plan=pro&upgrade=1" variant="secondary">
                  Upgrade to Pro
                </Button>
              )}
              <Button href="/pricing" variant="secondary">
                View pricing
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">
              {checkoutPlan === "pro" ? "Set up Pro autopay" : "Set up Starter autopay"}
            </h1>
            <p className="mt-2 text-sm text-foreground-muted">
              Signed in as <strong>{user.email}</strong> ·{" "}
              {user.organizationName}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
              <li>
                · <strong>₹1 today</strong> — verifies your card (not ₹
                {monthlyInr})
              </li>
              <li>· Unlocks the cloud dashboard immediately</li>
              <li>
                · <strong>₹{monthlyInr}/month</strong> after your 30-day free
                trial
              </li>
            </ul>
            {user.role === "admin" ? (
              <div className="mt-6">
                <RazorpayStarterCheckout
                  user={user}
                  billingPlan={checkoutPlan}
                  onSuccess={handlePaid}
                />
              </div>
            ) : (
              <p className="mt-6 text-sm text-amber-700">
                Ask an organization admin to complete billing for{" "}
                {user.organizationName}.
              </p>
            )}
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}
