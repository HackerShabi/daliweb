import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import SyncUser from '@/components/auth/SyncUser';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DaliWeb - Professional Web Development Agency",
  description: "DaliWeb helps local businesses grow online with modern, fast, and mobile-friendly websites. From doctors to hotels, shops to schools - we deliver professional websites in just 7 days.",
  keywords: "web development, website design, local business websites, mobile-friendly, SEO, digital marketing",
  authors: [{ name: "DaliWeb Team" }],
  openGraph: {
    title: "DaliWeb - Professional Web Development Agency",
    description: "Professional websites for local businesses. Fast delivery, affordable pricing, mobile-friendly design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaliWeb - Professional Web Development Agency",
    description: "Professional websites for local businesses. Fast delivery, affordable pricing, mobile-friendly design.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <SyncUser />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
