import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";
import { PageMeta } from "../components/seo/PageMeta";
import { talkSeo } from "../lib/seo-pages";
import { site } from "../lib/site";

const CHANNELS = [
  {
    href: `mailto:${site.founder.email}`,
    icon: Mail,
    label: site.founder.email,
    external: false,
  },
  {
    href: `tel:+91${site.founder.phone}`,
    icon: Phone,
    label: site.founder.phoneDisplay,
    external: false,
  },
  {
    href: site.founder.linkedin,
    icon: Linkedin,
    label: "Revenant on LinkedIn",
    external: true,
  },
  {
    href: site.githubCli,
    icon: Github,
    label: "revenant-cli on GitHub",
    external: true,
  },
] as const;

export function TalkPage() {
  return (
    <div className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <PageMeta {...talkSeo} />
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="ui-section-label">Open channel</p>
          <h1 className="ui-heading mt-2 text-4xl">Talk to us</h1>
          <p className="ui-body mt-4 leading-relaxed">
            Questions about restore drills, pricing, enterprise, or
            partnerships? This is a live inbox — not a ticket void.
          </p>

          <ul className="mt-8 divide-y divide-border-subtle border-y border-border-subtle">
            {CHANNELS.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-3 py-4 transition-colors"
                >
                  <c.icon size={16} className="text-accent-bright" />
                  <span className="min-w-0 flex-1 truncate text-sm text-foreground-muted group-hover:text-foreground">
                    {c.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Send a message
              </h2>
            </div>
          </div>
          <p className="text-sm text-foreground-subtle">
            Name, email, and message. We reply within 1–2 business days.
          </p>
          <div className="mt-6">
            <ContactForm type="talk" submitLabel="Send message" />
          </div>
        </div>
      </div>
    </div>
  );
}
