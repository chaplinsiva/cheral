/* agent-notes: { ctx: "Root layout for Cheral Next.js app with Google Fonts and metadata", deps: [src/app/globals.css], state: active, last: "sato@2026-07-26" } */
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
  title: "Cheral — Traveling Historical Trust | Verified Heritage & Ancient Journeys",
  description: "Discover verified ancient heritage, historical travel itineraries, and cultural trust with Cheral. Exploring Chola, Chera, and coastal historical marvels.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/logos/Final Cheral logo copy.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/logos/Final Cheral logo copy.png",
  },
  openGraph: {
    title: "Cheral — Traveling Historical Trust",
    description: "Verified historical travel, heritage exploration, and cultural itineraries.",
    siteName: "Cheral",
    images: [
      {
        url: "/logos/Cheral eng logo copy.png",
        width: 800,
        height: 600,
        alt: "Cheral Historical Trust Logo",
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
