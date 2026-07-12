import type { Metadata } from "next";
import { SpeakingEnquiryPage } from "@/components/marketing/work-with-me/SpeakingEnquiryPage";
import { buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Enquire About Booking",
  description:
    "Tell Caroline Jones about your event to enquire about keynotes, talks, and workshops.",
  path: "/work-with-me/speaking/enquire",
});

export default function SpeakingEnquireRoute() {
  return <SpeakingEnquiryPage />;
}
