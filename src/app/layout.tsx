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
  title: "Alex Chen | Full Stack Developer | React & Next.js Expert",
  description:
    "Professional portfolio of Alex Chen, a full stack developer specializing in React, Next.js, Node.js, and modern web technologies. 6+ years of experience building scalable web applications.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "TypeScript",
    "Node.js",
    "Web Development",
  ],
  authors: [{ name: "Alex Chen" }],
  creator: "Alex Chen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alexchen.dev",
    title: "Alex Chen | Full Stack Developer",
    description: "Professional portfolio showcasing full stack development expertise",
    images: [
      {
        url: "https://alexchen.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Chen Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Chen | Full Stack Developer",
    description: "Professional portfolio showcasing full stack development expertise",
    creator: "@alexchen",
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
        <link rel="canonical" href="https://alexchen.dev" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <div className="flex min-h-screen flex-col md:flex-row">
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
