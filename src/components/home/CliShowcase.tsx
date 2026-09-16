import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { site } from "../../lib/site";

const LINES = [
  { type: "prompt", text: "$ revenant init --url $DATABASE_URL" },
  { type: "out", text: "✓ Introspected 12 tables → revenant.yaml" },
  { type: "prompt", text: "$ revenant verify --config revenant.yaml" },
  { type: "out", text: "→ Connecting to source Postgres…" },
  { type: "out", text: "→ Creating RDS sandbox from snapshot…" },
  { type: "success", text: "✓ schema_check      users (12 cols)" },
  { type: "success", text: "✓ row_count         orders ≥ 1,000" },
  { type: "success", text: "✓ golden_query      revenue matches" },
  { type: "info", text: "RTO: 4m 12s · evidence/report.json" },
  { type: "out", text: "→ Reaping sandbox… done." },
];

const LINE_CLASS: Record<string, string> = {
  prompt: "text-terminal-prompt",
  success: "text-terminal-success",
  info: "text-terminal-info",
  out: "text-terminal-muted",
};

export function CliShowcase() {
  const [copied, setCopied] = useState(false);
  const installCmd =
    "curl -fsSL https://github.com/277pawan/revenant-cli/releases/latest/download/revenant_linux_amd64.tar.gz | tar -xz && sudo install revenant /usr/local/bin/";

  const copy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="ui-section-label">Free CLI</p>
            <h2 className="ui-heading mt-2 text-3xl sm:text-4xl">
              One command.
              <br />
              Real restore proof.
            </h2>
            <p className="mt-4 ui-body">
              The same engine that powers Revenant Cloud runs in your terminal
              and GitHub Actions. No account required.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/docs/cli/install">Full CLI docs</Button>
              <Button variant="secondary" href={site.githubAction} external>
                GitHub Action
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-terminal-border bg-terminal-bg shadow-card">
            <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-error/70" />
              <span className="h-3 w-3 rounded-full bg-warning/70" />
              <span className="h-3 w-3 rounded-full bg-success/70" />
              <span className="ml-2 font-mono text-xs text-foreground-subtle">
                ~/prod-api — revenant verify
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              {LINES.map((line, i) => (
                <div key={i} className={LINE_CLASS[line.type] ?? "text-terminal-muted"}>
                  {line.text}
                </div>
              ))}
              <div className="mt-1 cursor-blink text-terminal-prompt" />
            </div>
          </div>
        </div>

        <div className="ui-card mt-8 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <code className="break-all font-mono text-xs text-foreground-muted sm:text-sm">
            {installCmd}
          </code>
          <button
            type="button"
            onClick={copy}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs text-foreground-muted hover:bg-surface-elevated"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </section>
  );
}
