import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, ScanSearch, PackageCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { HOW_IT_WORKS } from "./content";
import { SectionHeading } from "./ui/SectionHeading";

const ICONS = [UploadCloud, ScanSearch, PackageCheck];

const STEP_CHECKS = [
  ["Pay stub received", "Bank statement received", "Photo ID received"],
  ["Income cross-checked", "Credit history checked", "1 condition flagged"],
  ["Package assembled", "Audit trail attached", "Ready to submit"],
];

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6 },
  show: { opacity: 1, x: 0 },
};

export function WorkflowSection() {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ActiveIcon = ICONS[active];

  return (
    <section id="workflow" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="Process"
        title="How BrokerMind works"
        description="From upload to close, every file follows the same clear path."
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {HOW_IT_WORKS.map((item, i) => (
            <div
              key={item.step}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-index={i}
              className={cn(
                "flex min-h-[50vh] flex-col justify-center border-l-2 pl-6 transition-colors duration-300",
                active === i ? "border-accent" : "border-border",
              )}
            >
              <span className={cn("font-mono text-xs", active === i ? "text-accent" : "text-muted-foreground")}>
                {item.step}
              </span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-3 max-w-md text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-32 rounded-2xl border border-border bg-surface p-6">
            <div className="flex items-center gap-3">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-subtle"
              >
                <ActiveIcon className="h-5 w-5 text-accent" />
              </motion.div>
              <motion.p
                key={`label-${active}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-medium text-foreground"
              >
                {HOW_IT_WORKS[active].title}
              </motion.p>
            </div>

            <motion.div
              key={`checks-${active}`}
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="mt-6 space-y-2.5 border-t border-border pt-6"
            >
              {STEP_CHECKS[active].map((check) => (
                <motion.div key={check} variants={itemVariants} className="flex items-center gap-2.5 text-sm">
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
                  <span className="text-foreground">{check}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
