import type { DocSection } from "../types";

export const gettingStartedSection: DocSection = {
  id: "getting-started",
  title: "Getting started",
  description: "What Revenant is and how teams use it.",
  modules: [
    {
      slug: "what-is-revenant",
      title: "What is Revenant?",
      summary:
        "Disaster recovery proof for PostgreSQL — prove backups restore, not just exist.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Revenant connects to your PostgreSQL database (local or AWS RDS), runs validation checks from a YAML plan, optionally spins up a real RDS restore sandbox, measures recovery time (RTO), and produces signed evidence.",
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Language-agnostic: Revenant never reads your application source — only live database data.",
        },
        {
          type: "heading",
          level: 2,
          text: "Three product surfaces",
        },
        {
          type: "list",
          items: [
            "revenant CLI (free) — terminal + GitHub Action, your AWS account.",
            "Revenant Cloud (Starter / Pro) — dashboard, schedules, evidence vault, managed drills.",
            "Optional agent (Pro+) — private-network Postgres only; not required for AWS RDS.",
          ],
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
      summary: "CLI phases 1–4 done; Phase 5 hosted UI in cloud product.",
      keywords: ["roadmap", "phase", "fleet", "dashboard", "future"],
      blocks: [
        {
          type: "list",
          items: [
            "Phases 1–4 (done): CLI, checks, AWS restore, reports, GitHub Action.",
            "Phase 5 (planned): hosted UI, scheduler, fleet view, signed evidence vault UX.",
            "Phase 5 operations UI ships with Revenant Cloud — not in the open-source CLI repo.",
          ],
        },
      ],
    },
  ],
};
