"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink, Calendar, MapPin, Briefcase, ArrowRight } from "lucide-react"
import type { TimelineEvent } from "@/constants/timeline"

interface TimelineItemProps {
  event: TimelineEvent
  index: number
}

export default function TimelineItem({ event, index }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{event.date}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            
            <p className="text-muted-foreground">{event.description}</p>
          </div>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t space-y-4">
                {(event.location || event.company) && (
                  <div className="flex flex-wrap gap-4">
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="text-purple-500" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                    )}
                    {event.company && (
                      <div className="flex items-center gap-2 text-sm">
                        <Briefcase size={16} className="text-green-500" />
                        <span className="text-muted-foreground">{event.company}</span>
                      </div>
                    )}
                  </div>
                )}

                {event.achievements && event.achievements.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {event.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                        >
                          <ArrowRight size={12} className="text-blue-500 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {event.technologies && event.technologies.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {event.link && (
                  <motion.a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Learn more
                    <ExternalLink size={14} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}