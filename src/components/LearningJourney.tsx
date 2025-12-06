"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Layout, Server, Workflow } from "lucide-react"
import { learningPaths } from "@/constants/skills"

interface LearningJourneyProps {
  selectedPath: string | null
  onPathSelect: (pathId: string | null) => void
}

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout size={20} />,
  Server: <Server size={20} />,
  Workflow: <Workflow size={20} />,
}

export default function LearningJourney({ selectedPath, onPathSelect }: LearningJourneyProps) {
  const handlePathSelect = (pathId: string) => {
    onPathSelect(selectedPath === pathId ? null : pathId)
  }

  return (
    <motion.div
      className="space-y-6"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="show"
    >
      {learningPaths.map((path) => (
        <motion.div
          key={path.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border rounded-lg overflow-hidden"
          whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <motion.button
            onClick={() => handlePathSelect(path.id)}
            className="w-full flex items-center justify-between p-4 bg-card hover:bg-muted/50 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {iconMap[path.icon]}
              </motion.div>
              <div className="text-left">
                <h3 className="font-medium text-lg">{path.name}</h3>
                <p className="text-sm text-muted-foreground">{path.description}</p>
              </div>
            </div>
            <motion.div animate={{ rotate: selectedPath === path.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={20} />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {selectedPath === path.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  height: { duration: 0.3 },
                  opacity: { duration: 0.2 },
                }}
                className="overflow-hidden"
              >
                <div className="p-4 border-t bg-muted/20">
                  <div className="space-y-3">
                    {path.nodes.map((node) => (
                      <motion.div
                        key={node.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-card rounded-lg border"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{node.name}</h4>
                            <p className="text-xs text-muted-foreground">{node.description}</p>
                          </div>
                          {node.isCompleted && (
                            <span className="text-xs font-semibold text-green-600 dark:text-green-400">✓ Done</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  )
}
