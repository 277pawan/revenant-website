import { lazy, Suspense } from "react";
import { motion, useReducedMotion } from "motion/react";

const HeroParticles = lazy(() =>
  import("./HeroParticles").then((m) => ({ default: m.HeroParticles })),
);

export function HeroBackdrop() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="hero-bg-mesh absolute inset-0 bg-hero-mesh" />
      <div className="absolute inset-x-0 top-0 h-[min(560px,85vh)] bg-hero-glow opacity-90" />
      <div
        className="hero-bg-grid absolute inset-x-0 top-0 h-[min(520px,80vh)] bg-grid-fade bg-grid"
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-[min(560px,85vh)] overflow-hidden"
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.04, 1], x: [0, -12, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <img
          src="/hero-atmosphere.png"
          alt=""
          className="hero-atmosphere-img h-full w-full object-cover object-[62%_center] lg:object-[right_center]"
        />
      </motion.div>

      {!reduceMotion && (
        <Suspense fallback={null}>
          <HeroParticles />
        </Suspense>
      )}

      <div className="hero-bg-scrim absolute inset-x-0 top-0 h-[min(560px,85vh)]" />
      <div
        className="absolute inset-x-0 top-[min(380px,65vh)] h-48 bg-gradient-to-b from-transparent to-background"
      />
    </div>
  );
}
