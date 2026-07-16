import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { InteractiveDemo } from "@/components/landing/InteractiveDemo";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { PricingCalculator } from "@/components/landing/PricingCalculator";
import { LiveConsole } from "@/components/landing/LiveConsole";
import { TrustSection } from "@/components/landing/TrustSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function LandingPageRedesign() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" theme="system" />
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <InteractiveDemo />
        <WorkflowSection />
        <PricingCalculator />
        <LiveConsole />
        <TrustSection />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
