import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

/**
 * "A backup isn't proof. Prove it actually ___."
 * The last word rolls through what Revenant actually proves, and the caption
 * under the headline changes with it, so each word is backed by a product fact.
 */

const PROOFS = [
  {
    word: "restores.",
    caption: "Real RDS snapshot, restored into a sandbox in your AWS account.",
  },
  {
    word: "recovers.",
    caption: "Timed from snapshot to verified, so you know your real RTO.",
  },
  {
    word: "checks out.",
    caption:
      "Schemas, row counts and foreign keys, queried on the recovered data.",
  },
  {
    word: "is signed.",
    caption: "A signed PDF and JSON certificate for every drill.",
  },
  {
    word: "comes back.",
    caption: "Proven on a schedule, not discovered during an outage.",
  },
] as const;

const INTERVAL_MS = 2900;
const EASE = [0.22, 1, 0.36, 1] as const;

export function ProofHeadline() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % PROOFS.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = PROOFS[index];

  return (
    <div>
      <h1 className="text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[3.9rem]">
        <span className="block">Backup isn&apos;t proof.</span>
        <span className="block">Prove it actually</span>

        {/* Screen readers get the full list once; the animation is decorative. */}
        <span className="sr-only">{PROOFS.map((p) => p.word).join(" ")}</span>

        <span
          aria-hidden="true"
          className="relative mt-1 inline-grid overflow-hidden pb-[0.14em] pt-[0.04em] align-top"
        >
          {/* Invisible copies reserve the width of the longest word: no layout jump. */}
          {PROOFS.map((p) => (
            <span
              key={p.word}
              className="invisible col-start-1 row-start-1 whitespace-nowrap"
            >
              {p.word}
            </span>
          ))}

          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={active.word}
              className="col-start-1 row-start-1 whitespace-nowrap text-accent-bright"
              initial={
                reduceMotion
                  ? false
                  : { y: "70%", opacity: 0, filter: "blur(6px)" }
              }
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? undefined
                  : { y: "-70%", opacity: 0, filter: "blur(6px)" }
              }
              transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
            >
              {active.word}
            </motion.span>
          </AnimatePresence>

          {/* Underline redraws on every change, like a pen underlining the claim. */}
          <motion.span
            key={`line-${active.word}`}
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-accent"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: 0.25,
              ease: EASE,
            }}
          />
        </span>
      </h1>

      <div className="mt-5 flex min-h-[2.75rem] items-start gap-2 text-sm text-foreground-muted sm:min-h-[1.5rem] sm:text-base">
        <Check
          size={18}
          className="mt-0.5 shrink-0 text-success"
          aria-hidden="true"
        />
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            key={active.caption}
            aria-live="off"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
          >
            {active.caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
