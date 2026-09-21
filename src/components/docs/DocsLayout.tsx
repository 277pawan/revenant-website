import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { DOC_SECTIONS } from "../../content/docs";
import { cn } from "../../lib/cn";

function moduleHref(sectionId: string, slug: string) {
  return `/docs/${sectionId}/${slug}`;
}

function isModuleActive(pathname: string, sectionId: string, slug: string) {
  const href = moduleHref(sectionId, slug);
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isSectionActive(pathname: string, sectionId: string) {
  return pathname.startsWith(`/docs/${sectionId}/`);
}

export function DocsLayout() {
  const { pathname } = useLocation();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!navOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [navOpen]);

  const navLinkClass = (active: boolean) =>
    cn(
      "block rounded-r-lg border-l-2 py-2 pl-2.5 pr-2 text-sm transition-colors",
      active
        ? "border-accent bg-accent-muted font-semibold text-foreground"
        : "border-transparent text-foreground-muted hover:border-border-strong hover:bg-surface-elevated hover:text-foreground",
    );

  const toc = (
    <>
      {DOC_SECTIONS.map((section) => {
        const sectionOn = isSectionActive(pathname, section.id);
        return (
          <div key={section.id} className="mb-5 last:mb-0">
            <p
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wider",
                sectionOn
                  ? "bg-accent-muted text-accent-bright"
                  : "text-foreground-subtle",
              )}
            >
              {section.title}
            </p>
            <ul className="mt-2 space-y-0.5">
              {section.modules.map((mod) => {
                const active = isModuleActive(pathname, section.id, mod.slug);
                return (
                  <li key={mod.slug}>
                    <Link
                      to={moduleHref(section.id, mod.slug)}
                      onClick={() => setNavOpen(false)}
                      className={navLinkClass(active)}
                    >
                      {mod.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
      <div className="sticky top-14 z-30 -mx-4 mb-4 border-b border-border-subtle bg-background/95 px-4 py-2 backdrop-blur-md lg:hidden">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium text-foreground"
          onClick={() => setNavOpen(true)}
        >
          <Menu size={18} />
          Contents
        </button>
      </div>

      {navOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Close contents"
            onClick={() => setNavOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,90vw)] flex-col bg-background shadow-2xl">
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-subtle px-4">
              <span className="font-semibold text-foreground">Docs</span>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-elevated"
                onClick={() => setNavOpen(false)}
                aria-label="Close contents"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto overscroll-contain p-4">
              {toc}
            </nav>
          </aside>
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-[4.75rem] max-h-[calc(100vh-6rem)] space-y-6 overflow-y-auto pr-2">
            {toc}
          </nav>
        </aside>

        <div className="min-w-0 flex-1 pb-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
