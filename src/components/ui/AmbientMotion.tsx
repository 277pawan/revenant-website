import { useId } from "react";

export type AmbientMotionVariant =
    | "hero"
    | "features"
    | "architecture"
    | "recovery"
    | "cta";

/* ------------------------------------------------------------------ */
/*  Self-contained: animations + light/dark variables injected below.  */
/*  Dark mode = html without data-theme="light" (same rule as index.css) */
/*  The hero scene lives in HeroBackdrop.tsx, so "hero" renders nothing. */
/* ------------------------------------------------------------------ */

const CSS = `
.am-root {
  /* light theme */
  --am-tint: var(--rv-accent);
  --am-hi: var(--rv-accent-bright);
  --am-fill-top: .22;
  --am-fill-bot: .03;
  --am-edge: .4;
  --am-wire: .3;
  --am-ring: .55;
  --am-halo: .2;
  --am-orbit: 1;
  --am-core: .22;
  --am-glow: 16%;
  --am-line: 35%;
  --am-cloud-filter: none;
  --am-wire-filter: none;
  --am-packet-filter: none;
}
html:not([data-theme="light"]) .am-root {
  /* dark theme: cool, glowing, higher contrast */
  --am-tint: #7aa2ff;
  --am-hi: #c3d4ff;
  --am-fill-top: .20;
  --am-fill-bot: .02;
  --am-edge: .55;
  --am-wire: .5;
  --am-ring: .8;
  --am-halo: .4;
  --am-orbit: 1.9;
  --am-core: .32;
  --am-glow: 22%;
  --am-line: 55%;
  --am-cloud-filter: drop-shadow(0 0 20px rgba(122,162,255,.22));
  --am-wire-filter: drop-shadow(0 0 4px rgba(122,162,255,.55));
  --am-packet-filter: drop-shadow(0 0 6px var(--rv-success));
}

@keyframes am-drift-a { 0%,100% { transform: translateX(-8px); } 50% { transform: translateX(12px); } }
@keyframes am-drift-b { 0%,100% { transform: translateX(10px); } 50% { transform: translateX(-10px); } }
@keyframes am-dash    { to { stroke-dashoffset: -26; } }
@keyframes am-orbit   { to { transform: rotate(360deg); } }
@keyframes am-travel  { 0% { top: 0; opacity: 0; } 15%,85% { opacity: 1; } 100% { top: 100%; opacity: 0; } }

.am-cloud   { will-change: transform; filter: var(--am-cloud-filter); }
.am-drift-a { animation: am-drift-a 38s ease-in-out infinite; }
.am-drift-b { animation: am-drift-b 48s ease-in-out infinite; }
.am-link    { stroke-dasharray: 5 8; animation: am-dash 3s linear infinite; filter: var(--am-wire-filter); }
.am-packet  { filter: var(--am-packet-filter); }
.am-orbit   { transform-box: view-box; transform-origin: 300px 300px; animation: am-orbit var(--d, 80s) linear infinite; }
.am-orbit-rev { animation-direction: reverse; }
.am-pulse   {
  position: absolute; left: -1px; width: 3px; height: 56px; border-radius: 9999px;
  background: linear-gradient(transparent, var(--am-hi), transparent);
  animation: am-travel 6s ease-in-out infinite;
}

@media (max-width: 640px) { .am-hide-mobile { display: none !important; } }
@media (prefers-reduced-motion: reduce) {
  .am-cloud, .am-link, .am-orbit, .am-pulse { animation: none !important; }
  .am-packet { display: none; }
}
`;

/* ----------------------------- Cloud ------------------------------ */

const CLOUD_BODY =
    "M60 100 C28 100 10 80 20 58 C28 40 52 36 66 44 C70 20 98 6 124 16 C142 24 150 38 150 46 C170 34 200 44 204 66 C220 70 226 92 206 100 Z";
const CLOUD_HIGHLIGHT = "M72 66 C86 46 110 40 128 50";

/** Cloud drawn in a 240x120 box. Usable inside any <svg>. */
function CloudShape({ strength = 1 }: { strength?: number }) {
    const id = "am" + useId().replace(/:/g, "");
    return (
        <g strokeLinecap="round" strokeLinejoin="round" fill="none" strokeWidth="1.2">
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{ stopColor: "var(--am-tint)", stopOpacity: `calc(var(--am-fill-top) * ${strength})` }} />
                    <stop offset="100%" style={{ stopColor: "var(--am-tint)", stopOpacity: `calc(var(--am-fill-bot) * ${strength})` }} />
                </linearGradient>
            </defs>
            <path d={CLOUD_BODY} fill={`url(#${id})`} style={{ stroke: "var(--am-tint)", strokeOpacity: `calc(var(--am-edge) * ${strength})` }} />
            <path d={CLOUD_HIGHLIGHT} style={{ stroke: "var(--am-hi)", strokeOpacity: `calc(var(--am-edge) * ${strength} * .9)` }} />
        </g>
    );
}

function Cloud({ className, strength }: { className: string; strength?: number }) {
    return (
        <svg viewBox="0 0 240 120" className={`am-cloud absolute overflow-visible ${className}`}>
            <CloudShape strength={strength} />
        </svg>
    );
}

/* ----------------------------- Shared ----------------------------- */

function Glow({ className }: { className: string }) {
    return (
        <div
            className={`absolute ${className}`}
            style={{
                background:
                    "radial-gradient(closest-side, color-mix(in srgb, var(--am-tint) var(--am-glow), transparent), transparent 70%)",
            }}
        />
    );
}

function Link({ d, dur, delay = 0 }: { d: string; dur: number; delay?: number }) {
    return (
        <g>
            <path d={d} fill="none" strokeWidth="1.4" className="am-link" style={{ stroke: "var(--am-tint)", strokeOpacity: "var(--am-wire)" }} />
            <circle r="3.5" fill="var(--rv-success)" className="am-packet">
                <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
            </circle>
        </g>
    );
}

/* ------------------- Architecture: cropped orbit rings ------------------- */

function OrbitNode({ cx, cy, r = 9 }: { cx: number; cy: number; r?: number }) {
    return (
        <g>
            <circle cx={cx} cy={cy} r={r} fill="none" style={{ stroke: "var(--am-tint)", strokeOpacity: "var(--am-ring)" }} />
            <circle cx={cx} cy={cy} r={3.5} style={{ fill: "var(--am-hi)" }} />
        </g>
    );
}

function Ring({ r, op, dash }: { r: number; op: number; dash?: string }) {
    return (
        <circle
            cx="300"
            cy="300"
            r={r}
            fill="none"
            strokeDasharray={dash}
            style={{ stroke: "var(--am-tint)", strokeOpacity: `calc(${op} * var(--am-orbit))` }}
        />
    );
}

function Orbits() {
    return (
        <svg viewBox="0 0 600 600" className="am-hide-mobile absolute -right-[22rem] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2">
            <defs>
                <radialGradient id="am-core">
                    <stop offset="0%" style={{ stopColor: "var(--am-tint)", stopOpacity: "var(--am-core)" }} />
                    <stop offset="100%" style={{ stopColor: "var(--am-tint)", stopOpacity: 0 }} />
                </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="250" fill="url(#am-core)" />

            <g className="am-orbit" style={{ ["--d" as string]: "70s" }}>
                <Ring r={120} op={0.22} dash="3 7" />
                <OrbitNode cx={420} cy={300} />
                <OrbitNode cx={180} cy={300} r={7} />
            </g>
            <g className="am-orbit am-orbit-rev" style={{ ["--d" as string]: "110s" }}>
                <Ring r={190} op={0.18} />
                <OrbitNode cx={300} cy={110} />
                <OrbitNode cx={434} cy={434} r={7} />
            </g>
            <g className="am-orbit" style={{ ["--d" as string]: "160s" }}>
                <Ring r={260} op={0.14} dash="2 10" />
                <OrbitNode cx={560} cy={300} />
                <OrbitNode cx={116} cy={116} r={7} />
            </g>

            <g transform="translate(192 246) scale(0.9)" className="am-cloud">
                <CloudShape strength={1.2} />
            </g>
        </svg>
    );
}

/* ----------------------------- CTA ----------------------------- */

const ARC = "M120 112 C 180 24, 260 24, 330 78";

function CtaScene() {
    return (
        <>
            <Glow className="-right-20 top-1/2 h-96 w-96 -translate-y-1/2" />
            <svg viewBox="0 0 460 170" className="am-hide-mobile absolute right-[4%] top-1/2 w-[30rem] -translate-y-1/2 overflow-visible">
                <g transform="translate(0 70) scale(0.5)" className="am-cloud"><CloudShape /></g>
                <g transform="translate(300 10) scale(0.65)" className="am-cloud"><CloudShape /></g>
                <Link d={ARC} dur={4.5} />
            </svg>
        </>
    );
}

/* ----------------------------- Switch ----------------------------- */

function Scene({ variant }: { variant: Exclude<AmbientMotionVariant, "hero"> }) {
    switch (variant) {
        case "features":
            return (
                <>
                    <Glow className="-right-24 top-0 h-80 w-80" />
                    <Cloud className="am-drift-b am-hide-mobile right-[3%] top-[8%] w-56" strength={0.9} />
                    <Cloud className="am-drift-a am-hide-mobile right-[18%] top-[38%] w-24" strength={1} />
                </>
            );
        case "architecture":
            return <Orbits />;
        case "recovery":
            return (
                <div
                    className="absolute left-[1.5%] top-[10%] h-[80%] w-px"
                    style={{
                        background:
                            "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--am-tint) var(--am-line), transparent) 20%, color-mix(in srgb, var(--am-tint) var(--am-line), transparent) 80%, transparent)",
                    }}
                >
                    <span className="am-pulse" />
                </div>
            );
        case "cta":
            return <CtaScene />;
    }
}

export function AmbientMotion({ variant }: { variant: AmbientMotionVariant }) {
    if (variant === "hero") return null;

    return (
        <div className={`am-root ambient-motion ambient-motion-${variant}`} aria-hidden="true">
            <style>{CSS}</style>
            <Scene variant={variant} />
        </div>
    );
}