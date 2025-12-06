"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeading from "@/components/SectionHeading"
import ProjectCard from "@/components/ProjectCard"
import { projects } from "@/constants/projects"
import { Filter, Sparkles, TrendingUp, Zap, X } from "lucide-react"

// Get unique tags from all projects
const allTags = ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags)))]

export default function ProjectsPageClient() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"])
  const [sortBy, setSortBy] = useState<"date" | "featured">("date")

  // Static cache buster - no hydration mismatch
  const CACHE_BUSTER = useMemo(() => {
    return 1 // Static version number
  }, [])

  const handleTagClick = (tag: string) => {
    if (tag === "All") {
      // If "All" is clicked, reset to only "All"
      setSelectedTags(["All"])
    } else {
      setSelectedTags(prev => {
        // Remove "All" if it's in the selection when clicking other tags
        const newTags = prev.filter(t => t !== "All")
        
        // Toggle the clicked tag
        if (newTags.includes(tag)) {
          // Remove the tag if already selected
          const updatedTags = newTags.filter(t => t !== tag)
          // If no tags left, select "All"
          return updatedTags.length === 0 ? ["All"] : updatedTags
        } else {
          // Add the tag if not selected
          return [...newTags, tag]
        }
      })
    }
  }

  const clearAllFilters = () => {
    setSelectedTags(["All"])
  }

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prev => {
      const newTags = prev.filter(tag => tag !== tagToRemove)
      // If no tags left, select "All"
      return newTags.length === 0 ? ["All"] : newTags
    })
  }

  const sortedProjects = useMemo(() => {
    const projectsCopy = [...projects]
    
    if (sortBy === "date") {
      return projectsCopy.sort((a, b) => {
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
      })
    } else {
      // Featured first, then by date
      return projectsCopy.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
      })
    }
  }, [sortBy])

  const filteredProjects = useMemo(() => {
    // If "All" is selected, show all projects
    if (selectedTags.includes("All")) {
      return sortedProjects
    }
    
    // Filter projects that include ALL selected tags
    return sortedProjects.filter((project) => 
      selectedTags.every(tag => project.tags.includes(tag))
    )
  }, [selectedTags, sortedProjects])

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
    hidden: { y: 20, opacity: 0 },
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

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <div className="flex flex-col gap-12 py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-20 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="My Creative Projects"
            subtitle="A curated collection of my work, featuring web applications, design systems, and open-source contributions."
            centered
          />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-12"
        >
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">{projects.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">
              {Array.from(new Set(projects.flatMap(p => p.tags))).length}
            </div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">
              {projects.filter(p => p.github || p.liveUrl).length}
            </div>
            <div className="text-sm text-muted-foreground">Live Demos</div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card border rounded-2xl p-6 mb-12 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Filter className="h-5 w-5 text-primary" />
                Filter Projects
              </h3>
              <p className="text-sm text-muted-foreground">
                Click on tags to select/deselect. Projects must match ALL selected tags.
              </p>
              
              {/* Selected Tags Display */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedTags.map(tag => (
                    <div
                      key={`${tag}-${CACHE_BUSTER}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tag}
                      {tag !== "All" && (
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-primary/70"
                          aria-label={`Remove ${tag} filter`}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  {selectedTags.length > 1 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-muted-foreground hover:text-primary hover:underline ml-2"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy("date")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    sortBy === "date"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <TrendingUp className="h-4 w-4" />
                  Recent
                </button>
                <button
                  onClick={() => setSortBy("featured")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    sortBy === "featured"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  Featured
                </button>
              </div>
            </div>
          </div>

          {/* Tags Filter */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mt-6"
          >
            {allTags.map((tag, index) => (
              <motion.button
                key={`${tag}-${CACHE_BUSTER}`}
                variants={tagVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                transition={{ delay: index * 0.05 }}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedTags.includes(tag)
                    ? tag === "All"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-primary/20 text-primary border border-primary/30 shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md"
                }`}
              >
                {tag === "All" && <Zap className="h-3 w-3" />}
                {tag}
                {selectedTags.includes(tag) && tag !== "All" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <>
              {/* Results Info */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-primary">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
                  {selectedTags.length > 0 && selectedTags[0] !== "All" && (
                    <>
                      {" "}with tags:{" "}
                      <span className="font-medium">
                        {selectedTags.join(", ")}
                      </span>
                    </>
                  )}
                </p>
                
                {selectedTags.length > 1 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <motion.div
                key={`projects-grid-${CACHE_BUSTER}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`${project.id}-${CACHE_BUSTER}`}
                    variants={itemVariants}
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      layout: { duration: 0.3 },
                    }}
                  >
                    <ProjectCard 
                      project={project} 
                      index={index}
                      delay={index * 0.1}
                      cacheBuster={CACHE_BUSTER}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                <Filter className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Projects Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                No projects match the selected filters. Try choosing different tags or view all projects.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                View All Projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 pt-8 border-t"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Want to see more?</h3>
              <p className="text-muted-foreground">
                Check out my GitHub for more projects, contributions, and experiments.
                Most of my work is open source and available for exploration.
              </p>
            </div>
            <a
              href="https://github.com/TARUN062005"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all duration-300 hover:scale-105"
            >
              View GitHub Profile
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-8 w-8 h-8 bg-primary/10 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        className="absolute bottom-1/3 left-12 w-6 h-6 bg-secondary/10 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-1/4 w-4 h-4 bg-primary/5 rounded-full hidden lg:block"
      />
    </div>
  )
}