import { NextResponse } from "next/server";
import {
  isSpeakingEnquiryEmailConfigured,
  sendSpeakingEnquiryNotification,
} from "@/lib/marketing/email";
import {
  isKitSpeakingFormConfigured,
  submitSpeakingEnquiryToKit,
  type SpeakingEnquiryInput,
} from "@/lib/marketing/kit";

type EnquiryBody = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  organisation?: unknown;
  eventType?: unknown;
  eventDate?: unknown;
  message?: unknown;
};

function parseRequired(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function parseOptional(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function parseEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export async function POST(request: Request) {
  let body: EnquiryBody;
  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = parseRequired(body.name);
  const email = parseEmail(body.email);
  const organisation = parseRequired(body.organisation);
  const eventType = parseRequired(body.eventType);
  const message = parseRequired(body.message);
  const phone = parseOptional(body.phone);
  const eventDate = parseOptional(body.eventDate);

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (!organisation) {
    return NextResponse.json(
      { error: "Organisation is required." },
      { status: 400 },
    );
  }
  if (!eventType) {
    return NextResponse.json(
      { error: "Event type is required." },
      { status: 400 },
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Please tell us about your event." },
      { status: 400 },
    );
  }

  const enquiry: SpeakingEnquiryInput = {
    name,
    email,
    phone,
    organisation,
    eventType,
    eventDate,
    message,
  };

  const marketingUrl =
    process.env.NEXT_PUBLIC_MARKETING_URL?.replace(/\/$/, "") ?? "";
  enquiry.referrer = marketingUrl
    ? `${marketingUrl}/work-with-me/speaking/enquire`
    : undefined;

  const emailConfigured = isSpeakingEnquiryEmailConfigured();
  const kitConfigured = isKitSpeakingFormConfigured();

  if (!emailConfigured && !kitConfigured) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Enquiries are temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }
    console.warn(
      "[speaking] Neither Resend nor Kit configured — skipping enquiry delivery.",
    );
    return NextResponse.json({ ok: true, email: "skipped", kit: "skipped" });
  }

  // Notify Caroline directly and add to Kit in parallel. Kit's own new-subscriber
  // notification is batched hourly and has no message content, so the Resend
  // email is the primary, real-time notification — don't let a Kit failure
  // block it, and vice versa.
  const [emailResult, kitResult] = await Promise.allSettled([
    emailConfigured
      ? sendSpeakingEnquiryNotification(enquiry)
      : Promise.resolve(),
    kitConfigured ? submitSpeakingEnquiryToKit(enquiry) : Promise.resolve(),
  ]);

  if (emailResult.status === "rejected") {
    console.error("[speaking] Resend notification failed:", emailResult.reason);
  }
  if (kitResult.status === "rejected") {
    console.error("[speaking] Kit subscribe failed:", kitResult.reason);
  }

  if (emailResult.status === "rejected" && kitResult.status === "rejected") {
    return NextResponse.json(
      { error: "We couldn't send your enquiry. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
