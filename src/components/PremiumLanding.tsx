import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { WhySection } from "@/components/landing/WhySection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { Footer } from "@/components/landing/Footer";

// Deferred: nothing above the fold needs toast notifications, so the
// sonner chunk is only requested once the page has settled rather than
// competing with the initial render for main-thread time.
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })),
);

export default function PremiumLanding() {
  const [toasterReady, setToasterReady] = useState(false);

  useEffect(() => {
    setToasterReady(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {toasterReady && (
        <Suspense fallback={null}>
          <Toaster position="top-center" theme="dark" />
        </Suspense>
      )}
      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
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
