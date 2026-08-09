import type { Metadata } from "next";
import { Fraunces, Manrope, Inter } from "next/font/google";
import "./globals.css";

// Elegant display serif for headings, refined sans for UI/body.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Yana Travels — Reach your dream with us",
    template: "%s | Yana Travels",
  },
  description:
    "Yana Travels — domestic and international group and customized tours, pilgrimage packages, weekend getaways, and travel services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${manrope.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-bg-main text-text-main">{children}</body>
    </html>
  );
}
