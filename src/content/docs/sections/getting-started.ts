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
  ],
};
