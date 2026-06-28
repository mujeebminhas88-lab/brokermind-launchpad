import { supabase } from "@/integrations/supabase/client";

/**
 * Waitlist service layer.
 *
 * All waitlist submissions flow through `joinWaitlist`. The UI never talks to
 * the database directly. This keeps the door open to swap or add providers
 * (MailerLite, HubSpot, ConvertKit, Resend, PostHog, GA, etc.) later without
 * touching the form components.
 *
 * To plug in MailerLite later:
 *   1. Create `src/lib/waitlist.mailerlite.ts` exporting `pushToMailerLite(entry)`.
 *   2. Call it from inside `joinWaitlist` after the Supabase insert succeeds.
 *   3. No UI changes required.
 */

export type WaitlistStatus = "pending" | "invited" | "active" | "unsubscribed";

export interface WaitlistEntry {
  email: string;
  utm_source?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
}

export type WaitlistResult =
  | { ok: true; alreadyJoined: false }
  | { ok: true; alreadyJoined: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your email address.";
  if (trimmed.length > 254) return "That email is too long.";
  if (!EMAIL_RE.test(trimmed)) return "Please enter a valid email address.";
  return null;
}

export function readAttribution(): Pick<WaitlistEntry, "utm_source" | "utm_campaign" | "referrer"> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_campaign: params.get("utm_campaign"),
    referrer: document.referrer || null,
  };
}

export async function joinWaitlist(entry: WaitlistEntry): Promise<WaitlistResult> {
  const err = validateEmail(entry.email);
  if (err) return { ok: false, error: err };

  const payload = {
    email: entry.email.trim().toLowerCase(),
    utm_source: entry.utm_source ?? null,
    utm_campaign: entry.utm_campaign ?? null,
    referrer: entry.referrer ?? null,
  };

  const { error } = await supabase.from("waitlist").insert(payload);

  if (error) {
    // 23505 = unique_violation (duplicate email)
    if (error.code === "23505") return { ok: true, alreadyJoined: true };
    // 23514 = check_violation (email regex)
    if (error.code === "23514") return { ok: false, error: "Please enter a valid email address." };
    console.error("[waitlist] insert failed", error);
    return { ok: false, error: "Something went wrong. Please try again." };
  }

  // Future hook points (no-op today):
  //   await pushToMailerLite(payload);
  //   await pushToHubSpot(payload);
  //   trackAnalytics("waitlist_signup", payload);

  return { ok: true, alreadyJoined: false };
}