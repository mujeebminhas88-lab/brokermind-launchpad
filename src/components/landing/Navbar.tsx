import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ui/ThemeToggle";
import logoUrl from "@/assets/brokermind-logo.png";

const LINKS = [
  { id: "demo", label: "Product" },
  { id: "workflow", label: "How it Works" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const logoScale = useTransform(scrollY, [0, 80], [1, 0.88]);
  const navPaddingY = useTransform(scrollY, [0, 80], [24, 14]);

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50" style={{ paddingTop: navPaddingY, paddingBottom: navPaddingY }}>
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
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
        <motion.button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="flex origin-left items-center gap-2.5"
          style={{ scale: logoScale }}
        >
          <img src={logoUrl} alt="BrokerMind" className="h-7 w-auto object-contain" />
          <span className="font-display text-sm font-bold tracking-tight text-foreground">
            BrokerMind
          </span>
        </motion.button>

        <div className="hidden items-center gap-0.5 rounded-full border border-border bg-surface/70 p-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="sm" onClick={() => scrollToSection("hero")}>
            Join Waitlist
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
