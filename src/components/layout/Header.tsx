import { useCallback, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Coffee } from "lucide-react";
import { Button } from "../ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../../lib/cn";
import {
  DocsSearchDialog,
  DocsSearchTrigger,
  useDocsSearchShortcut,
} from "../docs/DocsSearch";

const NAV = [
  { to: "/docs", label: "Docs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/talk", label: "Talk to us" },
  { to: "/coffee", label: "Fund us", icon: Coffee },
];

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

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-full grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:px-6">
        <Link to="/" className="min-w-0 justify-self-start">
          <img
            src="/Revenant_verify_logo.png"
            alt="Revenant"
            className="h-11 w-auto max-w-[200px] object-contain object-left sm:h-12 sm:max-w-[240px]"
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

        <div className="flex items-center justify-end gap-1 justify-self-end sm:gap-2">
          {onDocs && (
            <DocsSearchTrigger
              className="hidden max-w-[220px] lg:inline-flex"
              onOpen={() => setSearchOpen(true)}
            />
          )}
          {onDocs && (
            <div className="lg:hidden">
              <DocsSearchTrigger onOpen={() => setSearchOpen(true)} />
            </div>
          )}
          <ThemeToggle />
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" href="/login">
              Sign in
            </Button>
            <Button href="/register" size="sm">
              Start free trial
            </Button>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-foreground-muted md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border-subtle bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-foreground-muted hover:bg-surface-elevated"
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-foreground-muted hover:bg-surface-elevated"
            >
              Sign in
            </Link>
            <Button href="/register" className="mt-2 w-full">
              Start free trial
            </Button>
          </nav>
        </div>
      )}

      <DocsSearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
