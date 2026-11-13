import type { DocSection } from "../types";

export const redisSection: DocSection = {
  id: "redis",
  title: "Redis",
  description:
    "Cloud restore proofs, capture methods, searchable history, and optional RDB snapshots.",
  modules: [
    {
      slug: "restore-proof",
      title: "Redis restore proofs",
      summary:
        "Connect Redis, run an isolated recovery test, and understand what a proof does and does not guarantee.",
      keywords: [
        "RDB",
        "Redis backup",
        "restore testing",
        "redis-prove",
        "RTO",
        "RPO",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Redis may be a rebuildable cache, or it may hold sessions, queues, and other state that matters during an outage. A Revenant restore proof captures Redis data and tests that it can be loaded by a separate, temporary Redis server. It never writes to, pauses, or replaces your live Redis instance.",
        },
        {
          type: "heading",
          level: 2,
          text: "Create a cloud proof",
        },
        {
          type: "list",
          items: [
            "In the Revenant Cloud dashboard, open Redis and add a redis:// or rediss:// connection URL.",
            "Use Test URL to check connectivity, then save the Redis resource. A connection test is not a backup or restore proof.",
            "Choose whether to keep a compressed snapshot in Revenant storage. This is optional and can be enabled before a proof.",
            "Select Run proof. Revenant queues the run and uses a cloud runner when it can reach Redis; a Revenant agent can run it from a private network when needed.",
            "Open Proof history to review the result, checks, timings, and recovery-point information.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "What is checked",
        },
        {
          type: "list",
          items: [
            "The captured data loads in an isolated Redis server running on loopback.",
            "The restored Redis responds to PING and its key count is recorded and checked.",
            "A bounded content digest and restore timings are recorded without displaying raw key names or values.",
            "Proof details include the executor, attempts, checks, key counts, restore time (RTO), observed recovery point (RPO), and error details when available.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text:
            "A proof validates recovery of the captured data. It is not a full application-level test, production failover, or a replacement for Redis replication and your primary backup strategy.",
        },
      ],
    },
    {
      slug: "capture-methods",
      title: "Capture methods and proof results",
      summary:
        "Learn why Redis may use an RDB stream or a bounded logical key transfer, and what each outcome means.",
      keywords: [
        "logical capture",
        "SCAN",
        "DUMP",
        "RESTORE",
        "truncated",
        "proof status",
        "managed Redis",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Revenant uses the capture method supported by your Redis provider. In both methods, captured data is loaded into a temporary sandbox for validation; the source Redis is not modified.",
        },
        {
          type: "heading",
          level: 2,
          text: "RDB capture",
        },
        {
          type: "paragraph",
          text:
            "When the provider permits Redis replication streaming, the runner receives an RDB file and loads that file directly into the sandbox. This checks that the captured RDB itself can be loaded.",
        },
        {
          type: "heading",
          level: 2,
          text: "Logical capture",
        },
        {
          type: "paragraph",
          text:
            "Some managed Redis services block RDB streaming. In that case, Revenant transfers keys using Redis commands such as SCAN, DUMP, PTTL, and RESTORE, compares content digests, and writes an RDB from the restored sandbox. A snapshot from this path is rebuilt from the transferred data; it is not the provider's original backup file.",
        },
        {
          type: "callout",
          tone: "warning",
          text:
            "Logical capture is bounded (default ceiling: 50,000 keys and 256 MiB). If a ceiling is reached, the proof reports truncation. Treat a truncated proof as a partial recovery test, not evidence that the full keyspace was captured.",
        },
        {
          type: "heading",
          level: 2,
          text: "Understanding outcomes",
        },
        {
          type: "list",
          items: [
            "Restored — the recovery test completed and passed its checks.",
            "Restore failed — the test ran, but the captured data did not pass the recovery checks.",
            "Could not run — the proof itself could not complete, for example because of a connectivity or execution problem.",
            "If the cloud runner cannot reach Redis, the proof can remain available for an agent in the Redis network; this is not automatically reported as a bad backup.",
          ],
        },
        {
          type: "paragraph",
          text:
            "Connection fingerprints contain redacted configuration metadata and digests, not Redis passwords or sampled key values. Redis URLs are encrypted at rest, and the password is not returned to the dashboard after saving.",
        },
      ],
    },
    {
      slug: "snapshots",
      title: "Snapshots: storage, download, and restore",
      summary:
        "Choose optional artifact retention, download a verified RDB, and inspect it safely without touching production.",
      keywords: [
        "snapshot",
        "snapshot history",
        "download RDB",
        "restore Redis",
        "retention",
        "expiry",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "A proof is the recovery-test result; a snapshot is the optional RDB artifact. Proofs run even when snapshot storage is off. By default, the RDB is used for validation and discarded. To keep downloadable bytes, enable snapshot storage on the Redis resource before running a proof.",
        },
        {
          type: "heading",
          level: 2,
          text: "Retention and artifact safety",
        },
        {
          type: "list",
          items: [
            "Stored snapshots are compressed and have an expiry set when captured. Your plan caps the requested retention.",
            "At download, Revenant decompresses the artifact, verifies its checksum, and checks the Redis RDB signature before sending the .rdb file.",
            "Expired snapshots are automatically deleted. Disabling storage removes existing stored artifacts; deleting the Redis resource removes its credentials, proof history, and snapshots.",
            "Only stored, unexpired snapshots can be downloaded. Failed captures, in-progress entries, expired snapshots, and deleted artifacts are not available.",
          ],
        },
        {
          type: "heading",
          level: 2,
          text: "Download and inspect locally",
        },
        {
          type: "list",
          items: [
            "Open Redis → Snapshot history and choose Download RDB for a snapshot with Stored status.",
            "Keep the downloaded file unchanged. An RDB is binary data and is not meant to be read or edited in a text editor.",
            "Use the dashboard's Restore this snapshot dialog for copyable macOS/Linux commands. The commands start a separate temporary Redis server on port 6380; Redis must be installed locally.",
            "In a second terminal, check the temporary server with redis-cli -p 6380 PING and redis-cli -p 6380 DBSIZE, then stop it with Ctrl+C.",
          ],
        },
        {
          type: "code",
          language: "bash",
          code: `redis-cli -p 6380 PING
redis-cli -p 6380 DBSIZE`,
        },
        {
          type: "callout",
          tone: "warning",
          text:
            "The dashboard does not overwrite production Redis. A real restore can destroy newer writes: for self-managed Redis, follow your incident procedure, stop the target server, preserve its current data directory, install the RDB under the configured filename, and restart it. For managed Redis, use the provider's supported import or restore process; many providers do not accept arbitrary RDB uploads.",
        },
      ],
    },
    {
      slug: "history-and-search",
      title: "Redis history and search",
      summary:
        "Find Redis resources, proof outcomes, and stored snapshots across paginated history.",
      keywords: [
        "proof history",
        "snapshot history",
        "search",
        "pagination",
        "RPO",
        "RTO",
      ],
      blocks: [
        {
          type: "paragraph",
          text:
            "Redis resource lists, proof history, and snapshot history are separate searchable views. The resource list shows 20 entries per page; proof and snapshot history show 10. Use Previous and Next to move through results. Changing a search starts again at page 1.",
        },
        {
          type: "heading",
          level: 2,
          text: "What each history shows",
        },
        {
          type: "list",
          items: [
            "Proof history records the recovery outcome, executor, attempts, checks, key counts, timings, RTO, observed RPO, and error details.",
            "Snapshot history records snapshot state, capture time, size, expiry, and checksum, with download or delete actions when available.",
            "Snapshots older than 30 days are purged, including stored artifact bytes, when snapshot history is requested.",
            "The dashboard polls while a proof is pending or running and the browser tab is visible.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Proof records and snapshot records answer different questions: proof history shows whether recovery was tested successfully; snapshot history shows whether downloadable RDB bytes were retained.",
        },
      ],
    },
    {
      slug: "plans-and-cli",
      title: "Redis plan limits and CLI",
      summary:
        "Compare cloud Redis quotas with local Redis proofs from the Revenant CLI.",
      keywords: [
        "Redis plan",
        "quota",
        "calendar month",
        "Developer",
        "Starter",
        "Pro",
        "CLI",
      ],
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Cloud plan limits",
        },
        {
          type: "list",
          items: [
            "Developer (free): run Redis proofs locally with the Revenant CLI; no Revenant Cloud snapshot storage.",
            "Starter (₹499/month after the 3-month trial): 1 Redis instance, 4 restore proofs per calendar month, and up to 24 hours of opt-in snapshot retention.",
            "Pro (₹1,499/month): 10 Redis instances, 30 restore proofs per calendar month, and up to 7 days of opt-in snapshot retention.",
            "Enterprise: contact Revenant for custom limits and retention.",
          ],
        },
        {
          type: "paragraph",
          text:
            "Redis instances and proof quotas are separate from PostgreSQL workflows, AWS restore drills, and parallel PostgreSQL drill slots.",
        },
        {
          type: "heading",
          level: 2,
          text: "Run a proof locally",
        },
        {
          type: "code",
          language: "bash",
          code: "revenant redis-prove --url redis://localhost:6379",
        },
        {
          type: "paragraph",
          text:
            "The CLI runs the proof from your machine and does not upload Redis data to Revenant. Use a rediss:// URL when your Redis provider requires TLS. Keep credentials out of shared command history and logs.",
        },
        {
          type: "callout",
          tone: "info",
          text:
            "Cloud snapshot retention is capped by plan and is never unlimited. Stored RDB artifacts are compressed by default and automatically deleted at expiry. Disabling snapshot storage removes existing stored artifacts.",
        },
      ],
    },
  ],
};
