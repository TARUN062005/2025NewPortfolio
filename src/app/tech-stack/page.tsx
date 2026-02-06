import type { Metadata } from "next"
import TechStackClient from "./TechStackClient"

export const metadata: Metadata = {
  title: "Tech Stack | VEMURI PRINCE TARUN",
  description: "Explore Tarun's technical skills, programming languages, tools, and learning journey.",
}

export default function TechStackPage() {
  return <TechStackClient />
}
