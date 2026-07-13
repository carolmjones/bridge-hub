import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SpeakingPage } from "@/components/marketing/work-with-me/SpeakingPage";
import { buildPageMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Keynote Speaker — Burnout, Stress & the Nervous System",
  description:
    "Book Caroline Jones — registered nurse, MSc Psychology — for keynotes on burnout, stress, trauma, and nervous system regulation. Talks for healthcare teams and organisations across Ireland.",
  path: "/work-with-me/speaking",
});

export default function SpeakingRoute() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "Keynote Speaking",
          description:
            "Keynotes, talks, and workshops on stress, burnout, trauma, and nervous system regulation.",
          path: "/work-with-me/speaking",
          areaServed: "Ireland",
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Keynote Speaking", path: "/work-with-me/speaking" },
        ])}
      />
      <SpeakingPage />
    </>
  );
}
