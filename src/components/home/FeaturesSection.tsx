import { Database, FileCheck, Zap, Lock, GitBranch, BarChart3 } from "lucide-react";
import { AmbientMotion } from "../ui/AmbientMotion";

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
    <section className="relative isolate overflow-hidden px-4 py-16 sm:px-6">
      <AmbientMotion variant="features" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="ui-heading text-3xl sm:text-4xl">Built for restore proof</h2>
          <p className="mt-4 ui-body">
            Most teams discover backup gaps during the outage. Revenant makes
            restore proof a habit — in CI and in production.
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="border-t border-border-subtle py-5">
              <h3 className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <f.icon size={18} strokeWidth={1.75} className="shrink-0 text-accent-bright" />
                {f.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground-muted">
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
