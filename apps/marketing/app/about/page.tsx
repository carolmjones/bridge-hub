import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { AboutCloseCta } from "@/components/marketing/about/AboutCloseCta";
import { AboutCredentials } from "@/components/marketing/about/AboutCredentials";
import { AboutHero } from "@/components/marketing/about/AboutHero";
import { AboutMyStory } from "@/components/marketing/about/AboutMyStory";
import {
  aboutPersonJsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Caroline Jones — Nurse, MSc Psychology & Founder",
  description:
    "Caroline Jones — registered nurse, MSc Psychology, currently training in psychotherapy and counselling, and founder of The Bridge Hub. Her story, her credentials, and why she works with women in survival mode.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPersonJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Caroline Jones", path: "/about" },
        ])}
      />
      <AboutHero />
      <AboutMyStory />
      <AboutCredentials />
      <AboutCloseCta />
    </>
  );
}
