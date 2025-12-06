"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, BookOpen, Layout, Server, Database, Wrench } from "lucide-react"
import type { SkillCategory as SkillCategoryType } from "@/constants/skills"

interface SkillCategoryProps {
  category: SkillCategoryType
  index: number
}

const iconMap: Record<string, React.ReactNode> = {
  Code: <Code size={24} />,
  BookOpen: <BookOpen size={24} />,
  Layout: <Layout size={24} />,
  Server: <Server size={24} />,
  Database: <Database size={24} />,
  Wrench: <Wrench size={24} />,
}

export default function SkillCategory({ category, index }: SkillCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const visibleSkills = isExpanded ? category.skills : category.skills.slice(0, 3)
  const hasMoreSkills = category.skills.length > 3

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="border rounded-lg p-6 bg-card hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          variants={iconVariants}
          animate={isHovered ? "hover" : "initial"}
          className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"
        >
          {iconMap[category.icon]}
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <AnimatePresence mode="wait">
          {visibleSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
            >
              {skill.name}
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMoreSkills && !isExpanded && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: visibleSkills.length * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm transition-colors hover:bg-muted/80"
          >
            +{category.skills.length - 3} more
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
