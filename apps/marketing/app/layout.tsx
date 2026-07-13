import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import { MarketingFooter } from "@/components/marketing/Footer";
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
  const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {ga4Id ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
            </Script>
          </>
        ) : null}
        <JsonLd data={siteJsonLd()} />
        <div className="flex min-h-dvh flex-col bg-warm-paper font-sans text-soft-ink">
          <MarketingHeader />
          <main className="flex-1">{children}</main>
          <MarketingFooter />
          <HealingRevolutionPopup />
        </div>
      </body>
    </html>
  );
}
