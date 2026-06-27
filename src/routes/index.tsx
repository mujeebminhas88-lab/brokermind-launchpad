import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import logoAsset from "@/assets/brokermind-logo.png.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BrokerMind AI — Underwriting Reimagined" },
      {
        name: "description",
        content:
          "Smarter underwriting with AI-powered insights. Faster decisions. Stronger outcomes. Join the BrokerMind AI waitlist.",
      },
      { property: "og:title", content: "BrokerMind AI — Underwriting Reimagined" },
      {
        property: "og:description",
        content:
          "Smarter underwriting with AI-powered insights. Faster decisions. Stronger outcomes.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <Toaster theme="dark" position="top-center" />
      <Header />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}

function Logo({ className = "h-32 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="BrokerMind AI"
      className={className + " select-none drop-shadow-[0_0_30px_rgba(0,188,212,0.25)]"}
      draggable={false}
    />
  );
}

function Header() {
  const nav = [
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
    { label: "Waitlist", href: "#waitlist" },
  ];
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center" aria-label="BrokerMind AI">
          <Logo className="h-20 sm:h-28 md:h-32 w-auto -my-4" />
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-foreground hover:bg-white/5"
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function AnimatedBackdrop() {
  // Neon financial visualization: nodes, lines, bars, $ glyphs
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft color blobs */}
      <div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #00BCD4 0%, transparent 65%)", animation: "drift 11s ease-in-out infinite" }}
      />
      <div
        className="absolute top-20 -right-20 h-[460px] w-[460px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, #E91E8C 0%, transparent 65%)", animation: "drift 13s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, #9C27B0 0%, transparent 65%)", animation: "drift 15s ease-in-out infinite" }}
      />

      {/* SVG network + bars + glyphs */}
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

        {/* Flowing line chart */}
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

        {/* Network nodes + edges */}
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

        {/* Bar chart cluster */}
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

        {/* Dollar glyphs */}
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

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />

      {/* Bottom fade for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F172A]/80" />
    </div>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!valid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You're on the waitlist. We'll be in touch.");
    }, 700);
  }

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="mx-auto mt-7 flex w-full max-w-xl flex-col gap-2 sm:flex-row"
    >
      <div className="relative flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Work email"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all duration-300 focus:border-[color:var(--brand-cyan)] focus:bg-white/[0.06] focus:ring-2 focus:ring-[color:var(--brand-cyan)]/30"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(233,30,140,0.55)] transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(0,188,212,0.6)] disabled:opacity-70"
        style={{ background: "var(--gradient-brand)" }}
      >
        {loading ? "Joining..." : "Join Waitlist"}
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <AnimatedBackdrop />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--brand-cyan)] shadow-[0_0_10px_var(--brand-cyan)]" />
          Coming soon — Private beta
        </span>
        <h1
          className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="block text-white">Underwriting</span>
          <span className="block text-gradient-brand">Reimagined</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/75 sm:text-lg">
          Smarter underwriting with AI-powered insights.{" "}
          <span className="text-foreground">Faster decisions. Stronger outcomes.</span>
        </p>
        <WaitlistForm />
        <p className="mt-3 text-xs text-muted-foreground">
          No spam. We'll only email you about the BrokerMind AI launch.
        </p>
      </div>
    </section>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" />
      <rect x="12" y="8" width="3" height="10" />
      <rect x="17" y="4" width="3" height="14" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M10 14a5 5 0 007.07 0l3-3a5 5 0 10-7.07-7.07l-1.5 1.5" />
      <path d="M14 10a5 5 0 00-7.07 0l-3 3a5 5 0 107.07 7.07l1.5-1.5" />
    </svg>
  );
}

function Features() {
  const items = [
    {
      icon: <BoltIcon />,
      title: "AI-Powered Analysis",
      desc: "Submission triage, risk scoring, and document extraction in seconds — not days.",
      tint: "from-[color:var(--brand-cyan)]/30 to-transparent",
      glow: "shadow-[0_0_40px_-10px_rgba(0,188,212,0.5)]",
      iconColor: "text-[color:var(--brand-cyan)]",
    },
    {
      icon: <ChartIcon />,
      title: "Real-Time Insights",
      desc: "Live portfolio analytics and pricing signals that surface the risks worth your time.",
      tint: "from-[color:var(--brand-purple)]/30 to-transparent",
      glow: "shadow-[0_0_40px_-10px_rgba(156,39,176,0.5)]",
      iconColor: "text-[color:var(--brand-purple)]",
    },
    {
      icon: <LinkIcon />,
      title: "Seamless Integration",
      desc: "Plugs into your AMS, PAS, and broker workflows — no rip-and-replace required.",
      tint: "from-[color:var(--brand-magenta)]/30 to-transparent",
      glow: "shadow-[0_0_40px_-10px_rgba(233,30,140,0.5)]",
      iconColor: "text-[color:var(--brand-magenta)]",
    },
  ];
  return (
    <section id="features" className="relative py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-cyan)]">
            The Platform
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            What's <span className="text-gradient-brand">Coming</span>
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className={`glass-card group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${it.glow}`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${it.tint} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className={`relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${it.iconColor}`}>
                {it.icon}
              </div>
              <h3 className="relative mt-4 text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "When is BrokerMind AI launching?",
      a: "We're rolling out a private beta to design partners now, with general availability planned for late 2026. Join the waitlist for early access and pricing.",
    },
    {
      q: "How does BrokerMind AI improve underwriting?",
      a: "BrokerMind AI ingests submissions, extracts the data points underwriters care about, and surfaces risk indicators alongside benchmark pricing — cutting hours of manual review per file.",
    },
    {
      q: "Will it integrate with my existing systems?",
      a: "Yes. We offer native connectors for major AMS and policy administration platforms, plus a documented API for custom pipelines. No rip-and-replace required.",
    },
    {
      q: "How is my data protected?",
      a: "All data is encrypted in transit and at rest, isolated per tenant, and never used to train shared models. We're building toward SOC 2 Type II compliance ahead of GA.",
    },
    {
      q: "What's the pricing model?",
      a: "Per-seat with submission-based volume tiers. Waitlist members lock in launch pricing and receive a complimentary first quarter once they go live.",
    },
    {
      q: "Can I get a demo before launch?",
      a: "Absolutely. Qualified brokerages and carriers can request a guided walkthrough — join the waitlist and our team will reach out within two business days.",
    },
  ];
  return (
    <section id="faq" className="relative py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-magenta)]">
            Answers
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked <span className="text-gradient-brand">Questions</span>
          </h2>
        </div>
        <div className="mt-8 glass-card p-2 sm:p-3">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
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
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols: { title: string; links: string[] }[] = [
    { title: "Product", links: ["Features", "Waitlist", "Roadmap", "Changelog"] },
    { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "DPA"] },
    { title: "Connect", links: ["LinkedIn", "X / Twitter", "Email", "Newsletter"] },
  ];
  return (
    <footer className="mt-16 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          <div className="md:col-span-1">
            <Logo className="h-16 w-auto -ml-2" />
            <p className="mt-2 max-w-xs text-xs text-muted-foreground">
              Smarter underwriting. Stronger outcomes.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">{c.title}</h4>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground">
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
            © {new Date().getFullYear()} BrokerMind AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built for brokers and underwriters.</p>
        </div>
      </div>
    </footer>
  );
}
