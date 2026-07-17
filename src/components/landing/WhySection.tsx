import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "./ui/RevealOnScroll";

const FIELDS = ["Income", "Employment", "Bank statements", "Tax returns", "Liabilities", "Affordability"];

export function WhySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-20 lg:grid-cols-12 lg:gap-8">
        <RevealOnScroll className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Why BrokerMindAI</p>
          <h2 className="mt-5 max-w-xl text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Mortgage files aren't documents. They're relationships.
          </h2>
          <p className="mt-6 max-w-lg font-mono text-sm leading-[1.8] text-muted-foreground">
            Every piece affects another — an income figure changes what a borrower can afford, a
            liability changes what a lender will accept, a bank deposit either confirms or
            contradicts a stated down payment. Read individually, each document is just a fact.
            Read together, they're a verdict.
          </p>
          <p className="mt-6 max-w-lg font-mono text-sm leading-[1.8] text-foreground">
            BrokerMindAI builds an evidence graph across the file instead of checking documents in
            isolation — verifying those relationships automatically, so nothing that depends on
            something else gets approved before that something else is checked.
          </p>
        </RevealOnScroll>

        {/* A document resolving into its verified relationships — the same
            light-per-verified-fact language as the hero, applied here at a
            small, local scale. Vertical by design: this is the layout at
            every width, not a desktop diagram trimmed down for mobile. */}
        <RevealOnScroll delay={0.1} className="lg:col-span-5 lg:pt-2">
          <svg width="30" height="38" viewBox="0 0 30 38" fill="none" className="mb-7 text-border-strong" aria-hidden>
            <rect x="0.5" y="0.5" width="29" height="37" rx="2" stroke="currentColor" />
            <line x1="6" y1="11" x2="24" y2="11" stroke="currentColor" />
            <line x1="6" y1="18" x2="24" y2="18" stroke="currentColor" />
            <line x1="6" y1="25" x2="18" y2="25" stroke="currentColor" />
          </svg>

          <div className="relative pl-6">
            <motion.div
              aria-hidden
              className="absolute bottom-0 left-[3px] top-0 w-px bg-border-strong"
              style={{ transformOrigin: "top" }}
              initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <ol>
              {FIELDS.map((field, i) => (
                <li
                  key={field}
                  className="relative flex items-baseline justify-between border-b border-border py-4 font-mono text-sm"
                >
                  <motion.span
                    aria-hidden
                    className="absolute -left-6 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-border-strong bg-background"
                    initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.5 }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      borderColor: "var(--color-accent)",
                      boxShadow: "0 0 8px 1px rgba(46,204,129,0.55)",
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.4, delay: i * 0.13 + 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <span className="text-foreground">{field}</span>
                  <span className="text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
