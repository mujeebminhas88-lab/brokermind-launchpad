import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { RelationshipNetwork } from "./RelationshipNetwork";

export function PremiumHero() {
  return (
    <section id="hero" className="atmosphere relative overflow-hidden pt-36 pb-24 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
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
          className="mx-auto mt-6 max-w-3xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
        >
          One file. Every dependency,
          <br />
          <span className="text-accent">visible at once.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          AI decision intelligence for residential mortgage brokers, B lenders, and private
          lending teams. Change one figure, and every calculation that depends on it updates
          with it — nothing falls out of sync.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 flex max-w-md flex-col items-center"
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
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-16 max-w-4xl px-6"
      >
        <RelationshipNetwork />
        <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          A live file, watching itself
        </p>
      </motion.div>
    </section>
  );
}
