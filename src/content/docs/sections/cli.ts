import type { DocSection } from "../types";
import { cliCommandModules } from "./cli-commands";

export const cliSection: DocSection = {
  id: "cli",
  title: "CLI reference",
  description: "Install, configure, and run revenant in your terminal or CI.",
  modules: [
    {
      slug: "install",
      title: "Install the CLI",
      summary: "GitHub Action, binary download, or build from source.",
      keywords: [
        "install",
        "binary",
        "windows",
        "linux",
        "darwin",
        "releases",
        "path",
      ],
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "GitHub Action (recommended)",
        },
        {
          type: "code",
          language: "yaml",
          code: `- uses: 277pawan/revenant-action@v1.0.3
  with:
    version: v0.1.1
    config: revenant.yaml
  env:
    DATABASE_URL: \${{ secrets.DATABASE_URL }}`,
        },
        {
          type: "heading",
          level: 2,
          text: "Binary",
        },
        {
          type: "code",
          language: "bash",
          code: `tar -xzf revenant_0.1.1_linux_amd64.tar.gz
chmod +x revenant
sudo install -m 755 revenant /usr/local/bin/revenant
revenant --help`,
        },
        {
          type: "paragraph",
          text:
            "Releases: github.com/277pawan/revenant-cli/releases — linux_amd64, linux_arm64, darwin_amd64, darwin_arm64, windows_amd64.",
        },
        {
          type: "heading",
          level: 2,
          text: "Build from source",
        },
        {
          type: "code",
          language: "bash",
          code: `git clone https://github.com/277pawan/revenant-cli.git
cd revenant-cli
go build -o revenant .`,
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "Install the binary on your PATH (/usr/local/bin or ~/bin) so you type revenant — not ./revenant from the download folder.",
        },
      ],
    },
    {
      slug: "quickstart",
      title: "Quick start",
      summary: "doctor → init → verify in minutes.",
      blocks: [
        {
          type: "code",
          language: "bash",
          code: `export DATABASE_URL="postgres://user:pass@host:5432/mydb"
revenant doctor
revenant init --url $DATABASE_URL
revenant verify --config revenant.yaml`,
        },
        {
          type: "paragraph",
          text:
            "init introspects your schema and generates revenant.yaml. verify runs all checks and writes JSON + markdown reports.",
        },
      ],
    },
    {
      slug: "commands",
      title: "Commands",
      summary: "doctor, init, verify, snapshot, reap.",
      blocks: [
        {
          type: "list",
          items: [
            "revenant doctor — config, env, and connectivity checks",
            "revenant init — introspect Postgres → revenant.yaml",
            "revenant verify — run validation + optional AWS restore drill",
            "revenant snapshot — create RDS snapshot from source",
            "revenant reap — clean orphaned AWS sandboxes",
          ],
        },
      ],
    },
    {
      slug: "yaml-config",
      title: "revenant.yaml",
      summary: "Plan, database, recovery, and checks.",
      blocks: [
        {
          type: "code",
          language: "yaml",
          code: `plan: my-app
database:
  engine: postgres
  connection: \${DATABASE_URL}
recovery:
  engine: aws-rds
  source_identifier: my-rds-instance-id
  region: ap-south-1
  use_freetier: true
checks:
  - type: connect
  - type: schema
    expect_tables: [users, orders]
  - type: row_count
    table: orders
    min: 1000`,
        },
        {
          type: "callout",
          tone: "warning",
          text:
            "AWS drills need IAM for RDS snapshot restore plus SANDBOX_USER / SANDBOX_PASSWORD / SANDBOX_DBNAME. See CONFIG.md in the CLI repo.",
        },
      ],
    },
    {
      slug: "check-types",
      title: "Check types",
      summary: "Seven yaml check types — connect through index.",
      keywords: [
        "checks",
        "schema",
        "row_count",
        "foreign_key",
        "golden_query",
        "freshness",
        "index",
      ],
      blocks: [
        {
          type: "list",
          items: [
            "connect — DB accepts connections",
            "schema — expect_tables: [a, b]",
            "row_count — table, min, max (optional)",
            "foreign_key — table, references (no orphans)",
            "golden_query — query, expect_min",
            "freshness — table, column, max_age",
            "index — expect_indexes: [name, …]",
          ],
        },
        {
          type: "code",
          language: "yaml",
          code: `checks:
  - type: connect
  - type: schema
    expect_tables: [customers, orders]
  - type: row_count
    table: orders
    min: 1
  - type: foreign_key
    table: orders
    references: customers
  - type: golden_query
    query: "SELECT count(*) FROM orders"
    expect_min: 1
  - type: freshness
    table: orders
    column: created_at
    max_age: 24h`,
        },
        {
          type: "paragraph",
          text:
            "Full field reference: CONFIG.md in revenant-cli. Proof Composer in the cloud UI drafts schema-aware YAML from a live DB.",
        },
      ],
    },
    ...cliCommandModules,
  ],
};
