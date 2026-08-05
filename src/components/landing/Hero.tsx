import { ArrowRight, Lock } from "lucide-react";
import { HeroArt } from "./HeroArt";
import { Button } from "./ui/Button";
import heroWorkspaceWebp from "@/assets/screenshots/hero-workspace.webp";
import heroWorkspaceJpg from "@/assets/screenshots/hero-workspace.jpg";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Hero artwork and its animated-network background are locked (see
 * HeroArt) — only the copy, sizing, and CTAs here reflect the current
 * enterprise-software direction. The workspace screenshot below the CTAs
 * is intentionally allowed to overlap the tree canvas — it grows the
 * section past one viewport, which is expected here.
 */
export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-background pb-24 pt-36 md:pt-44">
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

        <div className="mt-16 w-full max-w-4xl md:mt-20" style={{ perspective: "2400px" }}>
          <div
            className="overflow-hidden rounded-2xl border border-accent/15 bg-card shadow-[0_0_0_1px_rgba(46,204,129,0.1),0_50px_120px_-30px_rgba(46,204,129,0.4),0_30px_70px_-20px_rgba(0,0,0,0.65)]"
            style={{ transform: "rotateX(2.5deg)" }}
          >
            <div className="flex items-center gap-1.5 bg-[#1b1c17] px-4 py-3" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#e3746b]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e3c257]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#5fb886]/70" />
              <span className="mx-auto flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-neutral-400">
                app.brokermindapp.com
                <Lock className="h-2.5 w-2.5" />
              </span>
            </div>
            <picture>
              <source srcSet={heroWorkspaceWebp} type="image/webp" />
              <img
                src={heroWorkspaceJpg}
                alt="BrokerMind AI underwriting workspace showing loan ratios, application stats, and the document registry for an active file"
                width={1400}
                height={957}
                loading="eager"
                decoding="async"
                className="block w-full"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
