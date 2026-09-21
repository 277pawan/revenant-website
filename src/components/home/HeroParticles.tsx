import { useCallback, useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "motion/react";

import { useTheme } from "../../lib/theme";

function Field() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 48,
      detectRetina: true,
      particles: {
        number: { value: 42, density: { enable: true } },
        color: { value: theme === "dark" ? "#67e8f9" : "#0d9488" },
        opacity: { value: { min: 0.15, max: 0.55 } },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          color: theme === "dark" ? "#22d3ee" : "#0891b2",
          opacity: 0.22,
          distance: 120,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: { enable: true, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 110, links: { opacity: 0.45 } },
        },
      },
    }),
    [theme],
  );

  if (reduceMotion) return null;

  return (
    <div className="absolute inset-y-0 right-0 hidden w-[58%] opacity-70 md:block">
      <Particles
        id="hero-restore-mesh"
        className="h-full w-full"
        options={options}
      />
    </div>
  );
}

export function HeroParticles() {
  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={initParticles}>
      <Field />
    </ParticlesProvider>
  );
}
