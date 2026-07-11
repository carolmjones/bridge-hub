import type { Metadata } from "next";
import { SpeakingPage } from "@/components/marketing/work-with-me/SpeakingPage";

export const metadata: Metadata = {
  title: "Keynote Speaking | The Bridge Hub",
  description:
    "Book Caroline Jones for keynotes on stress, burnout, trauma, and nervous system regulation — healthcare keynote specialist in Ireland.",
};

export default function SpeakingRoute() {
  return <SpeakingPage />;
}
