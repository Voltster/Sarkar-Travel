import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FloatingSupport } from "@/components/shared";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const magnetik = localFont({
  src: [
    {
      path: "../../public/font/magnetik/Magnetik-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/magnetik/Magnetik-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/magnetik/Magnetik-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/magnetik/Magnetik-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-magnetik",
});

export const metadata: Metadata = {
  title: "Ananta Yatras | Sacred Pilgrimages & Spiritual Journeys",
  description: "Embark on a divine journey of a lifetime. Experience meticulously curated Yatras, Char Dham, Jyotirlinga, Devi Shaktipeeths, and spiritual retreats across the timeless land of Bharat.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${magnetik.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased font-sans bg-background text-foreground"
      >
        <div className="diya-overlay" />
        <ScrollToTop />
        <Navbar />
        {children}
        <Footer />
        <FloatingSupport />
      </body>
    </html>
  );
}
