import { Link, Outlet, useLocation } from "react-router-dom";
import { DOC_SECTIONS } from "../../content/docs";

export function DocsLayout() {
  const { pathname } = useLocation();

  return (
    <div className="ui-shell">
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/revenant_logo.svg" alt="" className="h-7 w-7 rounded-lg" />
            <span className="font-semibold text-foreground">Revenant</span>
            <span className="text-foreground-subtle">/</span>
            <span className="text-sm text-foreground-muted">Docs</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/login" className="text-foreground-muted hover:text-accent-bright">
              Sign in
            </Link>
            <Link to="/" className="text-foreground-subtle hover:text-accent-bright">
              Home
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8 sm:px-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-20 space-y-6">
            {DOC_SECTIONS.map((section) => (
              <div key={section.id}>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                  {section.title}
                </p>
                <ul className="mt-2 space-y-1">
                  {section.modules.map((mod) => {
                    const href = `/docs/${section.id}/${mod.slug}`;
                    const active = pathname === href;
                    return (
                      <li key={mod.slug}>
                        <Link
                          to={href}
                          className={`block rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                            active
                              ? "bg-accent-muted font-medium text-accent-bright"
                              : "text-foreground-muted hover:bg-surface-elevated hover:text-foreground"
                          }`}
                        >
                          {mod.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
