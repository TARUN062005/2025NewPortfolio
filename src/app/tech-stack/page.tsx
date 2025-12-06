import type { Metadata } from "next"
import TechStackClient from "./TechStackClient"

export const metadata: Metadata = {
  title: "Tech Stack | Tarun - Full Stack Developer",
  description: "Explore Tarun's technical skills, programming languages, tools, and learning journey.",
}

export default function TechStackPage() {
  return <TechStackClient />
}
