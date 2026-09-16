import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";
import { site } from "../lib/site";

export function TalkPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <div>
          <p className="ui-section-label">Contact</p>
          <h1 className="ui-heading mt-2 text-4xl">Talk to us</h1>
          <p className="ui-body mt-4 leading-relaxed">
            Questions about restore drills, pricing, enterprise, or partnerships?
            Message goes to our inbox and is saved in the same Revenant database.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${site.founder.email}`}
              className="ui-card-interactive flex items-center gap-3 px-4 py-3 text-sm text-foreground-muted"
            >
              <Mail size={18} className="text-accent-bright" />
              {site.founder.email}
            </a>
            <a
              href={`tel:+91${site.founder.phone}`}
              className="ui-card-interactive flex items-center gap-3 px-4 py-3 text-sm text-foreground-muted"
            >
              <Phone size={18} className="text-accent-bright" />
              {site.founder.phoneDisplay}
            </a>
            <a
              href={site.founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-card-interactive flex items-center gap-3 px-4 py-3 text-sm text-foreground-muted"
            >
              <Linkedin size={18} className="text-accent-bright" />
              Revenant on LinkedIn
            </a>
            <a
              href={site.githubCli}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-card-interactive flex items-center gap-3 px-4 py-3 text-sm text-foreground-muted"
            >
              <Github size={18} className="text-accent-bright" />
              revenant-cli on GitHub
            </a>
          </div>
        </div>

        <div className="ui-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Send a message</h2>
          <p className="mt-1 text-sm text-foreground-subtle">
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
