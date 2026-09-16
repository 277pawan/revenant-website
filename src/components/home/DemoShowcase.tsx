import { useState } from "react";
import { Terminal, Cloud, FileCheck, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DEMOS = [
  {
    id: "cli",
    label: "CLI verify",
    icon: Terminal,
    title: "One command in your pipeline",
    content: (
      <pre className="rounded-xl border border-terminal-border bg-terminal-bg p-4 font-mono text-[12px] leading-relaxed text-foreground-muted">
        <span className="text-terminal-prompt">$ revenant verify</span>
        {"\n"}→ Creating RDS sandbox…
        {"\n"}<span className="text-terminal-success">✓ schema_check</span>
        {"\n"}<span className="text-terminal-success">✓ row_count</span>
        {"\n"}<span className="text-terminal-success">✓ golden_query</span>
        {"\n"}<span className="text-terminal-info">RTO: 4m 12s</span>
      </pre>
    ),
  },
  {
    id: "cloud",
    label: "Cloud drill",
    icon: Cloud,
    title: "Managed AWS restore drill",
    content: (
      <div className="space-y-2 text-sm">
        {[
          ["prod-rds-primary", "Passed", "text-success"],
          ["Sandbox", "Reaping…", "text-accent-bright"],
          ["Next drill", "Tue 6:00 AM", "text-foreground-muted"],
        ].map(([label, value, cls]) => (
          <div
            key={label}
            className="flex justify-between rounded-lg border border-border bg-surface-elevated px-3 py-2"
          >
            <span className="text-foreground-muted">{label}</span>
            <span className={`font-medium ${cls}`}>{value}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "evidence",
    label: "Evidence",
    icon: FileCheck,
    title: "Signed proof for auditors",
    content: (
      <div className="rounded-lg border border-border bg-surface-elevated p-3 font-mono text-[11px] text-foreground-muted">
        <div className="text-accent-bright">evidence/report.json</div>
        <div className="mt-2 text-foreground-subtle">
          rto_seconds: 252
          <br />
          checks_passed: 8
          <br />
          signature: sha256:…
        </div>
      </div>
    ),
  },
  {
    id: "contact",
    label: "Talk to us",
    icon: MessageCircle,
    title: "We're building in the open",
    content: (
      <div className="text-sm text-foreground-muted">
        <p>Questions about DR, pricing, or enterprise?</p>
        <Link to="/talk" className="mt-3 inline-block font-medium text-accent-bright hover:underline">
          Send a message →
        </Link>
      </div>
    ),
  },
];

export function DemoShowcase() {
  const [active, setActive] = useState(DEMOS[0].id);
  const demo = DEMOS.find((d) => d.id === active) ?? DEMOS[0];

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="ui-section-label">Live preview</p>
          <h2 className="ui-heading mt-2 text-3xl sm:text-4xl">
            See how each piece works
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {DEMOS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActive(d.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all ${
                active === d.id
                  ? "border border-border-strong bg-accent-muted font-medium text-accent-bright"
                  : "border border-border bg-surface text-foreground-muted hover:bg-surface-elevated"
              }`}
            >
              <d.icon size={16} />
              {d.label}
            </button>
          ))}
        </div>

        <div className="ui-card mx-auto mt-8 max-w-2xl p-6">
          <h3 className="text-lg font-semibold text-foreground">{demo.title}</h3>
          <div className="mt-4 min-h-[140px]">{demo.content}</div>
        </div>
      </div>
    </section>
  );
}
