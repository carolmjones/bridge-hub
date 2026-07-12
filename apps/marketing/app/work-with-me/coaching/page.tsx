import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { CoachingPage } from "@/components/marketing/work-with-me/CoachingPage";
import { buildPageMetadata, serviceJsonLd } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "The Bridge Programme",
  description:
    "Eight weeks, one to one, built entirely around your nervous system profile.",
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
        })}
      />
      <CoachingPage />
    </>
  );
}
