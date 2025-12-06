"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function EasterEgg() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [keySequence, setKeySequence] = useState("")

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Build the key sequence
      const newSequence = (keySequence + e.key.toLowerCase()).slice(-4)
      setKeySequence(newSequence)

      // Check if the sequence ends with "alex"
      if (newSequence.endsWith("Tarun")) {
        setShowCelebration(true)
        // Auto-hide after 3 seconds
        setTimeout(() => setShowCelebration(false), 3000)
        // Reset sequence
        setKeySequence("")
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [keySequence])

  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
        >
          {/* Confetti particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                rotate: 0,
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: 2,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"][Math.floor(Math.random() * 5)],
              }}
            />
          ))}

          {/* Celebration message */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center z-10"
          >
            <motion.h2
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: 2 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2"
            >
              🎉 You Found It! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-muted-foreground"
            >
              Welcome to the secret corner of my portfolio!
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
