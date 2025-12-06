"use client"

import { useReducedMotion as useFramerReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

export function useReducedMotion() {
  // Get the user's preference from the OS
  const shouldReduceMotion = useFramerReducedMotion()

  // Add a state to track if we're in a high-performance environment
  const [isHighPerformance, setIsHighPerformance] = useState(true)

  useEffect(() => {
    // Check if the device is likely to be low-powered
    const checkPerformance = () => {
      // Simple heuristic: check if it's a mobile device with a small screen
      const isMobile = window.innerWidth < 768
      const isLowPowered =
        // Check if the device has a low memory limit
        ((navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory < 4) ||
        // Check if the device has a slow CPU
        ((navigator as any).hardwareConcurrency !== undefined && (navigator as any).hardwareConcurrency < 4)

      setIsHighPerformance(!(isMobile && isLowPowered))
    }

    checkPerformance()

    // Recheck on resize
    window.addEventListener("resize", checkPerformance)
    return () => window.removeEventListener("resize", checkPerformance)
  }, [])

  // Return true if we should reduce motion (either by user preference or device capability)
  return shouldReduceMotion || !isHighPerformance
}
