import { useState, type DragEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { FileText, Check, RotateCcw, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealOnScroll } from "./ui/RevealOnScroll";

type Status = "idle" | "processing" | "done";

const FIELDS = [
  { label: "Borrower", value: "S. Chen" },
  { label: "Document type", value: "T4 — Income statement" },
  { label: "Employer", value: "Verified — Acme Logistics" },
  { label: "Annual income", value: "$94,200" },
];

const FIELD_MS = 550;

export function InteractiveDemo() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldIdx, setFieldIdx] = useState(-1);
  const [isOver, setIsOver] = useState(false);

  function runDemo() {
    if (status === "processing") return;
    setStatus("processing");
    setFieldIdx(-1);
    FIELDS.forEach((_, i) => {
      window.setTimeout(() => setFieldIdx(i), (i + 1) * FIELD_MS);
    });
    window.setTimeout(() => setStatus("done"), (FIELDS.length + 1) * FIELD_MS);
  }

  function reset() {
    setStatus("idle");
    setFieldIdx(-1);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsOver(false);
    runDemo();
  }

  function handleChipKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      runDemo();
    }
  }

  return (
    <section id="demo" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-24">
      <SectionHeading
        eyebrow="See it work"
        title="Drop a document. Watch it get read."
        description="A real interaction, not a video — drag the sample file onto the dropzone, or click it, to run the extraction."
        align="center"
        className="mx-auto"
      />

      <RevealOnScroll delay={0.1} className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-[180px_1fr] sm:items-start">
        <div
          role="button"
          tabIndex={0}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "sample-doc")}
          onClick={runDemo}
          onKeyDown={handleChipKeyDown}
          aria-label="Run the document extraction demo"
          className="flex cursor-grab select-none flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-accent/50 active:cursor-grabbing"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-subtle">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <span className="text-xs font-medium text-foreground">Pay stub.pdf</span>
          <span className="text-[11px] text-muted-foreground">Drag or click</span>
        </div>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsOver(true);
          }}
          onDragLeave={() => setIsOver(false)}
          onDrop={handleDrop}
          className={cn(
            "min-h-[220px] rounded-2xl border-2 border-dashed p-6 transition-colors",
            isOver ? "border-accent bg-accent-subtle" : "border-border-strong bg-background/40",
          )}
        >
          {status === "idle" ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex h-full min-h-[172px] flex-col items-center justify-center gap-2 text-center"
            >
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Drop the sample file here</p>
            </motion.div>
          ) : (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Pay stub.pdf
                </span>
                {status === "done" ? (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-accent">
                    <Check className="h-3 w-3" /> Extraction complete
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-muted-foreground">Reading…</span>
                )}
              </div>
              <div className="space-y-2">
                {FIELDS.map((field, i) => {
                  const revealed = i <= fieldIdx;
                  return (
                    <div
                      key={field.label}
                      className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 text-xs"
                    >
                      <span className="text-muted-foreground">{field.label}</span>
                      {revealed ? (
                        <motion.span
                          key="value"
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1.5 font-medium text-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {field.value}
                        </motion.span>
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </div>
                  );
                })}
              </div>
              {status === "done" && (
                <button
                  type="button"
                  onClick={reset}
                  className="mt-4 flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" /> Run again
                </button>
              )}
            </motion.div>
          )}
        </div>
      </RevealOnScroll>
    </section>
  );
}
