import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchDocs } from "../../content/docs/search";
import { cn } from "../../lib/cn";

export function DocsSearchTrigger({
  className,
  onOpen,
}: {
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-border bg-surface-sunken px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      <Search size={15} />
      <span className="hidden sm:inline">Search docs</span>
      <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-foreground-subtle sm:inline">
        Ctrl K
      </kbd>
    </button>
  );
}

export function DocsSearchDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => searchDocs(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = useCallback(
    (href: string) => {
      onClose();
      navigate(href);
    },
    [navigate, onClose],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[active]) {
        e.preventDefault();
        go(results[active].href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, go, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <div className="flex items-center gap-2 border-b border-border-subtle px-3 py-2.5">
          <Search size={18} className="shrink-0 text-foreground-subtle" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, checks, AWS, Slack…"
            className="min-w-0 flex-1 bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-foreground-subtle"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-elevated"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="max-h-[min(50vh,360px)] overflow-y-auto py-2">
          {query.trim() === "" && (
            <li className="px-4 py-6 text-center text-sm text-foreground-subtle">
              Type to search. All words must match (e.g.{" "}
              <span className="font-mono text-foreground-muted">revenant verify</span>
              ).
            </li>
          )}
          {query.trim() !== "" && results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-foreground-subtle">
              No pages match. Try fewer or different terms.
            </li>
          )}
          {results.map((hit, i) => (
            <li key={hit.href}>
              <button
                type="button"
                onClick={() => go(hit.href)}
                className={cn(
                  "flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors",
                  i === active
                    ? "bg-accent-muted"
                    : "hover:bg-surface-elevated",
                )}
              >
                <span className="text-sm font-medium text-foreground">
                  {hit.title}
                </span>
                <span className="text-xs text-foreground-subtle">
                  {hit.sectionTitle} · {hit.summary}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function useDocsSearchShortcut(onOpen: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpen]);
}
