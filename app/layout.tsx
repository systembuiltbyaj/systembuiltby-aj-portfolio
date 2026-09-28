import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChromeGate, MainShell } from "@/components/layout/chrome-gate";
import { NameRevealIntro } from "@/components/intro/name-reveal-intro";
import { DeferredChatBubble } from "@/components/chat/deferred-chat-bubble";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, siteGraph } from "@/lib/structured-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AJ Bactad, AI Automation & Business Systems Engineer | System Built by AJ",
    template: "%s | System Built by AJ",
  },
  description:
    "AJ Bactad is a Certified GoHighLevel Admin who builds CRM, automation and AI systems with GoHighLevel, n8n, Zapier, AI agents and custom apps, so leads get followed up and work stops being done by hand.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "System Built by AJ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans bg-[#08060e] relative overflow-x-hidden">
        <JsonLd data={siteGraph()} />
        <NameRevealIntro />
        {/* Ambient background blobs */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[#2a0a5e]/60 blur-[180px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1a0640]/70 blur-[160px]" />
          <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full bg-[#1e0a50]/40 blur-[140px]" />
          <div className="absolute bottom-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#3a0f7a]/25 blur-[100px]" />
        </div>
        <div className="relative z-10">
          <ChromeGate>
            <Navbar />
          </ChromeGate>
          <MainShell>{children}</MainShell>
          <ChromeGate>
            <Footer />
          </ChromeGate>
        </div>
        <ChromeGate>
          <DeferredChatBubble />
        </ChromeGate>
      </body>
    </html>
  );
}
