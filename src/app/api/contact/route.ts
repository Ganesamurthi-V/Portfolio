import { NextResponse } from "next/server";

import { site } from "@/content/site";

/**
 * Contact endpoint.
 *
 * Public and unauthenticated by design — it is a portfolio contact form — so it
 * is deliberately narrow: strict field validation, hard length caps, a honeypot
 * and per-IP rate limiting. It only ever sends one message to a single
 * hard-configured recipient; nothing from the request body reaches a header.
 *
 * Delivery requires RESEND_API_KEY. Without it the route reports
 * `reason: "not-configured"` and the client falls back to a mailto: link, so the
 * form stays usable on a fresh deployment.
 */

const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

/** Per-instance limiter. Resets on cold start; good enough to blunt abuse. */
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > LIMIT;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

function validate(body: Payload) {
  const errors: Record<string, string> = {};

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 80) {
    errors.name = "Please enter your name (2–80 characters).";
  }
  if (!EMAIL_RE.test(email) || email.length > 160) {
    errors.email = "Please enter a valid email address.";
  }
  if (message.length < 10 || message.length > 4000) {
    errors.message = "Please write a message between 10 and 4000 characters.";
  }

  return { errors, values: { name, email, message } };
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }

  // Honeypot: real users never fill a field they cannot see.
  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, reason: "rate-limited" },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  const { errors, values } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, reason: "invalid", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    // Not an error: the client falls back to opening the visitor's mail client.
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 200 });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio enquiry from ${values.name}`,
        text: [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          "",
          values.message,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
}
