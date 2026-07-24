// Server-only Resend client. Never import this from a route file or
// *.functions.ts module at the top level — those ship to the client bundle.
// Load it with a dynamic import inside a server handler instead.

const RESEND_API_BASE = "https://api.resend.com";

// Must be an address on a domain verified in the Resend dashboard (DNS
// SPF/DKIM records added for brokermindapp.com) — sending "from" an
// unverified domain is rejected by Resend's API.
const CONTACT_FROM = "BrokerMindAI <hello@brokermindapp.com>";

export interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API send failed: ${response.status} ${body}`);
  }
}
