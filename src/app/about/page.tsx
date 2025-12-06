import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About | Tarun - Full Stack Developer",
  description: "Learn about Tarun's journey, skills, and experience as a full stack developer.",
}

export default function AboutPage() {
  return <AboutPageClient />
}
