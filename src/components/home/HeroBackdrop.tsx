import { useId } from "react";

/* Set to true to mirror the clouds (and glow) to the left side. */
const MIRROR_CLOUDS = false;

/* ------------------------------------------------------------------ */
/*  Self-contained: animations + theme variables are injected below.   */
/*  Dark mode = html without data-theme="light" (matches your index.css) */
/* ------------------------------------------------------------------ */

const CSS = `
.hb-root {
  /* light theme */
  --hb-tint: var(--rv-accent);
  --hb-hi: var(--rv-accent-bright);
  --hb-fill-top: .22;
  --hb-fill-bot: .03;
  --hb-edge: .4;
  --hb-wire: .3;
  --hb-node-ring: .55;
  --hb-halo: .2;
  --hb-cloud-filter: none;
  --hb-wire-filter: none;
  --hb-packet-filter: none;
  --hb-glow-a: 18%;
  --hb-glow-b: 10%;
}
html:not([data-theme="light"]) .hb-root {
  /* dark theme: cool, glowing, higher contrast */
  --hb-tint: #7aa2ff;
  --hb-hi: #c3d4ff;
  --hb-fill-top: .20;
  --hb-fill-bot: .02;
  --hb-edge: .55;
  --hb-wire: .5;
  --hb-node-ring: .8;
  --hb-halo: .4;
  --hb-cloud-filter: drop-shadow(0 0 22px rgba(122,162,255,.22));
  --hb-wire-filter: drop-shadow(0 0 4px rgba(122,162,255,.55));
  --hb-packet-filter: drop-shadow(0 0 6px var(--rv-success));
  --hb-glow-a: 24%;
  --hb-glow-b: 14%;
}

@keyframes hb-drift-a { 0%,100% { transform: translateX(-10px); } 50% { transform: translateX(14px); } }
@keyframes hb-drift-b { 0%,100% { transform: translateX(12px); }  50% { transform: translateX(-12px); } }
@keyframes hb-dash    { to { stroke-dashoffset: -26; } }
@keyframes hb-halo    { 0%,100% { opacity: .35; transform: scale(.85); } 50% { opacity: 1; transform: scale(1.1); } }
@keyframes hb-float   { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

.hb-cloud   { will-change: transform; filter: var(--hb-cloud-filter); }
.hb-drift-a { animation: hb-drift-a 34s ease-in-out infinite; }
.hb-drift-b { animation: hb-drift-b 46s ease-in-out infinite; }
.hb-link    { stroke-dasharray: 5 8; animation: hb-dash 3s linear infinite; filter: var(--hb-wire-filter); }
.hb-packet  { filter: var(--hb-packet-filter); }
.hb-halo    { transform-box: fill-box; transform-origin: center; animation: hb-halo 4.5s ease-in-out infinite; }
.hb-chip    { animation: hb-float 7s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .hb-cloud, .hb-link, .hb-halo, .hb-chip { animation: none !important; }
  .hb-packet { display: none; }
}
`;

/* ----------------------------- Cloud ------------------------------ */

const CLOUD_BODY =
  "M60 100 C28 100 10 80 20 58 C28 40 52 36 66 44 C70 20 98 6 124 16 C142 24 150 38 150 46 C170 34 200 44 204 66 C220 70 226 92 206 100 Z";
const CLOUD_HIGHLIGHT = "M72 66 C86 46 110 40 128 50";

function Cloud({ className, strength = 1 }: { className: string; strength?: number }) {
  const id = "hb" + useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 240 120" className={`absolute overflow-visible hb-cloud ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--hb-tint)", stopOpacity: `calc(var(--hb-fill-top) * ${strength})` }} />
          <stop offset="100%" style={{ stopColor: "var(--hb-tint)", stopOpacity: `calc(var(--hb-fill-bot) * ${strength})` }} />
        </linearGradient>
      </defs>
      <g strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth="1.2">
        <path
          d={CLOUD_BODY}
          fill={`url(#${id})`}
          style={{ stroke: "var(--hb-tint)", strokeOpacity: `calc(var(--hb-edge) * ${strength})` }}
        />
        <path
          d={CLOUD_HIGHLIGHT}
          style={{ stroke: "var(--hb-hi)", strokeOpacity: `calc(var(--hb-edge) * ${strength} * .9)` }}
        />
      </g>
    </svg>
  );
}

/* ----------------------------- Network ---------------------------- */

// Nodes represent the actual pipeline steps: Source -> Sandbox -> Verify -> Evidence
const NODES = [
  { id: 'source', x: 80, y: 180, label: 'AWS Snapshot', type: 'source' },
  { id: 'sandbox', x: 260, y: 320, label: 'Sandbox', type: 'process' },
  { id: 'verify', x: 450, y: 460, label: 'Verify', type: 'process' },
  { id: 'evidence', x: 680, y: 580, label: 'Evidence', type: 'target' },
];

// Links create a structured path leading towards the UI card (bottom right)
const LINKS = [
  {
    d: "M 80 180 C 150 180, 180 320, 260 320",
    dur: 3.5,
    delay: 0
  },
  {
    d: "M 260 320 C 330 320, 360 460, 450 460",
    dur: 4,
    delay: 0.8
  },
  {
    d: "M 450 460 C 530 460, 560 580, 680 580",
    dur: 4.5,
    delay: 1.6
  },
];

export default function Network() {
  return (
    <svg
      viewBox="0 0 800 700"
      preserveAspectRatio="xMaxYMid meet"
      className="absolute right-0 top-0 hidden h-full w-[58%] lg:block"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 30%)",
        maskImage: "linear-gradient(to right, transparent 0%, #000 30%)",
      }}
    >
      <defs>
        {/* Glow effect for the nodes */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Background Data Trails (Dashed, subtle) */}
      {LINKS.map((l, i) => (
        <path
          key={`trail-${i}`}
          d={l.d}
          fill="none"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="hb-trail"
          style={{
            stroke: "var(--hb-tint)",
            strokeOpacity: 0.15
          }}
        />
      ))}

      {/* 2. Main Pipeline Lines */}
      {LINKS.map((l, i) => (
        <g key={`link-${i}`}>
          <path
            d={l.d}
            fill="none"
            strokeWidth="2"
            className="hb-link"
            style={{
              stroke: "var(--hb-tint)",
              strokeOpacity: 0.3,
              strokeLinecap: "round"
            }}
          />
          {/* Animated Packets (representing data flow) */}
          <circle r="4" fill="var(--rv-success)" filter="url(#glow)">
            <animateMotion
              dur={`${l.dur}s`}
              begin={`${l.delay}s`}
              repeatCount="indefinite"
              path={l.d}
            />
          </circle>
        </g>
      ))}

      {/* 3. Meaningful Nodes */}
      {NODES.map((node, i) => {
        // Customize node appearance based on its role in the pipeline
        const isSource = node.type === 'source';
        const isTarget = node.type === 'target';

        return (
          <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
            {/* Outer Halo (pulses slowly) */}
            <circle
              r={isTarget ? "24" : "18"}
              fill="none"
              className="hb-halo"
              style={{
                stroke: "var(--hb-tint)",
                strokeOpacity: isTarget ? 0.4 : 0.2,
                animationDelay: `${i * 0.8}s`
              }}
            />

            {/* Node Core */}
            <circle
              r={isTarget ? "12" : "8"}
              fill={isSource ? "var(--rv-surface)" : "var(--rv-surface)"}
              style={{
                stroke: "var(--hb-tint)",
                strokeOpacity: isTarget ? 1 : 0.6,
                strokeWidth: isTarget ? 2 : 1
              }}
            />

            {/* Center Dot (Success color for the final target) */}
            <circle
              r={isTarget ? "4" : "3"}
              fill={isTarget ? "var(--rv-success)" : "var(--hb-hi)"}
            />

            {/* Optional: Tiny text label next to nodes for clarity (uncomment if desired) */}
            {/* <text 
              x="20" y="4" 
              fill="var(--hb-tint)" 
              fontSize="10" 
              opacity="0.5"
              fontFamily="monospace"
            >
              {node.label}
            </text> */}
          </g>
        );
      })}
    </svg>
  );
}
/* ----------------------------- Backdrop --------------------------- */

export function HeroBackdrop() {
  const glowX = MIRROR_CLOUDS ? "24%" : "76%";

  return (
    <div
      className="hb-root pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent)",
        maskImage: "linear-gradient(to bottom, #000 82%, transparent)",
      }}
    >
      <style>{CSS}</style>

      {/* atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            `radial-gradient(48% 60% at ${glowX} 42%, color-mix(in srgb, var(--hb-tint) var(--hb-glow-a), transparent), transparent 72%),` +
            "radial-gradient(34% 40% at 6% 92%, color-mix(in srgb, var(--rv-success) var(--hb-glow-b), transparent), transparent 72%)",
        }}
      />

      {/* clouds */}
      <div className="absolute inset-0 -scale-x-100">
        <Cloud className="hb-drift-a right-[4%] -top-[4%] hidden w-[30rem] sm:block" strength={0.2} />
        <Cloud className="hb-drift-b -right-[6%] top-[52%] hidden w-[26rem] md:block" strength={0.3} />
        <Cloud className="hb-drift-a left-[40%] -bottom-[2%] w-[15rem]" strength={0.4} />
        <Cloud className="hb-drift-b -left-[3%] -bottom-[3%] hidden w-[16rem] lg:block" strength={0.5} />
      </div>

      {/* <Network /> */}
    </div>
  );
}

/* ------------- Floating region badges, attached to the card ------------- */

function Chip({ label, className, delay }: { label: string; className: string; delay: number }) {
  return (
    <div
      className={`hb-chip pointer-events-none absolute z-20 hidden items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] text-foreground-muted shadow-sm backdrop-blur md:flex ${className}`}
      style={{
        borderColor: "var(--rv-border-strong)",
        backgroundColor: "color-mix(in srgb, var(--rv-surface) 85%, transparent)",
        animationDelay: `${delay}s`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: "var(--rv-success)", boxShadow: "0 0 6px var(--rv-success)" }}
      />
      {label}
    </div>
  );
}

export function HeroRegionChips() {
  return (
    <>
      {/* <Chip label="us-east-1" className="-right-3 top-28" delay={0} /> */}
      {/* <Chip label="eu-west-1" className="-left-3 top-[58%]" delay={1.3} /> */}
      {/* <Chip label="ap-south-1" className="-right-3 bottom-24" delay={2.6} /> */}
    </>
  );
}