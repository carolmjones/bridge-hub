import Link from "next/link";
import { MARKETING_ROUTES } from "@/lib/marketing/routes";

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-warm-paper px-6 py-24 text-center">
      <h1 className="font-serif text-3xl text-ink">Page not found</h1>
      <p className="mt-4 max-w-md font-sans text-body text-soft-ink">
        This page is not built yet. Head back to the home page or The Bridge
        Map.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href={MARKETING_ROUTES.home}
          className="inline-flex h-12 items-center rounded-[14px] bg-btn-primary px-6 font-sans text-body font-medium text-btn-text"
        >
          Home
        </Link>
        <Link
          href={MARKETING_ROUTES.bridgeMap}
          className="inline-flex h-12 items-center font-sans text-body text-sage underline underline-offset-2"
        >
          The Bridge Map
        </Link>
      </div>
    </section>
  );
}
