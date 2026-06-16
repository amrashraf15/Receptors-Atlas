import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { Cormorant_Garamond, Manrope } from "next/font/google";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Receptor Atlas",
  description:
    "Explore receptor families, pathways, interactions, and scientific relationships through a modern receptor discovery platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body
        className="
          min-h-screen
          bg-background
          text-foreground
          antialiased
          overflow-x-hidden
          relative
          font-body
        "
      >
        {/* Atmospheric Background */}
        <div
          aria-hidden
          className="
            fixed inset-0
            pointer-events-none
            z-0
          "
        >
          {/* Gradient Mesh */}
          <div className="absolute inset-0 mesh-bg" />

          {/* Scientific Glow */}
          <div className="absolute left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-accent/10 blur-[140px]" />

          <div className="absolute right-[5%] top-[20%] h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[140px]" />

          <div className="absolute bottom-[10%] left-[30%] h-[450px] w-[450px] rounded-full bg-accent/5 blur-[120px]" />

          {/* Noise Layer */}
          <div className="absolute inset-0 noise-overlay" />

          {/* Scientific Grid */}
          <div className="absolute inset-0 scientific-grid opacity-[0.04]" />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}