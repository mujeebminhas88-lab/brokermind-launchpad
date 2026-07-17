import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The approved BrokerMindAI hero artwork — an asymmetric, organic
 * relationship network where light travels through a living structure and
 * only verified paths illuminate. This is a direct port of the approved
 * static composition; the drawing algorithm below is locked. Do not
 * "improve" the visuals here — art-direction changes go through a new
 * approved concept pass, not an incidental refactor.
 */

interface Node {
  x: number;
  y: number;
  parent: number;
  depth: number;
  width: number;
  angle?: number;
  bow?: number;
}

interface TreeOpts {
  x: number;
  y: number;
  angle: number;
  len: number;
  width: number;
  maxDepth: number;
  branchiness: number;
  minLen: number;
  richBase: boolean;
}

function mulberry32(seed: number) {
  let s = seed;
  return function rand() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function ease(t: number) {
  return t * t * (3 - 2 * t);
}
function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mixColor(c1: string, c2: string, t: number) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
}

function fitCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function grain(ctx: CanvasRenderingContext2D, w: number, h: number, rand: () => number, count: number) {
  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const y = rand() * h;
    ctx.fillStyle = rand() > 0.5 ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.055)";
    ctx.fillRect(x, y, 1, 1);
  }
}

// Builds a node list with parent pointers — an asymmetric, irregular
// branching structure. No two runs (or branches) come out the same: fork
// count, angle spread, taper and curvature all carry random jitter.
function buildTree(rand: () => number, opts: TreeOpts): Node[] {
  const nodes: Node[] = [{ x: opts.x, y: opts.y, parent: -1, depth: 0, width: opts.width }];
  const MAX_NODES = 1400;

  function recurse(parentIdx: number, angle: number, len: number, width: number, depth: number) {
    if (nodes.length > MAX_NODES) return;
    if (depth > opts.maxDepth || width < 0.18 || len < opts.minLen) return;
    const p = nodes[parentIdx];
    const ex = p.x + Math.cos(angle) * len;
    const ey = p.y + Math.sin(angle) * len;
    const bow = (rand() - 0.5) * len * (0.22 + (depth / opts.maxDepth) * 0.4);
    const idx = nodes.length;
    nodes.push({ x: ex, y: ey, parent: parentIdx, depth, width, angle, bow });

    // Branch count is tiered by depth, not one flat probability — a real
    // structure's early generations aren't a coin-flip away from dying, and
    // its outer canopy is where the actual thinning happens. `richBase` is
    // the one lever that makes a "complex file" structurally denser than a
    // "simple file," not just a difference in which tips light up.
    let nChildren: number;
    const r = rand();
    const richDepth = opts.richBase ? 2 : 1;
    if (depth >= opts.maxDepth) {
      nChildren = 0;
    } else if (depth <= richDepth) {
      nChildren = r < 0.45 ? 2 : 3;
    } else if (depth <= opts.maxDepth - 3) {
      if (r < 0.08) nChildren = 0;
      else if (r < 0.4) nChildren = 1;
      else if (r < 0.82) nChildren = 2;
      else nChildren = 3;
    } else {
      if (r < 0.34) nChildren = 0;
      else if (r < 0.8) nChildren = 1;
      else nChildren = 2;
    }

    for (let i = 0; i < nChildren; i++) {
      const spread = (i - (nChildren - 1) / 2) * (0.36 + rand() * (0.22 + opts.branchiness * 0.4));
      const childAngle = angle + spread + (rand() - 0.5) * 0.22;
      const childLen = len * (0.58 + rand() * 0.24);
      const childWidth = width * (0.66 + rand() * 0.16);
      recurse(idx, childAngle, childLen, childWidth, depth + 1);
    }
  }

  recurse(0, opts.angle, opts.len, opts.width, 1);
  return nodes;
}

function leavesOf(nodes: Node[]): number[] {
  const childCount = new Array(nodes.length).fill(0);
  for (let i = 1; i < nodes.length; i++) childCount[nodes[i].parent]++;
  const leaves: number[] = [];
  for (let i = 1; i < nodes.length; i++) if (childCount[i] === 0) leaves.push(i);
  return leaves;
}

function markVerified(nodes: Node[], leaves: number[], rand: () => number, k: number) {
  const pool = leaves.slice();
  const lit = new Set<number>();
  const chosenLeaves: number[] = [];
  for (let i = 0; i < k && pool.length; i++) {
    const j = Math.floor(rand() * pool.length);
    const leaf = pool.splice(j, 1)[0];
    chosenLeaves.push(leaf);
    let cur = leaf;
    // stop at (and exclude) the root: it has no incoming segment to draw
    while (cur > 0 && !lit.has(cur)) {
      lit.add(cur);
      cur = nodes[cur].parent;
    }
  }
  return { lit, chosenLeaves };
}

function crossLinks(nodes: Node[], lit: Set<number>, rand: () => number, count: number, maxDist: number) {
  const litArr = [...lit].filter((i) => nodes[i].depth > 2);
  const links: [number, number][] = [];
  let tries = 0;
  while (links.length < count && tries < count * 40) {
    tries++;
    const a = litArr[Math.floor(rand() * litArr.length)];
    const b = litArr[Math.floor(rand() * litArr.length)];
    if (a === b) continue;
    const na = nodes[a];
    const nb = nodes[b];
    if (na.parent === b || nb.parent === a) continue;
    const d = Math.hypot(na.x - nb.x, na.y - nb.y);
    if (d > maxDist || d < maxDist * 0.25) continue;
    links.push([a, b]);
  }
  return links;
}

function drawSegment(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  bow: number,
  width: number,
  strokeStyle: string,
  alpha: number,
) {
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const mx = (x1 + x2) / 2 + (y2 - y1 === 0 ? 0 : (bow * (y1 - y2)) / dist);
  const my = (y1 + y2) / 2 + (bow * (x2 - x1)) / dist || 0;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.quadraticCurveTo(mx, my, x2, y2);
  ctx.lineCap = "round";
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = width;
  ctx.globalAlpha = alpha;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawDormant(ctx: CanvasRenderingContext2D, nodes: Node[], color: string) {
  for (let i = 1; i < nodes.length; i++) {
    const n = nodes[i];
    const p = nodes[n.parent];
    drawSegment(ctx, p.x, p.y, n.x, n.y, n.bow!, Math.max(0.5, n.width * 0.55), color, 0.05 + n.width * 0.01);
  }
}

// Three layers per lit branch, wide-to-narrow: a soft warm-tinted ambient
// halo (the light bleeding into the space around it), a mid bloom in the
// brand emerald, and a crisp near-white core. Real bloom is never one flat
// glow — it's several radii stacked, warmer and wider the further out.
function drawLit(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  lit: Set<number>,
  maxDepth: number,
  baseColor: string,
  tipColor: string,
  haloColor: string,
) {
  const litNodes = [...lit].sort((a, b) => nodes[a].depth - nodes[b].depth);

  litNodes.forEach((i) => {
    const n = nodes[i];
    const p = nodes[n.parent];
    const t = ease(Math.min(1, n.depth / maxDepth));
    const col = mixColor(haloColor, tipColor, Math.pow(t, 1.7));
    ctx.shadowColor = col;
    ctx.shadowBlur = lerp(38, 12, t);
    drawSegment(ctx, p.x, p.y, n.x, n.y, n.bow!, n.width * 3.4, col, lerp(0.08, 0.13, t));
  });
  ctx.shadowBlur = 0;

  litNodes.forEach((i) => {
    const n = nodes[i];
    const p = nodes[n.parent];
    const t = ease(Math.min(1, n.depth / maxDepth));
    const col = mixColor(baseColor, tipColor, Math.pow(t, 1.6));
    ctx.shadowColor = col;
    ctx.shadowBlur = lerp(22, 6, t);
    drawSegment(ctx, p.x, p.y, n.x, n.y, n.bow!, n.width * 1.9, col, lerp(0.22, 0.32, t));
  });
  ctx.shadowBlur = 0;

  litNodes.forEach((i) => {
    const n = nodes[i];
    const p = nodes[n.parent];
    const t = ease(Math.min(1, n.depth / maxDepth));
    const col = mixColor(baseColor, tipColor, Math.pow(t, 1.6));
    ctx.shadowColor = col;
    ctx.shadowBlur = lerp(9, 2, t);
    drawSegment(ctx, p.x, p.y, n.x, n.y, n.bow!, Math.max(0.7, n.width * 0.66), col, lerp(0.82, 0.98, t));
  });
  ctx.shadowBlur = 0;
}

// Every lit junction gets a small confirmed-point light, not just the
// terminal tips — each one is a real node on a real branch, not a scattered
// particle. This is where "richness" comes from, not noise.
function drawJunctionLights(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  lit: Set<number>,
  chosenLeaves: number[],
  tipColor: string,
) {
  const leafSet = new Set(chosenLeaves);
  lit.forEach((i) => {
    if (leafSet.has(i)) return;
    const n = nodes[i];
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.3, 0, Math.PI * 2);
    ctx.fillStyle = tipColor;
    ctx.shadowColor = tipColor;
    ctx.shadowBlur = 7;
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  });
}

function drawCrossLinks(ctx: CanvasRenderingContext2D, nodes: Node[], links: [number, number][], color: string) {
  links.forEach(([a, b]) => {
    const na = nodes[a];
    const nb = nodes[b];
    const bow = Math.hypot(na.x - nb.x, na.y - nb.y) * 0.18;
    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    drawSegment(ctx, na.x, na.y, nb.x, nb.y, bow, 0.7, color, 0.4);
    ctx.shadowBlur = 0;
  });
}

function drawTerminals(ctx: CanvasRenderingContext2D, nodes: Node[], chosenLeaves: number[], tipColor: string) {
  chosenLeaves.forEach((i) => {
    const n = nodes[i];
    // soft wide halo before the hard point — this is what makes a tip read
    // as a light source rather than a drawn dot
    const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 26);
    halo.addColorStop(0, "rgba(234,255,242,0.55)");
    halo.addColorStop(0.4, "rgba(127,224,172,0.16)");
    halo.addColorStop(1, "rgba(127,224,172,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(n.x - 26, n.y - 26, 52, 52);

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = tipColor;
    ctx.shadowColor = tipColor;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.shadowBlur = 0;
    // tiny glass-like specular catch
    ctx.beginPath();
    ctx.arc(n.x - 0.8, n.y - 0.8, 0.7, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();
  });
}

function sourceGlow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, strength: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.globalAlpha = strength;
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.globalAlpha = 1;
}

// A soft volumetric column rising from the source — light traveling up out
// of the file, not just pooling at its base.
function lightBeam(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
  rgb: string,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const g = ctx.createLinearGradient(0, 0, 0, -length);
  g.addColorStop(0, `rgba(${rgb},0.14)`);
  g.addColorStop(0.5, `rgba(${rgb},0.05)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(-width / 2, 0);
  ctx.lineTo(width / 2, 0);
  ctx.lineTo(width * 1.6, -length);
  ctx.lineTo(-width * 1.6, -length);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function renderHero(canvas: HTMLCanvasElement) {
  const { ctx, w, h } = fitCanvas(canvas);
  const rand = mulberry32(7321);

  // deep charcoal ground with a faint edge vignette (not pure black)
  ctx.fillStyle = "#14140f";
  ctx.fillRect(0, 0, w, h);
  const vg = ctx.createRadialGradient(w * 0.5, h * 0.62, h * 0.15, w * 0.5, h * 0.62, h * 1.05);
  vg.addColorStop(0, "rgba(20,20,15,0)");
  vg.addColorStop(1, "rgba(12,11,9,0.75)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  // soft volumetric light wash, one diagonal source, very low opacity
  ctx.save();
  ctx.translate(w * 0.62, h * 0.28);
  ctx.rotate(-0.5);
  const wash = ctx.createLinearGradient(-w * 0.55, 0, w * 0.55, 0);
  wash.addColorStop(0, "rgba(232,255,241,0)");
  wash.addColorStop(0.5, "rgba(232,255,241,0.045)");
  wash.addColorStop(1, "rgba(232,255,241,0)");
  ctx.fillStyle = wash;
  ctx.fillRect(-w * 0.55, -h * 0.9, w * 1.1, h * 1.8);
  ctx.restore();

  // ---- far background ghost structure — a third file, distant and soft,
  // so the right side of the frame reads as depth rather than dead space ----
  ctx.filter = "blur(7px)";
  const ghost = buildTree(mulberry32(99), {
    x: w * 0.86, y: h * 1.1, angle: -Math.PI / 2 - 0.1, len: h * 0.4, width: 4.2,
    maxDepth: 7, branchiness: 0.5, minLen: h * 0.012, richBase: true,
  });
  const ghostLeaves = leavesOf(ghost);
  const ghostVerified = markVerified(ghost, ghostLeaves, mulberry32(98), 4);
  sourceGlow(ctx, w * 0.86, h * 1.08, h * 0.22, "rgba(243,230,200,0.4)", 0.4);
  drawDormant(ctx, ghost, "rgba(120,150,135,0.22)");
  drawLit(ctx, ghost, ghostVerified.lit, 7, "#1c6f49", "#eafff2", "#caa25f");
  ctx.filter = "none";

  // ---- companion tree: a simpler file, fewer verified relationships ----
  const simple = buildTree(mulberry32(41), {
    x: w * 0.16, y: h * 1.03, angle: -Math.PI / 2 + 0.1, len: h * 0.22, width: 4.4,
    maxDepth: 6, branchiness: 0.35, minLen: h * 0.016, richBase: false,
  });
  const simpleLeaves = leavesOf(simple);
  const simpleVerified = markVerified(simple, simpleLeaves, mulberry32(42), 4);
  lightBeam(ctx, w * 0.16, h * 1.0, -Math.PI / 2 + 0.1, h * 0.62, h * 0.07, "233,221,196");
  sourceGlow(ctx, w * 0.16, h * 1.0, h * 0.26, "rgba(243,230,200,0.55)", 0.55);
  drawDormant(ctx, simple, "rgba(120,116,100,0.1)");
  drawLit(ctx, simple, simpleVerified.lit, 6, "#1c6f49", "#eafff2", "#caa25f");
  drawJunctionLights(ctx, simple, simpleVerified.lit, simpleVerified.chosenLeaves, "#eafff2");
  drawTerminals(ctx, simple, simpleVerified.chosenLeaves, "#eafff2");

  // ---- primary tree: a complex file, many interconnected relationships ----
  const main = buildTree(mulberry32(7), {
    x: w * 0.52, y: h * 1.08, angle: -Math.PI / 2 + 0.16, len: h * 0.52, width: 8,
    maxDepth: 9, branchiness: 0.85, minLen: h * 0.009, richBase: true,
  });
  const mainLeaves = leavesOf(main);
  const mainVerified = markVerified(main, mainLeaves, mulberry32(8), 22);
  const links = crossLinks(main, mainVerified.lit, mulberry32(9), 5, w * 0.16);

  lightBeam(ctx, w * 0.52, h * 1.04, -Math.PI / 2 + 0.16, h * 0.85, h * 0.13, "233,221,196");
  sourceGlow(ctx, w * 0.52, h * 1.04, h * 0.5, "rgba(243,230,200,0.68)", 0.78);
  drawDormant(ctx, main, "rgba(120,116,100,0.11)");
  drawLit(ctx, main, mainVerified.lit, 9, "#1c6f49", "#eafff2", "#caa25f");
  drawCrossLinks(ctx, main, links, "#7fe0ac");
  drawJunctionLights(ctx, main, mainVerified.lit, mainVerified.chosenLeaves, "#eafff2");
  drawTerminals(ctx, main, mainVerified.chosenLeaves, "#eafff2");

  grain(ctx, w, h, mulberry32(3), 1400);

  // gentle edge darkening (cinematic frame, still charcoal not black)
  const edge = ctx.createRadialGradient(w * 0.5, h * 0.5, h * 0.35, w * 0.5, h * 0.5, h * 0.95);
  edge.addColorStop(0, "rgba(0,0,0,0)");
  edge.addColorStop(1, "rgba(9,8,7,0.4)");
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, w, h);
}

export function HeroArt({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    renderHero(canvas);

    let timer: number | undefined;
    function onResize() {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => canvas && renderHero(canvas), 200);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn("block h-full w-full", className)} aria-hidden />;
}
