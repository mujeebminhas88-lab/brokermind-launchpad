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

const styles = {
  bgMain: { backgroundColor: "#0a0a0a" },
  bgCard: { backgroundColor: "#171717", border: "1px solid #262626" },
  bgCardGlass: { backgroundColor: "rgba(23, 23, 23, 0.4)", border: "1px solid #262626" },
  bgInput: { backgroundColor: "#050505", border: "1px solid #262626" },
  brandColor: { color: "#ea580c" },
  brandBg: { backgroundColor: "#ea580c" },
  iconBox: { backgroundColor: "#262626", border: "1px solid #404040" },
  pricingTag: { backgroundColor: "rgba(234, 88, 12, 0.1)", borderBottom: "1px solid rgba(234, 88, 12, 0.2)", borderLeft: "1px solid rgba(234, 88, 12, 0.2)" }
};

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
    <div style={styles.bgMain} className="text-neutral-100 relative min-h-screen pb-12">
      <Toaster position="top-center" theme="dark" />

      {/* HEADER NAV SYSTEM */}
      <header 
        style={{ backgroundColor: "rgba(10, 10, 10, 0.8)", borderBottom: "1px solid #262626" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md px-6 py-4 flex items-center justify-between ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <img src={logoUrl} alt="BrokerMind Logo" className="h-7 w-auto object-contain" />
          <span className="font-medium text-sm text-white tracking-tight">BrokerMind</span>
        </div>

        <div style={styles.bgCard} className="hidden md:flex items-center gap-6 px-5 py-2 rounded-full backdrop-blur-md">
          <button type="button" onClick={() => scrollToSection("features")} className="text-xs text-neutral-400 hover:text-white transition-colors">Features</button>
          <button type="button" onClick={() => scrollToSection("how-it-works")} className="text-xs text-neutral-400 hover:text-white transition-colors">How it Works</button>
          <button type="button" onClick={() => scrollToSection("pricing")} className="text-xs text-neutral-400 hover:text-white transition-colors">Pricing</button>
          <button type="button" onClick={() => scrollToSection("faq")} className="text-xs text-neutral-400 hover:text-white transition-colors">FAQ</button>
        </div>

        <div>
          <button 
            type="button"
            style={styles.brandBg}
            onClick={() => scrollToSection("hero")}
            className="hover:opacity-90 text-white font-medium text-xs tracking-wider uppercase px-4 py-2 rounded-full transition-all active:scale-95"
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* 01. HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <div style={styles.bgCard} className="inline-flex items-center gap-2 px-3 py-1 rounded-full w-fit">
              <span style={styles.brandBg} className="w-1.5 h-1.5 rounded-full animate-pulse" />
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
            <div style={{ backgroundColor: "rgba(23, 23, 23, 0.6)", border: "1px solid #262626" }} className="w-full max-w-md p-8 rounded-2xl relative shadow-2xl text-left backdrop-blur-md">
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
                      style={styles.bgInput}
                      className="w-full text-white rounded-lg px-4 py-3.5 text-sm transition-all outline-none"
                    />
                    <button 
                      type="submit" 
                      disabled={isPending}
                      style={styles.brandBg}
                      className="w-full hover:opacity-90 text-white font-bold text-xs tracking-wider uppercase py-4 rounded-lg transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2"
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Join the Waitlist"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
                  <div style={{ borderColor: "#ea580c" }} className="w-12 h-12 rounded-full border flex items-center justify-center text-orange-500 text-lg font-mono">✓</div>
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
          <p style={styles.brandColor} className="text-xs font-mono tracking-widest uppercase mb-2">Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-medium text-white">Platform Core Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div style={styles.bgCardGlass} className="p-6 rounded-xl text-left">
            <div style={styles.iconBox} className="w-10 h-10 rounded-lg flex items-center justify-center text-orange-500 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-base font-medium text-white mb-2">AI Underwriting</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">Automate complex risk calculations and parse applicant data files instantly.</p>
          </div>

          <div style={styles.bgCardGlass} className="p-6 rounded-xl text-left">
            <div style={styles.iconBox} className="w-10 h-10 rounded-lg flex items-center justify-center text-orange-500 mb-4">
              <FileSearch className="w-5 h-5" />
            </div>
            <h4 className="text-base font-medium text-white mb-2">Automated Document Audits</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">Instantly screen bank records, corporate filings, and tax transcripts for discrepancies.</p>
          </div>

          <div style={styles.bgCardGlass} className="p-6 rounded-xl text-left">
