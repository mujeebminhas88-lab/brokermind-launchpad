import { RevealOnScroll } from "./ui/RevealOnScroll";

const POINTS = [
  {
    n: "01",
    title: "One update, everywhere.",
    body: "Change an income figure, a down payment, a credit pull — every dependent calculation updates with it. Nothing falls out of sync.",
  },
  {
    n: "02",
    title: "Nothing hides in a PDF.",
    body: "Every dependency is visible, not buried three documents deep in a stack no one has time to re-read.",
  },
  {
    n: "03",
    title: "Review, don't reconstruct.",
    body: "Brokers approve decisions. They stop re-deriving them by hand from scratch every time something changes.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        {POINTS.map((point, i) => (
          <RevealOnScroll key={point.n} delay={i * 0.1}>
            <p className="font-mono text-xs text-accent">{point.n}</p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-foreground">
              {point.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.body}</p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
