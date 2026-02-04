import type { Metadata } from "next";
import { Chivo, Karla } from "next/font/google";
import "./globals.css";

const chivo = Chivo({
  variable: "--font-chivo",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WSSC Water - Redesign Proposal",
  description: "Modern, mobile-optimized water utility website redesign proposal",
  manifest: "/manifest.json",
  themeColor: "#0066CC",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WSSC Water",
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chivo.variable} ${karla.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
