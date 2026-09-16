import { Database, FileCheck, Zap, Lock, GitBranch, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Database,
    title: "Real restore drills",
    body:
      "Spin up an AWS RDS sandbox from your snapshot. Run schema, row-count, and golden-query checks on live recovered data.",
  },
  {
    icon: FileCheck,
    title: "Signed evidence",
    body:
      "Every drill produces tamper-evident reports. Hand auditors proof that recovery works, with timestamps and RTO.",
  },
  {
    icon: Zap,
    title: "One command in CI",
    body:
      "Drop the GitHub Action into any repo. No app code changes. Revenant only reads your database.",
  },
  {
    icon: Lock,
    title: "Keys stay in your AWS",
    body:
      "Sandboxes auto-reap. Cloud drills run in isolated runners with audit logs.",
  },
  {
    icon: GitBranch,
    title: "YAML in git",
    body:
      "Validation plans live beside your infra. Proof Composer generates schema-aware checks.",
  },
  {
    icon: BarChart3,
    title: "Fleet health",
    body:
      "Dashboard: which workflows passed, which are stale, and your RTO trend over time.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="ui-heading text-3xl sm:text-4xl">Built for restore proof</h2>
          <p className="mx-auto mt-4 max-w-2xl ui-body">
            Most teams discover backup gaps during the outage. Revenant makes
            restore proof a habit — in CI and in production.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="ui-card-interactive p-6">
              <div className="mb-4 inline-flex rounded-xl border border-border bg-accent-muted p-2.5 text-accent">
                <f.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
