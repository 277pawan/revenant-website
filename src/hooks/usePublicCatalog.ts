import { useEffect, useState } from "react";
import { fetchPublicCatalog } from "../lib/api";
import type { PublicCatalogResponse } from "../lib/catalog";

export function usePublicCatalog() {
  const [catalog, setCatalog] = useState<PublicCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetchPublicCatalog()
      .then((data) => {
        if (!cancelled) setCatalog(data);
      })
      .catch(() => {
        if (!cancelled) setCatalog(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { catalog, loading };
}
