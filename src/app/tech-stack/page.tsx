import type { Metadata } from "next"
import TechStackClient from "./TechStackClient"

export const metadata: Metadata = {
  title: "Tech Stack | Alex Chen - Full Stack Developer",
  description: "Explore Alex Chen's technical skills, programming languages, tools, and learning journey.",
}

export default function TechStackPage() {
  return <TechStackClient />
}
