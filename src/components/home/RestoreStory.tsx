import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, MotionPathPlugin);

const tw = (hex: string) =>
  `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${hex}.svg`;

/** ~2200px track. */
const CURVE =
  "M 200 114 C 200 220, 800 270, 800 378 C 800 484, 200 534, 200 642 C 200 748, 800 798, 800 906 C 800 1012, 200 1062, 200 1170 C 200 1276, 800 1326, 800 1434 C 800 1540, 200 1590, 200 1698 C 200 1854, 520 1948, 520 2086";

const NODES = [
  { cx: 200, cy: 114 },
  { cx: 800, cy: 378 },
  { cx: 200, cy: 642 },
  { cx: 800, cy: 906 },
  { cx: 200, cy: 1170 },
  { cx: 800, cy: 1434 },
  { cx: 200, cy: 1698 },
  { cx: 520, cy: 2086 },
] as const;

function Emoji({
  hex,
  label,
  className = "h-6 w-6",
}: {
  hex: string;
  label: string;
  className?: string;
}) {
  return (
    <img
      src={tw(hex)}
      alt={label}
      className={`inline-block shrink-0 ${className}`}
      draggable={false}
    />
  );
}

function Note({
  side,
  top,
  kicker,
  text,
  step,
}: {
  side: "left" | "right";
  top: string;
  kicker: string;
  text: string;
  step: number;
}) {
  return (
    <aside
      data-note
      data-step={step}
      data-side={side}
      className={`absolute hidden w-[min(280px,34%)] md:block ${
        side === "left" ? "left-[8%] text-left" : "right-[8%] text-right"
      }`}
      style={{ top }}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
        {kicker}
      </p>
      <p className="mt-1 text-sm leading-snug text-foreground-muted">{text}</p>
    </aside>
  );
}

export function RestoreStory() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const path = root.current?.querySelector<SVGPathElement>("#drill-curve");
      if (!path) return;
      const len = path.getTotalLength();
      const draw = {
        trigger: root.current,
        start: "top 75%",
        end: "bottom 45%",
        scrub: 0.4,
      };

      const q = gsap.utils.selector(root.current);

      if (reduce) {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: 0 });
        gsap.set(q("[data-scrap],[data-note]"), { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, { strokeDashoffset: 0, ease: "none", scrollTrigger: draw });
      gsap.to(q("[data-bead]"), {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
        scrollTrigger: draw,
      });

      gsap.set(q("[data-scrap],[data-note]"), {
        autoAlpha: 0,
        y: 22,
        scale: 0.94,
      });

      q("[data-scrap]").forEach((card: Element) => {
        const step = card.getAttribute("data-step");
        const bits = q(`[data-step="${step}"]`);
        ScrollTrigger.create({
          trigger: card,
          start: "top 78%",
          onEnter: () =>
            gsap.to(bits, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.45,
              ease: "back.out(1.5)",
              stagger: 0.06,
              overwrite: true,
            }),
          onLeaveBack: () =>
            gsap.to(bits, {
              autoAlpha: 0,
              y: 18,
              scale: 0.94,
              duration: 0.22,
              overwrite: true,
            }),
        });
      });
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section ref={root} className="relative overflow-x-clip bg-background py-14 sm:py-20">
      <header className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="ui-section-label">How a drill runs</p>
        <h2 className="ui-heading mt-2 max-w-3xl text-3xl sm:text-4xl">
          Follow the curve. Each scrap is a real step.
        </h2>
      </header>

      <div className="relative mx-auto mt-8 h-[2200px] w-full max-w-6xl px-2 sm:px-4">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-accent"
          viewBox="0 0 1000 2200"
          fill="none"
          aria-hidden
        >
          <path
            d={CURVE}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.22"
          />
          <path
            id="drill-curve"
            d={CURVE}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {NODES.map((n) => (
            <circle
              key={`${n.cx}-${n.cy}`}
              cx={n.cx}
              cy={n.cy}
              r="7"
              fill="var(--rv-background)"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          ))}
        </svg>

        <div
          data-bead
          className="pointer-events-none absolute left-0 top-0 z-20 h-3 w-3 rounded-full bg-accent shadow-[0_0_14px_var(--rv-accent)]"
        />

        <article
          data-scrap
          data-step={1}
          data-side="left"
          className="absolute left-[2%] top-[1%] w-[min(240px,72%)] -rotate-2 rounded-xl border border-border bg-terminal-bg p-2.5 shadow-card sm:left-[5%] sm:w-[min(240px,32%)]"
        >
          <div className="flex items-center gap-2">
            <Emoji hex="1f4cb" label="clipboard" />
            <span className="font-mono text-xs text-terminal-prompt">
              revenant.yaml
            </span>
          </div>
          <pre className="mt-1 font-mono text-[10px] leading-snug text-terminal-muted">
            {`checks: schema · rows · golden`}
          </pre>
        </article>
        <Note
          step={1}
          side="right"
          top="2%"
          kicker="01 · plan"
          text="The YAML lives in git. Revenant never reads app source — only live Postgres."
        />

        <article
          data-scrap
          data-step={2}
          data-side="right"
          className="absolute right-[2%] top-[14%] w-[min(200px,70%)] rotate-2 overflow-hidden rounded-xl border border-border bg-surface shadow-card sm:right-[5%] sm:w-[min(200px,28%)]"
        >
          <img
            src="/restore-kit.jpg"
            alt="Restore kit"
            className="h-24 w-full object-cover"
          />
          <p className="flex items-center gap-1 px-2 py-1 text-[11px] text-foreground">
            <Emoji hex="1f9f0" label="toolbox" className="h-4 w-4" />
            snapshot kit
          </p>
        </article>
        <Note
          step={2}
          side="left"
          top="15%"
          kicker="02 · snapshot"
          text="Restore from the real snapshot — not a mock, not a dump you hope still works."
        />

        <article
          data-scrap
          data-step={3}
          data-side="left"
          className="absolute left-[2%] top-[27%] w-[min(230px,72%)] -rotate-1 rounded-xl border border-accent/40 bg-accent-muted p-2.5 shadow-card sm:left-[5%] sm:w-[min(230px,30%)]"
        >
          <div className="flex items-center gap-2">
            <Emoji hex="1f4e6" label="package" />
            <Emoji hex="1f418" label="postgres elephant" />
            <span className="font-mono text-xs text-foreground">sandbox</span>
          </div>
          <p className="mt-1 text-[11px] text-foreground-muted">
            db.t3.micro · your AWS
          </p>
        </article>
        <Note
          step={3}
          side="right"
          top="28%"
          kicker="03 · sandbox"
          text="Temporary RDS in your account. Isolated from prod. Auto-reaped when the drill ends."
        />

        <article
          data-scrap
          data-step={4}
          data-side="right"
          className="absolute right-[2%] top-[38%] w-[min(280px,78%)] rotate-1 rounded-xl border border-terminal-border bg-terminal-bg p-2.5 shadow-card sm:right-[4%] sm:w-[min(300px,40%)]"
        >
          <div className="mb-1 flex items-center gap-2">
            <Emoji hex="1f4bb" label="laptop" />
            <span className="font-mono text-[11px] text-terminal-muted">
              $ revenant verify
            </span>
          </div>
          <pre className="font-mono text-[10px] leading-snug">
            <span className="text-terminal-success">✓ customers · orders</span>
            {"  "}
            <span className="text-success font-semibold">PASS</span>
            {"  "}
            <span className="text-terminal-info">4m 12s</span>
          </pre>
        </article>
        <Note
          step={4}
          side="left"
          top="40%"
          kicker="04 · verify"
          text="Checks run on recovered data. RTO is measured, not estimated."
        />

        <article
          data-scrap
          data-step={5}
          data-side="left"
          className="absolute left-[2%] top-[51%] w-[min(240px,72%)] -rotate-1 rounded-xl border border-border bg-surface p-2.5 shadow-card sm:left-[6%] sm:w-[min(250px,32%)]"
        >
          <p className="mb-1.5 flex items-center gap-1.5 text-xs text-foreground">
            <Emoji hex="2705" label="check" className="h-4 w-4" /> YAML checks
          </p>
          <div className="flex flex-wrap gap-1">
            {["schema", "rows", "fk", "golden"].map((c) => (
              <span
                key={c}
                className="rounded-full bg-success-muted px-1.5 py-0.5 font-mono text-[10px] text-success"
              >
                ✓ {c}
              </span>
            ))}
          </div>
        </article>
        <Note
          step={5}
          side="right"
          top="52%"
          kicker="05 · checks"
          text="Schema, row counts, foreign keys, golden queries. Fail the drill if any drift."
        />

        <article
          data-scrap
          data-step={6}
          data-side="right"
          className="absolute right-[2%] top-[63%] w-[min(210px,70%)] rotate-2 rounded-xl border border-border bg-surface p-2.5 shadow-card sm:right-[6%] sm:w-[min(220px,28%)]"
        >
          <ul className="space-y-0.5 font-mono text-[11px] text-foreground-muted">
            <li className="flex items-center gap-1.5">
              <Emoji hex="1f4c4" label="page" className="h-4 w-4" /> report.json
            </li>
            <li className="flex items-center gap-1.5">
              <Emoji hex="1f4dd" label="memo" className="h-4 w-4" /> report.md
            </li>
            <li className="flex items-center gap-1.5">
              <Emoji hex="1f4c3" label="scroll" className="h-4 w-4" /> report.pdf
            </li>
          </ul>
        </article>
        <Note
          step={6}
          side="left"
          top="64%"
          kicker="06 · evidence"
          text="Signed JSON, Markdown, and PDF. Hand it to an auditor or drop it in the vault."
        />

        <article
          data-scrap
          data-step={7}
          data-side="left"
          className="absolute left-[2%] top-[76%] w-[min(230px,72%)] -rotate-2 rounded-xl border border-border bg-surface p-2.5 shadow-card sm:left-[5%] sm:w-[min(240px,30%)]"
        >
          <div className="flex items-center gap-2">
            <Emoji hex="1f4ac" label="speech" />
            <span className="text-[11px] text-foreground-subtle">#dr-proof</span>
          </div>
          <p className="mt-0.5 text-sm text-foreground">
            <span className="font-semibold">revenant-bot</span>{" "}
            <span className="text-success">PASS</span>
          </p>
        </article>
        <Note
          step={7}
          side="right"
          top="76%"
          kicker="07 · notify"
          text="Slack the channel, then reap. The sandbox does not linger on your bill."
        />

        <article
          data-scrap
          data-step={8}
          data-side="right"
          className="absolute right-[10%] top-[90%] w-[min(280px,80%)] rotate-1 rounded-xl border border-terminal-border bg-terminal-bg p-2.5 shadow-card sm:w-[min(280px,36%)]"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            <Emoji hex="1f4e1" label="satellite" />
            <span className="font-mono text-[11px] text-terminal-info">
              POST /hooks
            </span>
            <Emoji hex="1f4e7" label="email" className="h-4 w-4" />
          </div>
          <pre className="mt-1 font-mono text-[10px] text-terminal-muted">
            {`{"status":"passed","rto":252}`}
          </pre>
        </article>
        <Note
          step={8}
          side="left"
          top="90%"
          kicker="08 · hook"
          text="HTTP + email so CI, PagerDuty, or a board pack can subscribe to proof."
        />
      </div>
    </section>
  );
}
