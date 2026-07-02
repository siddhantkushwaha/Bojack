import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import { subscribeEmail } from "@/lib/buttondown";

// Uses better-sqlite3 (a native module) + filesystem, so force the Node runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email).trim()
      : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Source of truth: our own SQLite store.
  let created: boolean;
  try {
    ({ created } = addSubscriber(email));
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not save your subscription. Please try again." },
      { status: 500 },
    );
  }

  // Best-effort forward to Buttondown when configured. A failure here does not
  // fail the request; the email is already durably saved locally.
  const forward = await subscribeEmail(email);
  if (forward.status === "error") {
    console.error("Buttondown forward failed:", forward.message);
  }

  return NextResponse.json({
    ok: true,
    message: created
      ? "You're on the list. Thanks for subscribing."
      : "You're already subscribed.",
  });
}
