import type { Metadata } from "next";
import { SpeakingEnquiryPage } from "@/components/marketing/work-with-me/SpeakingEnquiryPage";

export const metadata: Metadata = {
  title: "Enquire About Booking | The Bridge Hub",
  description:
    "Tell Caroline Jones about your event to enquire about keynotes, talks, and workshops.",
};

export default function SpeakingEnquireRoute() {
  return <SpeakingEnquiryPage />;
}
