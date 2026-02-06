import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import { Toaster } from "../components/Toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tarun Vemuri | Full Stack Developer | React & Next.js",
  description:
    "Official portfolio of Tarun Vemuri, a Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords: [
    "Tarun Vemuri",
    "Vemuri Tarun",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Tarun Vemuri" }],
  creator: "Tarun Vemuri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tarun-vemuri.vercel.app/",
    title: "Tarun Vemuri | Full Stack Developer",
    description: "Official portfolio of Tarun Vemuri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarun Vemuri | Full Stack Developer",
    description: "Official portfolio of Tarun Vemuri",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Google Search Console Verification (EXACT token from GSC) */}
        <meta
          name="google-site-verification"
          content="555ZkeFt3EdQLp-un0PhyYGFae91hXd3uvHsB0f2vLs"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://tarun-vemuri.vercel.app/" />

        {/* Prevent dark-mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const stored = localStorage.getItem("theme");
                  if (!stored) {
                    document.documentElement.classList.add("dark");
                  }
                } catch {
                  document.documentElement.classList.add("dark");
                }
              })();
            `,
          }}
        />
      </head>

      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
        >
          <div className="flex min-h-screen flex-col md:flex-row bg-white dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <div className="flex-1 ml-16 flex flex-col min-h-screen">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
