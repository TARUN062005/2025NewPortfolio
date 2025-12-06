"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeading from "@/components/SectionHeading"
import SkillCategory from "@/components/SkillCategory"
import LearningJourney from "@/components/LearningJourney"
import { skillCategories } from "@/constants/skills"
import { Code2, Cpu, Database, Globe, Layers, Rocket, Sparkles, TrendingUp, Wrench, Users, BookOpen, Shield, CheckCircle } from "lucide-react"

export default function TechStackClient() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const floatingIcons = [
    { Icon: Code2, top: "20%", left: "5%", delay: 0 },
    { Icon: Cpu, top: "15%", right: "10%", delay: 0.2 },
    { Icon: Database, bottom: "25%", left: "8%", delay: 0.4 },
    { Icon: Globe, bottom: "20%", right: "7%", delay: 0.6 },
    { Icon: Layers, top: "35%", left: "12%", delay: 0.8 },
  ]

  return (
    <div className="relative flex flex-col gap-16 py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
        
        {/* Floating Tech Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            className={`absolute hidden lg:block ${item.top} ${item.bottom} ${item.left} ${item.right}`}
          >
            <item.Icon className="h-8 w-8 text-primary/20" />
          </motion.div>
        ))}
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tech Stack</span>
          </div>
          
          <SectionHeading
            title="Technical Expertise"
            subtitle="Technologies and skills I've mastered throughout my development journey"
            centered
          />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30">
            <div className="text-2xl font-bold text-primary">
              {skillCategories.length}
            </div>
            <div className="text-sm text-muted-foreground">Skill Categories</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30">
            <div className="text-2xl font-bold text-primary">
              {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Skills</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30">
            <div className="text-2xl font-bold text-primary">6+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/30">
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Continuous Learning</div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === null
                  ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              All Categories
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.icon && <category.icon className="h-4 w-4" />}
                {category.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skillCategories
                .filter(category => activeCategory === null || category.name === activeCategory)
                .map((category, index) => (
                  <motion.div
                    key={category.name}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <SkillCategory 
                      key={category.name} 
                      category={category} 
                      index={index}
                      isActive={activeCategory === category.name || activeCategory === null}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 mb-20"
        >
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-y py-16">
            <div className="max-w-3xl mx-auto text-center px-4">
              <div className="inline-flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">Expertise Summary</h3>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  With extensive experience across the full stack, I specialize in building scalable, 
                  performant applications using modern technologies.
                </p>
                <p>
                  My expertise spans from creating pixel-perfect UIs with React and TypeScript to 
                  architecting robust backend systems with Node.js and cloud infrastructure.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Rocket className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium">Cloud Architecture</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium">DevOps & CI/CD</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Learning Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Learning Path</span>
            </div>
            
            <SectionHeading
              title="Learning Journey"
              subtitle="Explore the paths I've taken to master different technology stacks"
              centered
            />
            
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Each path represents a technology stack I've mastered, from initial learning 
              through to advanced implementation and production experience.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12"
          >
            <LearningJourney 
              onPathSelect={setSelectedPath} 
              selectedPath={selectedPath}
            />
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-card border rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let's discuss how my technical expertise can help bring your project to life.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Let's Collaborate
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/4 w-4 h-4 bg-primary/10 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-secondary/10 rounded-full hidden lg:block"
      />
    </div>
  )
}