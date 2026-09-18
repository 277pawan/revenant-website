import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Coffee } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/cn";

const NAV = [
  { to: "/docs", label: "Docs" },
  { to: "/pricing", label: "Pricing" },
  { to: "/talk", label: "Talk to us" },
  { to: "/coffee", label: "Fund us", icon: Coffee },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-full items-center justify-between px-4 py-3.5 sm:px-6">
        <Link to="/" className="flex items-center">
          <img
            src="/revenant_logo.svg"
            alt="Revenant"
            className="h-16 w-16 rounded-lg"
          />
          <span className="text-2xl relative right-4 font-semibold tracking-tight text-foreground">
            evenant
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors",
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
    </header>
  );
}
