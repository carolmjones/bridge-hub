import type { Metadata } from "next";
import { JsonLd } from "@/components/marketing/JsonLd";
import { Hero } from "@/components/marketing/landing/Hero";
import { TransformationVision } from "@/components/marketing/landing/TransformationVision";
import { DailyReality } from "@/components/marketing/landing/DailyReality";
import { BridgeMapCta } from "@/components/marketing/landing/BridgeMapCta";
import { Reassurance } from "@/components/marketing/landing/Reassurance";
import { ProgrammeIntro } from "@/components/marketing/landing/ProgrammeIntro";
import { TestimonialsCarousel } from "@/components/marketing/landing/TestimonialsCarousel";
import { Founder } from "@/components/marketing/landing/Founder";
import { OutcomePillars } from "@/components/marketing/landing/OutcomePillars";
import { MissingPiece } from "@/components/marketing/landing/MissingPiece";
import { PhaseBreakdown } from "@/components/marketing/landing/PhaseBreakdown";
import { Outcomes } from "@/components/marketing/landing/Outcomes";
import { FaqAccordion } from "@/components/marketing/landing/FaqAccordion";
import { FinalCta } from "@/components/marketing/landing/FinalCta";
import { StillNotSure } from "@/components/marketing/landing/StillNotSure";
import { LANDING_FAQS } from "@/lib/marketing/faq";
import { buildPageMetadata, faqPageJsonLd } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Life Beyond Survival Mode",
  description:
    "Learn the 8-week framework that helps capable women understand why they keep getting stuck, what their body has been protecting, and how to begin creating change their nervous system can hold.",
  path: "/",
});

export default function MarketingHomePage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(LANDING_FAQS)} />
      <Hero />
      <TransformationVision />
      <DailyReality />
      <BridgeMapCta />
      <Reassurance />
      <ProgrammeIntro />
      <TestimonialsCarousel />
      <Founder />
      <OutcomePillars />
      <MissingPiece />
      <PhaseBreakdown />
      <Outcomes />
      <FaqAccordion />
      <FinalCta />
      <StillNotSure />
    </>
  );
}
