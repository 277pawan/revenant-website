import { Button } from "../components/ui/Button";
import { CodeBlock } from "../components/ui/CodeBlock";
import { PageMeta } from "../components/seo/PageMeta";
import { cliSeo } from "../lib/seo-pages";
import { site } from "../lib/site";

const COMMANDS = [
  { cmd: "revenant doctor", desc: "Check config, env, and DB connectivity" },
  { cmd: "revenant init", desc: "Introspect Postgres → generate revenant.yaml" },
  { cmd: "revenant verify", desc: "Run checks + optional AWS RDS restore drill" },
  { cmd: "revenant snapshot", desc: "Create RDS snapshot from source DB" },
  { cmd: "revenant reap", desc: "Clean orphaned AWS sandboxes" },
];

export function CliPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20">
      <PageMeta {...cliSeo} />
      <div className="mx-auto max-w-3xl">
        <p className="ui-section-label">Developer</p>
        <h1 className="ui-heading mt-2 text-4xl">revenant CLI</h1>
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">
          Free forever. Prove your PostgreSQL backups actually restore — in your
          terminal or GitHub Actions. No cloud account required.
        </p>

        <div className="mt-10 space-y-8">
          <section className="ui-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Install</h2>
            <div className="mt-4">
              <CodeBlock
                language="yaml"
                code={`# GitHub Action (recommended)
- uses: 277pawan/revenant-action@v1.0.3
  with:
    version: v0.1.1
    config: revenant.yaml
  env:
    DATABASE_URL: \${{ secrets.DATABASE_URL }}`}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button href="/docs/cli/install" variant="secondary">
                Full docs
              </Button>
              <Button href={site.githubCli} external variant="secondary">
                GitHub repo
              </Button>
              <Button href={site.githubAction} external variant="secondary">
                GitHub Action
              </Button>
            </div>
          </section>

          <section className="ui-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Quick start</h2>
            <div className="mt-4">
              <CodeBlock
                language="bash"
                code={`export DATABASE_URL="postgres://..."
revenant init --url $DATABASE_URL
revenant verify --config revenant.yaml`}
              />
            </div>
          </section>

          <section className="ui-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Commands</h2>
            <ul className="mt-4 divide-y divide-border">
              {COMMANDS.map((c) => (
                <li
                  key={c.cmd}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <code className="font-mono text-sm text-accent-bright">{c.cmd}</code>
                  <span className="text-sm text-foreground-muted">{c.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="ui-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              AWS restore drill
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Point revenant at an RDS snapshot. It provisions a temporary sandbox,
              runs your validation plan, measures RTO, writes evidence, and
              reaps the instance. See{" "}
              <a href="/docs/aws/rds-drill" className="text-accent-bright hover:underline">
                AWS docs
              </a>{" "}
              and CONFIG.md in the CLI repo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
