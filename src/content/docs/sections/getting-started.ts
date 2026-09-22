import type { DocSection } from "../types";
import { docsPublicUrls } from "../public-urls";

export const gettingStartedSection: DocSection = {
  id: "getting-started",
  title: "Getting started",
  description: "Introduction, restore drills, product paths, and quick starts.",
  modules: [
    {
      slug: "what-is-revenant",
      title: "What is Revenant?",
      summary:
        "Disaster recovery proof for PostgreSQL and AWS RDS — prove your backups actually restore, measure RTO, and keep audit-ready evidence.",
      keywords: [
        "introduction",
        "overview",
        "what is revenant",
        "disaster recovery",
        "backup validation",
        "postgres",
        "rds",
        "rto",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Revenant is disaster recovery (DR) proof software for PostgreSQL. Most teams assume backups work because a snapshot exists or a backup job shows green. Revenant closes that gap by running real restore drills: spin up recovered data, execute validation checks, measure how long recovery took (RTO), and archive signed evidence you can show auditors, leadership, or your on-call runbook.",
        },
        {
          type: "paragraph",
          text:
            "The core idea is simple — backups are promises; restores are proof. Revenant turns “we think we can recover” into “we proved recovery on this date, against this snapshot, with these checks, in this many minutes.”",
        },
        {
          type: "callout",
          tone: "warning",
          text:
            "A successful backup job does not mean you can recover in an outage. Silent schema drift, missing extensions, wrong snapshot timing, and untested runbooks are discovered during incidents — Revenant finds them during scheduled drills instead.",
        },
        {
          type: "heading",
          level: 2,
          text: "The problem Revenant solves",
        },
        {
          type: "list",
          items: [
            "Backups exist but nobody has restored them recently — or only a DBA did once, years ago.",
            "RDS snapshots look healthy; nobody has proven a sandbox instance boots and serves correct data.",
            "Compliance asks for DR evidence; the team has screenshots, not repeatable proof.",
            "RTO is a slide-deck number, not a measured result from a real restore.",
            "Staging databases drift from production — checks against staging do not prove production recovery.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "What Revenant actually does",
        },
        {
          type: "paragraph",
          text:
            "You register a database (direct PostgreSQL or AWS RDS), attach a validation plan written in YAML, and run a restore drill. For AWS RDS, Revenant provisions a temporary sandbox from your snapshot, connects to the recovered instance, runs every check in your plan, records pass/fail and timing, writes a report, and tears the sandbox down. For local or direct Postgres, the CLI runs the same validation checks against a live connection — ideal for CI and developer machines.",
        },
        {
          type: "paragraph",
          text:
            "Checks are composable: table existence, row counts, golden queries, foreign keys, indexes, freshness windows, custom HTTP probes, and more. Plans live in git next to your infra. Proof Composer (Cloud) can draft schema-aware checks from your live database so you are not starting from a blank YAML file.",
        },
        {
          type: "heading",
          level: 2,
          text: "What you get after every drill",
        },
        {
          type: "list",
          items: [
            "Pass / fail verdict with per-check detail — not a vague “backup OK”.",
            "Measured RTO — how long from trigger to validated recovery.",
            "Signed evidence artifacts (JSON + PDF certificate) and recovery passports stored in the Evidence Vault (Cloud).",
            "Recovery readiness score, contract, and drift alerts per workflow (Cloud).",
            "Audit log entries for who ran what, when, and on which workflow.",
            "Alerts via email, Slack, or custom HTTP webhooks when a drill fails.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Language-agnostic by design: Revenant never reads your application source code. It only connects to PostgreSQL (or a restored RDS instance) and runs the checks you define. Any stack — Rails, Node, Java, Go — uses the same validation model.",
        },
        {
          type: "heading",
          level: 2,
          text: "Who Revenant is for",
        },
        {
          type: "list",
          items: [
            "Platform / SRE teams running AWS RDS or self-managed PostgreSQL in production.",
            "Engineering leads who need DR proof before a compliance review or enterprise deal.",
            "Startups on RDS who want managed restore drills without building internal tooling.",
            "Developers who want `revenant verify` in CI on a staging or local database.",
            "Teams tired of discovering backup gaps during the outage instead of before it.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Three ways to use Revenant",
        },
        {
          type: "heading",
          level: 3,
          text: "1. revenant CLI (free, open source)",
        },
        {
          type: "paragraph",
          text:
            "Run `revenant init` and `revenant verify` from your terminal or wire the GitHub Action into any repo. You bring AWS credentials; sandboxes run in your account. Best for developers, CI pipelines, and teams who want full control without a hosted dashboard.",
        },
        {
          type: "heading",
          level: 3,
          text: "2. Revenant Cloud (Starter / Pro)",
        },
        {
          type: "paragraph",
          text:
            `Hosted dashboard at ${docsPublicUrls.cloudDashboard}. Register databases, build validation plans, schedule automatic drills, view fleet health and RTO trends, invite teammates, and browse the Evidence Vault. Starter runs one managed AWS RDS workflow with a 30-day trial. Pro expands to a fleet (up to 10 workflows), parallel drills, Slack integrations, and longer evidence retention.`,
        },
        {
          type: "heading",
          level: 3,
          text: "3. Optional agent (Pro+, private networks only)",
        },
        {
          type: "paragraph",
          text:
            "If PostgreSQL lives inside a private VPC with no public endpoint, a lightweight Docker agent polls the Cloud API and runs drills inside your network. Not required for standard AWS RDS restore drills — Revenant Cloud manages those for you on Starter and Pro.",
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "Typical path: prove locally with the CLI → add GitHub Actions for CI → move production RDS to Cloud Starter for managed schedules and evidence → upgrade to Pro when you have multiple databases or need Slack and fleet view.",
        },
        {
          type: "heading",
          level: 2,
          text: "Revenant vs backups and monitoring",
        },
        {
          type: "list",
          items: [
            "Backups / snapshots — create a recovery point. Revenant proves you can use it.",
            "Monitoring (Datadog, etc.) — tells you the app is up now. Revenant tells you you can rebuild from backup.",
            "Migrations / schema tools — track intended schema. Revenant validates recovered data matches expectations after a restore.",
            "Manual restore tests — expensive, rare, undocumented. Revenant automates, schedules, and archives proof.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Mental model",
        },
        {
          type: "code",
          language: "text",
          code: `Production RDS snapshot
        │
        ▼
  Restore sandbox (temporary)
        │
        ▼
  YAML validation plan  ──►  schema · counts · queries · FKs · freshness
        │
        ▼
  PASS or FAIL  +  RTO  +  signed evidence  +  alert if failed`,
        },
        {
          type: "paragraph",
          text:
            "Revenant is not a backup tool and does not replace AWS Backup or pg_dump. It sits on top of your existing backup strategy and answers the question every auditor and incident commander actually cares about: if we lost the database right now, could we recover — and how long would it take?",
        },
      ],
    },
    {
      slug: "how-restore-drills-work",
      title: "How restore drills work",
      summary: "Snapshot → sandbox → verify → evidence → reap.",
      blocks: [
        {
          type: "paragraph",
          text:
            "A restore drill is not a mock. Revenant provisions a temporary RDS instance from your snapshot, runs your validation plan against recovered data, records RTO, writes a report, and tears down the sandbox.",
        },
        {
          type: "heading",
          level: 2,
          text: "The flow",
        },
        {
          type: "list",
          items: [
            "Register source Postgres / RDS and AWS credentials (cloud) or set env vars (CLI).",
            "Define checks: schema, row counts, golden queries, freshness, foreign keys, indexes.",
            "Run verify — locally, in CI, or on a cloud schedule.",
            "Review evidence and share with auditors or leadership.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "Starter cloud plans use managed AWS drills — no Docker agent. Pro adds optional agent for private VPC Postgres.",
        },
      ],
    },
    {
      slug: "choose-path",
      title: "Choose your path",
      summary: "CLI vs Cloud Starter vs Pro.",
      blocks: [
        {
          type: "list",
          items: [
            "Just need CI proof? → Free Developer CLI + GitHub Action.",
            "One critical RDS and want Revenant to run drills? → Starter (30-day trial).",
            "Fleet of DBs, Slack alerts, private Postgres? → Pro.",
            "SSO / custom contracts? → Enterprise (Talk to us).",
          ],
        },
      ],
    },
    {
      slug: "local-quickstart",
      title: "Quick start (local Postgres)",
      summary: "DATABASE_URL, init, verify — expected PASS output.",
      keywords: ["quickstart", "postgres", "local", "init", "verify", "tutorial"],
      blocks: [
        {
          type: "code",
          language: "bash",
          code: `export DATABASE_URL='postgres://user:pass@localhost:5432/mydb?sslmode=disable'
revenant init --plan my-app --force
revenant verify`,
        },
        {
          type: "heading",
          level: 2,
          text: "Expected output",
        },
        {
          type: "code",
          language: "text",
          code: `✓ customers table exists
✓ orders row count 3 >= 1
✓ foreign key orders -> customers intact

Restore Validation: PASS
Wrote report.json
Wrote report.md`,
        },
        {
          type: "callout",
          tone: "tip",
          text: "Run revenant doctor first if anything fails — it checks config, env vars, and DB connectivity.",
        },
      ],
    },
    {
      slug: "github-actions",
      title: "GitHub Actions",
      summary: "Local Postgres weekly proof and AWS restore + reap cleanup.",
      keywords: ["github", "actions", "ci", "workflow", "aws", "local"],
      blocks: [
        {
          type: "paragraph",
          text:
            "Copy example workflows from revenant-cli: examples/workflows/local-verify.yml for local Postgres, or aws-verify.yml for RDS restore drills.",
        },
        {
          type: "list",
          items: [
            "No Go or npm in the runner — use 277pawan/revenant-action@v1.0.3.",
            "AWS workflows need secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SANDBOX_USER, SANDBOX_PASSWORD.",
            "Always run revenant reap with if: always() after AWS verify so sandboxes never linger.",
          ],
        },
      ],
    },
    {
      slug: "roadmap",
      title: "Roadmap",
      summary: "CLI core done; Cloud ships recovery readiness; challenges and observability next.",
      keywords: ["roadmap", "phase", "fleet", "dashboard", "future"],
      blocks: [
        {
          type: "list",
          items: [
            "CLI (done): verify, AWS restore, reports, GitHub Action.",
            "Cloud (shipped): dashboard, workflows, schedules, evidence vault, team RBAC, Google/GitHub login.",
            "Recovery readiness (shipped): contracts, readiness scores, drift, passports, RTO trends, HTTP health checks.",
            "Next: recovery challenges, historical readiness/RPO trends, API tokens, passport PDF, observability.",
          ],
        },
      ],
    },
  ],
};
