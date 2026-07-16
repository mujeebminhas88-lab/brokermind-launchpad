import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "./content";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealOnScroll } from "./ui/RevealOnScroll";

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
      <SectionHeading eyebrow="FAQ" title="Frequently asked questions" align="center" className="mx-auto" />

      <RevealOnScroll delay={0.1} className="mt-14">
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {FAQ.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="rounded-xl border border-border bg-surface px-5"
            >
              <AccordionTrigger className="text-sm font-medium text-foreground">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </RevealOnScroll>
    </section>
  );
}
