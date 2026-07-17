import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/marketing/CookieConsent";
import { MarketingFooter } from "@/components/marketing/Footer";
import { Ga4WithConsent } from "@/components/marketing/Ga4WithConsent";
import { HealingRevolutionPopup } from "@/components/marketing/HealingRevolutionPopup";
import { JsonLd } from "@/components/marketing/JsonLd";
import { MarketingHeader } from "@/components/marketing/MarketingHeader";
import { rootMetadata, siteJsonLd } from "@/lib/marketing/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F6F0E6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Ga4WithConsent />
        <JsonLd data={siteJsonLd()} />
        <div className="flex min-h-dvh flex-col bg-warm-paper font-sans text-soft-ink">
          <MarketingHeader />
          <main className="flex-1">{children}</main>
          <MarketingFooter />
          <HealingRevolutionPopup />
          <CookieConsent />
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
