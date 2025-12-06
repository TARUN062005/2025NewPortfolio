import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact | Tarun - Full Stack Developer",
  description: "Get in touch with me for project inquiries, collaborations, or just to say hello.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
