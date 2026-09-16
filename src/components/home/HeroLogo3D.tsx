import { useEffect, useState } from "react";

const STATUS_LINES = [
  { cmd: "revenant verify", meta: "RTO 4m 12s · all checks passed" },
  { cmd: "revenant snapshot", meta: "RDS snapshot created · ap-south-1" },
  { cmd: "revenant doctor", meta: "config OK · Postgres reachable" },
];

export function HeroLogo3D() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % STATUS_LINES.length);
        setVisible(true);
      }, 280);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const status = STATUS_LINES[index];

  return (
    <div className="relative flex items-center justify-center py-8">
      <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-border-subtle" />
      <div className="pointer-events-none absolute h-96 w-96 rounded-full border border-border-subtle opacity-60" />
      <div className="pointer-events-none absolute h-56 w-56 rounded-full border auth-sonar-ring" />

      <div className="pointer-events-none absolute h-48 w-48">
        <span className="auth-ripple" />
        <span className="auth-ripple auth-ripple-delay-1" />
        <span className="auth-ripple auth-ripple-delay-2" />
      </div>

      <div className="logo-3d-stage relative z-10">
        <img
          src="/revenant_logo.png"
          alt="Revenant"
          className="logo-3d-img h-44 w-44 object-contain sm:h-52 sm:w-52"
          draggable={false}
        />
      </div>

      <div
        className={`absolute -bottom-2 left-1/2 z-20 w-[min(100%,280px)] -translate-x-1/2 ui-card px-4 py-3 text-center transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <p className="font-mono text-xs text-accent-bright">{status.cmd}</p>
        <p className="mt-0.5 text-[11px] text-foreground-subtle">{status.meta}</p>
      </div>
    </div>
  );
}
