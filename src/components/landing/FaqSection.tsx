import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "./content";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">FAQ</p>
          <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Questions, answered plainly.
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-14">
          <Accordion type="single" collapsible className="flex flex-col">
            {FAQ.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="font-mono text-sm font-medium text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-mono text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
}
