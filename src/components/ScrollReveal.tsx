"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}

export default function ScrollReveal({ children, delay = 0, direction = "up", duration = 0.5 }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const directionMap = {
    up: { initial: { y: 40 }, animate: { y: 0 } },
    down: { initial: { y: -40 }, animate: { y: 0 } },
    left: { initial: { x: 40 }, animate: { x: 0 } },
    right: { initial: { x: -40 }, animate: { x: 0 } },
  }

  const variants = {
    ...directionMap[direction],
    initial: {
      ...directionMap[direction].initial,
      opacity: 0,
    },
    animate: {
      ...directionMap[direction].animate,
      opacity: 1,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
