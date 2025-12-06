import type { Metadata } from "next"
import ProjectsPageClient from "./ProjectsPageClient"

export const metadata: Metadata = {
  title: "Projects | Tarun - Full Stack Developer",
  description:
    "Explore  Tarun's portfolio of web development projects, including frontend, backend, and full stack applications.",
}

export default function ProjectsPage() {
  return <ProjectsPageClient />
}