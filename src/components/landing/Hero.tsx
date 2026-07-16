import { motion } from "framer-motion";
import { Spotlight } from "./ui/Spotlight";
import { TiltCard } from "./ui/TiltCard";
import { FileSimulation } from "./FileSimulation";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  return (
    <section id="hero" className="atmosphere relative overflow-hidden">
      <Spotlight size={800} className="pt-36 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Private beta &middot; Residential mortgages
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            Underwrite with
            <br />
            <span className="text-accent">quiet precision.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            AI decision intelligence for residential mortgage brokers, B lenders, and private
            lending teams. Every file reviewed, flagged, and packaged before it reaches
            underwriting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <WaitlistForm className="max-w-md" showVolumeField />
            <p className="mt-3 text-xs text-muted-foreground">
              Private beta · No credit card required
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <TiltCard max={4} className="glow-card glow-card-shadow mx-auto max-w-sm rounded-2xl">
            <FileSimulation className="border-transparent" />
          </TiltCard>
        </motion.div>
      </div>
      </Spotlight>
    </section>
  );
}
