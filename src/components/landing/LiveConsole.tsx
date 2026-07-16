import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { AnimatedCounter } from "./ui/AnimatedCounter";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { SectionHeading } from "./ui/SectionHeading";
import { PIPELINE_STAGES } from "./content";

const STAGE_COUNTS = [4, 7, 12, 9, 5, 3, 18];

const CONDITIONS = [
  { label: "Proof of income", done: true },
  { label: "Bank statements (90 days)", done: true },
  { label: "Property appraisal", done: false },
  { label: "Down payment confirmation", done: false },
];

const LENDERS = [
  { name: "Lender A", match: 94 },
  { name: "Lender B", match: 81 },
  { name: "Lender C", match: 68 },
];

function useTickingTimestamp() {
  const shouldReduceMotion = useReducedMotion();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setInterval(() => {
      setSeconds((s) => (s >= 5 ? 0 : s + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  return seconds === 0 ? "just now" : `${seconds}s ago`;
}

export function LiveConsole() {
  const updated = useTickingTimestamp();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Product"
        title="Everything on one screen"
        description="An illustrative look at how a mortgage file moves through BrokerMind — from pipeline to lender match."
        align="center"
        className="mx-auto"
      />

      <RevealOnScroll
        delay={0.1}
        className="glow-card glow-card-shadow mt-14 overflow-hidden rounded-2xl border border-border bg-surface"
      >
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">
              app.brokermindapp.com — illustrative preview
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
              Live
            </span>
            <span>Updated {updated}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 bg-surface p-5 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">Pipeline</p>
            <div className="mt-4 flex items-end gap-2">
              {PIPELINE_STAGES.map((stage, i) => (
                <div key={stage} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-t-md bg-accent/70"
                    style={{ height: 6 + STAGE_COUNTS[i] * 5, transformOrigin: "bottom" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <span className="text-center text-[10px] text-muted-foreground">{stage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface p-5">
            <p className="text-xs font-medium text-muted-foreground">Risk score</p>
            <div className="mt-3 flex items-baseline gap-1">
              <AnimatedCounter value={82} className="text-3xl font-semibold text-foreground" />
              <span className="text-sm text-muted-foreground">/100</span>
            </div>
            <span className="mt-2 inline-flex items-center rounded-full bg-accent-subtle px-2 py-0.5 text-[11px] font-medium text-accent">
              Low risk
            </span>
          </div>

          <div className="bg-surface p-5">
            <p className="text-xs font-medium text-muted-foreground">Conditions</p>
            <div className="mt-3 space-y-2">
              {CONDITIONS.map((c) => (
                <div key={c.label} className="flex items-center gap-2 text-xs">
                  {c.done ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                  ) : (
                    <Clock className="h-3.5 w-3.5 shrink-0 text-warning" />
                  )}
                  <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 bg-surface p-5 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">Lender matching</p>
            <div className="mt-3 space-y-3">
              {LENDERS.map((l) => (
                <div key={l.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{l.name}</span>
                    <span className="text-muted-foreground">{l.match}% match</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.match}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 bg-surface p-5 md:col-span-2">
            <p className="text-xs font-medium text-muted-foreground">AI recommendations</p>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li className="rounded-lg border border-border bg-background px-3 py-2">
                Request an updated bank statement — current file is nearing the 90-day window.
              </li>
              <li className="rounded-lg border border-border bg-background px-3 py-2">
                Down payment source matches the disclosed gift letter.
              </li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
