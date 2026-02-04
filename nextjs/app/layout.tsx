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
