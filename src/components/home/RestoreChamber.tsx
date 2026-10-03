import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

/**
 * The hero's one memorable moment: a restore run streams in a terminal, and
 * when it finishes a signed certificate lands next to it. This is the product
 * (proof that a backup restores), shown instead of described.
 */

type Line = { time: string; tag: string; text: string; tone: "info" | "ok" };

const LINES: Line[] = [
  {
    time: "00:00",
    tag: "snapshot",
    text: "found rds:prod-orders-2026-10-03",
    tone: "info",
  },
  {
    time: "00:41",
    tag: "sandbox",
    text: "restoring to db.t3.micro · us-east-1",
    tone: "info",
  },
  { time: "03:02", tag: "verify", text: "customers table exists", tone: "ok" },
  { time: "03:30", tag: "verify", text: "orders row count 3 ≥ 1", tone: "ok" },
  {
    time: "03:48",
    tag: "verify",
    text: "foreign key orders → customers intact",
    tone: "ok",
  },
  {
    time: "04:12",
    tag: "evidence",
    text: "signed · sha256 9f3c…a41e",
    tone: "info",
  },
  { time: "04:12", tag: "reap", text: "sandbox destroyed", tone: "info" },
];

const TICK_MS = 650;
const HOLD_TICKS = 6; // how long the finished certificate stays on screen

const C = {
  bg: "#0D1216",
  border: "rgba(255,255,255,0.08)",
  text: "#D5DCE1",
  muted: "#6F7D86",
  ok: "#5FD08A",
  info: "#D9B24C",
};

export function RestoreChamber() {
  const reduceMotion = useReducedMotion();
  const total = LINES.length;
  const [step, setStep] = useState(reduceMotion ? total + 1 : 0);

  useEffect(() => {
    if (reduceMotion) {
      setStep(total + 1);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s >= total + 1 + HOLD_TICKS ? 0 : s + 1));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, total]);

  const visible = Math.min(step, total);
  const done = step > total;

  return (
    <div
      role="img"
      aria-label="Example restore run: a PostgreSQL snapshot is restored into a sandbox, three checks pass, and a signed certificate is produced with a recovery time of 4 minutes 12 seconds."
      className="relative mx-auto w-full max-w-[34rem] lg:pb-14"
    >
      {/* Terminal */}
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-xl shadow-[0_30px_80px_-30px_rgba(8,12,16,0.55)]"
        style={{ background: C.bg, border: `1px solid ${C.border}` }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 font-mono text-[12px]"
          style={{ borderBottom: `1px solid ${C.border}`, color: C.muted }}
        >
          <span>
            <span style={{ color: C.info }}>$</span>{" "}
            <span style={{ color: C.text }}>
              revenant verify --db prod-orders
            </span>
          </span>
          <span>example run</span>
        </div>

        <ul className="h-[15.5rem] space-y-2 px-4 py-4 font-mono text-[12px] leading-5 sm:text-[13px]">
          {LINES.slice(0, visible).map((l) => (
            <motion.li
              key={`${l.time}-${l.tag}-${l.text}`}
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-[2.75rem_4.5rem_1fr] gap-x-2"
            >
              <span style={{ color: C.muted }}>{l.time}</span>
              <span style={{ color: l.tone === "ok" ? C.ok : C.info }}>
                {l.tag}
              </span>
              <span style={{ color: C.text }}>
                {l.tone === "ok" ? "✓ " : ""}
                {l.text}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="h-[2px] w-full" style={{ background: C.border }}>
          <div
            className="h-full transition-[width] duration-500 ease-out"
            style={{
              width: `${(visible / total) * 100}%`,
              background: done ? C.ok : C.info,
            }}
          />
        </div>
      </div>

      {/* Certificate: reserved space on mobile, overlaps the terminal on desktop */}
      <div className="relative mt-3 min-h-[12.5rem] lg:absolute lg:-bottom-0 lg:-left-6 lg:mt-0 lg:min-h-0 lg:w-[19rem]">
        <AnimatePresence>
          {done && (
            <motion.div
              key="certificate"
              initial={
                reduceMotion ? false : { opacity: 0, y: 18, rotate: -1.5 }
              }
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
              className="rounded-xl border border-border bg-surface p-4 shadow-[0_24px_60px_-24px_rgba(8,12,16,0.45)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck size={18} className="text-success" />
                  Restore certificate
                </div>
                <span className="rounded-md bg-[var(--rv-success-muted)] px-2 py-0.5 text-xs font-semibold text-success">
                  PASS
                </span>
              </div>

              <dl className="mt-4 space-y-2 text-[13px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground-subtle">Database</dt>
                  <dd className="font-medium text-foreground">prod-orders</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground-subtle">Recovery time</dt>
                  <dd className="font-medium text-foreground">4m 12s</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground-subtle">Checks</dt>
                  <dd className="font-medium text-foreground">3 of 3 passed</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-foreground-subtle">Signature</dt>
                  <dd className="font-mono text-xs text-foreground-muted">
                    9f3c…a41e
                  </dd>
                </div>
              </dl>

              <p className="mt-4 border-t border-border pt-3 text-xs text-foreground-subtle">
                Downloadable as PDF and JSON
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
