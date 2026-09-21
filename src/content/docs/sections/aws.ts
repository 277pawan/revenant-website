import type { DocSection } from "../types";

export const awsSection: DocSection = {
  id: "aws",
  title: "AWS restore",
  description: "RDS snapshots, sandboxes, IAM, and free-tier tips.",
  modules: [
    {
      slug: "rds-drill",
      title: "RDS restore drill",
      summary: "What happens during an AWS sandbox run.",
      blocks: [
        {
          type: "list",
          items: [
            "Create or use an existing RDS snapshot of your source.",
            "Restore into a temporary sandbox instance (often free-tier class).",
            "Wait until available, then run validation checks against sandbox endpoint.",
            "Record RTO from start → checks complete.",
            "Reap / delete the sandbox so you are not billed forever.",
          ],
        },
      ],
    },
    {
      slug: "workflow",
      title: "Typical AWS workflow",
      summary: "migrate (demo) → snapshot → verify → reap.",
      keywords: ["aws", "workflow", "freetier", "snapshot", "verify", "reap"],
      blocks: [
        {
          type: "code",
          language: "bash",
          code: `# Optional demo tables (see revenant migrate — demo only)
revenant migrate

revenant snapshot --config revenant-aws-freetier.yaml
revenant verify --config revenant-aws-freetier.yaml
revenant reap --max-age 4h --region us-east-1`,
        },
        {
          type: "paragraph",
          text:
            "Full zero-cost setup: AWS_FREETIER_SETUP.md in the revenant-cli repository.",
        },
      ],
    },
    {
      slug: "iam",
      title: "IAM & credentials",
      summary: "Keys stay in your account; least privilege for restore.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Cloud stores encrypted AWS credentials per database. CLI uses AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY (or instance role). You need permissions to describe instances, create/restore snapshots, and delete temporary instances.",
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "See AWS_FREETIER_SETUP.md and CONFIG.md in revenant-cli for copy-paste IAM policy sketches and free-tier sandbox settings.",
        },
      ],
    },
  ],
};
