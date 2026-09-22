import type { DocSection } from "../types";

export const evidenceSection: DocSection = {
  id: "evidence",
  title: "Evidence & reports",
  description: "JSON, Markdown, PDF exports — CLI and cloud vault.",
  modules: [
    {
      slug: "report-formats",
      title: "Report formats",
      summary: "report.json and report.md from CLI; PDF in cloud vault.",
      keywords: [
        "report",
        "json",
        "markdown",
        "pdf",
        "evidence",
        "audit",
        "artifact",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Every verify run produces machine-readable and human-readable proof. Upload artifacts in CI or rely on the cloud evidence vault for retention and sharing.",
        },
        {
          type: "heading",
          level: 2,
          text: "CLI outputs",
        },
        {
          type: "list",
          items: [
            "report.json — CI parsing, automation, custom dashboards.",
            "report.md — human review, PR comments, audit attachments.",
            "Flags: --output report.json, --markdown report.md on revenant verify.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Cloud vault",
        },
        {
          type: "list",
          items: [
            "Drill reports (JSON + branded PDF) and recovery passports (signed JSON) per job.",
            "Integrity verified on every download.",
            "Starter retention 30 days; Pro 365 days.",
            "Org-scoped with audit log events for compliance reviews.",
          ],
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "GitHub Actions: upload both files with actions/upload-artifact@v4 after revenant verify.",
        },
      ],
    },
    {
      slug: "ci-artifacts",
      title: "CI artifacts",
      summary: "Wire reports into GitHub Actions workflows.",
      keywords: ["github", "actions", "ci", "artifact", "upload", "workflow"],
      blocks: [
        {
          type: "code",
          language: "yaml",
          code: `- uses: 277pawan/revenant-action@v1.0.3
  with:
    version: v0.1.1
    config: revenant.yaml
  env:
    DATABASE_URL: \${{ secrets.DATABASE_URL }}

- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: revenant-evidence
    path: |
      report.json
      report.md`,
        },
        {
          type: "paragraph",
          text:
            "For AWS restore workflows, run revenant reap in a final step with if: always() so sandboxes never linger after failures.",
        },
      ],
    },
  ],
};
