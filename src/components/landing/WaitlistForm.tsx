import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { joinWaitlist, validateEmail } from "@/services/waitlist";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { VOLUME_BUCKETS } from "./pricing";

interface WaitlistFormProps {
  variant?: "light" | "dark";
  className?: string;
  showVolumeField?: boolean;
}

export function WaitlistForm({ variant = "light", className, showVolumeField = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [filesPerMonth, setFilesPerMonth] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isDark = variant === "dark";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      toast.error(error);
      return;
    }
    setIsPending(true);
    try {
      const result = await joinWaitlist({ email, filesPerMonth: filesPerMonth || null });
      if (result.ok) {
        setIsSubmitted(true);
        toast.success(result.alreadyJoined ? "You're already on the waitlist." : "You're on the waitlist.");
      } else {
        toast.error(result.error);
      }
    } finally {
      setIsPending(false);
    }
  }

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg border px-4 py-3",
          isDark ? "border-white/15 bg-white/10" : "border-accent/30 bg-accent-subtle",
          className,
        )}
      >
        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
        <p className={cn("text-sm", isDark ? "text-white" : "text-foreground")}>
          You're on the list — we'll reach out as your access opens up.
        </p>
      </div>
    );
  }

  const fieldClass = cn(
    "w-full rounded-lg border px-4 py-3 text-sm outline-none transition-colors focus:border-accent",
    isDark
      ? "border-white/15 bg-white/10 text-white placeholder:text-white/50"
      : "border-border bg-surface text-foreground placeholder:text-muted-foreground/70",
  );

  return (
    <form onSubmit={handleSubmit} className={cn("flex w-full flex-col gap-3", className)}>
      {showVolumeField && (
        <select
          value={filesPerMonth}
          onChange={(e) => setFilesPerMonth(e.target.value)}
          disabled={isPending}
          className={cn(fieldClass, !filesPerMonth && (isDark ? "text-white/50" : "text-muted-foreground/70"))}
        >
          <option value="">Files per month (optional)</option>
          {VOLUME_BUCKETS.map((bucket) => (
            <option key={bucket.value} value={bucket.value}>
              {bucket.label}
            </option>
          ))}
        </select>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="Your professional email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          className={fieldClass}
        />
        <Button type="submit" loading={isPending} icon={<ArrowRight className="h-4 w-4" />} className="shrink-0">
          Join Waitlist
        </Button>
      </div>
    </form>
  );
}
