import type { Metadata } from "next";
import { CoachingPage } from "@/components/marketing/work-with-me/CoachingPage";

export const metadata: Metadata = {
  title: "The Bridge Programme | The Bridge Hub",
  description:
    "Eight weeks, one to one, built entirely around your nervous system profile.",
};

export default function CoachingRoute() {
  return <CoachingPage />;
}
