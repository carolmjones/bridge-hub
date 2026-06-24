import { AppShell } from "@/components/AppShell";

export default function SupportPage() {
  return (
    <AppShell>
      <main className="px-6 py-12">
        <h1 className="font-serif text-xl text-ink">Urgent support</h1>
        <p className="mt-4 font-sans text-body-sm text-soft-ink">
          If you are in crisis, contact your local emergency services or a
          crisis helpline in your country. This screening is not emergency care.
        </p>
      </main>
    </AppShell>
  );
}
