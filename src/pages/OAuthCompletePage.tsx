import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { OAUTH_MESSAGE_TYPE } from "../lib/oauth-popup";
import { fetchSessionToken, goToAppWithSession } from "../lib/api";
import { TOKEN_KEY } from "../lib/session";
import { trackEngagement } from "../lib/engagement";
import { PageMeta } from "../components/seo/PageMeta";
import { oauthCompleteSeo } from "../lib/seo-pages";

export function OAuthCompletePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Completing sign-in…");
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const popup = searchParams.get("popup") === "1";
    const oauthError = searchParams.get("oauth_error");

    if (oauthError) {
      if (oauthError === "Sign-in failed. Please try again.") {
        void fetchSessionToken().then((token) => {
          if (token) finishSignIn(token);
          else showSignInError(oauthError);
        });
      } else {
        showSignInError(oauthError);
      }
      return;
    }

    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    let token = hash.get("token");

    if (!token) {
      void fetchSessionToken().then((sessionToken) => {
        if (sessionToken) {
          finishSignIn(sessionToken);
          return;
        }
        showSignInError();
      });
      return;
    }

    finishSignIn(token);

    function showSignInError(error = "Sign-in failed. Please try again.") {
      if (popup && window.opener) {
        window.opener.postMessage(
          { type: OAUTH_MESSAGE_TYPE, error },
          window.location.origin
        );
        window.close();
      } else {
        navigate(`/login?oauth_error=${encodeURIComponent(error)}`, { replace: true });
      }
    }

    function finishSignIn(sessionToken: string) {
      localStorage.setItem(TOKEN_KEY, sessionToken);
      void trackEngagement("marketing", { eventType: "login" });

      if (popup && window.opener) {
        window.opener.postMessage(
          { type: OAUTH_MESSAGE_TYPE, token: sessionToken },
          window.location.origin
        );
        setMessage("Signed in — closing…");
        window.close();
        return;
      }

      setMessage("Signed in — opening dashboard…");
      goToAppWithSession(sessionToken);
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-foreground-muted">
      <PageMeta {...oauthCompleteSeo} />
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
