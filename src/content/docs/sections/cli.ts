import type { DocSection } from "../types";

export const cliSection: DocSection = {
  id: "cli",
  title: "CLI reference",
  description: "Install, configure, and run revenant in your terminal or CI.",
  modules: [
    {
      slug: "install",
      title: "Install the CLI",
      summary: "GitHub Action, binary download, or build from source.",
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
            "Releases: github.com/277pawan/revenant-cli/releases — pick linux_amd64, linux_arm64, darwin_amd64, darwin_arm64, or windows_amd64.",
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
      summary: "schema, row_count, golden_query, freshness, and more.",
      blocks: [
        {
          type: "list",
          items: [
            "connect — database reachable",
            "schema — expected tables exist",
            "row_count — min/max row ranges",
            "foreign_key — referential integrity samples",
            "golden_query — SQL assertions / expected values",
            "freshness — max age on timestamp columns",
            "index — expected indexes present",
          ],
        },
        {
          type: "paragraph",
          text:
            "Full field reference lives in CONFIG.md in revenant-cli. Proof Composer in the cloud UI can draft schema-aware YAML from a live DB.",
        },
      ],
    },
  ],
};
