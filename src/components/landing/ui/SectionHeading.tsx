import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <RevealOnScroll className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>}
    </RevealOnScroll>
  );
}
