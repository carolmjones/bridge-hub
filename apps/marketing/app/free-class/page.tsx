import type { Metadata } from "next";
import { FreeClassPage } from "@/components/marketing/free-class/FreeClassPage";
import { buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Life Beyond Survival Mode — Free Class",
  description:
    "A free class on why everything you have tried keeps failing, and what has to change first.",
  path: "/free-class",
});

export default function FreeClassRoute() {
  return <FreeClassPage />;
}
