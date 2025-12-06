"use client"

import { useState, useMemo, memo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeading from "@/components/SectionHeading"
import BlogCard from "@/components/BlogCard"
import { blogs } from "@/constants/blogs"
import { BookOpen, Clock, Filter, PenTool, Sparkles, TrendingUp, Zap } from "lucide-react"

const allCategories = ["All", "Web Development", "React", "TypeScript", "Next.js", "Backend", "DevOps", "Career"]

const CategoryButton = memo(({ category, isSelected, onClick }: any) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
      isSelected 
        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20" 
        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md"
    }`}
  >
    {isSelected && <Zap className="h-3 w-3" />}
    {category}
  </motion.button>
))
CategoryButton.displayName = "CategoryButton"

export default function BlogPageClient() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isVisible, setIsVisible] = useState(false)

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

  const filteredBlogs = useMemo(() => {
    return selectedCategory === "All" ? blogs : blogs.filter((blog) => blog.category === selectedCategory)
  }, [selectedCategory])

  // Calculate blog stats for the future
  const upcomingBlogs = [
    { title: "Mastering React Server Components", category: "React", estDate: "Coming Soon" },
    { title: "TypeScript Tips for Better DX", category: "TypeScript", estDate: "In Progress" },
    { title: "Building Scalable Next.js Applications", category: "Next.js", estDate: "Planned" },
  ]

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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <PenTool className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Coming Soon</span>
          </div>
          
          <SectionHeading
            title="Blog & Articles"
            subtitle="Technical insights, tutorials, and thoughts on modern web development"
            centered
          />
        </motion.div>

        {/* Stats & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">{blogs.length}</div>
            <div className="text-sm text-muted-foreground">Articles</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">{allCategories.length - 1}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">{upcomingBlogs.length}</div>
            <div className="text-sm text-muted-foreground">In Pipeline</div>
          </div>
          <div className="bg-card border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300">
            <div className="text-2xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground">Coming Soon</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Filter by Category
            </h3>
            <span className="text-sm text-muted-foreground">
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="text-primary hover:underline"
                >
                  Clear filter
                </button>
              )}
            </span>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            {allCategories.map((category, index) => (
              <motion.div
                key={category}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
              >
                <CategoryButton
                  category={category}
                  isSelected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Blog Grid or Empty State */}
        <AnimatePresence mode="wait">
          {filteredBlogs.length > 0 ? (
            <motion.div
              key="blog-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  variants={itemVariants}
                  layout
                  whileHover={{ y: -5 }}
                >
                  <BlogCard 
                    key={blog.id} 
                    blog={blog} 
                    index={index}
                    delay={index * 0.1}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              {/* Beautiful Empty State */}
              <div className="max-w-2xl mx-auto">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
                >
                  <BookOpen className="h-12 w-12 text-primary/50" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-4">Blog Under Construction 🚧</h3>
                <p className="text-muted-foreground mb-6 text-lg max-w-xl mx-auto">
                  I'm currently brewing some insightful articles about web development, 
                  modern frameworks, and best practices. The first posts will be live soon!
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-8">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Great content coming your way</span>
                </div>

                {/* Upcoming Blog Preview */}
                <div className="bg-card border rounded-2xl p-6 mt-8 text-left">
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Articles in Progress
                  </h4>
                  
                  <div className="space-y-4">
                    {upcomingBlogs.map((blog, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <h5 className="font-medium">{blog.title}</h5>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                              {blog.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {blog.estDate}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-primary font-medium px-3 py-1 bg-primary/10 rounded-full">
                          Preview
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Check Back Soon</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              I'm working hard to bring you valuable content about web development, 
              modern technologies, and industry best practices.
            </p>
            
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Quality content in the works</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-10 w-8 h-8 bg-primary/10 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 left-10 w-6 h-6 bg-secondary/10 rounded-full hidden lg:block"
      />
    </div>
  )
}