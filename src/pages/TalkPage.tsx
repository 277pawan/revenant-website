import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";
import { site } from "../lib/site";

const CHANNELS = [
  {
    href: `mailto:${site.founder.email}`,
    icon: Mail,
    label: site.founder.email,
    ch: "01",
    tag: "inbox",
    external: false,
  },
  {
    href: `tel:+91${site.founder.phone}`,
    icon: Phone,
    label: site.founder.phoneDisplay,
    ch: "02",
    tag: "voice",
    external: false,
  },
  {
    href: site.founder.linkedin,
    icon: Linkedin,
    label: "Revenant on LinkedIn",
    ch: "03",
    tag: "open",
    external: true,
  },
  {
    href: site.githubCli,
    icon: Github,
    label: "revenant-cli on GitHub",
    ch: "04",
    tag: "open",
    external: true,
  },
] as const;

export function TalkPage() {
  return (
    <div className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <p className="pointer-events-none absolute -right-6 top-10 hidden text-[18vw] font-bold leading-none text-foreground/[0.04] lg:block">
        RX
      </p>

      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <p className="ui-section-label">Open channel</p>
          <h1 className="ui-heading mt-2 text-4xl">Talk to us</h1>
          <p className="ui-body mt-4 leading-relaxed">
            Questions about restore drills, pricing, enterprise, or
            partnerships? This is a live inbox — not a ticket void.
          </p>

          <ul className="mt-8 space-y-2">
            {CHANNELS.map((c, i) => (
              <motion.li
                key={c.href}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
              >
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 transition hover:border-accent"
                >
                  <span className="font-mono text-[10px] text-accent">
                    {c.ch}
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <c.icon size={16} className="text-accent-bright" />
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground-muted group-hover:text-foreground">
                    {c.label}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-subtle">
                    {c.tag}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="hidden h-full min-h-[280px] w-12 justify-center lg:flex">
          <svg
            viewBox="0 0 24 320"
            className="h-full w-8 text-accent"
            aria-hidden
          >
            <path
              className="talk-wire"
              d="M12 8 C 4 70, 20 110, 12 160 C 4 210, 20 250, 12 312"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="8" r="3" fill="currentColor" />
            <circle cx="12" cy="312" r="3" fill="currentColor" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative rounded-2xl border border-border bg-surface p-6 shadow-card"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                compose
              </p>
              <h2 className="text-lg font-semibold text-foreground">
                Send a message
              </h2>
            </div>
            <span className="rounded-full border border-success/30 bg-success-muted px-2 py-0.5 font-mono text-[10px] text-success">
              listening
            </span>
          </div>
          <p className="text-sm text-foreground-subtle">
            Name, email, and message. We reply within 1–2 business days.
          </p>
          <div className="mt-6">
            <ContactForm type="talk" submitLabel="Send message" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
