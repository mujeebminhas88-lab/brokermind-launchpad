import { ShieldCheck, Lock, FileClock, MapPin } from "lucide-react";
import { TRUST_POINTS } from "./content";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealOnScroll } from "./ui/RevealOnScroll";

const ICONS = [ShieldCheck, Lock, FileClock, MapPin];

export function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Trust & Security"
        title="Built with your compliance obligations in mind"
        description="BrokerMind is designed around the realities of handling sensitive borrower data every day."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_POINTS.map((point, i) => {
          const Icon = ICONS[i];
          return (
            <RevealOnScroll key={point.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
