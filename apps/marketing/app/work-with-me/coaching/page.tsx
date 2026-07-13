import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { CoachingPage } from "@/components/marketing/work-with-me/CoachingPage";
import { buildPageMetadata, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/marketing/seo";
import { COACHING_FAQS } from "@/lib/marketing/faq";

export const metadata: Metadata = buildPageMetadata({
  title: "The Bridge Programme — 8-Week 1:1 Nervous System Coaching",
  description:
    "Eight weeks of one-to-one, trauma-informed coaching built around your nervous system profile from The Bridge Map. With Caroline Jones — registered nurse, MSc Psychology. Available worldwide.",
  path: "/work-with-me/coaching",
});

export default function CoachingRoute() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "The Bridge Programme",
          description:
            "Eight weeks of one-to-one coaching built entirely around your nervous system profile.",
          path: "/work-with-me/coaching",
          areaServed: "Worldwide",
        })}
      />
      <JsonLd data={faqPageJsonLd(COACHING_FAQS)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work With Me", path: "/work-with-me" },
          { name: "The Bridge Programme", path: "/work-with-me/coaching" },
        ])}
      />
      <CoachingPage />
    </>
  );
}
