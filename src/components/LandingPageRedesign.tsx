import { useEffect, useState } from "react";
import {
  FileSearch,
  ShieldCheck,
  Brain,
  Gauge,
  ArrowRight,
  Loader2,
  Menu,
  X
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

// Pulling your logo from your project assets folder securely
import logoUrl from "@/assets/brokermind-logo.png";

const FAQS = [
  { q: "What is BrokerMind?", a: "BrokerMind is an AI-powered underwriting and decision intelligence platform built for modern mortgage brokers, private lenders, and credit unions to help analyze documents and close deals faster." },
  { q: "How long is the waitlist?", a: "We are currently rolling out private beta access in sequential batches to ensure high platform stability. Joining now secures your priority place in line." },
  { q: "Is our borrower data secure?", a: "Yes. BrokerMind uses enterprise-grade encryption (TLS 1.3) and fully isolated database environments to ensure compliance with institutional data standards." }
];

const FEATURES = [
  { icon: Brain, title: "AI Underwriting", desc: "Automate complex risk calculations and parse applicant data files instantly." },
  { icon: FileSearch, title: "Automated Document Audits", desc: "Instantly screen bank records, corporate filings, and tax transcripts for discrepancies." },
  { icon: Gauge, title: "Deal Velocity Tracking", desc: "Monitor deal progress vectors and workflow bottlenecks across your underwriting team from one central view." },
  { icon: ShieldCheck, title: "Smart Compliance Checks", desc: "Real-time policy auditing that flags loan variances and guidelines automatically." }
];

export default function LandingPageRedesign() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dynamic Navigation trigger: Hides cleanly on downward scroll, springs back on upward scroll
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
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsPending(true);
    try {
      await joinWaitlist({ email });
      setIsSubmitted(true);
      toast.success("Welcome to the waitlist! Your spot has been secured.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-background text-foreground relative min-h-screen selection:bg-[oklch(0.62_0.15_48/0.3)] selection:text-white pb-12">
      <Toaster position="top-center" theme="dark" />

      {/* ========================================================================= */}
      {/* FIXED BRANDING NAVBAR WITH INTEGRATED FLOATING DOCK                      */}
      {/* ========================================================================= */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 bg-background/80 backdrop-blur-md px-6 py-4 flex items-center justify-between ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        {/* Your Branding Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <img src={logoUrl} alt="BrokerMind Logo" className="h-7 w-auto object-contain" />
          <span className="font-medium text-sm text-white tracking-tight">BrokerMind</span>
        </div>

        {/* Dynamic Center Navigation Dock */}
        <div className="hidden md:flex items-center gap-6 px-4 py-2 glass-card rounded-full border border-white/10 bg-white/5">
          <button type="button" onClick={() => scrollToSection("features")} className="text-xs text-white/70 hover:text-white transition-colors">Features</button>
          <button type="button" onClick={() => scrollToSection("how-it-works")} className="text-xs text-white/70 hover:text-white transition-colors">How it Works</button>
          <button type="button" onClick={() => scrollToSection("pricing")} className="text-xs text-white/70 hover:text-white transition-colors">Pricing</button>
          <button type="button" onClick={() => scrollToSection("faq")} className="text-[11px] text-white/70 hover:text-white transition-colors">FAQ</button>
        </div>

        {/* Action Button */}
        <div>
          <button 
            type="button"
            onClick={() => scrollToSection("hero")}
            className="bg-[oklch(0.62_0.15_48)] hover:bg-[oklch(0.55_0.14_48)] text-background font-bold text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all active:scale-95 shadow-[0_0_15px_rgba(200,122,83,0.3)]"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 01. THE VAULT HERO                                                        */}
      {/* ========================================================================= */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.62_0.15_48)] animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest opacity-60 text-white">Private Beta Active</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] text-white tracking-tight">
              Underwrite Smarter.<br />Close Deals Faster.
            </h1>
            <p className="text-base text-[oklch(0.60_0.012_165)] max-w-xl font-light leading-relaxed">
              AI decision intelligence built explicitly for mortgage brokers, private lenders, and forward-thinking lending teams. Streamline compliance, reduce risk, and save hundreds of operational hours.
            </p>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="glass-card w-full max-w-md p-8 bg-[oklch(0.15_0.020_165/0.3)] rounded-2xl relative border border-white/5 shadow-2xl text-left">
              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Secure Early Access</h3>
                    <p className="text-xs text-[oklch(0.60_0.012_165)] font-light">Join the priority queue for our next batch release.</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your professional email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                      className="w-full bg-[oklch(0.07_0.012_165)] text-white border border-white/10 focus:border-[oklch(0.62_0.15_48)] rounded-lg px-4 py-3.5 text-sm transition-all outline-none"
                    />
                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full bg-[oklch(0.62_0.15_48)] hover:bg-[oklch(0.55_0.14_48)] text-background font-bold text-xs tracking-wider uppercase py-4 rounded-lg transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2"
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join the Waitlist"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-[oklch(0.62_0.15_48)] flex items-center justify-center text-[oklch(0.62_0.15_48)] text-lg font-mono bg-[oklch(0.62_0.15_48/0.05)]">✓</div>
                  <div>
                    <h3 className="text-lg font-medium text-white">You're on the list!</h3>
                    <p className="text-xs text-[oklch(0.60_0.012_165)] mt-1 max-w-xs mx-auto font-light leading-relaxed">
                      Thank you for your interest. We will reach out as soon as your access spot is cleared.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
