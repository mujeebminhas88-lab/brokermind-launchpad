import { Landmark, Layers, ShieldCheck, FileCheck2, Zap, History, type LucideIcon } from "lucide-react";
import { RevealOnScroll } from "./ui/RevealOnScroll";

interface WhyCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CARDS: WhyCard[] = [
  {
    icon: Layers,
    title: "One Workspace",
    description: "Everything from intake to lender recommendation in one platform.",
  },
  {
    icon: Landmark,
    title: "Canadian Mortgage Focused",
    description: "Designed specifically around Canadian residential lending workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Built In",
    description: "FINTRAC and underwriting requirements supported throughout every file.",
  },
  {
    icon: FileCheck2,
    title: "Evidence Driven",
    description: "Recommendations are based on verified borrower documents — not assumptions.",
  },
  {
    icon: Zap,
    title: "Faster Decisions",
    description: "Reduce repetitive manual review and improve underwriting efficiency.",
  },
  {
    icon: History,
    title: "Complete Audit Trail",
    description: "Every decision can be explained and traced back to supporting evidence.",
  },
];

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Why BrokerMind AI</p>
          <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Built for how Canadian mortgage files actually get underwritten.
          </h2>
        </RevealOnScroll>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <li key={card.title} className="h-full">
              <RevealOnScroll delay={i * 0.06} className="h-full">
                <div className="group h-full rounded-xl border border-border bg-surface/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface/80">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-accent-subtle text-accent transition-colors group-hover:border-accent/60">
                    <card.icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
