/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/index.css",
    "./src/theme.css",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--rv-background)",

        foreground: {
          DEFAULT: "var(--rv-foreground)",
          muted: "var(--rv-foreground-muted)",
          subtle: "var(--rv-foreground-subtle)",
        },

        surface: {
          DEFAULT: "var(--rv-surface)",
          elevated: "var(--rv-surface-elevated)",
          sunken: "var(--rv-surface-sunken)",
        },

        border: {
          DEFAULT: "var(--rv-border)",
          subtle: "var(--rv-border-subtle)",
          strong: "var(--rv-border-strong)",
        },

        accent: {
          DEFAULT: "var(--rv-accent)",
          bright: "var(--rv-accent-bright)",
          muted: "var(--rv-accent-muted)",
          foreground: "var(--rv-accent-foreground)",
        },

        success: {
          DEFAULT: "var(--rv-success)",
          muted: "var(--rv-success-muted)",
        },

        warning: {
          DEFAULT: "var(--rv-warning)",
          muted: "var(--rv-warning-muted)",
        },

        error: {
          DEFAULT: "var(--rv-error)",
          muted: "var(--rv-error-muted)",
        },

        terminal: {
          bg: "var(--rv-terminal-bg)",
          border: "var(--rv-terminal-border)",
          prompt: "var(--rv-terminal-prompt)",
          success: "var(--rv-terminal-success)",
          info: "var(--rv-terminal-info)",
          muted: "var(--rv-terminal-muted)",
        },
      },

      fontFamily: {
        sans: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },

      borderRadius: {
        card: "var(--rv-radius-card)",
      },

      boxShadow: {
        card: "var(--rv-shadow-card)",
        glow: "var(--rv-shadow-glow)",
        button: "var(--rv-shadow-button)",
      },

      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 70% 45% at 50% -5%, rgba(20, 184, 166, 0.16), transparent 70%)",

        "hero-mesh":
          "radial-gradient(circle 420px at 5% 32%, rgba(139, 92, 246, 0.14), transparent 70%), radial-gradient(circle 460px at 52% 5%, rgba(20, 184, 166, 0.10), transparent 70%), radial-gradient(circle 420px at 95% 30%, rgba(37, 99, 235, 0.14), transparent 70%)",

        "grid-fade":
          "linear-gradient(to bottom, transparent 0%, var(--rv-background) 100%), linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",

        "cta-glow":
          "linear-gradient(145deg, rgba(20, 184, 166, 0.08), transparent 60%)",
      },

      backgroundSize: {
        grid: "1220px 1220px",
      },

      animation: {
        "orbit-slow": "orbit 24s linear infinite",
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        orbit: {
          from: {
            transform: "rotate(0deg)",
          },

          to: {
            transform: "rotate(360deg)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },

          "50%": {
            transform: "translateY(-8px)",
          },
        },
      },
    },
  },

  plugins: [],
};
