import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const STATUS_LINES = [
  {
    cmd: "revenant verify",
    meta: "RTO 4m 12s · all checks passed",
  },
  {
    cmd: "revenant snapshot",
    meta: "RDS snapshot created · ap-south-1",
  },
  {
    cmd: "revenant doctor",
    meta: "config OK · Postgres reachable",
  },
];

const PARTICLES = [
  { x: -135, y: -80, size: 4, delay: 0 },
  { x: 120, y: -100, size: 1, delay: 0.8 },
  { x: 150, y: 45, size: 1.9, delay: 1.4 },
  { x: -145, y: 75, size: 1.1, delay: 2 },
  { x: 85, y: 120, size: 5, delay: 2.6 },
  { x: -75, y: -125, size: 1.6, delay: 3.2 },
];

export function HeroLogo3D() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  /*
   * ============================================================
   * STATUS ROTATION
   * ============================================================
   */

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

  /*
   * ============================================================
   * MOUSE / 3D TILT
   * ============================================================
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [8, -8]), {
    stiffness: 120,
    damping: 18,
    mass: 0.8,
  });

  const logoX = useSpring(useTransform(mouseX, [-1, 1], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const logoY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;

    const y = (event.clientY - rect.top) / rect.height;

    mouseX.set((x - 0.5) * 2);
    mouseY.set((y - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const status = STATUS_LINES[index];

  return (
    <div
      className="
        relative
        flex
        min-h-[420px]
        items-center
        justify-center
        py-8
        sm:min-h-[500px]
      "
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ========================================================
          AMBIENT GLOW
          ======================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          h-[360px]
          w-[360px]
          rounded-full
          bg-cyan-400/[0.07]
          blur-[90px]
        "
        animate={{
          scale: [0.92, 1.08, 0.92],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary violet atmosphere */}

      <motion.div
        className="
          pointer-events-none
          absolute
          -left-8
          top-12
          h-32
          w-32
          rounded-full
          bg-violet-500/[0.06]
          blur-[70px]
        "
        animate={{
          x: [-10, 15, -10],
          y: [10, -12, 10],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ========================================================
          3D SCENE
          ======================================================== */}

      <motion.div
        className="
          relative
          flex
          h-[390px]
          w-[390px]
          items-center
          justify-center
          [transform-style:preserve-3d]
        "
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* ======================================================
            OUTER STATIC RING
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            h-[600px]
            w-[600px]
            rounded-full
            border
            border-cyan-400/[0.16]
          "
          style={{
            transform: "translateZ(-20px)",
          }}
        />

        {/* ======================================================
            SECOND RING
            ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-blue-400/[0.20]
          "
          style={{
            transform: "translateZ(0px)",
          }}
        />

        {/* ======================================================
            ROTATING ORBIT RING
            ====================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            h-[400px]
            w-[400px]
            rounded-full
            border
            border-transparent
            [border-top-color:rgba(34,211,238,0.91)]
            [border-right-color:rgba(34,211,238,0.20)]
          "
          style={{
            transform: "translateZ(8px)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* ======================================================
            ORBITING ENERGY ARC
            ====================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            h-[245px]
            w-[245px]
            rounded-full
            border
            border-transparent
            [border-bottom-color:rgba(139,92,246,0.73)]
            [border-left-color:rgba(59,130,246,0.20)]
          "
          style={{
            transform: "translateZ(18px)",
          }}
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* ======================================================
            RADAR / SONAR PULSES
            ====================================================== */}

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="
              pointer-events-none
              absolute
              h-[300px]
              w-[300px]
              rounded-full
              border
              border-cyan-300/60
            "
            style={{
              transform: "translateZ(12px)",
            }}
            animate={{
              scale: [0.72, 1.55],
              opacity: [0.55, 0],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.25,
            }}
          />
        ))}

        {/* ======================================================
            INNER ENERGY CORE
            ====================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            h-[190px]
            w-[190px]
            rounded-full
            bg-cyan-400/[0.24]
            blur-[35px]
          "
          style={{
            transform: "translateZ(25px)",
          }}
          animate={{
            scale: [0.92, 1.08, 0.92],
            opacity: [0.45, 0.8, 0.45],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ======================================================
            LOGO 3D DEPTH LAYERS
            ====================================================== */}

        <div
          className="
            relative
            h-48
            w-48
            [transform-style:preserve-3d]
            sm:h-56
            sm:w-56
          "
          style={{
            transform: "translateZ(45px)",
          }}
        >
          {/* Deep shadow / extrusion */}

          <motion.img
            src="/revenant_logo.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
              opacity-20
            "
            style={{
              transform: "translate3d(10px, 12px, -22px)",
              filter: "brightness(0.15) blur(1px)",
            }}
          />

          {/* Cyan depth layer */}

          <motion.img
            src="/revenant_logo.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
              opacity-25
            "
            style={{
              transform: "translate3d(4px, 5px, -10px)",
              filter: "brightness(0.5) sepia(1) saturate(5) hue-rotate(145deg)",
            }}
          />

          {/* Main logo */}

          <motion.img
            src="/revenant_logo.png"
            alt="Revenant"
            draggable={false}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-contain
            "
            animate={{
              y: [0, -7, 0],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              x: logoX,
              y: logoY,
              filter: `
                drop-shadow(0 0 10px rgba(103,232,249,0.20))
                drop-shadow(0 18px 35px rgba(34,211,238,0.18))
              `,
            }}
          />
        </div>

        {/* ======================================================
            ORBIT PARTICLES
            ====================================================== */}

        {PARTICLES.map((particle, i) => (
          <motion.span
            key={i}
            className="
              pointer-events-none
              absolute
              rounded-full
              bg-cyan-300
            "
            style={{
              width: particle.size,
              height: particle.size,
              left: `calc(50% + ${particle.x}px)`,
              top: `calc(50% + ${particle.y}px)`,
              transform: "translateZ(35px)",
              boxShadow: "0 0 10px rgba(103,232,249,0.8)",
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.7, 1.4, 0.7],
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + i * 0.35,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* ======================================================
            STATUS CARD
            ====================================================== */}

        <motion.div
          className="
            absolute
            bottom-[18px]
            left-1/2
            z-30
            w-[min(100%,280px)]
            -translate-x-1/2
          "
          style={{
            translateX: "-50%",
            translateZ: 80,
          }}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className={`
              ui-card
              relative
              overflow-hidden
              px-4
              py-3
              text-center
              transition-all
              duration-300
              ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }
            `}
          >
            {/* Card top light */}

            <div
              className="
                pointer-events-none
                absolute
                inset-x-8
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-cyan-300/50
                to-transparent
              "
            />

            <p className="font-mono text-xs text-accent-bright">{status.cmd}</p>

            <p className="mt-0.5 text-[11px] text-foreground-subtle">
              {status.meta}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
