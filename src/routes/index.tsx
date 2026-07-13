import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import confetti from "canvas-confetti";
import {
  FileSearch,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Network,
  Sparkles,
  Upload,
  Brain,
  Gauge,
  Send,
  Lock,
  KeyRound,
  ScrollText,
  Cloud,
  BadgeCheck,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Quote,
} from "lucide-react";
import { toast } from "sonner";
import logoUrl from "@/assets/brokermind-logo.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";
import { joinWaitlist, readAttribution, validateEmail } from "@/services/waitlist";

export const Route = createFileRoute("/")({
  head: () => {
    const TITLE = "BrokerMindAI — Underwrite Smarter. Close Faster.";
    const DESCRIPTION =
      "AI decision intelligence for mortgage brokers, private lenders, B lenders, credit unions, and modern lending teams. Analyze borrower documents, assess risk, and close deals faster.";
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "/" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: "/" }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "BrokerMindAI",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Underwriting & Loan Origination Software",
            operatingSystem: "Web",
            description: DESCRIPTION,
            url: "/",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/PreOrder",
              description: "Private beta — join the waitlist for early access.",
            },
            audience: {
              "@type": "Audience",
              audienceType:
                "Mortgage brokers, private lenders, B lenders, credit unions, and lending teams",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: Index,
});

/* ---------------------------------------------------------------- helpers */

function Logo({ className = "h-32 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="BrokerMindAI"
      className={className + " select-none drop-shadow-[0_0_30px_rgba(0,188,212,0.25)]"}
      draggable={false}
      width={500}
      height={500}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

/* ---------------------------------------------------------------- page */

function Index() {
  return (
    <div className="min-h-dvh text-foreground antialiased">
      <Toaster theme="dark" position="top-center" />
      <Nav />
      <main id="main">
        <Hero />
        <SectionDivider />
        <Capabilities />
        <SectionDivider />
        <HowItWorks />
        <SectionDivider />
        <DashboardPreview />
        <SectionDivider />
        <Comparison />
        <SectionDivider />
        <Integrations />
        <SectionDivider />
        <Security />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- section divider */

function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="section-divider" />
    </div>
  );
}

/* ---------------------------------------------------------------- nav */

const NAV_LINKS = [
  { label: "Platform", href: "#capabilities" },
  { label: "How it works", href: "#how" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#capabilities");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    NAV_LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0F172A]/70 border-b border-white/5"
          : "backdrop-blur-0 bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#0F172A] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-[color:var(--brand-cyan)]"
      >
        Skip to content
      </a>
      <div className="mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 md:flex md:max-w-7xl md:justify-between">
        <a
          href="#top"
          className="flex min-w-0 items-center rounded-md focus-visible:outline-none"
          aria-label="BrokerMindAI — Home"
        >
          <Logo
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-12 sm:h-14 md:h-16" : "h-16 sm:h-24 md:h-32"
            } -my-2`}
          />
        </a>
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1"
        >
          {NAV_LINKS.map((n) => {
            const isActive = active === n.href;
            return (
              <a
                key={n.label}
                href={n.href}
                aria-current={isActive ? "true" : undefined}
                className="group relative rounded-full px-3 py-1.5 text-sm font-medium text-foreground/75 transition-colors duration-300 hover:text-foreground focus-visible:text-foreground"
              >
                {n.label}
                <span
                  className={`pointer-events-none absolute left-3 right-3 -bottom-0.5 h-px origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ background: "var(--gradient-brand)" }}
                />
              </a>
            );
          })}
        </nav>
        <a
          href="#waitlist"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-10px_rgba(233,30,140,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-8px_rgba(0,188,212,0.7)] active:translate-y-0 sm:px-4 sm:text-sm"
          style={{ background: "var(--gradient-brand)" }}
        >
          <span className="hidden sm:inline">Join Waitlist</span>
          <span className="sm:hidden">Join</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- hero */

function AnimatedBackdrop() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 40, damping: 20 });
  const py = useSpring(my, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        style={{ x: px, y: py }}
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
      >
        <div
          className="h-full w-full"
          style={{
            background: "radial-gradient(circle, #00BCD4 0%, transparent 65%)",
            animation: "drift 11s ease-in-out infinite",
          }}
        />
      </motion.div>
      <motion.div
        style={{ x: useTransform(px, (v) => -v), y: useTransform(py, (v) => -v) }}
        className="absolute top-20 -right-20 h-[460px] w-[460px] rounded-full blur-3xl opacity-40"
      >
        <div
          className="h-full w-full"
          style={{
            background: "radial-gradient(circle, #E91E8C 0%, transparent 65%)",
            animation: "drift 13s ease-in-out infinite reverse",
          }}
        />
      </motion.div>
      <div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, #9C27B0 0%, transparent 65%)",
          animation: "drift 15s ease-in-out infinite",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00BCD4" />
            <stop offset="100%" stopColor="#E91E8C" />
          </linearGradient>
          <linearGradient id="gradBar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#00BCD4" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="gradBarM" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#E91E8C" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#E91E8C" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M0,520 C150,460 250,560 380,500 C520,435 640,560 780,470 C920,380 1050,500 1200,420"
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="2"
          strokeDasharray="6 8"
          style={{ animation: "dash-flow 6s linear infinite" }}
          filter="url(#glow)"
        />
        <path
          d="M0,620 C160,580 280,660 420,610 C560,560 700,640 840,580 C980,520 1080,600 1200,560"
          fill="none"
          stroke="#00BCD4"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeDasharray="4 10"
          style={{ animation: "dash-flow 9s linear infinite" }}
        />

        {[
          [120, 220, 180, 290],
          [180, 290, 260, 230],
          [260, 230, 340, 310],
          [340, 310, 420, 260],
          [990, 180, 1060, 260],
          [1060, 260, 1130, 200],
          [990, 180, 1100, 140],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="url(#gradLine)"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        {[
          [120, 220, "#E91E8C"],
          [180, 290, "#00BCD4"],
          [260, 230, "#E91E8C"],
          [340, 310, "#9C27B0"],
          [420, 260, "#00BCD4"],
          [990, 180, "#00BCD4"],
          [1060, 260, "#E91E8C"],
          [1130, 200, "#9C27B0"],
          [1100, 140, "#00BCD4"],
        ].map(([cx, cy, fill], i) => (
          <circle
            key={i}
            cx={cx as number}
            cy={cy as number}
            r="4"
            fill={fill as string}
            filter="url(#glow)"
            style={{ animation: `pulse-glow ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}

        <g transform="translate(880, 540)" filter="url(#glow)">
          {[60, 100, 75, 130, 95, 150].map((h, i) => (
            <rect
              key={i}
              x={i * 22}
              y={-h}
              width="14"
              height={h}
              rx="2"
              fill={i % 2 ? "url(#gradBarM)" : "url(#gradBar)"}
              style={{ animation: `pulse-glow ${2.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </g>

        {[
          { x: 220, y: 130, s: 28, c: "#00BCD4", d: "7s" },
          { x: 560, y: 180, s: 22, c: "#E91E8C", d: "9s" },
          { x: 760, y: 110, s: 18, c: "#9C27B0", d: "11s" },
          { x: 460, y: 660, s: 24, c: "#00BCD4", d: "8s" },
          { x: 760, y: 700, s: 20, c: "#E91E8C", d: "10s" },
        ].map((g, i) => (
          <text
            key={i}
            x={g.x}
            y={g.y}
            fontSize={g.s}
            fontFamily="'Playfair Display', serif"
            fontWeight="600"
            fill={g.c}
            opacity="0.55"
            filter="url(#glow)"
            style={{ animation: `float-y ${g.d} ease-in-out ${i * 0.6}s infinite` }}
          >
            $
          </text>
        ))}
      </svg>

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F172A]/80" />
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      <AnimatedBackdrop />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--brand-cyan)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--brand-cyan)]" />
            </span>
            AI Decision Intelligence — Private Beta
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-5 text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="block text-white">Underwrite Smarter.</span>
            <span className="block text-gradient-brand">Close Faster.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg lg:mx-0"
          >
            The AI copilot for mortgage brokers, private lenders, B lenders, credit
            unions, and modern lending teams.{" "}
            <span className="text-foreground">Analyze. Verify. Recommend.</span>
          </motion.p>
          <motion.div variants={fadeUp}>
            <WaitlistForm />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-3 text-xs text-muted-foreground">
            No spam. Early access pricing for waitlist members.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="w-full"
        >
          <AIDecisionWidget />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- AI widget */

const WIDGET_CHECKS = [
  "Income Verified",
  "Employment Confirmed",
  "Bank Statements Parsed",
  "Property Value Estimated",
  "Fraud Risk: Low",
  "LTV: 74%",
  "Debt Service Ratio: Healthy",
];

function AIDecisionWidget() {
  const [idx, setIdx] = useState(0);
  const [confidence, setConfidence] = useState(96.4);

  useEffect(() => {
    const a = setInterval(() => setIdx((i) => (i + 1) % (WIDGET_CHECKS.length + 1)), 1100);
    const b = setInterval(() => {
      setConfidence(() => 96 + Math.random() * 3.4);
    }, 2200);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  return (
    <div
      className="glass-card relative mx-auto w-full max-w-md p-5 sm:p-6"
      style={{
        boxShadow:
          "0 30px 80px -30px rgba(0,188,212,0.35), 0 30px 80px -40px rgba(233,30,140,0.35)",
      }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#00BCD4]/30 via-transparent to-[#E91E8C]/30 opacity-50 blur-sm" aria-hidden />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
              <Brain className="h-4 w-4 text-[color:var(--brand-cyan)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Decision Engine</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Live · File #BM-48217
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--brand-cyan)]/10 px-2 py-1 text-[10px] font-medium text-[color:var(--brand-cyan)]">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing
          </span>
        </div>

        <ul className="mt-5 space-y-2.5">
          {WIDGET_CHECKS.map((c, i) => {
            const done = i < idx;
            return (
              <li
                key={c}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <motion.span
                    initial={false}
                    animate={{
                      backgroundColor: done ? "rgba(0,188,212,0.18)" : "rgba(255,255,255,0.04)",
                      borderColor: done ? "rgba(0,188,212,0.5)" : "rgba(255,255,255,0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border"
                  >
                    <AnimatePresence>
                      {done && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-cyan)]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.span>
                  <span
                    className={
                      done ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {c}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Recommended Product
          </p>
          <p className="mt-1 text-base font-semibold text-foreground">
            Alternative Prime Fixed
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Confidence Score
              </p>
              <p
                className="text-3xl font-semibold tabular-nums text-gradient-brand"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {confidence.toFixed(1)}%
              </p>
            </div>
            <div className="h-12 w-24">
              <Sparkline />
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--gradient-brand)" }}
              animate={{ width: `${confidence}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const y = 18 + Math.sin(i / 2) * 8 + Math.random() * 4;
      return `${(i / 23) * 96},${y}`;
    }).join(" ");
  }, []);
  return (
    <svg viewBox="0 0 96 48" className="h-full w-full">
      <defs>
        <linearGradient id="sparkfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00BCD4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="#00BCD4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon points={`0,48 ${points} 96,48`} fill="url(#sparkfill)" />
    </svg>
  );
}

/* ---------------------------------------------------------------- waitlist */

const LOADING_STAGES = [
  "Analyzing request...",
  "Reserving beta access...",
  "Creating your profile...",
  "Preparing early access...",
];

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState(0);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    if (state !== "loading") return;
    const t = setInterval(() => setStage((s) => (s + 1) % LOADING_STAGES.length), 700);
    return () => clearInterval(t);
  }, [state]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    const err = validateEmail(email);
    if (err) {
      toast.error(err);
      return;
    }
    setState("loading");
    setStage(0);
    const minDelay = new Promise((r) => setTimeout(r, 1800));
    const result = await joinWaitlist({ email, ...readAttribution() });
    await minDelay;
    if (!result.ok) {
      setState("idle");
      toast.error(result.error);
      return;
    }
    setState("done");
    setEmail("");
    if (result.alreadyJoined) {
      toast.success("You're already on the list — we'll be in touch.");
    } else {
      confetti({
        particleCount: 70,
        spread: 70,
        startVelocity: 35,
        ticks: 180,
        origin: { y: 0.3 },
        colors: ["#00BCD4", "#E91E8C", "#9C27B0", "#ffffff"],
        disableForReducedMotion: true,
      });
    }
  }

  return (
    <div id="waitlist" className="mx-auto mt-7 w-full max-w-xl lg:mx-0" aria-live="polite">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card flex items-start gap-3 p-5"
            role="status"
          >
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-cyan)]/15 text-[color:var(--brand-cyan)]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">You're on the waitlist.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll contact you as soon as private beta invitations begin.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="flex w-full flex-col gap-2 sm:flex-row"
            noValidate
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Work email
            </label>
            <div className="relative flex-1">
              <input
                id="waitlist-email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                disabled={state === "loading"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Work email"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-300 focus:border-[color:var(--brand-cyan)] focus:bg-white/[0.06] focus:ring-2 focus:ring-[color:var(--brand-cyan)]/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={state === "loading"}
              aria-busy={state === "loading"}
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(233,30,140,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_-8px_rgba(0,188,212,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-cyan)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-90 sm:min-w-[184px]"
              style={{ background: "var(--gradient-brand)" }}
            >
              {state === "loading" ? (
                <span className="flex items-center gap-2" aria-live="polite">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={stage}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                    >
                      {LOADING_STAGES[stage]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------- shared section header */

function SectionHead({
  eyebrow,
  title,
  accent,
  desc,
  color = "cyan",
}: {
  eyebrow: string;
  title: string;
  accent: string;
  desc?: string;
  color?: "cyan" | "magenta" | "purple";
}) {
  const c =
    color === "magenta"
      ? "text-[color:var(--brand-magenta)]"
      : color === "purple"
      ? "text-[color:var(--brand-purple)]"
      : "text-[color:var(--brand-cyan)]";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${c}`}>{eyebrow}</p>
      <h2
        className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title} <span className="text-gradient-brand">{accent}</span>
      </h2>
      {desc && (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {desc}
        </p>
      )}
    </motion.div>
  );
}

/* ---------------------------------------------------------------- capabilities */

const CAPABILITIES = [
  {
    icon: FileSearch,
    title: "Document Intelligence",
    desc: "Automatically extracts structured data from uploaded financial documents.",
    color: "#00BCD4",
  },
  {
    icon: BadgeCheck,
    title: "Income Verification",
    desc: "Quickly validates borrower income across multiple document types.",
    color: "#9C27B0",
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    desc: "Highlights potential concerns before submission.",
    color: "#E91E8C",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection",
    desc: "Identifies anomalies and inconsistencies in supporting documents.",
    color: "#00BCD4",
  },
  {
    icon: Network,
    title: "Lender Matching",
    desc: "Suggests suitable lending options based on borrower profile.",
    color: "#9C27B0",
  },
  {
    icon: Send,
    title: "Submission Assistant",
    desc: "Helps prepare complete and professional lender submissions.",
    color: "#E91E8C",
  },
];

function Capabilities() {
  return (
    <section id="capabilities" className="relative section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="AI Capabilities"
          title="Decision intelligence for"
          accent="modern lending"
          desc="Every step of the underwriting workflow, accelerated by purpose-built AI for mortgage and private lending teams."
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CAPABILITIES.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass-card group relative overflow-hidden p-6 transition-all duration-300 hover:border-white/20"
            >
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: c.color }}
              />
              <div
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                style={{ color: c.color }}
              >
                <c.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <h3 className="relative mt-4 text-lg font-semibold text-foreground">{c.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {c.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- how it works */

const STEPS = [
  {
    icon: Upload,
    title: "Upload Borrower Documents",
    desc: "T1s, NOAs, pay stubs, bank statements, property docs — drag and drop or sync from your AMS.",
  },
  {
    icon: Brain,
    title: "AI Extracts & Organizes Data",
    desc: "Income, assets, liabilities, and credit signals are extracted into a structured borrower profile.",
  },
  {
    icon: Gauge,
    title: "Risk Analysis & Recommendations",
    desc: "Confidence scores, fraud alerts, LTV, DSCR, and ranked lender matches surface in seconds.",
  },
  {
    icon: Send,
    title: "Ready-to-Submit Lending File",
    desc: "Generate a clean, complete submission package — formatted for your lender of choice.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="relative section-y">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHead
          eyebrow="How it works"
          title="From submission to"
          accent="decision-ready"
          color="magenta"
          desc="Four steps. Minutes, not hours."
        />
        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, #00BCD4 20%, #9C27B0 50%, #E91E8C 80%, transparent 100%)",
              opacity: 0.4,
            }}
          />
          <div className="space-y-8 md:space-y-12">
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`grid items-center gap-4 md:grid-cols-[1fr_auto_1fr] ${
                    left ? "" : ""
                  }`}
                >
                  <div
                    className={`glass-card p-5 md:p-6 ${left ? "md:text-right md:col-start-1" : "md:col-start-3"}`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-cyan)]">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                  <div className="relative hidden md:flex md:col-start-2 md:justify-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0F172A]"
                      style={{ boxShadow: "0 0 30px -5px rgba(0,188,212,0.4)" }}
                    >
                      <s.icon className="h-5 w-5 text-[color:var(--brand-cyan)]" strokeWidth={1.6} />
                    </div>
                  </div>
                  {/* Mobile: icon accent renders beneath the card content. */}
                  <div className="md:hidden flex justify-center">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0F172A]"
                      style={{ boxShadow: "0 0 24px -6px rgba(0,188,212,0.35)" }}
                      aria-hidden="true"
                    >
                      <s.icon className="h-4 w-4 text-[color:var(--brand-cyan)]" strokeWidth={1.6} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- dashboard preview */

function CountValue({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const v = useCountUp(to, 1400, inView);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {v.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="relative section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Dashboard"
          title="One view. Every"
          accent="lending signal."
          color="purple"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <div className="glass-card relative overflow-hidden p-4 sm:p-6">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at top left, rgba(0,188,212,0.18), transparent 50%), radial-gradient(ellipse at bottom right, rgba(233,30,140,0.18), transparent 50%)",
              }}
            />
            <div className="relative">
              {/* mock chrome */}
              <div className="flex items-center gap-1.5 border-b border-white/5 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                  brokermind.ai / files / BM-48217
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {/* Borrower summary */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Borrower Summary
                  </p>
                  <h4 className="mt-2 text-lg font-semibold">M. Tremblay</h4>
                  <p className="text-xs text-muted-foreground">Self-employed · ON</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    {[
                      ["Income", "$184,200"],
                      ["Assets", "$612,800"],
                      ["Liabilities", "$72,400"],
                      ["Credit", "742"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-medium text-foreground tabular-nums">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Metrics */}
                <div className="grid gap-4">
                  <Metric label="Loan Amount" value={680000} prefix="$" />
                  <Metric label="Property Value" value={920000} prefix="$" />
                  <div className="grid grid-cols-2 gap-4">
                    <Metric label="LTV" value={73.9} suffix="%" decimals={1} bar />
                    <Metric label="DSCR" value={1.32} decimals={2} bar barMax={2} />
                  </div>
                </div>

                {/* Decision panel */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Risk & Decision
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand-cyan)]/10 px-2 py-0.5 text-[10px] font-medium text-[color:var(--brand-cyan)]">
                      Low risk
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-3">
                    <div
                      className="text-4xl font-semibold text-gradient-brand"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      <CountValue to={97.8} decimals={1} suffix="%" />
                    </div>
                    <div className="pb-1 text-xs text-muted-foreground">approval probability</div>
                  </div>
                  <div className="mt-4 space-y-2 text-xs">
                    {[
                      ["Document Status", "12 / 12 complete"],
                      ["Fraud Signals", "None detected"],
                      ["Recommended Lender", "Alterna Prime"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-muted-foreground">{k}</span>
                        <span className="font-medium text-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <MiniBars />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  bar,
  barMax = 100,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  bar?: boolean;
  barMax?: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-foreground">
        <CountValue to={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
      {bar && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.min(100, (value / barMax) * 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "var(--gradient-brand)" }}
          />
        </div>
      )}
    </div>
  );
}

function MiniBars() {
  const heights = [40, 65, 52, 80, 70, 90, 60];
  return (
    <div className="flex h-16 items-end gap-1.5">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
          className="flex-1 rounded-sm"
          style={{
            background:
              i % 2
                ? "linear-gradient(to top, rgba(233,30,140,0.2), rgba(233,30,140,0.9))"
                : "linear-gradient(to top, rgba(0,188,212,0.2), rgba(0,188,212,0.9))",
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- comparison */

function Comparison() {
  const traditional = [
    "Manual document review",
    "Hours per application",
    "Email chains",
    "PDF chaos",
    "Human error",
  ];
  const ours = [
    "AI-assisted analysis",
    "Minutes per application",
    "Centralized workflow",
    "Risk alerts",
    "Smart recommendations",
  ];
  return (
    <section className="relative section-y">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Why BrokerMindAI"
          title="The new standard for"
          accent="lending decisions"
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Traditional Process
            </p>
            <h3 className="mt-1 text-xl font-semibold text-foreground/80 line-through decoration-white/20">
              The old way
            </h3>
            <ul className="mt-5 space-y-3">
              {traditional.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                    <span className="h-1 w-2.5 bg-white/30" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card relative overflow-hidden p-6"
            style={{ boxShadow: "0 30px 80px -40px rgba(0,188,212,0.5)" }}
          >
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl opacity-40"
              style={{ background: "#00BCD4" }}
            />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-cyan)]">
              BrokerMindAI
            </p>
            <h3
              className="relative mt-1 text-xl font-semibold text-gradient-brand"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The new way
            </h3>
            <ul className="relative mt-5 space-y-3">
              {ours.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--brand-cyan)]/15">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--brand-cyan)]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- integrations */

const OUTCOMES = [
  {
    icon: Gauge,
    title: "Faster file reviews",
    body: "Turn hours of manual document review into minutes with AI-assisted underwriting.",
  },
  {
    icon: FileSearch,
    title: "Less manual work",
    body: "Automatically parse income, bank statements, and IDs so brokers focus on client decisions, not data entry.",
  },
  {
    icon: ShieldCheck,
    title: "Consistent compliance",
    body: "Every file checked against policy and disclosure requirements — with a full audit trail.",
  },
  {
    icon: AlertTriangle,
    title: "Earlier risk signals",
    body: "Surface fraud indicators, income anomalies, and DSR pressure before a file goes to a lender.",
  },
  {
    icon: Network,
    title: "Lender-aligned recommendations",
    body: "Match borrowers to lenders whose policies actually fit — not guesswork from a rate sheet.",
  },
  {
    icon: Sparkles,
    title: "A copilot that keeps up",
    body: "Ask questions about any file in plain language and get answers grounded in the borrower's documents.",
  },
];

function Integrations() {
  return (
    <section id="outcomes" className="relative section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Built for lending teams"
          title="What BrokerMindAI does for"
          accent="your desk"
          color="magenta"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {OUTCOMES.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="glass-card flex flex-col gap-3 p-5 transition-all duration-300 hover:border-white/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Icon className="h-5 w-5" style={{ color: "var(--brand-cyan)" }} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- security */

const SECURITY_ITEMS = [
  { icon: ShieldCheck, t: "Enterprise-grade Security", d: "Defense-in-depth controls across every layer." },
  { icon: Lock, t: "Encrypted Data", d: "AES-256 at rest, TLS 1.3 in transit. No exceptions." },
  { icon: KeyRound, t: "Role-Based Permissions", d: "Granular access for brokers, underwriters, and admins." },
  { icon: ScrollText, t: "Audit Logs", d: "Every action recorded. Every decision traceable." },
  { icon: Cloud, t: "Cloud Infrastructure", d: "Built on hardened, SOC 2-aligned cloud foundations." },
  { icon: BadgeCheck, t: "Compliance Ready", d: "SOC 2 Type II and PIPEDA-aligned roadmap." },
];

function Security() {
  return (
    <section id="security" className="relative section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Security"
          title="Built for the trust"
          accent="lending demands"
          color="cyan"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SECURITY_ITEMS.map((s) => (
            <motion.div
              key={s.t}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              className="glass-card flex items-start gap-4 p-5 transition-all duration-300 hover:border-white/20"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[color:var(--brand-cyan)]">
                <s.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground">{s.t}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- testimonials */

const TESTIMONIALS = [
  {
    name: "Placeholder Name",
    role: "Mortgage Broker",
    quote:
      "BrokerMindAI takes the busywork out of every file. I see the risk picture in minutes instead of an afternoon.",
  },
  {
    name: "Placeholder Name",
    role: "Private Lender",
    quote:
      "Confidence scores and fraud flags surface things my team would have spent days digging up.",
  },
  {
    name: "Placeholder Name",
    role: "Commercial Underwriter",
    quote:
      "Finally — a system that thinks like an underwriter, not just another document viewer.",
  },
];

function Testimonials() {
  return (
    <section className="relative section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Voices from the field"
          title="Designed with"
          accent="lending professionals"
          color="purple"
        />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid gap-4 md:grid-cols-3"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="glass-card relative p-6 transition-all duration-300 hover:border-white/20"
            >
              <Quote className="h-7 w-7 text-[color:var(--brand-cyan)]/40" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  {t.role.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- faq */

const FAQS = [
  {
    q: "Who is BrokerMindAI built for?",
    a: "Mortgage brokers, private lenders, B lenders, credit unions, commercial lenders, alternative finance companies, and modern lending teams who want AI-assisted decisioning across the underwriting workflow.",
  },
  {
    q: "When is BrokerMindAI launching?",
    a: "We're rolling out a private beta to design partners now, with broader access opening through 2026. Join the waitlist for early access and locked-in launch pricing.",
  },
  {
    q: "How does BrokerMindAI improve underwriting?",
    a: "It ingests borrower documents, extracts structured data, surfaces risk and fraud signals, computes LTV/DSCR, and ranks lender matches — cutting hours of manual review on every file.",
  },
  {
    q: "Will it integrate with my existing systems?",
    a: "Yes. Native connectors for major credit, document, and lender workflow platforms are on the roadmap, plus a documented API for custom pipelines. No rip-and-replace required.",
  },
  {
    q: "How is my data protected?",
    a: "All data is encrypted in transit and at rest, isolated per tenant, and never used to train shared models. We're building toward SOC 2 Type II compliance ahead of general availability.",
  },
  {
    q: "What's the pricing model?",
    a: "Per-seat with file-volume tiers. Waitlist members lock in launch pricing and receive a complimentary first quarter once they go live.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="relative section-y">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHead
          eyebrow="Answers"
          title="Frequently asked"
          accent="questions"
          color="magenta"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-10 glass-card p-2 sm:p-3"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5 last:border-0 px-3"
              >
                <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- final CTA */

function FinalCTA() {
  return (
    <section className="relative section-y">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="glass-card relative overflow-hidden p-10 text-center sm:p-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(0,188,212,0.18), transparent 55%), radial-gradient(ellipse at bottom, rgba(233,30,140,0.18), transparent 55%)",
            }}
          />
          <div className="relative">
            <h2
              className="text-3xl font-semibold tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="block text-white">Ready to underwrite</span>
              <span className="block text-gradient-brand">smarter?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
              Join the private beta and help shape the future of AI-powered lending.
            </p>
            <div className="mt-7 flex justify-center">
              <a
                href="#waitlist"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_rgba(233,30,140,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_54px_-8px_rgba(0,188,212,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-cyan)]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] active:translate-y-0"
                style={{ background: "var(--gradient-brand)" }}
              >
                Join the Waitlist
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- footer */

function Footer() {
  const cols: { title: string; links: string[] }[] = [
    { title: "Product", links: ["Capabilities", "Waitlist", "Roadmap", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
    { title: "Connect", links: ["LinkedIn", "X / Twitter", "Email", "Newsletter"] },
  ];
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo className="h-16 w-auto -ml-2" />
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">
              AI decision intelligence for modern lending.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
                {c.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-2 border-t border-white/5 pt-5 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BrokerMindAI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built for brokers, lenders, and underwriters.</p>
        </div>
      </div>
    </footer>
  );
}
