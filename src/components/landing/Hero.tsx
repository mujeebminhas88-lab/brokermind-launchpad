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
          BrokerMindAI · Underwriting Workspace
        </p>
        <h1
          className="mb-4 max-w-3xl text-balance font-display italic text-foreground"
          style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.14, letterSpacing: "-0.01em" }}
        >
          Canadian Mortgage Underwriting Software Built for Brokers &amp; Lenders
        </h1>
        <p className="max-w-[48ch] font-mono text-[0.8rem] leading-[1.7] text-muted-foreground">
          BrokerMind AI connects documents, verifies borrower information, applies Canadian
          underwriting rules, and recommends suitable lenders — all from one underwriting
          workspace.
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
