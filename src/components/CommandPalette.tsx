"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

const commands = [
  { label: "Home", path: "/", keywords: ["home", "start"] },
  { label: "About", path: "/about", keywords: ["about", "bio", "info"] },
  { label: "Projects", path: "/projects", keywords: ["projects", "work", "portfolio"] },
  { label: "Tech Stack", path: "/tech-stack", keywords: ["tech", "skills", "stack"] },
  { label: "Blog", path: "/blog", keywords: ["blog", "articles", "posts"] },
  { label: "Contact", path: "/contact", keywords: ["contact", "email", "reach"] },
]

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase()
    return cmd.label.toLowerCase().includes(searchLower) || cmd.keywords.some((kw) => kw.includes(searchLower))
  })

  const handleSelect = (path: string) => {
    router.push(path)
    setIsOpen(false)
    setSearch("")
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 w-96 z-50 bg-card border rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b">
              <Search size={18} className="text-muted-foreground" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, index) => (
                  <motion.button
                    key={cmd.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(cmd.path)}
                    className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors text-sm"
                  >
                    {cmd.label}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground text-sm">No commands found</div>
              )}
            </div>

            <div className="px-4 py-2 border-t text-xs text-muted-foreground flex justify-between">
              <span>Press ESC to close</span>
              <span>Press Cmd+K to toggle</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-xs flex items-center gap-2 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Search size={16} />
        <span className="hidden sm:inline">Cmd+K</span>
      </motion.button>
    </>
  )
}
