import { createServerFn } from "@tanstack/react-start";
import { renderEmailLayout, emailLabel, emailQuoteBlock } from "@/lib/resend/emailTemplate";

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export type ContactFnResult = { ok: true } | { ok: false; error: string };

const OWNER_INBOX = "hello@brokermindapp.com";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function ownerNotificationHtml(data: ContactPayload): string {
  return renderEmailLayout(`
    ${emailLabel("New Contact Message")}
    <p style="margin:0 0 12px;"><strong>${escapeHtml(data.name)}</strong> · ${escapeHtml(data.email)}</p>
    ${emailQuoteBlock(escapeHtml(data.message).replace(/\n/g, "<br>"))}
    <p style="margin:20px 0 0; font-size:12px; color:#63665a;">Reply to this email to respond directly to ${escapeHtml(data.name)}.</p>
  `);
}

function senderConfirmationHtml(data: ContactPayload): string {
  return renderEmailLayout(`
    ${emailLabel("Message Received")}
    <p style="margin:0 0 12px;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 16px;">Thanks for reaching out — we've received your message and will get back to you shortly.</p>
    ${emailQuoteBlock(escapeHtml(data.message).replace(/\n/g, "<br>"))}
    <p style="margin:20px 0 0;">— The BrokerMindAI team</p>
  `);
}

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

    // Email delivery is best-effort, like the waitlist's MailerLite sync — the
    // database insert above is the source of truth, so a Resend outage must
    // never fail the submission the user is looking at.
    try {
      const { sendEmail } = await import("@/lib/resend/client.server");
      await Promise.all([
        sendEmail({
          to: OWNER_INBOX,
          subject: `New contact message from ${data.name}`,
          html: ownerNotificationHtml(data),
          replyTo: data.email,
        }),
        sendEmail({
          to: data.email,
          subject: "We've received your message — BrokerMindAI",
          html: senderConfirmationHtml(data),
        }),
      ]);
    } catch (emailError) {
      console.error("[contact] email send failed", emailError);
    }

    return { ok: true };
  });
