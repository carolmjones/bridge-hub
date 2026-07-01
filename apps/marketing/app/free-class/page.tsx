import type { Metadata } from "next";
import { FreeClassPage } from "@/components/marketing/free-class/FreeClassPage";

export const metadata: Metadata = {
  title: "Life Beyond Survival Mode — Free Class | The Bridge Hub",
  description:
    "A free class on why everything you have tried keeps failing, and what has to change first.",
};

export default function FreeClassRoute() {
  return <FreeClassPage />;
}
