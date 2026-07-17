import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "./ui/RevealOnScroll";

const STEPS = [
  { label: "Intake", note: null },
  { label: "Verification", note: null },
  { label: "Cross-checking", note: "Catches inconsistencies before submission" },
  { label: "Risk detection", note: "Canadian underwriting rules applied" },
  { label: "Affordability", note: null },
  { label: "Best lender", note: null },
];

const STEP_DELAY = 0.12;

export function WorkflowSection() {
  const shouldReduceMotion = useReducedMotion();
  const resultDelay = STEPS.length * STEP_DELAY + 0.5;

  return (
    <section id="workflow" className="scroll-mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <RevealOnScroll className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">What it does</p>
          <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Residential mortgages. One workflow, start to finish.
          </h2>
          <p className="mt-6 max-w-lg font-mono text-sm leading-[1.8] text-muted-foreground">
            Built specifically for residential lending in Canada — not a generic document tool
            stretched to fit. Every file moves through the same verified path.
          </p>
        </RevealOnScroll>

        <div className="relative mt-16">
          <svg
            className="pointer-events-none absolute inset-x-0 top-[7px] hidden h-px w-full md:block"
            preserveAspectRatio="none"
            aria-hidden
          >
            <motion.line
              x1="0"
              y1="0.5"
              x2="100%"
              y2="0.5"
              stroke="var(--color-border-strong)"
              strokeWidth={1}
              initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          <ol className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-6 md:gap-x-4">
            {STEPS.map((step, i) => (
              <li key={step.label} className="relative">
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 h-[15px] w-[15px] rounded-full border border-border-strong bg-surface md:static md:mb-4 md:block"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.6 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    borderColor: "var(--color-accent)",
                    boxShadow: "0 0 0 3px var(--color-accent-subtle), 0 0 14px 1px rgba(46,204,129,0.5)",
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * STEP_DELAY, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="pl-8 md:pl-0">
                  <p className="font-mono text-[11px] text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-mono text-sm font-medium text-foreground">{step.label}</p>
                  {step.note && (
                    <p className="mt-1 max-w-[16ch] font-mono text-[11px] leading-snug text-muted-foreground/70">
                      {step.note}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>

          {/* The recommendation emerging from verified evidence — a result,
              not another step, so it settles in slightly after the path. */}
          <motion.div
            className="mt-14 flex items-center gap-3 border-t border-border pt-8"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: resultDelay, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              aria-hidden
              className="h-2 w-2 shrink-0 rounded-full bg-accent"
              style={{ boxShadow: "0 0 10px 2px rgba(46,204,129,0.6)" }}
            />
            <p className="font-mono text-sm text-foreground">
              Recommended lender, matched from verified evidence — not a guess.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
