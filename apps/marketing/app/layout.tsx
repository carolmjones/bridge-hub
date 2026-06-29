import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { MarketingFooter } from "@/components/marketing/Footer";
import { MarketingNav } from "@/components/marketing/Nav";
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

export const metadata: Metadata = {
  title: "The Bridge Hub",
  description:
    "Trauma-informed nervous system screening and support for women ready to feel like themselves again.",
};

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
        <div className="flex min-h-dvh flex-col bg-warm-paper font-sans text-soft-ink">
          <MarketingNav />
          <main className="flex-1">{children}</main>
          <MarketingFooter />
        </div>
      </body>
    </html>
  );
}
