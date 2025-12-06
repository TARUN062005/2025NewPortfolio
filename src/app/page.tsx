"use client"

import Image from "next/image"
import Link from "next/link"
import { projects } from "@/constants/projects"
import ProjectCard from "@/components/ProjectCard"
import SectionHeading from "@/components/SectionHeading"
import { ArrowRight, Code2, Zap, Users, Sparkles, ChevronRight } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import { motion } from "framer-motion"
import { useEffect, useState, useMemo } from "react"

export default function Home() {
  const latestProjects = projects.slice(0, 3)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Fixed cache buster that doesn't change on every render
  const profileImageUrl = useMemo(() => {
    return `/profile.jpg?v=1` // Static version number
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const features = [
    {
      icon: <Code2 size={28} />,
      title: "Clean Code",
      description: "Well-structured, maintainable code following best practices and design patterns.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap size={28} />,
      title: "Performance",
      description: "Optimized applications that load fast and provide smooth user experiences.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users size={28} />,
      title: "Collaboration",
      description: "Strong communicator who works effectively with designers, PMs, and other developers.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Sparkles size={28} />,
      title: "Innovation",
      description: "Bringing creative solutions to complex problems with cutting-edge technologies.",
      gradient: "from-green-500 to-emerald-500"
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative py-24 md:py-32 z-10">
        <div className="container px-4 md:px-6 mx-auto">
          {/* Hero Section */}
          <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-32">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                  >
                    <Sparkles size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Full Stack Developer & AI Enthusiast
                    </span>
                  </motion.div>

                  <div className="space-y-2">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                      Hi, I'm{" "}
                      <span className="relative inline-block">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                          VEMURI PRINCE TARUN
                        </span>
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                      </span>
                    </h1>
                    
                    <p className="text-2xl md:text-3xl text-primary mt-2 leading-relaxed">
                      Building the future of web experiences
                      <span className="inline-block ml-2 animate-bounce">🚀</span>
                    </p>
                  </div>
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-muted-foreground leading-relaxed max-w-xl"
                >
                  I specialize in creating <span className="font-semibold text-blue-600 dark:text-blue-400">high-performance</span>,{" "}
                  <span className="font-semibold text-purple-600 dark:text-purple-400">scalable web applications</span> with modern 
                  technologies. Passionate about UI/UX, animations, and cutting-edge web development.
                </motion.p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/projects"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold overflow-hidden"
                    >
                      <span className="relative z-10">View My Work</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 text-foreground font-semibold transition-all"
                    >
                      <span>Get In Touch</span>
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group w-full max-w-md lg:max-w-lg xl:max-w-xl"
              >
                {/* Main Profile Image Container */}
                <div className="relative aspect-square w-full rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                  {/* Fixed profile image URL */}
                  <Image 
                    src={profileImageUrl}
                    alt="VEMURI PRINCE TARUN - Full Stack Developer"
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-purple-600/10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  
                  {/* Simplified floating elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm border border-white/20 shadow-lg"
                  />
                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20 shadow-lg"
                  />
                </div>
                
                {/* Decorative glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700" />
              </motion.div>
            </ScrollReveal>
          </section>

          {/* Features Section */}
          <section className="py-24 mb-32">
            <div className="text-center mb-16">
              <ScrollReveal direction="up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                  <Sparkles size={16} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Why Choose Me
                  </span>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Exceptional</span> Experiences
                </h2>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  I combine technical expertise with creative problem-solving to deliver solutions that exceed expectations.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <ScrollReveal key={feature.title} delay={index * 0.1} direction="up">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all relative overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity`} />
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient}/20 mb-6`}>
                        <div className={`text-transparent bg-clip-text bg-gradient-to-br ${feature.gradient}`}>
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Latest Projects Section */}
          <section className="mb-32">
            <SectionHeading
              title="Featured Projects"
              subtitle="A selection of my recent work showcasing innovation and technical excellence"
              badge="Showcase"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {latestProjects.map((project, index) => {
                // Create unique cache busting parameter for each project
                const cacheBuster = 1 // Static version instead of dynamic
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard 
                      project={project} 
                      index={index} 
                      cacheBuster={cacheBuster}
                    />
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all font-medium"
              >
                <span>Explore All Projects</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(120, 119, 198, 0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
              
              <div className="relative z-10 p-12 md:p-16 text-center space-y-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <Sparkles size={32} className="mx-auto text-blue-400" />
                  <h2 className="text-4xl md:text-5xl font-bold">
                    Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Amazing</span> Together
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have an idea? Let's bring it to life with cutting-edge technology and exceptional design.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all"
                    >
                      Start a Conversation
                      <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 text-foreground font-semibold transition-all"
                    >
                      View Case Studies
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="hidden lg:block fixed top-1/4 left-10 w-4 h-4 rounded-full bg-blue-500/30"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="hidden lg:block fixed bottom-1/3 right-10 w-6 h-6 rounded-full bg-purple-500/30"
      />
    </div>
  )
}