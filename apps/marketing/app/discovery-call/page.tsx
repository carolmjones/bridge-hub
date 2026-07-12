import type { Metadata } from "next";
import { DiscoveryCallPage } from "@/components/marketing/discovery-call/DiscoveryCallPage";
import { buildPageMetadata } from "@/lib/marketing/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Free Discovery Call",
  description:
    "15 minutes, free, no commitment. A conversation with Caroline Jones before you decide on anything.",
  path: "/discovery-call",
  noIndex: true,
});

export default function DiscoveryCallRoute() {
  return <DiscoveryCallPage />;
}
