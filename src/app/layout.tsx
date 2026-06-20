import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Narrative Rotator — Autonomous AI Trading Agent on BNB Chain",
  description: "AI-powered narrative rotator scanning market sentiment across sectors and autonomously rotating portfolio via Trust Wallet Agent Kit. Built for BNB Hack 2026.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

import Web3ModalProvider from "@/context/Web3ModalProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-[#0c0a09] text-stone-300 antialiased">
        <Web3ModalProvider>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  );
}
