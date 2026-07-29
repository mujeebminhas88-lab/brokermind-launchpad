import { FileText, Fingerprint, ShieldCheck, Landmark, Lock, type LucideIcon } from "lucide-react";
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
  label: string;
  headline: string;
  caption: string;
  webp: string;
  jpg: string;
  alt: string;
}

const CARDS: ShowcaseCard[] = [
  {
    icon: FileText,
    label: "Document Registry",
    headline: "Every document. Verified.",
    caption: "Track every mortgage document through a verified compliance registry.",
    webp: docRegistryWebp,
    jpg: docRegistryJpg,
    alt: "BrokerMind AI document registry showing verified mortgage documents including NOA, T4, T1, appraisal report, and credit bureau report, with an application risk score",
  },
  {
    icon: Fingerprint,
    label: "FINTRAC Compliance",
    headline: "Compliance, done automatically.",
    caption: "Identity verification and audit-ready documentation for every file.",
    webp: fintracWebp,
    jpg: fintracJpg,
    alt: "AML and FINTRAC compliance checklist with identity verification, PEP screening, and source-of-down-payment documentation",
  },
  {
    icon: ShieldCheck,
    label: "OSFI B-20 Stress Test",
    headline: "Affordability. Automatically.",
    caption: "Automatic affordability calculations using Canadian mortgage guidelines.",
    webp: stressTestWebp,
    jpg: stressTestJpg,
    alt: "OSFI B-20 stress test panel showing qualifying rate, GDS and TDS ratios at contract rate and at the minimum qualifying rate",
  },
  {
    icon: Landmark,
    label: "Lender Recommendations",
    headline: "The right lender, backed by evidence.",
    caption: "Recommendations built from verified borrower documents, not guesswork.",
    webp: lenderWebp,
    jpg: lenderJpg,
    alt: "Lender suitability recommendation showing an Alt / B lender classification with supporting rationale and lender guideline library",
  },
];

function ShowcaseFrame({ card }: { card: ShowcaseCard }) {
  return (
    <figure className="group">
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white shadow-[0_20px_45px_-22px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Browser chrome — a framing device only; the application UI inside is unedited. */}
        <div className="flex items-center gap-1.5 bg-[#1b1c17] px-4 py-3" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3746b]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e3c257]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#5fb886]/70" />
          <span className="mx-auto flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-400">
            app.brokermindapp.com
            <Lock className="h-2.5 w-2.5" />
          </span>
        </div>
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
      <figcaption className="mt-6 flex flex-col items-start">
        <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-subtle text-accent">
          <card.icon className="h-5 w-5" aria-hidden />
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{card.label}</p>
        <h3 className="mt-2 font-display text-xl font-semibold not-italic leading-tight text-foreground">
          {card.headline}
        </h3>
        <p className="mt-2 max-w-[36ch] font-mono text-sm leading-relaxed text-muted-foreground">{card.caption}</p>
      </figcaption>
    </figure>
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

        <ul className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2">
          {CARDS.map((card, i) => (
            <li key={card.label}>
              <RevealOnScroll delay={i * 0.08}>
                <ShowcaseFrame card={card} />
              </RevealOnScroll>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
