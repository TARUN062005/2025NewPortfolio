"use client"

import { useState, useEffect, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./ThemeToggle"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Tech Stack", path: "/tech-stack" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
]

const NavLink = memo(({ item, isActive }: any) => (
  <Link
    href={item.path}
    className={`relative text-sm font-semibold tracking-wide transition-all hover:text-primary ${
      isActive ? "text-primary" : "text-muted-foreground/80"
    }`}
  >
    {item.name}
    {isActive && (
      <motion.span 
        layoutId="nav-underline"
        className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 to-purple-600" 
      />
    )}
  </Link>
))
NavLink.displayName = "NavLink"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when route changes or window resizes
  useEffect(() => {
    setIsOpen(false)
    document.body.style.overflow = "unset"
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = !isOpen ? "hidden" : "unset"
  }

  return (
    <header
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? "py-3 bg-background/70 backdrop-blur-xl border-b border-white/10 shadow-lg" 
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
            T
          </div>
          <span className="text-xl font-black tracking-tighter group-hover:opacity-80 transition-opacity">
            TARUN<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} isActive={pathname === item.path} />
          ))}
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <ThemeToggle />
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2.5 rounded-xl bg-secondary/50 backdrop-blur-md border border-white/10 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[-1] md:hidden"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-sm bg-background border-l border-white/10 shadow-2xl z-50 md:hidden p-8 pt-24"
            >
              <div className="flex flex-col space-y-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Navigation</p>
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center justify-between text-2xl font-bold tracking-tight py-2 ${
                        pathname === item.path ? "text-blue-500" : "text-foreground"
                      }`}
                    >
                      {item.name}
                      {pathname === item.path && <ArrowRight size={20} />}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-10 border-t border-white/5 mt-auto">
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">Let's build something new.</p>
                    <Link 
                      href="/contact"
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-bold text-center shadow-lg shadow-blue-500/20"
                    >
                      Hire Me
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}