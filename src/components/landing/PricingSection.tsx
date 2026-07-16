import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PRICING_TIERS, STANDARD_FILE, calculatePrice, formatCurrency } from "./pricing";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { Button } from "./ui/Button";

function scrollToHero() {
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Pricing"
        title="Plans for every lending team"
        description="Priced by files processed, not seats. Every plan includes a monthly file allowance plus reasonable overage."
        align="center"
        className="mx-auto"
      />

      <RevealOnScroll delay={0.05} className="mt-10 flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              !annual ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
              annual ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Annual · save 15%
          </button>
        </div>
      </RevealOnScroll>

      <div className="mt-4 text-center">
        <span className="inline-flex items-center rounded-full bg-accent-subtle px-3 py-1 text-[11px] font-medium text-accent">
          Founding members from the waitlist save an additional 25% for their first 6 months
        </span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PRICING_TIERS.map((tier, i) => {
          const breakdown = calculatePrice(tier, { annual, founding: false });
          const isEnterprise = tier.monthlyPrice === null;

          return (
            <RevealOnScroll key={tier.id} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col gap-6 rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1",
                  tier.highlighted
                    ? "glow-card glow-card-shadow border-accent bg-surface"
                    : "border-border bg-surface hover:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.25)]",
                )}
              >
                {tier.highlighted && (
                  <motion.span
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground"
                  >
                    Most Popular
                  </motion.span>
                )}
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">{tier.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.segment}</p>
                </div>

                {isEnterprise ? (
                  <div className="font-display text-3xl font-bold tracking-tight text-foreground">
                    Contact us
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                        {formatCurrency(breakdown.effectiveMonthly ?? 0)}
                      </span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {tier.filesIncluded} files included &middot; {formatCurrency(tier.overagePerFile ?? 0)}/file
                      after
                    </p>
                  </div>
                )}

                <ul className="flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                {isEnterprise ? (
                  <a
                    href="mailto:hello@brokermindapp.com?subject=Enterprise%20inquiry"
                    className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/50"
                  >
                    Contact us <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Button
                    variant={tier.highlighted ? "primary" : "secondary"}
                    icon={<ArrowRight className="h-4 w-4" />}
                    onClick={scrollToHero}
                    className="mt-auto w-full"
                  >
                    Join Waitlist
                  </Button>
                )}
              </div>
            </RevealOnScroll>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        A standard file is up to {STANDARD_FILE.documents} documents / {STANDARD_FILE.pages} pages. Larger
        files count proportionally more against your plan.
      </p>
    </section>
  );
}
