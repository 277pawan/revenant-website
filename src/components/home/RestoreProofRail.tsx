/** Animated DR pipeline — unique to restore proof, not generic SaaS motion */
const NODES = [
  { id: "snap", label: "RDS snapshot" },
  { id: "box", label: "Sandbox" },
  { id: "chk", label: "YAML checks" },
  { id: "ev", label: "Evidence" },
  { id: "reap", label: "Reap" },
] as const;

export function RestoreProofRail() {
  return (
    <div
      className="restore-proof-rail mt-6 hidden sm:block"
      aria-hidden="true"
    >
      <div className="flex items-center gap-0">
        {NODES.map((node, i) => (
          <div key={node.id} className="flex min-w-0 flex-1 items-center">
            <div className="restore-proof-node flex min-w-0 flex-col items-center gap-1.5">
              <span
                className="restore-proof-dot h-2 w-2 rounded-full bg-accent"
                style={{ animationDelay: `${i * 0.55}s` }}
              />
              <span className="max-w-[4.5rem] truncate text-center text-[10px] font-medium uppercase tracking-wide text-foreground-subtle">
                {node.label}
              </span>
            </div>
            {i < NODES.length - 1 && (
              <span className="restore-proof-segment relative mx-0.5 h-px flex-1 bg-border-strong">
                <span
                  className="restore-proof-packet absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent"
                  style={{ animationDelay: `${i * 0.55}s` }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] text-foreground-subtle">
        Live path: snapshot → restore → verify → signed report → teardown
      </p>
    </div>
  );
}
