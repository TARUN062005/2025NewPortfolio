"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { getToasts, dismissToast } = useToast()
  const [toasts, setToasts] = useState<ReturnType<typeof getToasts>>([])

  useEffect(() => {
    // Update toasts when they change
    const interval = setInterval(() => {
      setToasts(getToasts())
    }, 100)

    return () => clearInterval(interval)
  }, [getToasts])

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end p-4 gap-2 max-w-[420px]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="bg-card border rounded-lg shadow-lg p-4 flex items-start gap-3 w-full"
          >
            <div className="flex-1">
              {toast.title && <h3 className="font-semibold">{toast.title}</h3>}
              {toast.description && <p className="text-sm text-muted-foreground">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close toast"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
