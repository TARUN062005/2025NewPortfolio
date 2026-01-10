"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Code, Layout, Server, Database, Wrench, 
  BrainCircuit, Cloud, ShieldCheck, Briefcase, Rocket, ChevronDown 
} from "lucide-react"
import type { SkillCategory as SkillCategoryType } from "@/constants/skills"

interface SkillCategoryProps {
  category: SkillCategoryType
  index: number
}

// Extended Icon Map for missing categories
const iconMap: Record<string, React.ReactNode> = {
  "Frontend": <Layout size={20} />,
  "Backend": <Server size={20} />,
  "Database": <Database size={20} />,
  "Tools": <Wrench size={20} />,
  "AI/ML": <BrainCircuit size={20} />,
  "Cloud": <Cloud size={20} />,
  "Security": <ShieldCheck size={20} />,
  "Enterprise": <Briefcase size={20} />,
  "Deployment": <Rocket size={20} />,
  // Default fallback
  "default": <Code size={20} />
}

export default function SkillCategory({ category }: SkillCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Logic to find the best icon based on category name if not explicitly provided
  const getIcon = () => {
    if (iconMap[category.name]) return iconMap[category.name]
    if (category.name.toLowerCase().includes("cloud")) return iconMap["Cloud"]
    if (category.name.toLowerCase().includes("ai")) return iconMap["AI/ML"]
    if (category.name.toLowerCase().includes("security")) return iconMap["Security"]
    if (category.name.toLowerCase().includes("enterprise") || category.name.includes("CRM")) return iconMap["Enterprise"]
    return iconMap["default"]
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          {getIcon()}
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-foreground tracking-tight">{category.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic">
            {category.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 h-fit transition-all duration-300">
        {(isExpanded ? category.skills : category.skills.slice(0, 4)).map((skill) => (
          <span
            key={skill.name}
            className="px-2.5 py-1 text-[11px] font-semibold bg-secondary/30 text-secondary-foreground border border-border/40 rounded-md hover:bg-primary/10 hover:border-primary/20 transition-colors"
          >
            {skill.name}
          </span>
        ))}
        
        {category.skills.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 text-[11px] font-bold text-primary hover:underline"
          >
            {isExpanded ? "Show Less" : `+${category.skills.length - 4} more`}
            <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
    </motion.div>
  )
}