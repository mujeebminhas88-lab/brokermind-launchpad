import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "./ui/RevealOnScroll";

const CHECKS = [
  "Income verified against source documents",
  "Employment confirmed",
  "Down payment source matched to bank records",
  "OSFI B-20 stress test applied",
  "Audit trail attached",
];

export function ComplianceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="compliance" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12 lg:gap-8">
        <RevealOnScroll className="lg:col-span-6">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Compliance</p>
          <h2 className="mt-5 max-w-md text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Every decision, explainable.
          </h2>
          <p className="mt-6 max-w-md font-mono text-sm leading-[1.8] text-muted-foreground">
            Each file becomes a compliance-ready dossier as it's verified — every check, flag, and
            resolution logged in order, so a decision can always be traced back to the evidence
            that produced it.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="lg:col-span-6 lg:pt-2">
          <ol className="flex flex-col">
            {CHECKS.map((check, i) => (
              <li key={check} className="flex items-center gap-3 border-b border-border py-3.5 last:border-b-0">
                <motion.span
                  aria-hidden
                  className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border-strong"
                  initial={shouldReduceMotion ? undefined : { opacity: 0.3, scale: 0.85 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    borderColor: "var(--color-accent)",
                    backgroundColor: "var(--color-accent-subtle)",
                    boxShadow: "0 0 8px 1px rgba(46,204,129,0.45)",
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.4, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.svg
                    viewBox="0 0 12 12"
                    className="h-2.5 w-2.5"
                    initial={shouldReduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.35, delay: i * 0.15 + 0.15 }}
                  >
                    <motion.path
                      d="M2.5 6.2L5 8.7L9.5 3.5"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.span>
                <span className="font-mono text-sm text-foreground">{check}</span>
              </li>
            ))}
          </ol>

          <motion.p
            className="mt-6 font-mono text-xs text-muted-foreground"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: CHECKS.length * 0.15 + 0.3 }}
          >
            Dossier ready.
          </motion.p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
