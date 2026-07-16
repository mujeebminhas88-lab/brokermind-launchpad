/**
 * Waitlist service layer.
 *
 * The UI never talks to a backend directly — every submission flows through
 * `joinWaitlist`. To connect a real backend later (Supabase, MailerLite,
 * HubSpot, ConvertKit, Resend, an internal API, etc.), implement the POST
 * `/api/waitlist` endpoint (or override `WAITLIST_ENDPOINT` below). Nothing
 * in the UI needs to change.
 *
 * Contract:
 *   POST /api/waitlist
 *     body:   { email, filesPerMonth?, utm_source?, utm_campaign?, referrer? }
 *     200:    { ok: true, alreadyJoined?: boolean }
 *     409:    { ok: true, alreadyJoined: true }   // duplicate email
 *     4xx:    { ok: false, error: string }
 */

const WAITLIST_ENDPOINT = "/api/waitlist";

export interface WaitlistEntry {
  email: string;
  /** Bucketed volume estimate, e.g. "16-60" — see pricing.ts VOLUME_BUCKETS. */
  filesPerMonth?: string | null;
  utm_source?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
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

export function readAttribution(): Pick<
  WaitlistEntry,
  "utm_source" | "utm_campaign" | "referrer"
> {
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
    filesPerMonth: entry.filesPerMonth ?? null,
    utm_source: entry.utm_source ?? null,
    utm_campaign: entry.utm_campaign ?? null,
    referrer: entry.referrer ?? null,
  };

  try {
    const res = await fetch(WAITLIST_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Endpoint not yet wired up — accept optimistically so pre-launch marketing
    // still succeeds. Swap this branch out once a backend is connected.
    if (res.status === 404) {
      if (import.meta.env.DEV) {
        console.warn(
          "[waitlist] POST /api/waitlist not implemented — accepting optimistically. Wire up a backend to persist submissions.",
        );
      }
      return { ok: true, alreadyJoined: false };
    }

    if (res.status === 409) return { ok: true, alreadyJoined: true };

    if (!res.ok) {
      const body = (await safeJson(res)) as { error?: string } | null;
      return { ok: false, error: body?.error ?? "Something went wrong. Please try again." };
    }

    const body = (await safeJson(res)) as { alreadyJoined?: boolean } | null;
    return { ok: true, alreadyJoined: Boolean(body?.alreadyJoined) };
  } catch {
    // Network failure — accept optimistically in the browser so users aren't
    // blocked while the backend is being connected. Real backends should
    // return a structured error response instead.
    return { ok: true, alreadyJoined: false };
  }
}

async function safeJson(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}