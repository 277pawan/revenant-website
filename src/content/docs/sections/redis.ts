import type { DocSection } from "../types";

export const redisSection: DocSection = {
  id: "redis",
  title: "Redis",
  description: "Redis restore proofs, optional snapshot storage, and plan limits.",
  modules: [
    {
      slug: "restore-proof",
      title: "Redis restore proofs",
      summary:
        "Capture a Redis RDB, verify it can be restored, and choose whether Revenant keeps the snapshot.",
      keywords: [
        "RDB",
        "Redis backup",
        "restore testing",
        "snapshot retention",
        "redis-prove",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Redis may be a rebuildable cache, or it may contain sessions, queues, and other state that matters during an outage. Revenant lets you prove that a Redis RDB can be restored, while leaving the decision to keep snapshot bytes with you.",
        },
        {
          type: "heading",
          level: 2,
          text: "What a Redis proof does",
        },
        {
          type: "list",
          items: [
            "Connects to the Redis instance and records a redacted connection fingerprint.",
            "Captures an RDB and restores it in an isolated, temporary Redis server.",
            "Checks that the recovered dataset is readable and records restore evidence.",
            "Keeps snapshot bytes only when you explicitly enable snapshot storage; otherwise it verifies the restore without retaining the RDB.",
          ],
        },
        {
          type: "paragraph",
          text:
            "Redis proof is its own resource and quota. It does not consume a PostgreSQL workflow, AWS restore drill, or parallel PostgreSQL drill slot.",
        },
        {
          type: "heading",
          level: 2,
          text: "Use Redis proof in Revenant Cloud",
        },
        {
          type: "list",
          items: [
            "Open Redis in the Revenant Cloud dashboard and add the Redis connection URL.",
            "Test the connection, then save the Redis resource. Connection credentials are stored separately from the visible resource details.",
            "Choose whether to enable snapshot storage. It is optional; when enabled, the plan sets a maximum retention window.",
            "Start a restore proof and review its status, restore result, and expiry (when a snapshot was retained) in the Redis proof history.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Plan limits",
        },
        {
          type: "list",
          items: [
            "Developer (free): run Redis proof locally with the Revenant CLI; no Revenant Cloud snapshot storage.",
            "Starter (₹499/month after the 30-day trial): 1 Redis instance, 4 restore proofs per calendar month, and up to 24 hours of opt-in snapshot retention.",
            "Pro (₹1,499/month): 10 Redis instances, 30 restore proofs per calendar month, and up to 7 days of opt-in snapshot retention.",
            "Enterprise: contact Revenant for custom limits and retention.",
          ],
        },
        {
          type: "code",
          language: "bash",
          code: "revenant redis-prove --url redis://localhost:6379",
        },
        {
          type: "paragraph",
          text:
            "The CLI runs the proof from your machine and does not upload Redis data to Revenant. Use a rediss:// URL for TLS-protected connections when your Redis provider requires it.",
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Retention is capped by plan and is never unlimited. Stored RDB artifacts are compressed by default and automatically deleted at expiry. Disabling storage removes existing stored artifacts.",
        },
        {
          type: "callout",
          tone: "warning",
          text:
            "Revenant proves Redis recovery; it is not a Redis hosting provider or a replacement for your primary backup, replication, or disaster-recovery strategy. Keep authoritative data protected at its source of truth.",
        },
      ],
    },
  ],
};
