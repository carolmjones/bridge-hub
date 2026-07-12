import { Resend } from "resend";
import type { SpeakingEnquiryInput } from "./kit";

function getResendApiKey(): string {
  return process.env.RESEND_API_KEY?.trim() ?? "";
}

function getResendFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "The Bridge Hub <onboarding@resend.dev>"
  );
}

function getSpeakingEnquiryNotifyEmail(): string {
  return process.env.SPEAKING_ENQUIRY_NOTIFY_EMAIL?.trim() ?? "";
}

export function isSpeakingEnquiryEmailConfigured(): boolean {
  return Boolean(getResendApiKey() && getSpeakingEnquiryNotifyEmail());
}

function formatField(label: string, value?: string): string | null {
  if (!value) return null;
  return `${label}: ${value}`;
}

export async function sendSpeakingEnquiryNotification(
  enquiry: SpeakingEnquiryInput,
) {
  const apiKey = getResendApiKey();
  const notifyEmail = getSpeakingEnquiryNotifyEmail();
  if (!apiKey || !notifyEmail) {
    throw new Error("Resend is not configured for speaking enquiries");
  }

  const resend = new Resend(apiKey);

  const lines = [
    formatField("Name", enquiry.name),
    formatField("Email", enquiry.email),
    formatField("Phone", enquiry.phone),
    formatField("Organisation", enquiry.organisation),
    formatField("Event type", enquiry.eventType),
    formatField("Approx. date", enquiry.eventDate),
    "",
    "Message:",
    enquiry.message,
  ].filter((line) => line !== null) as string[];

  const { error } = await resend.emails.send({
    from: getResendFromEmail(),
    to: notifyEmail,
    replyTo: enquiry.email,
    subject: `Speaking enquiry — ${enquiry.organisation}`,
    text: lines.join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
