import { NextResponse } from "next/server";
import {
  isStillNotSureKitConfigured,
  subscribeToStillNotSureNewsletter,
} from "@/lib/marketing/kit";

type SubscribeBody = {
  email?: unknown;
  firstName?: unknown;
};

function parseEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function parseFirstName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const firstName = value.trim();
  return firstName || null;
}

export async function POST(request: Request) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = parseEmail(body.email);
  const firstName = parseFirstName(body.firstName);

  if (!firstName) {
    return NextResponse.json(
      { error: "First name is required." },
      { status: 400 },
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  if (!isStillNotSureKitConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Signup is temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }

    console.warn(
      "[still-not-sure] Kit not configured — skipping subscriber sync.",
    );
    return NextResponse.json({ ok: true, kit: "skipped" });
  }

  try {
    const marketingUrl =
      process.env.NEXT_PUBLIC_MARKETING_URL?.replace(/\/$/, "") ?? "";
    await subscribeToStillNotSureNewsletter({
      email,
      firstName,
      referrer: marketingUrl ? `${marketingUrl}/` : undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[still-not-sure] Kit subscribe failed:", error);
    return NextResponse.json(
      { error: "We couldn't save your details. Please try again." },
      { status: 502 },
    );
  }
}
