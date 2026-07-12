import type { Metadata } from "next";
import { DiscoveryCallPage } from "@/components/marketing/discovery-call/DiscoveryCallPage";

export const metadata: Metadata = {
  title: "Book a Free Discovery Call | The Bridge Hub",
  description:
    "15 minutes, free, no commitment. A conversation with Caroline Jones before you decide on anything.",
};

export default function DiscoveryCallRoute() {
  return <DiscoveryCallPage />;
}
