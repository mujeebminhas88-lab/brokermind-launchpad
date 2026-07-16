import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NetworkNode {
  id: string;
  label: string;
  base: string;
  x: number;
  y: number;
}

const NODES: NetworkNode[] = [
  { id: "income", label: "Income", base: "$94,200", x: 70, y: 60 },
  { id: "downpayment", label: "Down Payment", base: "10%", x: 70, y: 160 },
  { id: "credit", label: "Credit Score", base: "712", x: 70, y: 260 },
  { id: "dti", label: "DTI Ratio", base: "38%", x: 330, y: 100 },
  { id: "program", label: "Loan Program", base: "Conventional", x: 330, y: 220 },
  { id: "conditions", label: "Conditions", base: "2 open", x: 580, y: 160 },
];

const EDGES: [string, string][] = [
  ["income", "dti"],
  ["downpayment", "dti"],
  ["downpayment", "program"],
  ["credit", "program"],
  ["dti", "conditions"],
  ["program", "conditions"],
];

interface Scenario {
  source: string;
  sourceValue: string;
  affected: Record<string, string>;
}

const SCENARIOS: Scenario[] = [
  { source: "income", sourceValue: "$96,400", affected: { dti: "36%", conditions: "1 open" } },
  { source: "downpayment", sourceValue: "15%", affected: { dti: "35%", program: "Conventional Plus" } },
  { source: "credit", sourceValue: "738", affected: { program: "Jumbo eligible", conditions: "1 open" } },
];

const CYCLE_MS = 4800;
const VIEW_W = 640;
const VIEW_H = 320;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function RelationshipNetwork({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [shouldReduceMotion]);

  const scenario = shouldReduceMotion ? null : SCENARIOS[tick % SCENARIOS.length];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
      style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden
      >
        {EDGES.map(([fromId, toId]) => {
          const from = nodeById(fromId);
          const to = nodeById(toId);
          const isActive = scenario?.source === fromId && toId in scenario.affected;
          return (
            <g key={`${fromId}-${toId}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--color-border-strong)"
                strokeWidth={1.5}
              />
              {isActive && (
                <motion.circle
                  key={`${fromId}-${toId}-${tick}`}
                  r={4}
                  fill="var(--color-accent)"
                  initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                  animate={{ cx: [from.x, to.x], cy: [from.y, to.y], opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.55, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {NODES.map((node) => {
        const isSource = scenario?.source === node.id;
        const isAffected = !!scenario && node.id in scenario.affected;
        const value = isSource ? scenario!.sourceValue : isAffected ? scenario!.affected[node.id] : node.base;
        const delay = isSource ? 0 : isAffected ? 0.9 : 0;

        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(node.x / VIEW_W) * 100}%`, top: `${(node.y / VIEW_H) * 100}%` }}
          >
            <div
              className={cn(
                "relative rounded-lg border bg-card px-3 py-2 transition-colors duration-300",
                isSource || isAffected ? "border-accent" : "border-border",
              )}
            >
              {(isSource || isAffected) && (
                <motion.span
                  key={`ring-${node.id}-${tick}`}
                  aria-hidden
                  className="absolute inset-0 rounded-lg border border-accent"
                  initial={{ opacity: 0.6, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.25 }}
                  transition={{ duration: 0.7, delay, ease: "easeOut" }}
                />
              )}
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {node.label}
              </p>
              <motion.p
                key={`${node.id}-${value}-${tick}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
                className="mt-0.5 whitespace-nowrap text-sm font-semibold tabular-nums text-foreground"
              >
                {value}
              </motion.p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
