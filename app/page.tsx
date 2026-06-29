import { redirect } from "next/navigation";

/** Screening deploy has no marketing landing — send visitors to the marketing site. */
export default function ScreeningRootPage() {
  const marketingUrl = process.env.NEXT_PUBLIC_MARKETING_URL?.replace(/\/$/, "");
  if (marketingUrl) {
    redirect(marketingUrl);
  }
  redirect("/begin");
}
