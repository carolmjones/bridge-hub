import { AnnouncementBar } from "@/components/marketing/AnnouncementBar";
import { MarketingNav } from "@/components/marketing/Nav";

/** Banner above nav — matches Claude design order. */
export function MarketingHeader() {
  return (
    <>
      <AnnouncementBar />
      <MarketingNav />
    </>
  );
}
