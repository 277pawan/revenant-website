import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { site } from "../../lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="inline-block">
            <img
              src="/Revenant_verify_logo.png"
              alt="Revenant"
              className="h-12 w-auto max-w-[240px] object-contain object-left"
            />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
            Disaster recovery proof for PostgreSQL. Free CLI, managed AWS restore
            drills, and signed evidence.
          </p>
          <div className="mt-5 space-y-2 text-sm text-foreground-muted">
            <a
              href={`mailto:${site.founder.email}`}
              className="flex items-center gap-2 hover:text-accent-bright"
            >
              <Mail size={15} className="text-accent" />
              {site.founder.email}
            </a>
            <a
              href={`tel:+91${site.founder.phone}`}
              className="flex items-center gap-2 hover:text-accent-bright"
            >
              <Phone size={15} className="text-accent" />
              {site.founder.phoneDisplay}
            </a>
            <a
              href={site.founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-bright"
            >
              <Linkedin size={15} className="text-accent" />
              LinkedIn — Revenant
            </a>
            <a
              href={site.githubCli}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent-bright"
            >
              <Github size={15} className="text-accent" />
              github.com/277pawan/revenant-cli
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Product
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
            <li><Link to="/docs" className="hover:text-accent-bright">Docs</Link></li>
            <li><Link to="/pricing" className="hover:text-accent-bright">Pricing</Link></li>
            <li><Link to="/login" className="hover:text-accent-bright">Sign in</Link></li>
            <li><Link to="/register" className="hover:text-accent-bright">Start trial</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Connect
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-foreground-muted">
            <li><Link to="/talk" className="hover:text-accent-bright">Talk to us</Link></li>
            <li><Link to="/coffee" className="hover:text-accent-bright">Fund us</Link></li>
            <li><a href={site.githubCli} className="hover:text-accent-bright">GitHub</a></li>
            <li><a href={site.appUrl} className="hover:text-accent-bright">Cloud dashboard</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-subtle py-5 text-center text-xs text-foreground-subtle">
        © {new Date().getFullYear()} Revenant · {site.founder.email} ·{" "}
        {site.founder.phoneDisplay}
      </div>
    </footer>
  );
}
