import type { Metadata } from "next";
import { AboutCloseCta } from "@/components/marketing/about/AboutCloseCta";
import { AboutCredentials } from "@/components/marketing/about/AboutCredentials";
import { AboutHero } from "@/components/marketing/about/AboutHero";
import { AboutMyStory } from "@/components/marketing/about/AboutMyStory";

export const metadata: Metadata = {
  title: "About Caroline Jones | The Bridge Hub",
  description:
    "Caroline Jones — nurse, therapist, and founder of The Bridge Hub. A personal story about patterns, safety, and building capacity from the inside out.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutMyStory />
      <AboutCredentials />
      <AboutCloseCta />
    </>
  );
}
