import { Link } from "react-router-dom";
import { DOC_SECTIONS } from "../content/docs";
import { BookOpen } from "lucide-react";

export function DocsIndexPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="ui-heading text-3xl">Documentation</h1>
        <p className="mt-2 text-foreground-muted">
          CLI, AWS restore, evidence exports, Slack/webhooks, and cloud
          schedules. Add a module under{" "}
          <code className="rounded bg-accent-muted px-1 font-mono text-xs text-accent-bright">
            src/content/docs/sections/
          </code>{" "}
          — navigation and search update automatically. Press{" "}
          <kbd className="rounded border border-border px-1.5 font-mono text-xs">
            Ctrl+K
          </kbd>{" "}
          to search.
        </p>
      </div>

      <div className="space-y-8">
        {DOC_SECTIONS.map((section) => (
          <section key={section.id} className="ui-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            <p className="mt-1 text-sm text-foreground-subtle">{section.description}</p>
            <ul className="mt-4 divide-y divide-border">
              {section.modules.map((mod) => (
                <li key={mod.slug}>
                  <Link
                    to={`/docs/${section.id}/${mod.slug}`}
                    className="flex items-start gap-3 py-3 transition-colors hover:text-accent-bright"
                  >
                    <BookOpen size={18} className="mt-0.5 shrink-0 text-accent-bright" />
                    <div>
                      <div className="font-medium text-foreground">{mod.title}</div>
                      <div className="text-sm text-foreground-subtle">{mod.summary}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
