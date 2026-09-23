import { useCallback, useEffect, useState } from "react";
import { ApiError, logout as apiLogout, me, type AuthUser } from "../lib/api";
import { consumeTokenFromHash, clearSessionToken, TOKEN_KEY } from "../lib/session";

export function useWebsiteSession() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    consumeTokenFromHash();

    try {
      const { user: sessionUser } = await me();
      setUser(sessionUser);
      return sessionUser;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearSessionToken();
      }
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  return { user, loading, token, refresh, logout };
}
