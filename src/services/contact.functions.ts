import { createServerFn } from "@tanstack/react-start";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactFnResult = { ok: true } | { ok: false; error: string };

// Dynamically imported inside the handler (server-only) — see waitlist.functions.ts
// for why this can't be a top-level import.
export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((data: ContactPayload) => data)
  .handler(async ({ data }): Promise<ContactFnResult> => {
    const { supabaseAdmin } = await import("@/lib/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email.trim().toLowerCase(),
      message: data.message,
      status: "new",
    });

    if (error) {
      console.error("[contact] insert failed", error);
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    return { ok: true };
  });
