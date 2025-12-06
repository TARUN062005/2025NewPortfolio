import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MessageSquare } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="https://github.com/TARUN062005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={24} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </Link>
            <Link
              href="https://x.com/princet40578627"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </Link>
            <Link
              href="mailto:princetarunvemuri@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={24} />
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Contact"
            >
              <MessageSquare size={24} />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">© {currentYear} Alex Chen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
