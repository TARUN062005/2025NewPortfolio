import type { Metadata } from "next"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "Blog | Tarun - Full Stack Developer",
  description: "Read Tarun's articles on web development, programming, and technology.",
}

export default function BlogPage() {
  return <BlogPageClient />
}
