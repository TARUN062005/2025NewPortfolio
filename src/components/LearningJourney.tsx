"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, Layout, Server, Workflow, 
  CheckCircle2, Circle, ArrowRight 
} from "lucide-react"
import { learningPaths } from "@/constants/skills"

interface LearningJourneyProps {
  selectedPath: string | null
  onPathSelect: (pathId: string | null) => void
}

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout size={18} />,
  Server: <Server size={18} />,
  Workflow: <Workflow size={18} />,
}

export default function LearningJourney({ selectedPath, onPathSelect }: LearningJourneyProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      {learningPaths.map((path) => {
        const isExpanded = selectedPath === path.id
        
        return (
          <div 
            key={path.id} 
            className={`group border rounded-2xl transition-all duration-300 ${
              isExpanded 
                ? "bg-card border-primary/30 shadow-sm" 
                : "bg-card/50 hover:bg-card border-border/50 hover:border-primary/20"
            }`}
          >
            {/* Header / Trigger */}
            <button
              onClick={() => onPathSelect(isExpanded ? null : path.id)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isExpanded ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                }`}>
                  {iconMap[path.icon] || <Workflow size={18} />}
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">{path.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{path.description}</p>
                </div>
              </div>
              
              <div className={`p-2 rounded-full transition-colors ${isExpanded ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform duration-500 ease-in-out ${isExpanded ? "rotate-180" : ""}`} 
                />
              </div>
            </button>

            {/* Path Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="px-6 pb-8 pt-2">
                    <div className="relative pl-8 space-y-6">
                      {/* The Timeline Vertical Line */}
                      <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/40 via-primary/10 to-transparent" />

                      {path.nodes.map((node, idx) => (
                        <motion.div
                          key={node.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="relative"
                        >
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 bg-background z-10 flex items-center justify-center ${
                            node.isCompleted ? "border-primary" : "border-muted-foreground/30"
                          }`}>
                            {node.isCompleted && <div className="w-1.5 h-1.5 bg-primary rounded-full" />}
                          </div>

                          <div className="bg-secondary/20 border border-border/40 rounded-xl p-4 hover:border-primary/20 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-sm md:text-base text-foreground">
                                    {node.name}
                                  </h4>
                                  {node.isCompleted && (
                                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                                      Mastered
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                  {node.description}
                                </p>
                              </div>
                              
                              {node.isCompleted ? (
                                <CheckCircle2 className="shrink-0 text-primary w-5 h-5" />
                              ) : (
                                <Circle className="shrink-0 text-muted-foreground/30 w-5 h-5" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Final 'Next' Step Indicator */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: path.nodes.length * 0.1 }}
                        className="flex items-center gap-3 pl-2 text-xs font-medium text-muted-foreground italic"
                      >
                        <ArrowRight size={14} className="text-primary" />
                        Next evolution in progress...
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}