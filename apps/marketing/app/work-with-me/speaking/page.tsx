import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SpeakingPage } from "@/components/marketing/work-with-me/SpeakingPage";
import { buildPageMetadata, serviceJsonLd } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Keynote Speaking",
  description:
    "Book Caroline Jones for keynotes on stress, burnout, trauma, and nervous system regulation — healthcare keynote specialist in Ireland.",
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
        })}
      />
      <SpeakingPage />
    </>
  );
}
