"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Code, FileText, Mail, Layers } from "lucide-react"
import ThemeToggle from "./ThemeToggle"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: User },
    { name: "Tech Stack", path: "/tech-stack", icon: Layers },
    { name: "Projects", path: "/projects", icon: Code },
    { name: "Blog", path: "/blog", icon: FileText },
    { name: "Contact", path: "/contact", icon: Mail },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-background border-r z-50 flex flex-col items-center py-8">
      <div className="flex flex-col items-center space-y-8 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.path

          return (
            <Link key={item.path} href={item.path} className="w-full">
              <div
                className={`flex items-center justify-center py-3 relative transition-colors duration-100 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <item.icon size={20} />
                <span className="sr-only">{item.name}</span>
                {isActive && <div className="absolute left-0 top-0 h-full w-1 bg-primary rounded-r" />}
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </div>
  )
}
