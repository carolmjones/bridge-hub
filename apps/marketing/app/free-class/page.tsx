import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { FreeClassPage } from "@/components/marketing/free-class/FreeClassPage";
import { breadcrumbJsonLd, buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Class: Life Beyond Survival Mode — with Caroline Jones",
  description:
    "A free class on why everything you have tried keeps failing, and what has to change first.",
  path: "/free-class",
});

export default function FreeClassRoute() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Free Class", path: "/free-class" },
        ])}
      />
      <FreeClassPage />
    </>
  );
}
