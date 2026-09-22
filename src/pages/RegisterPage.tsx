import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  getAuthProviders,
  goToAppWithSession,
  me,
  register,
  type AuthProviderInfo,
} from "../lib/api";
import { trackEngagement } from "../lib/engagement";
import { Button } from "../components/ui/Button";
import { OAuthButtons } from "../components/auth/OAuthButtons";
import { PageMeta } from "../components/seo/PageMeta";
import { registerSeo } from "../lib/seo-pages";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [providers, setProviders] = useState<AuthProviderInfo[]>([]);

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
      const res = await register({
        email: email.trim(),
        password,
        organizationName: organizationName.trim(),
      });
      await trackEngagement("marketing", {
        eventType: "register",
        userId: res.user.id,
        userEmail: res.user.email,
      });
      goToAppWithSession(res.token, res.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-8">
      <PageMeta {...registerSeo} />
      <div className="ui-card w-full max-w-md p-8">
        <div className=" text-center">
          <img
            src="/Revenant_verify_logo.png"
            alt=""
            className="mx-auto h-16 w-auto max-w-[280px] object-contain"
          />
          <h1 className=" text-2xl font-bold text-foreground">
            Start 30-day trial
          </h1>
          <p className="my-2 text-sm text-foreground-subtle">
            Same backend as the cloud app — no card required.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
              Work email
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
              Organization name
            </label>
            <input
              required
              minLength={2}
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="ui-input"
              placeholder="Acme Engineering"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground-muted">
              Password
            </label>
            <input
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ui-input"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Create account
          </Button>
        </form>

        <div className="mt-5">
          <OAuthButtons
            providers={providers}
            onUnavailable={(label) =>
              setError(`${label} sign-up is not configured yet.`)
            }
            onSuccess={(token) => {
              void trackEngagement("marketing", { eventType: "register" });
              void me()
                .then((r) => goToAppWithSession(token, r.user))
                .catch(() => goToAppWithSession(token));
            }}
            onError={setError}
          />
        </div>

        <p className="mt-6 text-center text-sm text-foreground-subtle">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-accent-bright hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
