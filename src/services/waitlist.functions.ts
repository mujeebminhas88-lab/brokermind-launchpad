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

    const { data: insertData, error } = await supabaseAdmin.from("waitlist").insert({
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

    // TEMP DIAGNOSTIC — remove after confirming why production returns
    // { ok: true } with no row inserted. Logs the raw insert result only.
    console.log("[diag:waitlist-insert] data=", JSON.stringify(insertData), "error=", error ? JSON.stringify({
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    }) : null);

    if (error) {
      // Postgres unique_violation on the email column — they're already on the list.
      if (error.code === "23505") {
        console.log("[diag:waitlist-insert] branch=duplicate (23505) — returning ok:true, alreadyJoined:true");
        return { ok: true, alreadyJoined: true };
      }
      console.error("[waitlist] insert failed", error);
      console.log("[diag:waitlist-insert] branch=insert-failed (non-duplicate) — returning ok:false");
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    console.log("[diag:waitlist-insert] branch=clean-success (error was null) — proceeding to MailerLite sync");

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
