import { AnnouncementBar } from "@/components/marketing/AnnouncementBar";
import { Hero } from "@/components/marketing/landing/Hero";
import { TransformationVision } from "@/components/marketing/landing/TransformationVision";

export default function MarketingHomePage() {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      <TransformationVision />
    </>
  );
}
