import { NextResponse } from "next/server";

/**
 * POST /api/contact - receives the contact form.
 *
 * PLACEHOLDER DELIVERY. Out of the box this validates the request and writes
 * it to the server log, which on Vercel means Project > Logs. That is enough
 * to test the form, and not enough to run on: nobody is emailed.
 *
 * To connect it, set CONTACT_WEBHOOK_URL in the environment (Vercel > Project
 * > Settings > Environment Variables). The message is then POSTed there as
 * JSON. Anything that accepts a JSON POST works:
 *   - Formspree:      https://formspree.io/f/<your form id>  (emails you)
 *   - Zapier / Make:  a "catch hook" URL, then on to your CRM or inbox
 *   - Your CRM:       its inbound webhook URL
 *
 * To send email directly instead (Resend, Postmark, SendGrid), replace the
 * deliver() function below. Nothing else in the site needs to change.
 */

type Message = {
  name: string;
  email: string;
  reason: string;
  message: string;
  source: string;
  receivedAt: string;
};

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

async function deliver(message: Message): Promise<boolean> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.info("[contact] new message (no CONTACT_WEBHOOK_URL set, logged only)", message);
    return true;
  }
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(message),
  });
  if (!response.ok) console.error("[contact] webhook rejected the request", response.status);
  return response.ok;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see this field. Pretend it worked.
  if (text(body.hp, 200)) return NextResponse.json({ ok: true });

  const message: Message = {
    name: text(body.name, 120),
    email: text(body.email, 200),
    reason: text(body.reason, 80),
    message: text(body.message, 4000),
    source: "akashkapruwan.com contact form",
    receivedAt: new Date().toISOString(),
  };

  const errors: Record<string, string> = {};
  if (!message.name) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message.email)) errors.email = "A valid email is required.";
  if (!message.reason) errors.reason = "Choose what it is about.";
  if (!message.message) errors.message = "A message is required.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    if (await deliver(message)) return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery failed", error);
  }
  return NextResponse.json({ ok: false, error: "Could not deliver the message." }, { status: 502 });
}
