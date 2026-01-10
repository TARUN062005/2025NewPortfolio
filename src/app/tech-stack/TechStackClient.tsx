"use client"

import { useState } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import SectionHeading from "@/components/SectionHeading"
import SkillCategory from "@/components/SkillCategory"
import LearningJourney from "@/components/LearningJourney"
import { skillCategories, learningPaths } from "@/constants/skills"
import { 
  Sparkles, TrendingUp, Rocket, 
  Cpu, Cloud, Shield, CheckCircle, ChevronRight 
} from "lucide-react"

export default function TechStackClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  
  // Calculate total mastery for the progress bar
  const totalNodes = learningPaths.reduce((acc, path) => acc + path.nodes.length, 0)
  const completedNodes = learningPaths.reduce((acc, path) => 
    acc + path.nodes.filter(n => n.isCompleted).length, 0
  )
  const masteryPercentage = Math.round((completedNodes / totalNodes) * 100)

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="relative flex flex-col gap-12 py-16 md:py-24 overflow-hidden bg-background">
      {/* Soft Background Glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-primary">Technical Ecosystem</span>
          </div>
          <SectionHeading
            title="Professional Expertise"
            subtitle="A curated stack of technologies I use to build high-performance digital products."
            centered
          />
        </motion.div>

        {/* Minimalist Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Domains", value: skillCategories.length },
            { label: "Technologies", value: skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0) },
            { label: "Experience", value: "3+ Years" },
            { label: "Learning", value: "Active" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 text-center"
            >
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Category Filter - Mobile Scrollable */}
        <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar -mx-4 px-4 md:mx-0 md:justify-center gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null 
              ? "bg-primary text-primary-foreground shadow-md" 
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            All Stack
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.name 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Smooth Grid Transition */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {skillCategories
                .filter(c => !activeCategory || c.name === activeCategory)
                .map((category, index) => (
                  <SkillCategory key={category.name} category={category} index={index} />
                ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Learning Journey Section */}
        <div className="mt-32 pt-16 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-2">Learning Trajectory</h3>
              <p className="text-muted-foreground">Detailed progression of my core competency paths.</p>
            </div>
            
            {/* Bonus: Mastery Progress Bar */}
            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Overall Mastery</span>
                <span>{masteryPercentage}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${masteryPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </div>
          
          <LearningJourney 
            selectedPath={selectedPath} 
            onPathSelect={setSelectedPath} 
          />
        </div>

        {/* Collaboration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 bg-gradient-to-b from-card to-background border border-border/50 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to build something next-gen?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Currently open to full-stack opportunities and technical collaborations.
          </p>
          <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1">
            Get In Touch
          </button>
        </motion.div>
      </div>
    </div>
  )
}