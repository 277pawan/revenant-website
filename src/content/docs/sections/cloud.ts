import type { DocSection } from "../types";
import { docsPublicUrls } from "../public-urls";

export const cloudSection: DocSection = {
  id: "cloud",
  title: "Revenant Cloud",
  description: "Dashboard, trials, workflows, evidence, and plans.",
  modules: [
    {
      slug: "sign-up",
      title: "Create an account",
      summary: "30-day Starter trial — no card at signup.",
      blocks: [
        {
          type: "paragraph",
          text:
            `Register on this site (/register) or sign in at the cloud dashboard (${docsPublicUrls.cloudDashboard}/login). New orgs start on Starter with subscription_status=trialing and trial_ends_at +30 days. Sign in with Google or GitHub — no separate SSO setup required for users.`,
        },
        {
          type: "list",
          items: [
            "Add AWS credentials for your RDS workflow.",
            "Connect a production database and build a validation plan.",
            "Run your first managed restore drill from the dashboard.",
            "Optional: schedules, team invites, email alerts.",
          ],
        },
      ],
    },
    {
      slug: "workflows",
      title: "Workflows & databases",
      summary: "One production DB + validation plan = one workflow.",
      blocks: [
        {
          type: "paragraph",
          text:
            "A workflow is a connected database with a validation plan. Starter allows 1 workflow; Pro allows 10. Starter is AWS RDS restore only (managed by Revenant). Direct Postgres drills require Pro.",
        },
        {
          type: "list",
          items: [
            "Database wizard defaults to AWS RDS on Starter.",
            "Validation plans: YAML editor + Proof Composer (schema-aware AI assist).",
            "Plan limits enforced in API (workflows, parallel sandboxes, agent tokens).",
          ],
        },
      ],
    },
    {
      slug: "schedules-jobs",
      title: "Schedules & jobs",
      summary: "Cron drills, job history, parallel sandbox limits.",
      blocks: [
        {
          type: "list",
          items: [
            "Schedules enqueue restore jobs on a cron — create, edit, pause, and delete from the dashboard.",
            "Starter: 1 schedule, 1 parallel restore drill.",
            "Pro: 10 schedules, 3 parallel restore drills.",
            "Embedded runner on the API executes Starter drills without a customer agent.",
          ],
        },
      ],
    },
    {
      slug: "evidence",
      title: "Evidence vault",
      summary: "Signed reports, retention, exports.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Each drill stores signed artifacts: drill reports (JSON + branded PDF) and recovery passports (signed JSON). Starter retains 30 days; Pro retains 365 days. Evidence Vault lists both types with integrity verification on download.",
        },
      ],
    },
    {
      slug: "team-alerts",
      title: "Team, alerts & integrations",
      summary: "RBAC, email, Slack, HTTP webhooks.",
      blocks: [
        {
          type: "list",
          items: [
            "Roles: admin, executor, viewer.",
            "Invite teammates by email token.",
            "Email alerts on Starter; Slack + HTTP webhooks on Pro.",
            "Weekly digest email when SMTP is configured.",
            "RTO trend chart on the dashboard.",
          ],
        },
      ],
    },
    {
      slug: "agent",
      title: "Self-hosted agent (Pro)",
      summary: "Only for private-network Postgres — not free CLI bypass.",
      blocks: [
        {
          type: "paragraph",
          text:
            "The Docker agent claims paid cloud jobs for databases that are not reachable from Revenant's managed runners (private VPC). Starter cannot issue agent tokens. Agent requires dashboard token + active Pro org.",
        },
        {
          type: "callout",
          tone: "warning",
          text:
            "AWS RDS managed drills do not need the agent. Do not treat the agent as a free alternative to Cloud.",
        },
      ],
    },
    {
      slug: "plans",
      title: "Plans & limits",
      summary: "Developer, Starter ₹499, Pro ₹1,499, Enterprise.",
      blocks: [
        {
          type: "list",
          items: [
            "Developer — free CLI + GitHub Action, no cloud account.",
            "Starter — ₹499/mo after 30-day trial; 1 workflow; managed AWS; no agent.",
            "Pro — ₹1,499/mo; 10 workflows; 3 parallel drills; optional agent; Slack/HTTP.",
            "Enterprise — contact us for SSO and custom SLAs.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "See /pricing for the full comparison. Billing checkout (Razorpay) ships on the marketing site after trial.",
        },
      ],
    },
  ],
};
