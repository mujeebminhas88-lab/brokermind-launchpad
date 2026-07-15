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
    <div style={{ backgroundColor: "#0a0a0a", color: "#f5f5f5", minHeight: "100screen", paddingBottom: "3rem", position: "relative" }}>
      <Toaster position="top-center" theme="dark" />

      {/* HEADER NAV SYSTEM */}
      <header 
        style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50, transition: "all 0.3s", borderBottom: "1px solid #262626", backgroundColor: "rgba(10, 10, 10, 0.85)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "between", padding: "1rem 1.5rem" }}
        className={isNavVisible ? "translate-y-0" : "-translate-y-full"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }} onClick={() => scrollToSection("hero")}>
          <img src={logoUrl} alt="BrokerMind Logo" style={{ height: "1.75rem", width: "auto", objectFit: "contain" }} />
          <span style={{ fontWeight: 500, fontSize: "0.875rem", color: "#ffffff", letterSpacing: "-0.02em" }}>BrokerMind</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "0.5rem 1.25rem", borderRadius: "9999px", border: "1px solid #262626", backgroundColor: "#171717" }} className="hidden md:flex">
          <button type="button" onClick={() => scrollToSection("features")} style={{ fontSize: "0.75rem", color: "#a3a3a3", background: "none", border: "none", cursor: "pointer" }}>Features</button>
          <button type="button" onClick={() => scrollToSection("how-it-works")} style={{ fontSize: "0.75rem", color: "#a3a3a3", background: "none", border: "none", cursor: "pointer" }}>How it Works</button>
          <button type="button" onClick={() => scrollToSection("pricing")} style={{ fontSize: "0.75rem", color: "#a3a3a3", background: "none", border: "none", cursor: "pointer" }}>Pricing</button>
          <button type="button" onClick={() => scrollToSection("faq")} style={{ fontSize: "0.75rem", color: "#a3a3a3", background: "none", border: "none", cursor: "pointer" }}>FAQ</button>
        </div>

        <div>
          <button 
            type="button"
            style={{ backgroundColor: "#ea580c", color: "#ffffff", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.5rem 1rem", borderRadius: "9999px", border: "none", cursor: "pointer" }}
            onClick={() => scrollToSection("hero")}
          >
            Join Waitlist
          </button>
        </div>
      </header>

      {/* 01. HERO SECTION */}
      <section id="hero" style={{ minHeight: "100screen", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 1.5rem 4rem 1.5rem", position: "relative" }}>
        <div style={{ maxWidth: "80rem", width: "100%", display: "grid", gridTemplateColumns: "1fr", gap: "4rem", items: "center" }} className="lg:grid-cols-12">
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", textAlign: "left" }} className="lg:col-span-7">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0.75rem", borderRadius: "9999px", backgroundColor: "#171717", border: "1px solid #262626", width: "max-content" }}>
              <span style={{ width: "0.375rem", height: "0.375rem", borderRadius: "50%", backgroundColor: "#ea580c" }} />
              <span style={{ fontSize: "0.625rem", textTransform: "uppercase", fontFamily: "monospace", letterSpacing: "0.1em", color: "#a3a3a3" }}>Private Beta Access</span>
            </div>
            <h1 style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "-0.03em", margin: 0 }} className="text-4xl sm:text-5xl md:text-6xl leading-[1.15]">
              Underwrite Smarter. Close Deals Faster.
            </h1>
            <p style={{ fontSize: "1rem", color: "#a3a3a3", fontWeight: 300, leading: "1.625", margin: 0, maxWidth: "36rem" }}>
              AI decision intelligence built explicitly for mortgage brokers, private lenders, and forward-thinking lending teams. Streamline compliance, reduce risk, and save hundreds of operational hours.
            </p>
          </div>

          <div style={{ width: "100%", display: "flex", justifyContent: "center" }} className="lg:col-span-5 lg:justify-end">
            <div style={{ width: "100%", maxWidth: "28rem", padding: "2rem", backgroundColor: "rgba(23, 23, 23, 0.65)", border: "1px solid #262626", borderRadius: "1rem", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", textAlign: "left", backdropFilter: "blur(12px)" }}>
              {!isSubmitted ? (
                <form onSubmit={handleWaitlistSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 500, color: "#ffffff", margin: "0 0 0.25rem 0" }}>Secure Early Access</h3>
                    <p style={{ fontSize: "0.75rem", color: "#a3a3a3", fontWeight: 300, margin: 0 }}>Join the priority queue for our next batch release.</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your professional email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isPending}
                      style={{ w: "100%", backgroundColor: "#050505", color: "#ffffff", border: "1px solid #262626", borderRadius: "0.5rem", padding: "0.875rem 1rem", fontSize: "0.875rem", outline: "none" }}
                    />
                    <button 
                      type="submit" 
                      disabled={isPending}
                      style={{ width: "100%", backgroundColor: "#ea580c", color: "#ffffff", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase", padding: "1rem", borderRadius: "0.5rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                    >
                      {isPending ? <Loader2 style={{ width: "1rem", height: "1.75rem" }} className="animate-spin" /> : "Join the Waitlist"}
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ padding: "3rem 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid #ea580c", display: "flex", alignItems: "center", justifyContent: "center", color: "#ea580c", fontSize: "1.25rem" }}>✓</div>
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: 500, color: "#ffffff", margin: "0 0 0.25rem 0" }}>You're on the list!</h3>
                    <p style={{ fontSize: "0.75rem", color: "#a3a3a3", fontWeight: 300, margin: 0, maxWidth: "20rem", leading: "1.5" }}>
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
      <section id="features" style={{ padding: "4rem 1.5rem", maxWidth: "80rem", margin: "0 auto", scrollMarginTop: "5rem" }}>
        <div style={{ marginBottom: "3rem", textAlign: "left" }}>
          <p style={{ color: "#ea580c", fontSize: "0.75rem", fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.5rem 0" }}>Capabilities</p>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 500, color: "#ffffff", margin: 0 }}>Platform Core Features</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="md:grid-cols-2 lg:grid-cols-4">
          
