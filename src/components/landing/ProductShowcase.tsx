import { FileText, Fingerprint, ShieldCheck, Landmark, type LucideIcon } from "lucide-react";
import { RevealOnScroll } from "./ui/RevealOnScroll";

import docRegistryWebp from "@/assets/screenshots/doc-registry.webp";
import docRegistryJpg from "@/assets/screenshots/doc-registry.jpg";
import fintracWebp from "@/assets/screenshots/fintrac-compliance.webp";
import fintracJpg from "@/assets/screenshots/fintrac-compliance.jpg";
import stressTestWebp from "@/assets/screenshots/b20-stress-test.webp";
import stressTestJpg from "@/assets/screenshots/b20-stress-test.jpg";
import lenderWebp from "@/assets/screenshots/lender-recommendation.webp";
import lenderJpg from "@/assets/screenshots/lender-recommendation.jpg";

interface ShowcaseCard {
  icon: LucideIcon;
  title: string;
  description: string;
  webp: string;
  jpg: string;
  alt: string;
}

const CARDS: ShowcaseCard[] = [
  {
    icon: FileText,
    title: "Document Registry",
    description: "Track every mortgage document through a verified compliance registry.",
    webp: docRegistryWebp,
    jpg: docRegistryJpg,
    alt: "BrokerMind AI document registry showing verified mortgage documents including NOA, T4, T1, appraisal report, and credit bureau report, with an application risk score",
  },
  {
    icon: Fingerprint,
    title: "FINTRAC Compliance",
    description: "Identity verification and audit-ready documentation for every file.",
    webp: fintracWebp,
    jpg: fintracJpg,
    alt: "AML and FINTRAC compliance checklist with identity verification, PEP screening, and source-of-down-payment documentation",
  },
  {
    icon: ShieldCheck,
    title: "OSFI B-20 Stress Test",
    description: "Automatic affordability calculations using Canadian mortgage guidelines.",
    webp: stressTestWebp,
    jpg: stressTestJpg,
    alt: "OSFI B-20 stress test panel showing qualifying rate, GDS and TDS ratios at contract rate and at the minimum qualifying rate",
  },
  {
    icon: Landmark,
    title: "Lender Recommendations",
    description: "Recommendations built from verified borrower documents, not guesswork.",
    webp: lenderWebp,
    jpg: lenderJpg,
    alt: "Lender suitability recommendation showing an Alt / B lender classification with supporting rationale and lender guideline library",
  },
];

function ShowcaseFrame({ card }: { card: ShowcaseCard }) {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-accent/15 bg-card p-6 shadow-[0_0_0_1px_rgba(46,204,129,0.06),0_25px_60px_-28px_rgba(46,204,129,0.3),0_20px_45px_-22px_rgba(0,0,0,0.55)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_0_0_1px_rgba(46,204,129,0.14),0_35px_80px_-25px_rgba(46,204,129,0.45),0_25px_55px_-20px_rgba(0,0,0,0.65)]">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
        <card.icon className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold not-italic text-foreground">{card.title}</h3>
      <p className="mt-1.5 font-mono text-sm leading-relaxed text-muted-foreground">{card.description}</p>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.06]">
        <picture>
          <source srcSet={card.webp} type="image/webp" />
          <img
            src={card.jpg}
            alt={card.alt}
            width={900}
            height={430}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
        </picture>
      </div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section id="showcase" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">The Underwriting Workspace</p>
          <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Everything you need to underwrite a mortgage file.
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-mono text-sm leading-[1.8] text-muted-foreground">
            Every stage of the mortgage workflow — from document verification and compliance to
            lender recommendations and renewals — in one connected underwriting workspace.
          </p>
        </RevealOnScroll>

        <ul className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {CARDS.map((card, i) => (
            <li key={card.title} className="h-full">
              <RevealOnScroll delay={i * 0.08} className="h-full">
                <ShowcaseFrame card={card} />
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
