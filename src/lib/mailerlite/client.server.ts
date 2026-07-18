// Server-only MailerLite client. Never import this from a route file or
// *.functions.ts module at the top level — those ship to the client bundle.
// Load it with a dynamic import inside a server handler instead.

const MAILERLITE_API_BASE = "https://connect.mailerlite.com/api";
const FOUNDING_WAITLIST_GROUP_NAME = "Founding Waitlist";

async function mailerliteFetch(path: string, init: RequestInit): Promise<unknown> {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing MAILERLITE_API_KEY environment variable.");
  }

  const response = await fetch(`${MAILERLITE_API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...init.headers,
    },
  });

  // TEMP DIAGNOSTIC — remove once the MailerLite integration is confirmed
  // working. Never logs the API key; only status/endpoint/body.
  const diagBody = await response
    .clone()
    .text()
    .catch(() => "<unreadable body>");
  console.log(
    `[diag:mailerlite] ${init.method ?? "GET"} ${path} -> status=${response.status} ok=${response.ok}`,
    "body=",
    diagBody,
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `MailerLite API ${init.method ?? "GET"} ${path} failed: ${response.status} ${body}`,
    );
  }

  return response.json();
}

let cachedGroupId: string | undefined;

async function findOrCreateFoundingWaitlistGroupId(): Promise<string> {
  if (cachedGroupId) return cachedGroupId;

  const search = (await mailerliteFetch(
    `/groups?filter[name]=${encodeURIComponent(FOUNDING_WAITLIST_GROUP_NAME)}`,
    { method: "GET" },
  )) as { data?: Array<{ id: string; name: string }> };

  const existing = search.data?.find((group) => group.name === FOUNDING_WAITLIST_GROUP_NAME);
  if (existing) {
    // TEMP DIAGNOSTIC — remove once the MailerLite integration is confirmed working.
    console.log(`[diag:mailerlite] group "${FOUNDING_WAITLIST_GROUP_NAME}" found, id=${existing.id}`);
    cachedGroupId = existing.id;
    return existing.id;
  }

  const created = (await mailerliteFetch("/groups", {
    method: "POST",
    body: JSON.stringify({ name: FOUNDING_WAITLIST_GROUP_NAME }),
  })) as { data: { id: string } };

  // TEMP DIAGNOSTIC — remove once the MailerLite integration is confirmed working.
  console.log(`[diag:mailerlite] group "${FOUNDING_WAITLIST_GROUP_NAME}" not found, created id=${created.data.id}`);

  cachedGroupId = created.data.id;
  return created.data.id;
}

export interface FoundingWaitlistSubscriber {
  email: string;
  name: string;
  company: string;
  filesPerMonth: string;
}

// Creates the subscriber if new, or updates their fields/groups if they
// already exist (MailerLite's POST /subscribers endpoint upserts by email).
export async function syncFoundingWaitlistSubscriber(
  subscriber: FoundingWaitlistSubscriber,
): Promise<void> {
  const groupId = await findOrCreateFoundingWaitlistGroupId();

  try {
    await mailerliteFetch("/subscribers", {
      method: "POST",
      body: JSON.stringify({
        email: subscriber.email,
        fields: {
          name: subscriber.name,
          company: subscriber.company,
          files_per_month: subscriber.filesPerMonth,
        },
        groups: [groupId],
      }),
    });
    // TEMP DIAGNOSTIC — remove once the MailerLite integration is confirmed working.
    console.log(`[diag:mailerlite] subscriber upsert succeeded for group ${groupId}`);
  } catch (subscriberError) {
    // TEMP DIAGNOSTIC — remove once the MailerLite integration is confirmed working.
    console.log(`[diag:mailerlite] subscriber upsert failed for group ${groupId}:`, subscriberError);
    throw subscriberError;
  }
}
