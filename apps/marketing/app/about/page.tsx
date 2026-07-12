import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { AboutCloseCta } from "@/components/marketing/about/AboutCloseCta";
import { AboutCredentials } from "@/components/marketing/about/AboutCredentials";
import { AboutHero } from "@/components/marketing/about/AboutHero";
import { AboutMyStory } from "@/components/marketing/about/AboutMyStory";
import { aboutPersonJsonLd, buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Caroline Jones",
  description:
    "Caroline Jones — nurse, therapist, and founder of The Bridge Hub. A personal story about patterns, safety, and building capacity from the inside out.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPersonJsonLd()} />
      <AboutHero />
      <AboutMyStory />
      <AboutCredentials />
      <AboutCloseCta />
    </>
  );
}
