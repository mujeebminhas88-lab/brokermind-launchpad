export const STAGE_W = 1720;
export const STAGE_H = 2000;

export interface DocDef {
  id: string;
  title: string;
  ref: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const DOCS: DocDef[] = [
  { id: "application", title: "Loan Application Summary", ref: "EXHIBIT A", x: 60, y: 60, w: 740, h: 900 },
  { id: "bank", title: "Bank Statement — 90 Day", ref: "EXHIBIT B", x: 900, y: 60, w: 740, h: 900 },
  { id: "employment", title: "Employment Verification", ref: "EXHIBIT C", x: 60, y: 1040, w: 740, h: 760 },
  { id: "paystub", title: "Pay Stub", ref: "EXHIBIT D", x: 900, y: 1040, w: 740, h: 760 },
];

export type MarkKind = "check" | "flag";

export interface MarkDef {
  id: string;
  x: number;
  y: number;
  tag: string;
  kind: MarkKind;
  appearAt: number;
  fadeOutAt?: number;
}

// Coordinates below are derived directly from the row layout rendered in
// OpeningSequence's document content (padding 32, header ~70, row height
// 46/40) — not chosen independently, so document text and marks stay in
// sync when either is adjusted.
export const MARKS: MarkDef[] = [
  { id: "income", x: 720, y: 383, tag: "1", kind: "check", appearAt: 0.2 },
  { id: "employer", x: 720, y: 429, tag: "2", kind: "check", appearAt: 0.3 },
  { id: "downpayment-flag", x: 750, y: 475, tag: "3", kind: "flag", appearAt: 0.46, fadeOutAt: 0.68 },
  { id: "downpayment-resolved", x: 750, y: 475, tag: "3", kind: "check", appearAt: 0.68 },
  { id: "deposit-match", x: 928, y: 366, tag: "3", kind: "check", appearAt: 0.66 },
];

// The line must finish drawing before its destination confirms and before
// the origin flag resolves — evidence arrives, then the conclusion follows.
export const CONNECTOR = {
  from: { x: 750, y: 475 },
  to: { x: 928, y: 366 },
  drawStart: 0.6,
  drawEnd: 0.66,
};

export const STAMP = {
  x: 430,
  y: 840,
  appearAt: 0.78,
};

export interface CameraShot {
  p: number;
  x: number;
  y: number;
  scale: number;
}

// Beat 1 holds tight on the application alone (never wide until the
// pull-back, per creative-direction.md §4) — the file arrives as one
// document, not a system overview.
export const CAMERA_SHOTS: CameraShot[] = [
  { p: 0.0, x: 430, y: 280, scale: 1.4 },
  { p: 0.1, x: 430, y: 280, scale: 1.4 },
  { p: 0.16, x: 451, y: 406, scale: 1.7 },
  { p: 0.4, x: 451, y: 406, scale: 1.7 },
  { p: 0.44, x: 451, y: 475, scale: 1.8 },
  { p: 0.54, x: 451, y: 475, scale: 1.8 },
  { p: 0.6, x: 839, y: 420, scale: 1.4 },
  { p: 0.7, x: 839, y: 420, scale: 1.4 },
  { p: 0.74, x: 430, y: 840, scale: 1.8 },
  { p: 0.8, x: 430, y: 840, scale: 1.8 },
  { p: 0.86, x: 860, y: 1000, scale: 0.44 },
  { p: 1.0, x: 860, y: 1000, scale: 0.44 },
];
