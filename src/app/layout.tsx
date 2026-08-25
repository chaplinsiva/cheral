/* agent-notes: { ctx: "Root layout with official Cheral Trust metadata, favicons, and Google Fonts", deps: [src/app/globals.css, public/logos], state: active, last: "sato@2026-08-25" } */
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "CHERAL Trust — Centre for Heritage and Ecological Research through Arts and Literature",
  description: "Non-profit organization committed to conserving natural ecosystems, biodiversity research, historical heritage, and cultural arts education.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/logos/Final Cheral logo copy.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/logos/Final Cheral logo copy.png",
  },
  openGraph: {
    title: "CHERAL Trust — Centre for Heritage and Ecological Research",
    description: "Conservation of natural ecosystems, biodiversity research, and cultural heritage.",
    siteName: "Cheral Trust",
    images: [
      {
        url: "/logos/Cheral eng logo copy.png",
        width: 800,
        height: 600,
        alt: "Cheral Trust Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F3EF] text-[#222222] selection:bg-[#F8D7C6] selection:text-[#222222]">
        {children}
      </body>
    </html>
  );
}
