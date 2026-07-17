import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { Button } from "./ui/Button";
import { FileSimulation } from "./FileSimulation";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <RevealOnScroll className="overflow-hidden rounded-3xl border border-footer-border bg-footer px-8 py-16 sm:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="text-center lg:col-span-7 lg:text-left">
            <h2 className="font-display text-3xl font-bold tracking-tight text-footer-foreground sm:text-4xl">
              Ready to close deals faster?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-footer-muted lg:mx-0">
              Join the priority queue for BrokerMind's private beta — built for residential
              mortgage brokers, B lenders, and private lenders.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Button icon={<ArrowRight className="h-4 w-4" />} onClick={() => (window.location.href = "/preview#waitlist")}>
                Join the waitlist
              </Button>
            </div>
          </div>

          <div className="theme-dark-scope lg:col-span-5">
            <FileSimulation variant="complete" className="mx-auto max-w-xs" />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
