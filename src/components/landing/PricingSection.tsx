import { useState } from "react";
import { cn } from "@/lib/utils";
import { PRICING_TIERS, STANDARD_FILE, OVERSIZED_FILE_MULTIPLIER, DISCOUNTS, calculatePrice, formatCurrency } from "./pricing";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Pricing</p>
              <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
                Residential mortgages, priced by files — not seats.
              </h2>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full border border-border p-1">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors",
                  !annual ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors",
                  annual ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Annual · −15%
              </button>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse font-mono text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-[0.12em] text-muted-foreground/70">
                <th className="py-3 font-normal">Plan</th>
                <th className="py-3 font-normal">Files / mo</th>
                <th className="py-3 text-right font-normal">Price</th>
                <th className="py-3 text-right font-normal">Overage</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_TIERS.map((tier) => {
                const breakdown = calculatePrice(tier, { annual, founding: false });
                const isEnterprise = tier.monthlyPrice === null;
                return (
                  <tr key={tier.id} className="border-b border-border">
                    <td className="py-5">
                      <span className="font-display text-base italic text-foreground">{tier.name}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{tier.segment}</span>
                    </td>
                    <td className="py-5 tabular-nums text-foreground">
                      {tier.filesIncluded ?? "Custom"}
                    </td>
                    <td className="py-5 text-right tabular-nums text-foreground">
                      {isEnterprise ? "Custom" : `${formatCurrency(breakdown.effectiveMonthly ?? 0)}/mo`}
                    </td>
                    <td className="py-5 text-right tabular-nums text-muted-foreground">
                      {isEnterprise ? "—" : `${formatCurrency(tier.overagePerFile ?? 0)}/file`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="mt-10 flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="font-mono text-xs leading-[1.9] text-muted-foreground">
            <p className="mb-1 uppercase tracking-[0.12em] text-muted-foreground/70">Standard limits</p>
            <p>{STANDARD_FILE.documents} documents · {STANDARD_FILE.pages} pages</p>
            <p>Up to {OVERSIZED_FILE_MULTIPLIER}× over before additional usage applies</p>
          </div>
          <div className="font-mono text-xs leading-[1.9] text-muted-foreground">
            <p className="mb-1 uppercase tracking-[0.12em] text-muted-foreground/70">Discounts</p>
            <p>{DISCOUNTS.founding * 100}% Founding Partner — first six months</p>
            <p>{DISCOUNTS.annual * 100}% Annual billing</p>
            <p>Maximum combined discount: {DISCOUNTS.maxCombined * 100}%</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
