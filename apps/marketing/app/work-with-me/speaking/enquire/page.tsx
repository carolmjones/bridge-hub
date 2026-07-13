import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SpeakingEnquiryPage } from "@/components/marketing/work-with-me/SpeakingEnquiryPage";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book Caroline Jones — Speaking Enquiry",
  description:
    "Enquire about booking Caroline Jones for a keynote, talk, or workshop in Ireland. Share your event details and receive a personal reply within 24 hours.",
  path: "/work-with-me/speaking/enquire",
});

export default function SpeakingEnquireRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Speaking", path: "/work-with-me/speaking" },
          { name: "Enquire", path: "/work-with-me/speaking/enquire" },
        ])}
      />
      <SpeakingEnquiryPage />
    </>
  );
}
