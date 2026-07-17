import { useScroll, useTransform, motion } from "framer-motion";
import { Button } from "./ui/Button";
import logoUrl from "@/assets/brokermind-logo.png";

const LINKS = [
  { id: "why", label: "Why" },
  { id: "workflow", label: "How it works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

interface NavbarProps {
  /** Pass [] on pages that don't have these sections, instead of linking to nothing. */
  links?: { id: string; label: string }[];
}

export function Navbar({ links = LINKS }: NavbarProps) {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <>
      {/* Standalone brand mark — pinned to the true viewport corner, not to
          the nav's own centered max-w-7xl container, so it reads as its own
          element rather than "the first thing in the nav row." */}
      <button
        type="button"
        onClick={() => scrollToSection("hero")}
        className="fixed left-6 top-5 z-[60] flex items-center gap-2.5"
      >
        <img src={logoUrl} alt="BrokerMindAI" className="h-11 w-auto object-contain" />
        <span className="font-display text-sm italic text-foreground">BrokerMindAI</span>
      </button>

      <motion.header className="fixed inset-x-0 top-0 z-50 py-5">
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-background/95 backdrop-blur-md"
          style={{ opacity: bgOpacity }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-border"
          style={{ opacity: borderOpacity }}
        />
        <nav className="relative mx-auto grid max-w-7xl grid-cols-3 items-center px-6">
          <div aria-hidden />

          {links.length > 0 && (
            <div className="hidden items-center justify-self-center gap-0.5 rounded-full border border-border bg-surface/70 p-1 md:flex">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-full px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}

          <Button size="sm" className="justify-self-end" onClick={() => scrollToSection("waitlist")}>
            Join waitlist
          </Button>
        </nav>
      </motion.header>
    </>
  );
}
