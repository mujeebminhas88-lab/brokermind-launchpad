import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, easeInOut, type MotionValue } from "framer-motion";
import { Check, AlertTriangle, Stamp as StampIcon } from "lucide-react";
import {
  STAGE_W,
  STAGE_H,
  DOCS,
  MARKS,
  CONNECTOR,
  STAMP,
  CAMERA_SHOTS,
  type DocDef,
  type MarkDef,
} from "./openingConfig";

function useViewportSize() {
  const [size, setSize] = useState(() =>
    typeof window === "undefined"
      ? { w: 1600, h: 900 }
      : { w: window.innerWidth, h: window.innerHeight },
  );
  useEffect(() => {
    function update() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// One easing on every segment: holds are flat (start === end, so easing is a
// no-op) and moves get a smooth accelerate/decelerate instead of the linear,
// constant-velocity default — a held camera, not a mechanical pan.
const CAMERA_EASE = CAMERA_SHOTS.slice(1).map(() => easeInOut);

function useCameraTransform(progress: MotionValue<number>) {
  const { w: vw, h: vh } = useViewportSize();
  const pPoints = CAMERA_SHOTS.map((s) => s.p);
  const txPoints = CAMERA_SHOTS.map((s) => vw / 2 - s.x * s.scale);
  const tyPoints = CAMERA_SHOTS.map((s) => vh / 2 - s.y * s.scale);
  const scalePoints = CAMERA_SHOTS.map((s) => s.scale);

  const x = useTransform(progress, pPoints, txPoints, { ease: CAMERA_EASE });
  const y = useTransform(progress, pPoints, tyPoints, { ease: CAMERA_EASE });
  const scale = useTransform(progress, pPoints, scalePoints, { ease: CAMERA_EASE });

  return { x, y, scale };
}

function DocHeader({ title, refLabel }: { title: string; refLabel: string }) {
  return (
    <div className="absolute left-8 right-8 top-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400">{refLabel}</p>
      <h3 className="mt-1 text-xl font-semibold text-neutral-900">{title}</h3>
      <div className="mt-4 h-px bg-neutral-200" />
    </div>
  );
}

function Row({ top, label, value }: { top: number; label: string; value: string }) {
  return (
    <div
      className="absolute left-8 right-8 flex items-baseline justify-between border-b border-neutral-200 pb-2"
      style={{ top }}
    >
      <span className="text-[15px] text-neutral-500">{label}</span>
      <span className="font-mono text-[15px] text-neutral-900">{value}</span>
    </div>
  );
}

function DocCard({ doc, children }: { doc: DocDef; children: ReactNode }) {
  return (
    <div
      className="absolute rounded-sm bg-[#f7f5ee] shadow-[0_50px_140px_-50px_rgba(0,0,0,0.85)]"
      style={{ left: doc.x, top: doc.y, width: doc.w, height: doc.h }}
    >
      {children}
    </div>
  );
}

function ApplicationDoc({ doc }: { doc: DocDef }) {
  return (
    <DocCard doc={doc}>
      <DocHeader title={doc.title} refLabel={doc.ref} />
      <Row top={162} label="Property address" value="142 Birchwood Ave, Unit 4" />
      <Row top={208} label="Requested amount" value="$482,000" />
      <Row top={254} label="Term" value="25-yr fixed" />
      <Row top={300} label="Annual income (stated)" value="$94,200" />
      <Row top={346} label="Employer" value="Acme Logistics Inc." />
      <Row top={392} label="Down payment source" value="Gift — parent" />
    </DocCard>
  );
}

function BankStatementDoc({ doc }: { doc: DocDef }) {
  return (
    <DocCard doc={doc}>
      <DocHeader title={doc.title} refLabel={doc.ref} />
      <Row top={162} label="Payroll deposit — Acme Logistics" value="$3,625.00" />
      <Row top={202} label="Debit — groceries" value="$84.12" />
      <Row top={242} label="Debit — utilities" value="$128.40" />
      <Row top={282} label="Gift deposit — E. Chen (parent)" value="$48,200.00" />
      <Row top={322} label="Debit — insurance" value="$212.00" />
    </DocCard>
  );
}

function EmploymentDoc({ doc }: { doc: DocDef }) {
  return (
    <DocCard doc={doc}>
      <DocHeader title={doc.title} refLabel={doc.ref} />
      <div className="absolute left-8 right-8 top-[150px] space-y-4 text-[14px] leading-relaxed text-neutral-500">
        <p>
          This letter confirms that S. Chen has been employed with Acme Logistics Inc. since March
          2021 in the position of Operations Manager, on a full-time, permanent basis.
        </p>
        <p className="font-mono text-neutral-900">Current annual salary: $94,200</p>
      </div>
    </DocCard>
  );
}

function PaystubDoc({ doc }: { doc: DocDef }) {
  return (
    <DocCard doc={doc}>
      <DocHeader title={doc.title} refLabel={doc.ref} />
      <Row top={162} label="Pay period" value="Biweekly" />
      <Row top={202} label="Gross pay" value="$3,625.00" />
      <Row top={242} label="YTD gross" value="$81,760.00" />
      <Row top={282} label="Net pay" value="$2,690.14" />
    </DocCard>
  );
}

function RevealMark({ mark, progress }: { mark: MarkDef; progress: MotionValue<number> }) {
  const start = Math.max(0, mark.appearAt - 0.025);
  const fadeOutAt = mark.fadeOutAt ?? 1;
  const y = useTransform(progress, [start, mark.appearAt], [8, 0]);
  const opacity = useTransform(
    progress,
    [start, mark.appearAt, Math.max(mark.appearAt, fadeOutAt - 0.025), fadeOutAt],
    [0, 1, 1, mark.fadeOutAt ? 0 : 1],
  );
  const isCheck = mark.kind === "check";

  return (
    <motion.div
      className="absolute z-10 flex items-center gap-1.5"
      style={{ left: mark.x, top: mark.y, opacity, y }}
    >
      <span
        className={
          "flex h-5 w-5 items-center justify-center rounded-full text-white " +
          (isCheck ? "bg-emerald-500" : "bg-amber-500")
        }
      >
        {isCheck ? <Check className="h-3 w-3" strokeWidth={3} /> : <AlertTriangle className="h-3 w-3" />}
      </span>
      <span className={"font-mono text-[11px] font-medium " + (isCheck ? "text-emerald-500" : "text-amber-500")}>
        {mark.tag}
      </span>
    </motion.div>
  );
}

function Connector({ progress }: { progress: MotionValue<number> }) {
  const pathLength = useTransform(progress, [CONNECTOR.drawStart, CONNECTOR.drawEnd], [0, 1]);
  const opacity = useTransform(progress, [CONNECTOR.drawStart - 0.01, CONNECTOR.drawStart], [0, 1]);

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 z-0"
      width={STAGE_W}
      height={STAGE_H}
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
    >
      <motion.line
        x1={CONNECTOR.from.x}
        y1={CONNECTOR.from.y}
        x2={CONNECTOR.to.x}
        y2={CONNECTOR.to.y}
        stroke="#10b981"
        strokeWidth={2}
        strokeLinecap="round"
        style={{ pathLength, opacity }}
      />
    </svg>
  );
}

function StampMark({ progress }: { progress: MotionValue<number> }) {
  const start = STAMP.appearAt - 0.025;
  const opacity = useTransform(progress, [start, STAMP.appearAt], [0, 1]);
  const y = useTransform(progress, [start, STAMP.appearAt], [8, 0]);

  return (
    <motion.div
      className="absolute z-10 flex items-center gap-2 rounded-md border-2 border-emerald-500 px-4 py-2 text-emerald-500"
      style={{ left: STAMP.x, top: STAMP.y, opacity, y }}
    >
      <StampIcon className="h-4 w-4" />
      <span className="font-mono text-sm font-bold uppercase tracking-[0.12em]">Funded</span>
    </motion.div>
  );
}

function Caption({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  return (
    <motion.p
      className="pointer-events-none absolute inset-x-0 bottom-16 text-center font-mono text-xs uppercase tracking-[0.2em] text-neutral-500"
      style={{ opacity }}
    >
      {children}
    </motion.p>
  );
}

export default function OpeningSequence() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const camera = useCameraTransform(scrollYProgress);

  return (
    <div ref={trackRef} style={{ height: "600vh" }} className="relative bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
          className="absolute left-0 top-0"
          // Server has no window, so it renders a fallback viewport size; the
          // client immediately recomputes from the real one on first paint.
          // React logs a one-time dev-only hydration warning for the resulting
          // transform mismatch — expected, and preferable to a post-load camera
          // snap (suppressHydrationWarning doesn't apply here: it only covers
          // text content, not style/attribute diffs).
          style={{
            width: STAGE_W,
            height: STAGE_H,
            x: camera.x,
            y: camera.y,
            scale: camera.scale,
            transformOrigin: "0 0",
          }}
        >
          <Connector progress={scrollYProgress} />
          <ApplicationDoc doc={DOCS[0]} />
          <BankStatementDoc doc={DOCS[1]} />
          <EmploymentDoc doc={DOCS[2]} />
          <PaystubDoc doc={DOCS[3]} />
          {MARKS.map((mark) => (
            <RevealMark key={mark.id} mark={mark} progress={scrollYProgress} />
          ))}
          <StampMark progress={scrollYProgress} />
        </motion.div>

        <Caption progress={scrollYProgress} range={[0, 0.02, 0.07, 0.12]}>
          One file.
        </Caption>
        <Caption progress={scrollYProgress} range={[0.9, 0.94, 0.99, 1]}>
          The complete record.
        </Caption>
      </div>
    </div>
  );
}
