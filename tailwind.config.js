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
        lg: "0.5rem",
        xl: "0.625rem",
        "2xl": "0.75rem",
        "3xl": "0.875rem",
      },

      boxShadow: {
        card: "var(--rv-shadow-card)",
        glow: "var(--rv-shadow-glow)",
        button: "var(--rv-shadow-button)",
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
