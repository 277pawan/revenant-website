import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { ApiError, me, type AuthUser } from "../lib/api";
import { RazorpayStarterCheckout } from "../components/billing/RazorpayStarterCheckout";
import { openCloudDashboard } from "../lib/cloud-navigation";
import { canAccessCloudDashboard } from "../lib/subscription-access";
import { Button } from "../components/ui/Button";
import { PageMeta } from "../components/seo/PageMeta";
import { STARTER_PRICE_INR } from "../lib/plans";
import { site } from "../lib/site";
import { consumeTokenFromHash, clearSessionToken, TOKEN_KEY } from "../lib/session";

export function BillingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSession = useCallback(async () => {
    consumeTokenFromHash();

    try {
      const { user: sessionUser } = await me();
      setUser(sessionUser);
      setError("");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearSessionToken();
        navigate("/login?next=/billing", { replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : "Could not load your session");
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
        <p className="text-sm text-red-600">{error || "Could not load billing."}</p>
        <Button href="/login?next=/billing" className="mt-4">Sign in</Button>
      </div>
    );
  }

  const ready = canAccessCloudDashboard(user);

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <PageMeta
        title="Starter billing"
        description="Set up Revenant Cloud autopay with a one-time ₹1 card verification."
        path="/billing"
        robots="noindex,nofollow"
      />

      <div className="ui-card p-8">
        {ready ? (
          <>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Autopay is active</h1>
            <p className="mt-2 text-sm text-foreground-muted">
              {user.organizationName} · {user.email}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              You are signed in here and on the cloud dashboard with the same token. ₹
              {STARTER_PRICE_INR}/month starts after your trial.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button onClick={() => void openCloudDashboard(localStorage.getItem(TOKEN_KEY))}>
                Open cloud dashboard
              </Button>
              <Button href="/pricing" variant="secondary">View pricing</Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">Set up Starter autopay</h1>
            <p className="mt-2 text-sm text-foreground-muted">
              Signed in as <strong>{user.email}</strong> · {user.organizationName}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
              <li>· <strong>₹1 today</strong> — verifies your card (not ₹{STARTER_PRICE_INR})</li>
              <li>· Unlocks the cloud dashboard immediately</li>
              <li>· <strong>₹{STARTER_PRICE_INR}/month</strong> after your 30-day free trial</li>
            </ul>
            {user.role === "admin" ? (
              <div className="mt-6">
                <RazorpayStarterCheckout user={user} onSuccess={handlePaid} />
              </div>
            ) : (
              <p className="mt-6 text-sm text-amber-700">
                Ask an organization admin to complete billing for {user.organizationName}.
              </p>
            )}
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          </>
        )}
        <p className="mt-8 text-xs text-foreground-subtle">
          Not you?{" "}
          <Link
            to="/login?next=/billing"
            className="text-accent-bright hover:underline"
            onClick={() => clearSessionToken()}
          >
            Switch account
          </Link>
          {" · "}
          <a href={site.appUrl} className="text-accent-bright hover:underline">Cloud app</a>
        </p>
      </div>
    </div>
  );
}
