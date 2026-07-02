// Thin wrapper around the Buttondown subscribe API. Kept isolated so the
// route handler stays simple and this is easy to mock in tests.

export type SubscribeResult =
  | { status: "subscribed" }
  | { status: "already_subscribed" }
  | { status: "skipped" } // no API key configured
  | { status: "error"; message: string };

const BUTTONDOWN_ENDPOINT = "https://api.buttondown.email/v1/subscribers";

export async function subscribeEmail(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.BUTTONDOWN_API_KEY;

  // No key configured: accept the email but do nothing upstream. This keeps
  // local dev and fresh clones working without secrets.
  if (!apiKey) {
    return { status: "skipped" };
  }

  let res: Response;
  try {
    res = await fetch(BUTTONDOWN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Network error",
    };
  }

  if (res.status === 201 || res.status === 200) {
    return { status: "subscribed" };
  }

  // Buttondown returns 400 with a code when the address already exists.
  if (res.status === 400) {
    const body = await res.text();
    if (body.toLowerCase().includes("already")) {
      return { status: "already_subscribed" };
    }
    return { status: "error", message: "Invalid email address." };
  }

  return { status: "error", message: `Upstream error (${res.status}).` };
}
