import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  FileSearch,
  ShieldCheck,
  Brain,
  Gauge,
  ArrowRight,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { joinWaitlist, validateEmail } from "@/services/waitlist";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  { q: "What exactly is BrokerMind?", a: "BrokerMind is an advanced operational decision engine built specifically for modern mortgage brokerages, private lenders, and elite lending teams. It automates heavy document auditing, risk assessment loops, and workflow routing tasks seamlessly." },
  { q: "How does the waitlist allocation sequence operate?", a: "Early applicants are assigned a sequential queue placement node. As we scale server computational architecture, clearances are systematically granted based on your queue position and volume needs." },
  { q: "Is our client underwriting data kept secure?", a: "Absolutely. BrokerMind operates under a zero-trust architecture. All ingestion frameworks use TLS 1.3 encryption, and data points are completely isolated to maintain enterprise institutional compliance standards." },
  { q: "What will enterprise pricing look like post-launch?", a: "While we are currently in private allocation, early waitlist applicants receive grandfathered access rates and priority feature sets before public pricing tiers activate." }
];

const BENTO_FEATURES = [
  { icon: Brain, title: "Autonomous Underwriting", desc: "Engine models process complex applications and extract true risk parameters instantly." },
  { icon: FileSearch, title: "Deep Audit Ledger", desc: "Instantly parse bank records, corporate registries, and tax strings with zero structural friction." },
  { icon: Gauge, title: "Stream Velocity Analytics", desc: "Monitor deal velocity vectors, approval probability, and team operational bandwidth via a single system map." },
  { icon: ShieldCheck, title: "Institutional Compliance", desc: "Continuous policy checking that flags standard variance margins and private lending anomalies automatically." }
];

export const Route = createFileRoute("/")({
  component: LandingPageRedesign
});

export default function LandingPageRedesign() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid entry sequence. Provide a functional institutional email address.");
      return;
    }

    setIsPending(true);
    try {
      await joinWaitlist({ email });
      setIsSubmitted(true);
      confetti({ particleCount: 80, spread: 60, colors: ["#C87A53", "#A37E58", "#0B1A12"] });
      toast.success("Operational clearance initialized. Queue position secured.");
    } catch (err) {
      toast.error("Allocation protocol interrupted. Please re-attempt submission.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-background text-foreground relative min-h-screen selection:bg-[oklch(0.62_0.15_48/0.3)] selection:text-white">
      <Toaster position="top-center" theme="dark" />

      {/* DYNAMIC FLOATING MINI-DOCK */}
      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isNavVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95 pointer-events-none"
      }`}>
        <div className="glass-card px-5 py-3 flex items-center gap-6 shadow-2xl backdrop-blur-3xl rounded-full border border-white/5">
          <button type="button" onClick={() => scrollToSection("hero")} className="text-[10px] font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">System</button>
          <button type="button" onClick={() => scrollToSection("features")} className="text-[10px] font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Index</button>
          <button type="button" onClick={() => scrollToSection("how-it-works")} className="text-[10px] font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Steps</button>
          <button type="button" onClick={() => scrollToSection("pricing")} className="text-[10px] font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Rates</button>
          <button type="button" onClick={() => scrollToSection("faq")} className="text-[10px] font-mono tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">Archive</button>
          <div className="h-3 w-[1px] bg-white/10" />
          <button 
            type="button"
            onClick={() => scrollToSection("hero")}
            className="bg-[oklch(0.62_0.15_48)] hover:bg-[oklch(0.55_0.14_48)] text-[oklch(0.11_0.015_165)] font-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full transition-all active:scale-95 shadow-[0_0_15px_rgba(200,122,83,0.3)]"
          >
            Access
          </button>
        </div>
      </nav>

      {/* 01. THE VAULT HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-12 pb-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.15_48)] animate-pulse" />
              <span className="text-[9px] uppercase font-mono tracking-widest opacity-60 text-gradient-brand">System Deployment Frame V1.0</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.15] text-white tracking-tight">
              The Elite Operational Engine For Modern Brokerages.
            </h1>
            <p className="text-base text-[oklch(0.60_0.012_165)] max-w-xl font-light leading-relaxed">
              Institutional risk isolation, dynamic metric streams, and automated processing blueprints built strictly for private operations. Secure your priority sequence code.
            </p>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="glass-card w-full max-w-md p-8 bg-[oklch(0.15_0.020_165/0.3)] rounded-2xl relative border border-white/5 shadow-2xl">
              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col space-y-6">
                  <div>
                    <h3 className="text-lg font-normal text-white mb-1">Request Operational Clearance</h3>
                    <p className="text-xs text-[oklch(0.60_0.012_165)] font-light">Enter credentials to join the allocation waitlist.</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      required
                      placeholder="institutional@firm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                      className="w-full bg-[oklch(0.07_0.012_165)] text-white border border-white/10 focus:border-[oklch(0.62_0.15_48)] rounded-lg px-4 py-3.5 text-sm font-mono transition-all outline-none"
                    />
                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full bg-[oklch(0.62_0.15_48)] hover:bg-[oklch(0.55_0.14_48)] text-[oklch(0.11_0.015_165)] font-bold text-xs tracking-widest uppercase py-4 rounded-lg transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2"
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initialize Sequence"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-[9px] font-mono opacity-30 border-t border-white/5">
                    <span>SECURITY FRAME // TLS 1.3</span>
                    <span>QUEUE PROTOCOL: READY</span>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[oklch(0.62_0.15_48)] flex items-center justify-center text-[oklch(0.62_0.15_48)] text-lg font-mono bg-[oklch(0.62_0.15_48/0.05)]">✓</div>
                  <div>
                    <h3 className="text-lg font-normal text-white">Sequence Synchronized</h3>
                    <p className="text-xs text-[oklch(0.60_0.012_165)] mt-1 max-w-xs mx-auto font-light leading-relaxed">
