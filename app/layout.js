import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/providers/AppContext";
import Loader from "@/components/layout/Loader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import MenuPanel from "@/components/layout/MenuPanel";
import MenuButton from "@/components/layout/MenuButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata = {
  title: "ZENVOK® | Web Development & Creative Studio",
  description: "We design, develop, and optimize websites that attract customers, convert traffic, and sustain long term growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
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
