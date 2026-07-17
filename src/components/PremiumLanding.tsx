import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { WhySection } from "@/components/landing/WhySection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";

export default function PremiumLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" theme="dark" />
      <Navbar />
      <main>
        <Hero />
        <WhySection />
        <WorkflowSection />
        <ComplianceSection />
        <PricingSection />
        <WaitlistSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
