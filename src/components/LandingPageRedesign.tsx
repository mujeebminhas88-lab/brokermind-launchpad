import { useEffect, useState } from "react";
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

import logoUrl from "@/assets/brokermind-logo.png";

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
    <div className="bg-neutral-950 text-neutral-100 relative min-h-screen selection:bg-orange-500/30 selection:text-white pb-12">
      <Toaster position="top-center" theme="dark" />

      {/* HEADER NAV SYSTEM */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between ${
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <img src={logoUrl} alt="BrokerMind Logo" className="h-7 w-auto object-contain" />
          <span className="font-medium text-sm text-white tracking-tight">BrokerMind</span>
        </div>

        <div className="hidden md:flex items-center gap-6 px-5 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 backdrop-blur-md">
          <button type="button" onClick={() => scrollToSection("features")} className="text-xs text-neutral-400 hover:text-white transition-colors">Features</button>
          <button type="button" onClick={() => scrollToSection("how-it-works")} className="text-xs text-neutral-400 hover:text-white transition-colors">How it Works</button>
          <button type="button" onClick={() => scrollToSection("pricing")} className="text-xs text-neutral-400 hover:text-white transition-colors">Pricing</button>
          <button type="button" onClick={() => scrollToSection("faq")} className="text-xs text-neutral-400 hover:text-white transition-colors">FAQ</button>
        </div>

        <div>
          <button 
            type="button"
            onClick={() => scrollToSection("hero")}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all active:scale-95"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* 01. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Private Beta Access</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] text-white tracking-tight">
              Underwrite Smarter. Close Deals Faster.
            </h1>
            <p className="text-base text-neutral-400 max-w-xl font-light leading-relaxed">
              AI decision intelligence built explicitly for mortgage brokers, private lenders, and forward-thinking lending teams. Streamline compliance, reduce risk, and save hundreds of operational hours.
            </p>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-md p-8 bg-neutral-900/40 rounded-2xl relative border border-neutral-800 shadow-2xl text-left backdrop-blur-md">
              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Secure Early Access</h3>
                    <p className="text-xs text-neutral-400 font-light">Join the priority queue for our next batch release.</p>
                  </div>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your professional email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                      className="w-full bg-neutral-950 text-white border border-neutral-800 focus:border-orange-500 rounded-lg px-4 py-3.5 text-sm transition-all outline-none"
                    />
                    <button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs tracking-wider uppercase py-4 rounded-lg transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2"
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join the Waitlist"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 text-lg font-mono bg-orange-500/5">✓</div>
                  <div>
                    <h3 className="text-lg font-medium text-white">You're on the list!</h3>
                    <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto font-light leading-relaxed">
                      Thank you for your interest. We will reach out as soon as your access spot is cleared.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 02. FEATURES SECTIONS */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="mb-12 text-left">
          <p className="text-xs font-mono tracking-widest uppercase text-orange-500 mb-2">Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white">Platform Core Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-neutral-900/20 border border-neutral-800 rounded-xl text-left">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-orange-500 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-base font-medium text-white mb-2">AI Underwriting</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">Automate complex risk calculations and parse applicant data files instantly.</p>
          </div>

          <div className="p-6 bg-neutral-900/20 border border-neutral-800 rounded-xl text-left">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-orange-500 mb-4">
              <FileSearch className="w-5 h-5" />
            </div>
            <h4 className="text-base font-medium text-white mb-2">Automated Document Audits</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">Instantly screen bank records, corporate filings, and tax transcripts for discrepancies.</p>
          </div>

          <div className="p-6 bg-neutral-900/20 border border-neutral-800 rounded-xl text-left">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-orange-500 mb-4">
              <Gauge className="w-5 h-5" />
            </div>
            <h4 className="text-base font-medium text-white mb-2">Deal Velocity Tracking</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">Monitor deal progress vectors and workflow bottlenecks across your underwriting team from one central view.</p>
          </div>

          <div className="p-6 bg-neutral-900/20 border border-neutral-800 rounded-xl text-left">
