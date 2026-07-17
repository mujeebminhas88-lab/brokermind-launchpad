import { submitContactMessage } from "./contact.functions";
import { validateEmail } from "./waitlist";

export interface ContactEntry {
  name: string;
  email: string;
  message: string;
}

export type ContactResult = { ok: true } | { ok: false; error: string };

export function validateContactEntry(entry: ContactEntry): string | null {
  if (!entry.name.trim()) return "Please enter your name.";
  const emailError = validateEmail(entry.email);
  if (emailError) return emailError;
  if (!entry.message.trim()) return "Please enter a message.";
  return null;
}

export async function sendContactMessage(entry: ContactEntry): Promise<ContactResult> {
  const err = validateContactEntry(entry);
  if (err) return { ok: false, error: err };

  try {
    return await submitContactMessage({
      data: { name: entry.name.trim(), email: entry.email.trim().toLowerCase(), message: entry.message.trim() },
    });
  } catch (e) {
    console.error("[contact] submission failed", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
