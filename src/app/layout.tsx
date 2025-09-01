import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alkitab HKBP Perawang - Terjemahan Baru & Bahasa Batak Toba",
  description: "Baca Alkitab Online dalam Terjemahan Baru dan Bahasa Batak Toba. Dilengkapi dengan pencarian kitab, pasal, dan ayat.",
  keywords: ["Alkitab", "HKBP", "Terjemahan Baru", "Batak Toba", "Bible", "Perawang"],
  authors: [{ name: "HKBP Perawang" }],
  openGraph: {
    title: "Alkitab HKBP Perawang",
    description: "Baca Alkitab Online dalam Terjemahan Baru dan Bahasa Batak Toba",
    url: "https://alkitab.hkbpperawang.org",
    siteName: "Alkitab HKBP Perawang",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alkitab HKBP Perawang",
    description: "Baca Alkitab Online dalam Terjemahan Baru dan Bahasa Batak Toba",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
