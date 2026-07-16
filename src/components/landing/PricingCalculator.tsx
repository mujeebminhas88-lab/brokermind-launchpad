import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { calculatePrice, formatCurrency, STANDARD_FILE, tierForFileCount } from "./pricing";

interface ToggleRowProps {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

function ToggleRow({ label, hint, checked, onChange }: ToggleRowProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={cn(
        "flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
        checked ? "border-accent bg-accent-subtle" : "border-border bg-background/40",
      )}
    >
      <span>
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{hint}</span>
      </span>
      <span
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
          checked ? "border-accent bg-accent" : "border-border-strong bg-muted",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[18px]" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function PricingCalculator() {
  const [files, setFiles] = useState(40);
  const [annual, setAnnual] = useState(false);
  const [founding, setFounding] = useState(false);

  const tier = useMemo(() => tierForFileCount(files), [files]);
  const breakdown = useMemo(() => calculatePrice(tier, { annual, founding }), [tier, annual, founding]);
  const isEnterprise = tier.monthlyPrice === null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        eyebrow="Pricing calculator"
        title="Priced by files, not guesswork"
        description={`Move the slider to your monthly volume. A "file" is up to ${STANDARD_FILE.documents} documents / ${STANDARD_FILE.pages} pages — larger files count proportionally more.`}
        align="center"
        className="mx-auto"
      />

      <RevealOnScroll
        delay={0.1}
        className="glow-card glow-card-shadow mt-14 grid grid-cols-1 gap-10 rounded-2xl border border-border bg-surface p-8 lg:grid-cols-2"
      >
        <div>
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="files-slider" className="text-foreground">
              Files per month
            </label>
            <span className="font-mono text-xs text-accent">{files >= 250 ? "250+" : files}</span>
          </div>
          <input
            id="files-slider"
            type="range"
            min={1}
            max={250}
            step={1}
            value={files}
            onChange={(e) => setFiles(Number(e.target.value))}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-accent"
          />

          <div className="mt-8 flex flex-col gap-3">
            <ToggleRow label="Bill annually" hint="Save 15%" checked={annual} onChange={setAnnual} />
            <ToggleRow
              label="Founding member"
              hint="25% off, first 6 months"
              checked={founding}
              onChange={setFounding}
            />
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">
            Discounts are capped at a combined 30% off. Estimate only — final invoicing is based on files
            actually processed.
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-xl bg-accent-subtle p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{tier.name} plan</p>

          {isEnterprise ? (
            <>
              <p className="mt-2 font-display text-3xl font-bold text-foreground">Contact us</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Custom volume-committed pricing for {files}+ files/month.
              </p>
            </>
          ) : (
            <>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-foreground">
                  <AnimatedCounter value={breakdown.effectiveMonthly ?? 0} prefix="$" decimals={0} />
                </span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              {breakdown.discountRate > 0 && (
                <p className="mt-1 text-xs text-accent">
                  {Math.round(breakdown.discountRate * 100)}% off applied
                </p>
              )}
              <p className="mt-3 text-xs text-muted-foreground">
                ~{formatCurrency(Math.round((breakdown.effectiveMonthly ?? 0) / (tier.filesIncluded ?? 1)))}{" "}
                / file &middot; {tier.filesIncluded} files included &middot; {formatCurrency(tier.overagePerFile ?? 0)}
                /file after
              </p>
              {annual && breakdown.annualTotal !== null && (
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Billed annually at {formatCurrency(breakdown.annualTotal)}
                </p>
              )}
            </>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
}
