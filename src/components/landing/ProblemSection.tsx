import { motion, useReducedMotion } from "framer-motion";
import { FileText, AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealOnScroll } from "./ui/RevealOnScroll";

const MANUAL_STEPS = ["Upload", "Chase missing docs", "Manual cross-check", "Corrections", "Submit"];
const AUTOMATED_STEPS = ["Upload", "AI extraction", "Compliance check", "Deal-ready", "Submit"];

const TRACK_DURATION = 7;

function Track({
  steps,
  chaotic,
  label,
}: {
  steps: string[];
  chaotic: boolean;
  label: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  const chaoticX = ["2%", "10%", "4%", "22%", "14%", "40%", "30%", "58%", "48%", "78%", "62%", "98%"];
  const smoothX = ["2%", "98%"];

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            chaotic ? "bg-warning" : "bg-accent motion-safe:animate-pulse",
          )}
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      </div>

      <div className="relative">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />

        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step} className="flex flex-col items-center gap-2" style={{ width: `${100 / steps.length}%` }}>
              <span className={cn("h-1.5 w-1.5 rounded-full", chaotic ? "bg-border-strong" : "bg-accent/40")} />
              <span className="max-w-[80px] text-center text-[11px] leading-tight text-muted-foreground">
                {step}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          className={cn(
            "absolute top-1/2 flex h-7 w-7 -translate-y-[calc(50%+18px)] items-center justify-center rounded-lg border shadow-sm",
            chaotic ? "border-warning bg-warning-subtle text-warning" : "border-accent bg-accent-subtle text-accent",
          )}
          style={{ left: 0 }}
          animate={
            shouldReduceMotion
              ? { left: chaotic ? "45%" : "98%" }
              : { left: chaotic ? chaoticX : smoothX }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: TRACK_DURATION,
                  repeat: Infinity,
                  ease: chaotic ? "easeInOut" : "linear",
                }
          }
        >
          {chaotic ? <AlertTriangle className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
        </motion.div>
      </div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <SectionHeading
        eyebrow="The Problem"
        title="Manual file prep doesn't scale"
        description="The same file, two ways. One bounces between manual steps for days. The other moves in a straight line."
        align="center"
        className="mx-auto"
      />

      <RevealOnScroll delay={0.1} className="mt-16 space-y-14 rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <Track steps={MANUAL_STEPS} chaotic label="Without BrokerMind" />
        <Track steps={AUTOMATED_STEPS} chaotic={false} label="With BrokerMind" />
        <div className="flex items-center gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-accent" />
          Same file. Fewer detours, no lost time chasing paperwork.
        </div>
      </RevealOnScroll>
    </section>
  );
}
