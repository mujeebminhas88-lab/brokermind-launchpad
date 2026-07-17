/**
 * Waitlist service layer. Submissions persist to the `waitlist` table in
 * Supabase via the `submitWaitlistEntry` server function (see
 * waitlist.functions.ts) — reviewed manually, no email verification flow.
 */

import { submitWaitlistEntry } from "./waitlist.functions";

export interface WaitlistEntry {
  name: string;
  company: string;
  email: string;
  /** Bucketed volume estimate, e.g. "16-60" — see pricing.ts VOLUME_BUCKETS. */
  monthlyVolume: string;
  country: string;
  currentLosCrm?: string | null;
  notes?: string | null;
}

export type WaitlistResult =
  | { ok: true; alreadyJoined: boolean }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Please enter your email address.";
  if (trimmed.length > 254) return "That email is too long.";
  if (!EMAIL_RE.test(trimmed)) return "Please enter a valid email address.";
  return null;
}

export function validateWaitlistEntry(entry: WaitlistEntry): string | null {
  if (!entry.name.trim()) return "Please enter your name.";
  if (!entry.company.trim()) return "Please enter your company.";
  const emailError = validateEmail(entry.email);
  if (emailError) return emailError;
  if (!entry.monthlyVolume) return "Please select your monthly file volume.";
  if (!entry.country) return "Please select your country.";
  return null;
}

export function readAttribution(): { utm_source: string | null; utm_campaign: string | null; referrer: string | null } {
  if (typeof window === "undefined") return { utm_source: null, utm_campaign: null, referrer: null };
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_campaign: params.get("utm_campaign"),
    referrer: document.referrer || null,
  };
}

export async function joinWaitlist(entry: WaitlistEntry): Promise<WaitlistResult> {
  const err = validateWaitlistEntry(entry);
  if (err) return { ok: false, error: err };

  const attribution = readAttribution();

  try {
    const result = await submitWaitlistEntry({
      data: {
        name: entry.name.trim(),
        company: entry.company.trim(),
        email: entry.email.trim().toLowerCase(),
        monthlyVolume: entry.monthlyVolume,
        country: entry.country,
        currentLosCrm: entry.currentLosCrm ?? null,
        notes: entry.notes ?? null,
        utmSource: attribution.utm_source,
        utmCampaign: attribution.utm_campaign,
        referrer: attribution.referrer,
      },
    });
    return result;
  } catch (e) {
    console.error("[waitlist] submission failed", e);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
