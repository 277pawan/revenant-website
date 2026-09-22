import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Coffee } from "lucide-react";
import { Button } from "../ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../../lib/cn";
import { appLink } from "../../lib/site";
import {
  DocsSearchDialog,
  DocsSearchTrigger,
  useDocsSearchShortcut,
} from "../docs/DocsSearch";

const NAV = [
  { to: "/docs", label: "Docs" },
  { to: "/cli", label: "CLI" },
  { to: "/pricing", label: "Pricing" },
  { to: "/talk", label: "Talk to us" },
  { to: "/coffee", label: "Fund us", icon: Coffee },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-[18px]" aria-hidden>
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out",
          open ? "top-[7px] rotate-45" : "top-0",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-[7px] block h-0.5 w-full rounded-full bg-current transition-opacity duration-200",
          open ? "opacity-0" : "opacity-100",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out",
          open ? "top-[7px] -rotate-45" : "top-[14px]",
        )}
      />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const onDocs = pathname.startsWith("/docs");

  const openSearch = useCallback(() => {
    if (!pathname.startsWith("/docs")) return;
    setSearchOpen(true);
  }, [pathname]);

  useDocsSearchShortcut(openSearch);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const menu = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-14 z-[70] sm:top-16 md:hidden">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
            className="absolute inset-y-0 right-0 flex w-[min(20rem,86vw)] flex-col border-l border-border bg-background shadow-2xl"
          >
            <div className="flex h-14 shrink-0 items-center border-b border-border-subtle px-5">
              <span className="font-semibold text-foreground">Menu</span>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-xl px-3 py-3 text-base",
                      isActive
                        ? "bg-accent-muted font-medium text-accent-bright"
                        : "text-foreground hover:bg-surface-elevated",
                    )
                  }
                >
                  {item.icon && <item.icon size={16} />}
                  {item.label}
                </NavLink>
              ))}
              <a
                href={appLink("/login")}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-foreground hover:bg-surface-elevated"
              >
                Cloud dashboard
              </a>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-foreground hover:bg-surface-elevated"
              >
                Sign in
              </Link>
              <Button href="/register" className="mt-3 w-full">
                Start free trial
              </Button>
            </nav>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-full items-center justify-between gap-2 px-3 sm:h-16 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="min-w-0 shrink md:justify-self-start">
          <img
            src="/Revenant_verify_logo.png"
            alt="Revenant"
            className="h-8 w-auto max-w-[min(148px,calc(100vw-9.5rem))] object-contain object-left sm:h-11 sm:max-w-[200px] md:h-12 md:max-w-[240px]"
          />
        </Link>

        <nav className="hidden items-center gap-1 justify-self-center md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-accent-muted font-medium text-accent-bright"
                    : "text-foreground-muted hover:bg-surface-elevated hover:text-foreground",
                )
              }
            >
              {item.icon && <item.icon size={14} />}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1 md:justify-self-end">
          {onDocs && (
            <DocsSearchTrigger
              compact
              className="lg:hidden"
              onOpen={() => setSearchOpen(true)}
            />
          )}
          {onDocs && (
            <DocsSearchTrigger
              className="hidden max-w-[220px] lg:inline-flex"
              onOpen={() => setSearchOpen(true)}
            />
          )}
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" href={appLink("/login")} external>
              Cloud dashboard
            </Button>
            <Button variant="ghost" href="/login">
              Sign in
            </Button>
            <Button href="/register" size="sm">
              Start free trial
            </Button>
          </div>
          <button
            type="button"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-elevated hover:text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </div>

      {typeof document !== "undefined" && createPortal(menu, document.body)}

      <DocsSearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
