import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useState } from "react";

const STAGES = ["Snapshot", "Sandbox", "Verify", "Evidence", "Reap"] as const;

const CHECKS = [
  "customers table exists",
  "orders row count 3 >= 1",
  "foreign key orders -> customers intact",
];

const CYCLE = 7.2;

export function RestoreChamber() {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 1 : 0);
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [stage, setStage] = useState(reduceMotion ? STAGES.length : 0);
  const [checks, setChecks] = useState(reduceMotion ? CHECKS.length : 0);
  const [passed, setPassed] = useState(!!reduceMotion);

  useMotionValueEvent(progress, "change", (v) => {
    const nextStage = Math.min(STAGES.length, Math.floor(v * STAGES.length + 0.02));
    const checkStart = 0.42;
    const nextChecks =
      v < checkStart
        ? 0
        : Math.min(
            CHECKS.length,
            Math.floor(((v - checkStart) / 0.4) * CHECKS.length) +
              (v > checkStart ? 1 : 0),
          );
    setStage(nextStage);
    setChecks(Math.min(CHECKS.length, nextChecks));
    setPassed(v >= 0.9);
  });

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      return;
    }
    const controls = animate(progress, 1, {
      duration: CYCLE,
      ease: [0.45, 0.05, 0.2, 1],
      repeat: Infinity,
      repeatDelay: 0.9,
      onRepeat: () => {
        progress.set(0);
      },
    });
    return () => controls.stop();
  }, [progress, reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
        <div className="relative h-40 overflow-hidden sm:h-52">
          <img
            src="/restore-kit.jpg"
            alt="Revenant restore kit — shield, cable, and recovery core"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-200 backdrop-blur-md">
            Restore kit · field issue
          </div>
        </div>

        <div className="relative p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] text-accent-bright">
                $ revenant verify
              </p>
              <p className="mt-0.5 text-xs text-foreground-subtle">
                sandbox db.t3.micro · us-east-1
              </p>
            </div>
            <img
              src="/Revenant_verify_logo.png"
              alt=""
              className="h-10 w-auto max-w-[160px] object-contain opacity-90"
            />
          </div>

          <div className="mt-4">
            <div className="relative h-1.5 overflow-hidden rounded-full bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                style={{ width: fill }}
              />
            </div>
            <ol className="mt-2 flex">
              {STAGES.map((label, i) => {
                const on = stage > i;
                return (
                  <li
                    key={label}
                    className={`min-w-0 flex-1 truncate text-center text-[10px] transition-colors duration-500 sm:text-[11px] ${
                      on ? "font-medium text-foreground" : "text-foreground-subtle"
                    }`}
                  >
                    {label}
                  </li>
                );
              })}
            </ol>
          </div>

          <ul className="mt-4 space-y-1.5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
            {CHECKS.map((line, i) => {
              const on = checks > i;
              return (
                <motion.li
                  key={line}
                  initial={false}
                  animate={{
                    opacity: on ? 1 : 0.32,
                    y: on ? 0 : 4,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={on ? "text-terminal-success" : "text-terminal-muted"}
                >
                  {on ? "✓" : "·"} {line}
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            className="mt-4 flex items-center justify-between rounded-xl border px-3 py-2.5"
            animate={
              passed
                ? {
                    borderColor: "color-mix(in srgb, var(--rv-success) 40%, transparent)",
                    backgroundColor: "var(--rv-success-muted)",
                  }
                : {
                    borderColor: "var(--rv-border)",
                    backgroundColor: "var(--rv-surface-sunken)",
                  }
            }
            transition={{ duration: 0.4 }}
          >
            <span
              className={`text-sm font-semibold ${
                passed ? "text-success" : "text-foreground-subtle"
              }`}
            >
              {passed ? "Restore Validation: PASS" : "Waiting on checks…"}
            </span>
            <span className="font-mono text-xs text-accent-bright">
              {passed ? "RTO 4m 12s" : "—"}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
