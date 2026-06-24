import { AppShell } from "@/components/AppShell";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SaveScreen } from "@/components/screens/SaveScreen";

export default function SavePage() {
  return (
    <AppShell>
      <SaveScreen />
      <Disclaimer className="px-6 pb-8" />
    </AppShell>
  );
}
