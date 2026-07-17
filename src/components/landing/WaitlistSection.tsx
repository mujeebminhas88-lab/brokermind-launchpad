import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { joinWaitlist } from "@/services/waitlist";
import { VOLUME_BUCKETS } from "./pricing";
import { COUNTRIES } from "./countries";
import { RevealOnScroll } from "./ui/RevealOnScroll";
import { Button } from "./ui/Button";

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent";

export function WaitlistSection() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [monthlyVolume, setMonthlyVolume] = useState("");
  const [country, setCountry] = useState("");
  const [currentLosCrm, setCurrentLosCrm] = useState("");
  const [notes, setNotes] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsPending(true);
    try {
      const result = await joinWaitlist({
        name,
        company,
        email,
        monthlyVolume,
        country,
        currentLosCrm: currentLosCrm || null,
        notes: notes || null,
      });
      if (result.ok) {
        setIsSubmitted(true);
        toast.success(result.alreadyJoined ? "You're already on the list." : "You're on the list.");
      } else {
        toast.error(result.error);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-2xl px-6 py-20">
        <RevealOnScroll>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Early access</p>
          <h2 className="mt-5 text-balance font-display text-3xl italic leading-[1.15] text-foreground sm:text-4xl">
            Request early access.
          </h2>
          <p className="mt-6 max-w-md font-mono text-sm leading-[1.8] text-muted-foreground">
            Private beta, reviewed manually — no automated email verification. We'll reach out
            directly once your access opens up.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-12">
          {isSubmitted ? (
            <div className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent-subtle px-5 py-4">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
              <p className="font-mono text-sm text-foreground">
                You're on the list — we'll reach out as your access opens up.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                  className={fieldClass}
                />
                <input
                  type="text"
                  required
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isPending}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="email"
                  required
                  placeholder="Professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                  className={fieldClass}
                />
                <select
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  disabled={isPending}
                  className={cn(fieldClass, !country && "text-muted-foreground/60")}
                >
                  <option value="" disabled>
                    Country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <select
                  required
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  disabled={isPending}
                  className={cn(fieldClass, !monthlyVolume && "text-muted-foreground/60")}
                >
                  <option value="" disabled>
                    Monthly file volume
                  </option>
                  {VOLUME_BUCKETS.map((bucket) => (
                    <option key={bucket.value} value={bucket.value}>
                      {bucket.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Current LOS / CRM (optional)"
                  value={currentLosCrm}
                  onChange={(e) => setCurrentLosCrm(e.target.value)}
                  disabled={isPending}
                  className={fieldClass}
                />
              </div>

              <textarea
                placeholder="Anything else we should know? (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={isPending}
                rows={3}
                className={cn(fieldClass, "resize-none")}
              />

              <Button
                type="submit"
                loading={isPending}
                icon={<ArrowRight className="h-4 w-4" />}
                className="self-start"
              >
                Request access
              </Button>
            </form>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}
