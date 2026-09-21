import type { DocModule } from "../types";

/** Append to cli section — one module per command for precise search */
export const cliCommandModules: DocModule[] = [
  {
    slug: "doctor",
    title: "revenant doctor",
    summary: "Validate config, env vars, and database connectivity before verify.",
    keywords: ["doctor", "diagnostics", "connectivity", "config"],
    blocks: [
      {
        type: "code",
        language: "bash",
        code: "revenant doctor [-c revenant.yaml]",
      },
      {
        type: "paragraph",
        text:
          "Checks: config file loads, check fields are valid, DATABASE_URL connects, and AWS env hints appear when recovery: is set in yaml.",
      },
    ],
  },
  {
    slug: "init",
    title: "revenant init",
    summary: "Scan live Postgres → starter revenant.yaml (schema, counts, FKs).",
    keywords: ["init", "scaffold", "information_schema", "discover", "yaml"],
    blocks: [
      {
        type: "code",
        language: "bash",
        code: `revenant init [flags]

Flags:
  -o, --output string   Write path (default: revenant.yaml)
      --plan string     Plan name in yaml (default: local-demo)
      --schema string   Postgres schema to scan (default: public)
      --force           Overwrite existing file`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Requires DATABASE_URL. Introspects information_schema for tables, row counts, foreign keys, and one golden query.",
      },
    ],
  },
  {
    slug: "verify",
    title: "revenant verify",
    summary: "Run all checks; optional AWS RDS snapshot restore sandbox.",
    keywords: ["verify", "restore", "sandbox", "rds", "report", "main"],
    blocks: [
      {
        type: "paragraph",
        text:
          "When recovery.engine: aws-rds is set: find latest snapshot → restore to temporary sandbox (e.g. db.t3.micro) → run checks → destroy sandbox.",
      },
      {
        type: "code",
        language: "bash",
        code: `revenant verify [flags]

Flags:
  -c, --config string              Config path (default: revenant.yaml)
      --plan string                Must match yaml plan: if set
  -o, --output string              JSON report (default: report.json)
      --markdown string            Markdown report (default: report.md)
      --keep-sandbox-on-failure    Keep AWS sandbox when checks fail (debug)`,
      },
      {
        type: "callout",
        tone: "warning",
        text:
          "Local path needs DATABASE_URL. AWS restore needs credentials plus SANDBOX_* variables — see AWS docs.",
      },
    ],
  },
  {
    slug: "snapshot",
    title: "revenant snapshot",
    summary: "Validate source DB first; create RDS snapshot only if checks pass.",
    keywords: ["snapshot", "rds", "backup", "aws"],
    blocks: [
      {
        type: "code",
        language: "bash",
        code: `revenant snapshot [flags]

Flags:
  -c, --config string    Config with recovery.engine: aws-rds
  -o, --output string    JSON report (default: report.json)
      --markdown string  Markdown report (default: report.md)`,
      },
      {
        type: "paragraph",
        text:
          "Requires DATABASE_URL on the source RDS, AWS credentials, and recovery.source_identifier in yaml.",
      },
    ],
  },
  {
    slug: "reap",
    title: "revenant reap",
    summary: "Delete orphaned Revenant-managed RDS sandboxes older than max-age.",
    keywords: ["reap", "cleanup", "sandbox", "orphan", "delete", "safety"],
    blocks: [
      {
        type: "code",
        language: "bash",
        code: `revenant reap [flags]

Flags:
      --max-age string   Age threshold (default: 2h) — e.g. 30m, 4h
      --region string    AWS region (default: AWS_REGION env)`,
      },
      {
        type: "callout",
        tone: "tip",
        text: "Run in CI with if: always() after AWS verify as a safety net when a job crashes mid-run.",
      },
    ],
  },
  {
    slug: "migrate",
    title: "revenant migrate",
    summary: "Demo only — sample customers + orders tables for learning.",
    keywords: ["migrate", "demo", "sample", "learning"],
    blocks: [
      {
        type: "callout",
        tone: "warning",
        text:
          "Demo / learning only — not for production apps. Creates hardcoded customers and orders tables; does not read your app migrations.",
      },
      {
        type: "list",
        items: [
          "Real project: use revenant init or hand-write revenant.yaml.",
          "Zero-setup try: migrate → init → verify on an empty local DB.",
          "AWS demo: migrate on source RDS before first snapshot.",
        ],
      },
      {
        type: "code",
        language: "bash",
        code: `revenant migrate        # prompts first
revenant migrate --yes  # skip prompt (scripts only)`,
      },
    ],
  },
];
