import logoUrl from "@/assets/brokermind-logo.png";
import { WaitlistForm } from "./WaitlistForm";

const PRODUCT_LINKS = [
  { id: "demo", label: "Product" },
  { id: "workflow", label: "How it Works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

interface FooterProps {
  /** Pass [] on pages that don't have these sections, instead of linking to nothing. */
  links?: { id: string; label: string }[];
}

export function Footer({ links = PRODUCT_LINKS }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-footer">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logoUrl} alt="BrokerMind" className="h-7 w-auto object-contain" />
              <span className="font-display text-sm font-bold text-footer-foreground">BrokerMind</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-footer-muted">
              AI decision intelligence for residential mortgage brokers, B lenders, and private
              lending teams.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-footer-muted">Get early access</p>
            <WaitlistForm variant="dark" className="mt-4 max-w-sm" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-footer-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          {links.length > 0 && (
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
          <p className="text-xs text-footer-muted">
            © {new Date().getFullYear()} BrokerMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
