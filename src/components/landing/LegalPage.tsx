import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

/**
 * Minimal placeholder shell for legal pages linked from the footer. Copy
 * here is a structural draft, not reviewed legal language — replace before
 * launch.
 */
export function LegalPage({ eyebrow, title, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
          &larr; BrokerMindAI
        </Link>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
        <h1 className="mt-4 font-display text-3xl italic text-foreground">{title}</h1>
        <div className="mt-8 flex flex-col gap-4 font-mono text-sm leading-[1.8] text-muted-foreground">
          {children}
        </div>
        <p className="mt-12 rounded-lg border border-border bg-surface px-4 py-3 font-mono text-xs text-muted-foreground">
          This page is a structural placeholder pending legal review — not final policy language.
        </p>
      </div>
    </div>
  );
}
