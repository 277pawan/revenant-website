import type { DocSection } from "../types";
import { docsPublicUrls } from "../public-urls";

export const recoveryReadinessSection: DocSection = {
  id: "recovery-readiness",
  title: "Recovery readiness",
  description:
    "Contracts, readiness scores, drift detection, passports, and application-aware checks in Revenant Cloud.",
  modules: [
    {
      slug: "overview",
      title: "Recovery readiness overview",
      summary: "From backup proof to continuous recoverability scoring.",
      keywords: [
        "recovery readiness",
        "rto",
        "rpo",
        "contract",
        "score",
        "drift",
        "passport",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Revenant Cloud goes beyond a single drill pass/fail. Each workflow has a recovery contract (RTO/RPO targets and required checks), a readiness score from the last verified drill, drift alerts when your stack changes, and signed evidence you can export for auditors.",
        },
        {
          type: "heading",
          level: 2,
          text: "What ships today",
        },
        {
          type: "list",
          items: [
            "Recovery contract editor per workflow (YAML) — RTO, RPO, required checks, HTTP health URL, dependencies.",
            "Recovery readiness score on the dashboard and workflow page — dimensions for restore, schema, queries, RTO, RPO, application health, dependencies, schedules, and last verified.",
            "Recovery drift panel — flags validation-plan or infrastructure changes since last verified recovery.",
            "Recovery passport JSON — signed artifact per passing drill, downloadable from run detail and Evidence Vault.",
            "Drill evidence — JSON + branded PDF report per job (Revenant Verify logo).",
            "RTO trend chart on the dashboard (30-day history).",
            "HTTP application health checks during managed drills when configured in the contract.",
            "Schedules — create, edit, pause, and delete cron drills from the dashboard.",
            "Google, GitHub, and Microsoft sign-in for cloud accounts (when OAuth is configured on the API).",
            "Recovery challenges — prove older backup points restore, not just the latest snapshot.",
            "Readiness history chart per workflow and RPO trend chart on the dashboard.",
            "Recovery passport PDF export (branded, alongside signed JSON).",
            "Request metrics at GET /metrics — uptime, status codes, active jobs (Phase 10 MVP).",
            "Settings — General org profile, credential rotation, validation plans, team RBAC, integrations, audit log.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Planned next",
        },
        {
          type: "list",
          items: [
            "API tokens for automation.",
            "Enterprise SAML SSO.",
            "OpenTelemetry export and distributed tracing beyond in-process metrics.",
          ],
        },
      ],
    },
    {
      slug: "recovery-contract",
      title: "Recovery contract",
      summary: "Define RTO, RPO, and what “recoverable” means.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Open any workflow in the cloud dashboard and edit the recovery contract. Set RTO/RPO targets (e.g. 15m / 5m), mark which checks are required (schema, critical queries, healthcheck), add dependency URLs, and set how often recovery must be re-verified.",
        },
        {
          type: "callout",
          tone: "tip",
          text:
            "Add a freshness check to your validation plan to measure observed RPO on each drill. Without it, readiness shows RPO as unmeasured even when the drill passes.",
        },
      ],
    },
    {
      slug: "readiness-score",
      title: "Readiness score & dimensions",
      summary: "How the 0–100 score and status tag work.",
      blocks: [
        {
          type: "paragraph",
          text:
            "The score reflects applicable checks on your last passing drill. Items not in your contract (e.g. dependencies you did not declare) do not penalize the score. The status tag — Recovery ready, Needs attention, or Not recovery ready — follows the score and hard failures, not optional gaps like a missing schedule.",
        },
        {
          type: "list",
          items: [
            "Recovery ready — score ≥ 80, no failing dimensions.",
            "Needs attention — score 55–79 or significant drift.",
            "Not recovery ready — a required check failed or recovery was invalidated.",
            "Advisory items (manual-only drills, unmeasured RPO) appear in the risk list without downgrading a strong score.",
          ],
        },
      ],
    },
    {
      slug: "evidence-passport",
      title: "Evidence vault & recovery passport",
      summary: "Drill reports vs signed passports.",
      blocks: [
        {
          type: "list",
          items: [
            "Drill report — full job JSON + PDF certificate from Evidence Vault (type: Drill report).",
            "Recovery passport — compact signed JSON with readiness summary (type: Recovery passport). Download from run detail or Evidence Vault.",
            "Both are org-scoped, SHA-256 verified on download, and listed in the audit log.",
          ],
        },
        {
          type: "paragraph",
          text: `Open the vault at ${docsPublicUrls.cloudDashboard}/evidence after drills complete.`,
        },
      ],
    },
    {
      slug: "sso",
      title: "Sign in with Google or GitHub",
      summary: "Social OAuth for cloud dashboard access.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Revenant Cloud supports Google and GitHub OAuth for login and registration. Buttons appear on the login page when the API has OAuth client credentials configured. Email/password remains available for all accounts.",
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Self-hosted API operators must set OAUTH_GOOGLE_* and OAUTH_GITHUB_* plus OAUTH_REDIRECT_BASE_URL. Microsoft SSO is planned.",
        },
      ],
    },
  ],
};
