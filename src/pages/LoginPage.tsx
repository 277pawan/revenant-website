import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  getAuthProviders,
  goToAppWithSession,
  login,
  me,
  type AuthProviderInfo,
} from "../lib/api";
import { trackEngagement } from "../lib/engagement";
import { Button } from "../components/ui/Button";
import { OAuthButtons } from "../components/auth/OAuthButtons";
import { PageMeta } from "../components/seo/PageMeta";
import { loginSeo } from "../lib/seo-pages";
import { consumeTokenFromHash, TOKEN_KEY } from "../lib/session";
import { openCloudDashboard } from "../lib/cloud-navigation";
import { canAccessCloudDashboard } from "../lib/subscription-access";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get("oauth_error") ?? "");
  const [providers, setProviders] = useState<AuthProviderInfo[]>([]);

  useEffect(() => {
    consumeTokenFromHash();
    const next = searchParams.get("next") || "/billing";
    void me()
      .then(({ user }) => {
        if (canAccessCloudDashboard(user)) {
          void openCloudDashboard(localStorage.getItem(TOKEN_KEY));
          return;
        }
        navigate(next, { replace: true });
      })
      .catch(() => {});
  }, [navigate, searchParams]);

  useEffect(() => {
    void getAuthProviders()
      .then((r) =>
        setProviders(
          r.providers.filter(
            (p) => p.id === "google" || p.id === "github" || p.id === "microsoft"
          ),
        ),
      )
      .catch(() =>
        setProviders([
          {
            id: "google",
            label: "Google",
            status: "live",
            authorizePath: "/api/v1/auth/oauth/google/start",
          },
          {
            id: "github",
            label: "GitHub",
            status: "live",
            authorizePath: "/api/v1/auth/oauth/github/start",
          },
        ]),
      );
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email.trim(), password);
      await trackEngagement("marketing", {
        eventType: "login",
        userId: res.user.id,
        userEmail: res.user.email,
      });
      goToAppWithSession(res.token, res.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <PageMeta {...loginSeo} />
      <div className="ui-card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <img
            src="/Revenant_verify_logo.png"
            alt=""
            className="mx-auto h-16 w-auto max-w-[280px] object-contain"
          />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-foreground-subtle">
            Active Starter trial required for the cloud dashboard. New accounts:
            register for 30 days free.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ui-input"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ui-input"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Sign in
          </Button>
        </form>

        <div className="mt-5">
          <OAuthButtons
            providers={providers}
            onUnavailable={(label) =>
              setError(`${label} sign-in is not configured yet.`)
            }
            onSuccess={(token) => {
              void trackEngagement("marketing", { eventType: "login" });
              void me()
                .then((r) => goToAppWithSession(token, r.user))
                .catch(() => goToAppWithSession(token));
            }}
            onError={setError}
          />
        </div>

        <p className="mt-6 text-center text-sm text-foreground-subtle">
          No account?{" "}
          <Link
            to="/register"
            className="font-medium text-accent-bright hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
