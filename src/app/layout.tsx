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
  title: "VEMURI PRINCE TARUN | Full Stack Developer | React & Next.js Expert",
  description:
    "Professional portfolio of VEMURI PRINCE TARUN, a full stack developer specializing in React, Next.js, Node.js, and modern web technologies. 6+ years of experience building scalable web applications.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "TypeScript",
    "Node.js",
    "Web Development",
  ],
  authors: [{ name: "VEMURI PRINCE TARUN" }], // Fixed: Changed from "Alex Chen" to your name
  creator: "VEMURI PRINCE TARUN", // Fixed: Changed from "Alex Chen" to your name
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tarun-vemuri.vercel.app", // Fixed: Updated to your actual URL
    title: "VEMURI PRINCE TARUN | Full Stack Developer",
    description: "Professional portfolio showcasing full stack development expertise",
    images: [
      {
        url: "https://tarun-vemuri.vercel.app/og-image.jpg", // Fixed: Updated to your actual URL
        width: 1200,
        height: 630,
        alt: "VEMURI PRINCE TARUN Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VEMURI PRINCE TARUN | Full Stack Developer",
    description: "Professional portfolio showcasing full stack development expertise",
    creator: "@Tarun-Vemuri",
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
        <link rel="canonical" href="https://tarun-vemuri.vercel.app/" />
        {/* Preload theme to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Set dark theme as default
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  // Default to dark if no stored preference
                  if (!stored) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // Fallback: always dark
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" // Changed from "light" to "dark"
          enableSystem={true}
          enableColorScheme={true}
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