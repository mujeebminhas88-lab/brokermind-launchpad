import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { sendContactMessage } from "@/services/contact";
import { Button } from "./ui/Button";

const fieldClass =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitted(false);
    }
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsPending(true);
    try {
      const result = await sendContactMessage({ name, email, message });
      if (result.ok) {
        setIsSubmitted(true);
      } else {
        toast.error(result.error);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Contact BrokerMindAI"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-lg border border-border bg-background p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              Contact
            </p>
            <h2 className="mt-3 font-display text-2xl italic text-foreground">
              Get in touch.
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-accent/30 bg-accent-subtle px-4 py-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent