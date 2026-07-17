import { ArrowRight } from "lucide-react";
import { HeroArt } from "./HeroArt";
import { Button } from "./ui/Button";

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * The approved hero. Artwork and copy are locked — content is centered in
 * the frame per direction; the brand mark lives in the Navbar, not here.
 */
export function Hero() {
  return (
    <section id="hero" className="relative min-h-svh w-full overflow-hidden bg-background">
      <HeroArt className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-[6vw] text-center">
        <p className="mb-3.5 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
          BrokerMindAI
        </p>
        <h1
          className="mb-2.5 max-w-2xl font-display italic text-foreground"
          style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", lineHeight: 1.12, letterSpacing: "-0.01em" }}
        >
          Certainty has a shape.
        </h1>
        <p className="max-w-[34ch] font-mono text-[0.72rem] leading-[1.65] text-muted-foreground">
          Every relationship illuminates only once it's verified — the rest stays quietly unproven.
        </p>

        <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button size="sm" icon={<ArrowRight className="h-3.5 w-3.5" />} onClick={() => scrollToSection("waitlist")}>
            Join the waitlist
          </Button>
          <Button size="sm" variant="ghost" onClick={() => scrollToSection("workflow")}>
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
}
