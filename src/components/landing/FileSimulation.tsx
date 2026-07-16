import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, AlertTriangle, Stamp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PIPELINE_STAGES } from "./content";

const STAGE_MS = 2200;
const DOCS = ["Pay stub", "Bank statement", "Photo ID"];
const RULES = ["Verifying income", "Checking credit history", "Confirming employment"];
const CONDITIONS = ["Down payment source", "Property appraisal"];

interface FileSimulationProps {
  className?: string;
  /** "loop" cycles forever (hero). "complete" plays once and holds at Funded (final CTA). */
  variant?: "loop" | "complete";
}

export function FileSimulation({ className, variant = "loop" }: FileSimulationProps) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [docIdx, setDocIdx] = useState(-1);
  const [ruleIdx, setRuleIdx] = useState(-1);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setActive(variant === "complete" ? PIPELINE_STAGES.length - 1 : 3);
      return;
    }
    const id = window.setInterval(() => {
      setActive((prev) => {
        if (variant === "complete" && prev === PIPELINE_STAGES.length - 1) return prev;
        return (prev + 1) % PIPELINE_STAGES.length;
      });
    }, STAGE_MS);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion, variant]);

  useEffect(() => {
    if (PIPELINE_STAGES[active] !== "Documents" || shouldReduceMotion) {
      setDocIdx(-1);
      return;
    }
    setDocIdx(-1);
    let i = -1;
    const id = window.setInterval(() => {
      i = (i + 1) % (DOCS.length + 1);
      setDocIdx(i);
    }, 480);
    return () => window.clearInterval(id);
  }, [active, shouldReduceMotion]);

  useEffect(() => {
    if (PIPELINE_STAGES[active] !== "Underwriting" || shouldReduceMotion) {
      setRuleIdx(-1);
      setRiskScore(0);
      return;
    }
    setRuleIdx(-1);
    setRiskScore(0);
    let i = -1;
    const id = window.setInterval(() => {
      i += 1;
      setRuleIdx(Math.min(i, RULES.length - 1));
      setRiskScore(Math.min(82, (i + 1) * 28));
      if (i >= RULES.length) window.clearInterval(id);
    }, 420);
    return () => window.clearInterval(id);
  }, [active, shouldReduceMotion]);

  const stage = PIPELINE_STAGES[active];

  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-5", className)}>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          File #A-2291
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
          Live
        </span>
      </div>

      <ol className="relative mb-5">
        {PIPELINE_STAGES.map((s, i) => {
          const isDone = i < active;
          const isActive = i === active;
          const isLast = i === PIPELINE_STAGES.length - 1;
          return (
            <li key={s} className="relative flex items-center gap-3 py-1.5">
              {!isLast && (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[8px] top-[22px] h-[calc(100%-4px)] w-px transition-colors duration-500",
                    isDone ? "bg-accent/40" : "bg-border",
                  )}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                  isDone
                    ? "border-accent bg-accent text-accent-foreground"
                    : isActive
                      ? "border-accent bg-surface"
                      : "border-border bg-background",
                )}
              >
                {isDone && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </span>
              <span
                className={cn(
                  "text-xs transition-colors duration-300",
                  isDone || isActive ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="min-h-[132px] rounded-xl border border-border bg-background/60 p-4">
        <motion.div key={stage} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {stage === "Lead" && <SimpleStatus label="New inquiry received" sub="Matched to available lenders" />}
          {stage === "Application" && (
            <SimpleStatus label="Application submitted" sub="Borrower details captured" />
          )}
          {stage === "Documents" && <DocExtraction activeDoc={docIdx} />}
          {stage === "Underwriting" && <RuleCheck activeRule={ruleIdx} riskScore={riskScore} />}
          {stage === "Conditions" && <ConditionChips />}
          {stage === "Approval" && (
            <SimpleStatus label="Underwriting approved" sub="Package ready for lender" success />
          )}
          {stage === "Funded" && <FundedStamp />}
        </motion.div>
      </div>
    </div>
  );
}

function SimpleStatus({ label, sub, success }: { label: string; sub?: string; success?: boolean }) {
  return (
    <div className="flex h-[100px] flex-col items-start justify-center gap-1.5">
      <span
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium",
          success ? "text-accent" : "text-foreground",
        )}
      >
        {success && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
        {label}
      </span>
      {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
    </div>
  );
}

function DocExtraction({ activeDoc }: { activeDoc: number }) {
  return (
    <div className="space-y-2">
      {DOCS.map((doc, i) => {
        const verified = i < activeDoc || activeDoc === DOCS.length;
        const scanning = i === activeDoc;
        return (
          <div key={doc} className="flex items-center justify-between text-xs">
            <span className="text-foreground">{doc}</span>
            <span
              className={cn(
                "flex items-center gap-1 font-medium",
                verified ? "text-accent" : scanning ? "text-muted-foreground" : "text-muted-foreground/50",
              )}
            >
              {verified ? (
                <>
                  <Check className="h-3 w-3" /> Verified
                </>
              ) : scanning ? (
                "Extracting…"
              ) : (
                "Queued"
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RuleCheck({ activeRule, riskScore }: { activeRule: number; riskScore: number }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-1.5">
        <span className="text-2xl font-semibold tabular-nums text-foreground">{riskScore}</span>
        <span className="text-xs text-muted-foreground">/ 100 risk score</span>
      </div>
      <div className="space-y-1.5">
        {RULES.map((rule, i) => {
          const done = i < activeRule || i <= activeRule;
          return (
            <div key={rule} className="flex items-center gap-2 text-xs">
              {i <= activeRule ? (
                <Check className="h-3 w-3 shrink-0 text-accent" />
              ) : (
                <span className="h-3 w-3 shrink-0 rounded-full border border-border" />
              )}
              <span className={done ? "text-foreground" : "text-muted-foreground/60"}>{rule}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConditionChips() {
  const shouldReduceMotion = useReducedMotion();
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCleared(true);
      return;
    }
    setCleared(false);
    const id = window.setTimeout(() => setCleared(true), 900);
    return () => window.clearTimeout(id);
  }, [shouldReduceMotion]);

  return (
    <div className="space-y-2">
      {CONDITIONS.map((label, i) => {
        const isCleared = i === 0 ? cleared : true;
        return (
          <div key={label} className="flex items-center justify-between text-xs">
            <span className="text-foreground">{label}</span>
            {isCleared ? (
              <span className="flex items-center gap-1 font-medium text-accent">
                <Check className="h-3 w-3" /> Cleared
              </span>
            ) : (
              <span className="flex items-center gap-1 font-medium text-warning">
                <AlertTriangle className="h-3 w-3" /> Flagged
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function FundedStamp() {
  return (
    <div className="flex h-[100px] items-center justify-center">
      <motion.div
        initial={{ scale: 1.4, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex items-center gap-2 rounded-lg border-2 border-accent px-4 py-2 text-accent"
      >
        <Stamp className="h-4 w-4" />
        <span className="font-display text-sm font-bold uppercase tracking-[0.1em]">Funded</span>
      </motion.div>
    </div>
  );
}
