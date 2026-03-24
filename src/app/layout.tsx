import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/layout/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Growthers — AI-Native Growth Marketing Agency",
    template: "%s | Growthers",
  },
  description:
    "Sviluppiamo strategie di growth marketing potenziate dall'AI. 30+ progetti AI in produzione, 10+ framework proprietari, 13 MCP integrati.",
  keywords: [
    "growth marketing",
    "AI marketing",
    "performance marketing",
    "lead generation",
    "marketing automation",
    "MCP",
    "intelligenza artificiale",
  ],
  openGraph: {
    title: "Growthers — AI-Native Growth Marketing Agency",
    description:
      "Growth Marketing potenziato dall'Intelligenza Artificiale. Non ne parliamo. Lo facciamo.",
    url: "https://growthers.io",
    siteName: "Growthers",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#050505] text-[#f5f2ef]">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
