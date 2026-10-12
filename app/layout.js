import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppContext";
import { Analytics } from '@vercel/analytics/next';
import Loader from "@/components/layout/Loader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import MenuPanel from "@/components/layout/MenuPanel";
import MenuButton from "@/components/layout/MenuButton";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "ZENVOK® Studio | Websites that attract, convert and grow",
  description:
    "ZENVOK® Studio is a digital studio that designs, develops and optimizes websites for ambitious brands, from strategy to launch and ongoing support.",
  openGraph: {
    siteName: "ZENVOK Studio",
    type: "website",
    url: "/",
    title: "ZENVOK® Studio",
    description: "We design, develop, and optimize websites that attract customers, convert traffic, and sustain long term growth.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZENVOK Studio",
  alternateName: ["ZENVOK® Studio", "Zenvok"],
  url: siteUrl,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
        <AppProvider>
          <Loader />
          <SmoothScroll />
          <MenuPanel />
          <MenuButton />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
