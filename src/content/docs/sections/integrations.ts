import type { DocSection } from "../types";

export const integrationsSection: DocSection = {
  id: "integrations",
  title: "Integrations",
  description: "Alerts, webhooks, email, and scheduled drills (cloud).",
  modules: [
    {
      slug: "slack",
      title: "Slack notifications",
      summary: "Post drill results to a channel when a workflow finishes.",
      keywords: [
        "slack",
        "webhook",
        "alert",
        "notification",
        "pro",
        "integration",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "On Pro plans, connect a Slack incoming webhook so failed or successful restore drills notify your on-call channel without opening the dashboard.",
        },
        {
          type: "heading",
          level: 2,
          text: "Setup (dashboard)",
        },
        {
          type: "list",
          items: [
            "Org admin → Settings → Integrations → Slack.",
            "Paste your Slack incoming webhook URL (scoped to one channel).",
            "Choose events: drill failed, drill passed, or both.",
            "Run a test notification to verify delivery.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Payload includes workflow name, RTO, check summary, and a link to evidence in the vault. Message format is fixed today; custom templates ship in a future release.",
        },
      ],
    },
    {
      slug: "http-webhooks",
      title: "Custom HTTP webhooks",
      summary: "POST signed JSON to your endpoint after each drill.",
      keywords: [
        "http",
        "webhook",
        "callback",
        "api",
        "integration",
        "custom",
        "pro",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Pro orgs can register one or more HTTPS endpoints. Revenant POSTs a JSON body when a job completes (success or failure). Use this to open tickets, update a status page, or fan out to internal tools.",
        },
        {
          type: "heading",
          level: 2,
          text: "Payload sketch",
        },
        {
          type: "code",
          language: "json",
          code: `{
  "event": "drill.completed",
  "status": "passed",
  "workflow_id": "wf_…",
  "rto_seconds": 252,
  "report_urls": {
    "json": "https://…/evidence/….json",
    "markdown": "https://…/evidence/….md",
    "pdf": "https://…/evidence/….pdf"
  }
}`,
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "Verify requests with the shared signing secret shown once in the dashboard. Retries use exponential backoff for 5xx responses.",
        },
      ],
    },
    {
      slug: "email-alerts",
      title: "Email alerts & digests",
      summary: "Starter email on failure; weekly digest when SMTP is configured.",
      keywords: ["email", "smtp", "alert", "digest", "starter", "notify"],
      blocks: [
        {
          type: "list",
          items: [
            "Starter: email alerts to org admins when a scheduled drill fails.",
            "Pro: per-workflow recipient lists and pass/fail toggles.",
            "Weekly digest: fleet summary (last 7 days RTO, pass rate) when API SMTP env is set.",
          ],
        },
        {
          type: "paragraph",
          text:
            "Evidence attachments in email are links to the vault (JSON / Markdown / PDF), not raw database dumps.",
        },
      ],
    },
    {
      slug: "schedules",
      title: "Schedules & cron drills",
      summary: "Automated restore proof on a timetable — cloud control plane.",
      keywords: [
        "schedule",
        "cron",
        "automation",
        "recurring",
        "weekly",
        "jobs",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Schedules enqueue restore jobs on a cron expression (UTC). Each run uses the workflow’s validation plan and writes evidence to the vault.",
        },
        {
          type: "list",
          items: [
            "Starter: 1 active schedule, 1 parallel restore drill.",
            "Pro: up to 10 schedules, 3 parallel drills.",
            "CLI / GitHub Action: use your own cron (e.g. weekly workflow) — no cloud schedule required.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Adding a schedule in the UI only requires picking a workflow and cron — docs for new schedule types will appear here automatically as we ship them.",
        },
      ],
    },
  ],
};
