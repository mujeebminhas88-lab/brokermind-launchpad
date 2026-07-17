import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/brokermind-logo.png";
import { ContactModal } from "./ContactModal";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookie Policy" },
  { to: "/security", label: "Security" },
];

export function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="border-t border-footer-border bg-footer">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logoUrl} alt="BrokerMindAI" className="h-6 w-auto object-contain" />
              <span className="font-display text-sm italic text-footer-foreground">BrokerMindAI</span>
            </div>
            <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-footer-muted">
              AI decision intelligence for residential mortgage brokers, B lenders, and private
              lending teams.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-xs text-footer-muted sm:flex sm:flex-col sm:items-end">
            <button type="button" onClick={() => scrollToSection("why")} className="text-left transition-colors hover:text-footer-foreground">
              About
            </button>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="text-left transition-colors hover:text-footer-foreground"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("waitlist")}
              className="text-left transition-colors hover:text-footer-foreground"
            >
              Waitlist
            </button>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-left transition-colors hover:text-footer-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-footer-border pt-8">
          <p className="font-mono text-xs text-footer-muted">
            <a href="mailto:hello@brokermindapp.com" className="transition-colors hover:text-footer-foreground">
              hello@brokermindapp.com
            </a>{" "}
            &middot; © {new Date().getFullYear()} BrokerMindAI. All rights reserved.
          </p>
        </div>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  );
}
