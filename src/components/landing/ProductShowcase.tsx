import { RevealOnScroll } from "./ui/RevealOnScroll";

import docRegistryWebp from "@/assets/screenshots/doc-registry.webp";
import docRegistryJpg from "@/assets/screenshots/doc-registry.jpg";
import fintracWebp from "@/assets/screenshots/fintrac-compliance.webp";
import fintracJpg from "@/assets/screenshots/fintrac-compliance.jpg";
import stressTestWebp from "@/assets/screenshots/b20-stress-test.webp";
import stressTestJpg from "@/assets/screenshots/b20-stress-test.jpg";
import lenderWebp from "@/assets/screenshots/lender-recommendation.webp";
import lenderJpg from "@/assets/screenshots/lender-recommendation.jpg";
import conditionsWebp from "@/assets/screenshots/conditions-tracking.webp";
import conditionsJpg from "@/assets/screenshots/conditions-tracking.jpg";

interface ShowcaseCard {
  title: string;
  caption: string;
  webp: string;
  jpg: string;
  alt: string;
  width: number;
  height: number;
  tilt: string;
}

const CARDS: ShowcaseCard[] = [
  {
    title: "Document Registry",
    caption: "Track every required mortgage document inside one verified registry.",
    webp: docRegistryWebp,
    jpg: docRegistryJpg,
    alt: "BrokerMind AI document registry showing verified mortgage documents including NOA, T4, T1, appraisal report, and credit bureau report",
    width: 900,
    height: 915,
    tilt: "md:-rotate-1",
  },
  {
    title: "FINTRAC Compliance",
    caption: "Identity verification and compliance with a complete audit trail.",
    webp: fintracWebp,
    jpg: fintracJpg,
    alt: "AML and FINTRAC compliance checklist with identity verification, PEP screening, and source-of-down-payment documentation",
    width: 900,
    height: 710,
    tilt: "md:rotate-1",
  },
  {
    title: "OSFI B-20 Stress Test",
    caption: "Automatic affordability calculations using Canadian mortgage guidelines.",
    webp: stressTestWebp,
    jpg: stressTestJpg,
    alt: "OSFI B-20 stress test panel showing qualifying rate, GDS and TDS ratios at contract rate and at the minimum qualifying rate",
    width: 900,
    height: 435,
    tilt: "md:rotate-1",
  },
  {
    title: "Lender Recommendations",
    caption: "Recommend lenders using verified borrower evidence instead of guesswork.",
    webp: lenderWebp,
    jpg: lenderJpg,
    alt: "Lender suitability recommendation showing an Alt / B lender classification with supporting rationale and lender guideline library",
    width: 900,
    height: 465,
    tilt: "md:-rotate-1",
  },
  {
    title: "Conditions Tracking",
    caption: "Know exactly what still needs attention before submission.",
    webp: conditionsWebp,
    jpg: conditionsJpg,
    alt: "Conditions tracking board with outstanding, documents received, under review, satisfied, and waived columns",
    width: 900,
    height: 325,
    tilt: "md:rotate-1",
  },
];

function ShowcaseFrame({ card, index }: { card: ShowcaseCard; index: number }) {
  return (
    <RevealOnScroll delay={index * 0.08}>
      <figure
        className={`showcase-card group relative rounded-2xl bg-surface/70 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out will-change-transform hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_40px_90px_-28px_rgba(46,204,129,0.28)] ${card.tilt}`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border-strong/70 bg-card">
          {/* Browser chrome — a framing device only; the application UI inside is unedited. */}
          <div
            className="flex items-center gap-1.5 border-b border-border-strong/60 bg-muted/60 px-3.5 py-2.5"
            aria-hidden
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3746b]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e3c257]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5fb886]/70" />
            <span className="mx-auto rounded-full bg-background/60 px-3 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground">
              app.brokermindapp.com
            </span>
          </div>
          <div className="bg-white">
            <picture>
              <source srcSet={card.webp} type="image/webp" />
              <img
                src={card.jpg}
                alt={card.alt}
                width={card.width}
                height={card.height}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />
            </picture>
          </div>
        </div>
        <figcaption className="px-1 pb-1 pt-5">
          <h3 className="font-display text-lg italic text-foreground">{card.title}</h3>
          <p className="mt-1.5 font-mono text-sm leading-relaxed text-muted-foreground">{card.caption}</p>
        </figcaption>
      </figure>
    </RevealOnScroll>
  );
}

export function ProductShowcase() {
  return (
    <section id="showcase" className="scroll-mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">The Underwriting Workspace</p>
          <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Everything you need to underwrite a mortgage file.
          </h2>
          <p className="mt-6 font-mono text-sm leading-[1.8] text-muted-foreground">
            From document collection and compliance to lender recommendations and renewals, every
            part of the mortgage file stays connected inside one professional underwriting
            workspace.
          </p>
        </RevealOnScroll>

        <ul className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-x-8 gap-y-14 [perspective:1600px] sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <li key={card.title}>
              <ShowcaseFrame card={card} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
