import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/landing/Navbar";
import { PremiumHero } from "@/components/landing/PremiumHero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

export default function PremiumLanding() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" theme="system" />
      <Navbar links={[]} />
      <main>
        <PremiumHero />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer links={[]} />
    </div>
  );
}
