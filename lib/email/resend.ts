import { Resend } from "resend";
import { getAppUrl, getResendApiKey, getResendFromEmail } from "@/lib/env";

function getResend() {
  return new Resend(getResendApiKey());
}

export async function sendMagicLinkEmail(
  email: string,
  firstName: string,
  token: string
) {
  const appUrl = getAppUrl();
  const verifyUrl = `${appUrl}/api/auth/verify?token=${encodeURIComponent(token)}`;
  const name = firstName.trim() || "there";

  const { error } = await getResend().emails.send({
    from: getResendFromEmail(),
    to: email.trim().toLowerCase(),
    subject: "Continue your Bridge Hub screening",
    text: [
      `Hi ${name},`,
      "",
      "Your progress is saved. Use this link to pick up where you left off:",
      "",
      verifyUrl,
      "",
      "This link expires in 30 days and can only be used once.",
      "",
      "This is a screening tool, not a clinical diagnosis.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}
