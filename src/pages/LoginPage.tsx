import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  getAuthProviders,
  goToAppWithSession,
  login,
  type AuthProviderInfo,
} from "../lib/api";
import { trackEngagement } from "../lib/engagement";
import { Button } from "../components/ui/Button";
import { OAuthButtons } from "../components/auth/OAuthButtons";

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(searchParams.get("oauth_error") ?? "");
  const [providers, setProviders] = useState<AuthProviderInfo[]>([]);

  useEffect(() => {
    void getAuthProviders()
      .then((r) => setProviders(r.providers))
      .catch(() =>
        setProviders([
          { id: "google", label: "Google", status: "coming_soon" },
          { id: "github", label: "GitHub", status: "coming_soon" },
        ])
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
      goToAppWithSession(res.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="ui-card w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <img src="/revenant_logo.svg" alt="" className="mx-auto h-12 w-12 rounded-xl" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Sign in</h1>
          <p className="mt-1 text-sm text-foreground-subtle">
            Same account as Revenant Cloud — continues to the dashboard.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground-muted">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="ui-input" autoComplete="email" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground-muted">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="ui-input" autoComplete="current-password" />
          </div>
          {error && <p className="text-sm text-error" role="alert">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Sign in
          </Button>
        </form>

        <div className="mt-5">
          <OAuthButtons
            providers={providers}
            onUnavailable={(label) => setError(`${label} sign-in is not configured yet.`)}
            onSuccess={(token) => {
              void trackEngagement("marketing", { eventType: "login" });
              goToAppWithSession(token);
            }}
            onError={setError}
          />
        </div>

        <p className="mt-6 text-center text-sm text-foreground-subtle">
          No account?{" "}
          <Link to="/register" className="font-medium text-accent-bright hover:underline">
            Start free trial
          </Link>
        </p>
      </div>
    </div>
  );
}
