import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexaria",
  description: "Local AI-powered optimizer for CVs, posts and emails.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {/* GLOBAL NAVBAR */}
          <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-black/60 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/Nexaria-Logo.png"
                  alt="Nexaria logo"
                  width={32}
                  height={32}
                  priority
                  className="rounded-md bg-transparent"
                />
                <span className="font-semibold tracking-tight text-lg">
                  Nexaria
                </span>
              </Link>

              {/* NAV LINKS */}
              <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
                <Link href="/optimize" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                  Optimize
                </Link>
                <a href="/#features" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                  Features
                </a>
                <a href="/#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-50">
                  Pricing
                </a>

                <ThemeToggle />

                <Button
                  variant="outline"
                  className="h-8 px-3 text-xs border-zinc-300 dark:border-zinc-700
                             dark:bg-zinc-900 dark:text-zinc-100"
                >
                  Login
                </Button>
              </nav>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
