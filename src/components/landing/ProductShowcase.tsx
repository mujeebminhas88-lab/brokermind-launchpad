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
  label: string;
  headline: string;
  caption: string;
  webp: string;
  jpg: string;
  alt: string;
  width: number;
  height: number;
  /** Desktop-only magazine stagger — a static rotate + vertical offset, disabled below lg. */
  tilt: string;
}

const CARDS: ShowcaseCard[] = [
  {
    label: "Document Registry",
    headline: "Everything verified before submission.",
    caption: "Track every mortgage document through a verified compliance registry.",
    webp: docRegistryWebp,
    jpg: docRegistryJpg,
    alt: "BrokerMind AI document registry showing verified mortgage documents including NOA, T4, T1, appraisal report, and credit bureau report",
    width: 900,
    height: 915,
    tilt: "lg:-rotate-2 lg:translate-y-0",
  },
  {
    label: "FINTRAC Compliance",
    headline: "Compliance built into every file.",
    caption: "Identity verification and audit-ready documentation, done automatically.",
    webp: fintracWebp,
    jpg: fintracJpg,
    alt: "AML and FINTRAC compliance checklist with identity verification, PEP screening, and source-of-down-payment documentation",
    width: 900,
    height: 710,
    tilt: "lg:rotate-1 lg:translate-y-8",
  },
  {
    label: "OSFI B-20 Stress Test",
    headline: "Affordability, calculated instantly.",
    caption: "Apply Canadian stress-test rules without a single spreadsheet.",
    webp: stressTestWebp,
    jpg: stressTestJpg,
    alt: "OSFI B-20 stress test panel showing qualifying rate, GDS and TDS ratios at contract rate and at the minimum qualifying rate",
    width: 900,
    height: 435,
    tilt: "lg:-rotate-1 lg:-translate-y-4",
  },
  {
    label: "Lender Recommendations",
    headline: "The right lender, backed by evidence.",
    caption: "Recommendations built from verified borrower documents, not guesswork.",
    webp: lenderWebp,
    jpg: lenderJpg,
    alt: "Lender suitability recommendation showing an Alt / B lender classification with supporting rationale and lender guideline library",
    width: 900,
    height: 465,
    tilt: "lg:rotate-2 lg:-translate-y-2",
  },
  {
    label: "Conditions Tracking",
    headline: "Nothing falls through the cracks.",
    caption: "See exactly what's outstanding before a file goes to submission.",
    webp: conditionsWebp,
    jpg: conditionsJpg,
    alt: "Conditions tracking board with outstanding, documents received, under review, satisfied, and waived columns",
    width: 900,
    height: 325,
    tilt: "lg:-rotate-2 lg:translate-y-5",
  },
];

function ShowcaseFrame({ card, index }: { card: ShowcaseCard; index: number }) {
  return (
    <div className={`transition-transform duration-500 ${card.tilt}`}>
      <RevealOnScroll delay={index * 0.08}>
        <figure className="group">
          <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_45px_-22px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:shadow-[0_28px_60px_-20px_rgba(0,0,0,0.5)]">
            {/* Browser chrome — a framing device only; the application UI inside is unedited. */}
            <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-[#f3f2ee] px-3.5 py-2.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e3746b]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e3c257]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5fb886]/60" />
              <span className="mx-auto rounded-full bg-black/[0.04] px-3 py-0.5 font-mono text-[10px] tracking-wide text-neutral-500">
                app.brokermindapp.com
              </span>
            </div>
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
          <figcaption className="px-1 pt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{card.label}</p>
            <h3 className="mt-2 font-display text-lg italic text-foreground">{card.headline}</h3>
            <p className="mt-1.5 font-mono text-sm leading-relaxed text-muted-foreground">{card.caption}</p>
          </figcaption>
        </figure>
      </RevealOnScroll>
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
          <p className="mt-6 max-w-xl mx-auto font-mono text-sm leading-[1.8] text-muted-foreground">
            Every stage of the mortgage workflow — from document verification and compliance to
            lender recommendations and renewals — in one connected underwriting workspace.
          </p>
        </RevealOnScroll>

        <ul className="mx-auto mt-24 grid max-w-5xl grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
          {CARDS.map((card, i) => (
            <li key={card.label}>
              <ShowcaseFrame card={card} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
