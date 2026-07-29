import { ArrowRight } from "lucide-react";
import { HeroArt } from "./HeroArt";
import { Button } from "./ui/Button";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Hero artwork and its animated-network background are locked (see
 * HeroArt) — only the copy, sizing, and CTAs here reflect the current
 * enterprise-software direction.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[88svh] w-full items-center overflow-hidden bg-background py-20 md:min-h-[80svh]"
    >
      <HeroArt className="absolute inset-0" />

      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center px-[6vw] text-center">
        <p className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
          BrokerMindAI
        </p>
        <h1
          className="max-w-2xl text-balance font-display font-semibold not-italic text-foreground"
          style={{ fontSize: "clamp(1.5rem, 2.9vw, 2.3rem)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
        >
          AI Underwriting Workspace for Canadian Mortgage Brokers
        </h1>
        <p
          className="mt-2 max-w-xl text-balance font-display italic text-foreground/90"
          style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", lineHeight: 1.25 }}
        >
          Certainty has a shape.
        </p>
        <p className="mt-5 max-w-[52ch] font-mono text-[0.8rem] leading-[1.7] text-muted-foreground">
          Verify documents, detect risks, apply OSFI B-20 rules, satisfy FINTRAC requirements, and
          recommend the best lender — all inside one underwriting workspace.
        </p>

        <div className="pointer-events-auto mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />} onClick={() => scrollToSection("waitlist")}>
            Join the Waitlist
          </Button>
          <Button size="sm" variant="ghost" onClick={() => scrollToSection("showcase")}>
            See the Workspace
          </Button>
        </div>
      </div>
    </section>
  );
}
