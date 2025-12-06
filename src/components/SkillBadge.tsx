"use client"

import { motion } from "framer-motion"
import Tooltip from "./Tooltip"

interface SkillBadgeProps {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  index: number
}

export default function SkillBadge({ name, level, index }: SkillBadgeProps) {
  const getLevelColor = () => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "Intermediate":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "Advanced":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "Expert":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    }
  }

  const tooltipContent = (
    <div className="flex flex-col items-center">
      <span className="font-medium mb-1">{level}</span>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${
            level === "Beginner"
              ? "w-1/4 bg-blue-500"
              : level === "Intermediate"
                ? "w-2/4 bg-green-500"
                : level === "Advanced"
                  ? "w-3/4 bg-purple-500"
                  : "w-full bg-amber-500"
          }`}
        />
      </div>
    </div>
  )

  return (
    <Tooltip content={tooltipContent}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ scale: 1.05 }}
        className={`px-4 py-2 rounded-full font-medium text-sm cursor-help transition-colors ${getLevelColor()}`}
      >
        {name}
      </motion.div>
    </Tooltip>
  )
}
