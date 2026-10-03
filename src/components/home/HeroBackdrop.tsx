import { useEffect, useRef } from "react";

/**
 * Hero backdrop: a living map of your fleet.
 *
 * - The grid is a fleet of databases. Cells quietly flip to "verified" in soft
 *   waves, the way restore drills pass across a real fleet.
 * - Every few seconds one cell breaks apart into particles, drifts, then
 *   reassembles and lands as verified with a tick. That is the Revenant moment:
 *   something that came back.
 * - Moving the cursor verifies cells under it.
 *
 * Fills the whole hero section. Uses theme tokens (--rv-*), so it follows
 * light/dark. Pauses when off-screen or the tab is hidden, stays static with
 * prefers-reduced-motion, and ignores touch pointers.
 */

type Verify = {
  c: number;
  r: number;
  born: number;
  peak: number;
  tick: boolean;
};
type Particle = { a: number; d: number; s: number; w: number };
type Revive = { c: number; r: number; born: number; parts: Particle[] };

const VERIFY_LIFE = 5200;
const BREAK = 700;
const DRIFT = 1500;
const RETURN = 2700;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function readColors() {
  const s = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) =>
    s.getPropertyValue(name).trim() || fallback;
  return {
    line: get("--rv-border", "#2b3238"),
    ok: get("--rv-success", "#3fb27f"),
    warn: get("--rv-accent-bright", "#d9b24c"),
  };
}

export function HeroBackdrop() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = wrap.parentElement ?? wrap;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let cell = 56;
    let cols = 0;
    let rows = 0;
    let colors = readColors();

    const verifies: Verify[] = [];
    const revives: Revive[] = [];
    let hover: { c: number; r: number } | null = null;
    let lastTrail = "";
    let nextAmbient = 0;
    let nextRevive = 0;
    let raf = 0;
    let onScreen = true;

    const rand = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 640 ? 44 : 56;
      cols = Math.max(1, Math.ceil(w / cell));
      rows = Math.max(1, Math.ceil(h / cell));
      if (reduce) {
        seedStatic();
        draw(performance.now());
      }
    };

    const seedStatic = () => {
      verifies.length = 0;
      const count = Math.round((cols * rows) / 9);
      for (let i = 0; i < count; i++) {
        verifies.push({
          c: Math.floor(Math.random() * cols),
          r: Math.floor(Math.random() * rows),
          born: performance.now() - VERIFY_LIFE * rand(0.05, 0.5),
          peak: 0.12,
          tick: false,
        });
      }
    };

    const drawTick = (cx: number, cy: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = colors.ok;
      ctx.lineWidth = 1.75;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(cx - 5, cy);
      ctx.lineTo(cx - 1.5, cy + 4);
      ctx.lineTo(cx + 5, cy - 4);
      ctx.stroke();
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      // grid lines
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = c * cell + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let r = 0; r <= rows; r++) {
        const y = r * cell + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // cursor halo: outlines that fall off with distance
      if (hover) {
        ctx.strokeStyle = colors.ok;
        ctx.lineWidth = 1;
        for (let dc = -2; dc <= 2; dc++) {
          for (let dr = -2; dr <= 2; dr++) {
            const dist = Math.max(Math.abs(dc), Math.abs(dr));
            ctx.globalAlpha = [0.55, 0.3, 0.12][dist];
            ctx.strokeRect(
              (hover.c + dc) * cell + 1.5,
              (hover.r + dr) * cell + 1.5,
              cell - 2,
              cell - 2,
            );
          }
        }
      }

      // verified cells
      for (let i = verifies.length - 1; i >= 0; i--) {
        const v = verifies[i];
        const age = now - v.born;
        if (age > VERIFY_LIFE) {
          verifies.splice(i, 1);
          continue;
        }
        const k = age / VERIFY_LIFE;
        const a = v.peak * (1 - k) * (1 - k) * Math.min(1, age / 250);
        const x = v.c * cell;
        const y = v.r * cell;
        ctx.fillStyle = colors.ok;
        ctx.globalAlpha = a;
        ctx.fillRect(x + 1, y + 1, cell - 1, cell - 1);
        ctx.strokeStyle = colors.ok;
        ctx.lineWidth = 1;
        ctx.globalAlpha = Math.min(1, a * 3.2);
        ctx.strokeRect(x + 1.5, y + 1.5, cell - 2, cell - 2);
        if (v.tick) drawTick(x + cell / 2, y + cell / 2, Math.min(1, a * 4));
      }

      // cells that break apart and come back
      for (let i = revives.length - 1; i >= 0; i--) {
        const rv = revives[i];
        const age = now - rv.born;
        const x = rv.c * cell;
        const y = rv.r * cell;
        const cx = x + cell / 2;
        const cy = y + cell / 2;

        if (age >= RETURN) {
          verifies.push({
            c: rv.c,
            r: rv.r,
            born: now,
            peak: 0.22,
            tick: true,
          });
          revives.splice(i, 1);
          continue;
        }

        if (age < DRIFT) {
          const pulse = 0.5 + 0.5 * Math.sin(age / 90);
          ctx.fillStyle = colors.warn;
          ctx.globalAlpha = 0.07 * (1 - age / DRIFT);
          ctx.fillRect(x + 1, y + 1, cell - 1, cell - 1);
          ctx.strokeStyle = colors.warn;
          ctx.globalAlpha =
            (age < BREAK ? 0.35 + 0.35 * pulse : 0.3) * (1 - age / DRIFT);
          ctx.lineWidth = 1;
          ctx.strokeRect(x + 1.5, y + 1.5, cell - 2, cell - 2);
        }

        for (const p of rv.parts) {
          let px: number;
          let py: number;
          let alpha = 0.9;
          let size = p.s;
          let color = colors.warn;

          if (age < BREAK) {
            const k = easeOut(age / BREAK);
            px = cx + Math.cos(p.a) * p.d * k;
            py = cy + Math.sin(p.a) * p.d * k;
          } else if (age < DRIFT) {
            const t = (age - BREAK) / 1000;
            px = cx + Math.cos(p.a) * p.d + Math.sin(t * 2 + p.w) * 4;
            py = cy + Math.sin(p.a) * p.d + Math.cos(t * 2 + p.w) * 4;
            alpha = 0.8;
          } else {
            const k = easeInOut((age - DRIFT) / (RETURN - DRIFT));
            const ox = cx + Math.cos(p.a) * p.d;
            const oy = cy + Math.sin(p.a) * p.d;
            px = ox + (cx - ox) * k;
            py = oy + (cy - oy) * k;
            size = p.s * (1 - 0.5 * k);
            if (k > 0.55) color = colors.ok;
            alpha = 0.9;
          }
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.fillRect(px - size / 2, py - size / 2, size, size);
        }
      }

      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      if (now > nextAmbient) {
        verifies.push({
          c: Math.floor(Math.random() * cols),
          r: Math.floor(Math.random() * rows),
          born: now,
          peak: 0.12,
          tick: false,
        });
        nextAmbient = now + rand(380, 880);
      }
      if (revives.length < 2 && now > nextRevive) {
        const parts: Particle[] = Array.from({ length: 9 }, (_, i) => ({
          a: (i / 9) * Math.PI * 2 + rand(-0.3, 0.3),
          d: rand(cell * 0.7, cell * 1.5),
          s: rand(2, 3.5),
          w: rand(0, 6),
        }));
        revives.push({
          c: Math.floor(Math.random() * cols),
          r: Math.floor(Math.random() * rows),
          born: now,
          parts,
        });
        nextRevive = now + rand(3200, 5200);
      }
      if (verifies.length > 220) verifies.splice(0, verifies.length - 220);
      draw(now);
    };

    const frame = (t: number) => {
      raf = 0;
      if (!onScreen || document.hidden) return;
      step(t);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (reduce || raf) return;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reduce) return;
      const rect = wrap.getBoundingClientRect();
      const c = Math.floor((e.clientX - rect.left) / cell);
      const r = Math.floor((e.clientY - rect.top) / cell);
      if (c < 0 || r < 0 || c >= cols || r >= rows) {
        hover = null;
        return;
      }
      hover = { c, r };
      const key = `${c}:${r}`;
      if (key !== lastTrail) {
        lastTrail = key;
        verifies.push({
          c,
          r,
          born: performance.now(),
          peak: 0.16,
          tick: false,
        });
      }
    };
    const onPointerLeave = () => {
      hover = null;
      lastTrail = "";
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(wrap);

    const mo = new MutationObserver(() => {
      colors = readColors();
      if (reduce) draw(performance.now());
    });
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    const t0 = performance.now();
    nextAmbient = t0;
    nextRevive = t0 + 1200;
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Outer mask fades the bottom into the next section; the inner mask keeps the
  // animation strongest behind the proof panel and calm behind the headline.
  const bottomFade = "linear-gradient(to bottom, #000 78%, transparent)";
  const focus =
    "radial-gradient(75% 90% at 74% 42%, #000 0%, rgba(0,0,0,0.45) 62%, rgba(0,0,0,0.2) 100%)";

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={{ WebkitMaskImage: bottomFade, maskImage: bottomFade }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 48% at 72% 46%, color-mix(in srgb, var(--rv-accent) 13%, transparent), transparent 72%)",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ WebkitMaskImage: focus, maskImage: focus }}
      />
    </div>
  );
}

