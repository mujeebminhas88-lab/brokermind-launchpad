import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { joinWaitlist, validateEmail } from "@/services/waitlist";

export default function LandingPageRedesign() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      toast.success("Operational clearance initialized. Queue position secured.");
    } catch (err) {
      toast.error("Allocation protocol interrupted. Please re-attempt submission.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-background text-foreground relative min-h-screen flex flex-col justify-between selection:bg-[oklch(0.62_0.15_48/0.3)] selection:text-white">
      <Toaster position="top-center" theme="dark" />

      {/* 01. THE VAULT HERO */}
      <section id="hero" className="relative flex-1 flex items-center justify-center px-6 py-24 overflow-hidden">
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
                      Your institutional matrix registration has been verified. Awaiting localized decryption parameters.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 06. FOOTER */}
      <footer className="border-t border-white/5 bg-[oklch(0.09_0.012_165)] px-6 py-12 text-left w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-4">
            <span className="text-sm tracking-widest font-normal uppercase text-white">BrokerMind</span>
            <p className="text-xs text-[oklch(0.60_0.012_165)] max-w-sm font-light leading-relaxed">
              Autonomous system frameworks specialized for modern mortgage analytics and secure transaction underwriting routes.
            </p>
          </div>
          <div className="md:col-span-6 flex flex-col md:items-end justify-end space-y-2 text-xs font-mono text-[oklch(0.60_0.012_165)] opacity-40">
            <span>Contact // system@brokermindapp.com</span>
            <span>All System Logs Maintained © 2026 BrokerMind</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
