import { createServerFn } from "@tanstack/react-start";

export interface WaitlistPayload {
  name: string;
  company: string;
  email: string;
  monthlyVolume: string;
  country: string;
  currentLosCrm?: string | null;
  notes?: string | null;
  utmSource?: string | null;
  utmCampaign?: string | null;
  referrer?: string | null;
}

export type WaitlistFnResult =
  | { ok: true; alreadyJoined: boolean }
  | { ok: false; error: string };

// Route-file and *.functions.ts modules ship to the client bundle, so the
// service-role Supabase client and the MailerLite API key are dynamically
// imported inside the handler (server-only execution) rather than at the
// top of this file.
export const submitWaitlistEntry = createServerFn({ method: "POST" })
  .validator((data: WaitlistPayload) => data)
  .handler(async ({ data }): Promise<WaitlistFnResult> => {
    const { supabaseAdmin } = await import("@/lib/supabase/client.server");

    const email = data.email.trim().toLowerCase();

    const { error } = await supabaseAdmin.from("waitlist").insert({
      name: data.name,
      company: data.company,
      email,
      monthly_volume: data.monthlyVolume,
      country: data.country,
      current_los_crm: data.currentLosCrm || null,
      notes: data.notes || null,
      utm_source: data.utmSource ?? null,
      utm_campaign: data.utmCampaign ?? null,
      referrer: data.referrer ?? null,
      source: "landing-page",
      status: "new",
    });

    if (error) {
      // Postgres unique_violation on the email column — they're already on the list.
      if (error.code === "23505") {
        return { ok: true, alreadyJoined: true };
      }
      console.error("[waitlist] insert failed", error);
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    try {
      const { syncFoundingWaitlistSubscriber } = await import("@/lib/mailerlite/client.server");
      await syncFoundingWaitlistSubscriber({
        email,
        name: data.name,
        company: data.company,
        filesPerMonth: data.monthlyVolume,
      });
    } catch (mailerliteError) {
      // MailerLite is a marketing-list sync, not the source of truth — never
      // fail the waitlist submission because of it.
      console.error("[waitlist] mailerlite sync failed", mailerliteError);
    }

    return { ok: true, alreadyJoined: false };
  });
