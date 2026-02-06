"use client"

import Image from "next/image"
import Link from "next/link"
import { projects } from "@/constants/projects"
import ProjectCard from "@/components/ProjectCard"
import AnimatedBackground from "@/components/AnimatedBackground"
import { ArrowRight, Code2, Zap, Users, Sparkles } from "lucide-react"
import ScrollReveal from "@/components/ScrollReveal"
import { motion } from "framer-motion"
import { useMemo } from "react"

export default function Home() {
  const latestProjects = projects.slice(0, 3)
  const profileImageUrl = useMemo(() => `/profile.jpg?v=1`, [])

  const features = [
    {
      icon: <Code2 size={24} />,
      title: "Clean Code",
      description: "Scalable, maintainable architecture.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap size={24} />,
      title: "Performance",
      description: "Lightning fast load times & SEO.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users size={24} />,
      title: "Collaboration",
      description: "Effective team communication.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Sparkles size={24} />,
      title: "AI Solutions",
      description: "Modern AI-driven workflows.",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* ===== Person Schema (SEO Critical) ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "VEMURI PRINCE TARUN",
            url: "https://tarun-vemuri.vercel.app/",
            jobTitle: "Software Engineer",
            sameAs: [
              "https://github.com/TARUN062005",
              "https://www.linkedin.com/in/vemuri-prince-tarun-9b8821326"
            ],
          }),
        }}
      />

      <AnimatedBackground />

      <div className="relative z-10 container px-6 md:px-12 mx-auto">
        {/* --- HERO SECTION --- */}
        <section className="min-h-[100vh] lg:min-h-screen flex flex-col lg:flex-row items-center justify-center gap-10 pt-24 pb-12">
          <ScrollReveal direction="up" className="order-2 lg:order-1 w-full lg:w-1/2">
            <div className="space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                  Available for Hire
                </span>
              </motion.div>

              {/* 🔴 PRIMARY IDENTITY SIGNAL */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1]">
                VEMURI PRINCE TARUN
              </h1>

              <h2 className="text-2xl sm:text-3xl font-semibold text-muted-foreground">
                Software Engineer
              </h2>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                I am <span className="text-foreground font-semibold">VEMURI PRINCE TARUN</span>, a software engineer
                specializing in building high-performance, visually polished web applications using modern technologies.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/projects"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto text-center px-8 py-4 bg-secondary/50 backdrop-blur-md border border-white/10 rounded-xl font-bold hover:bg-secondary transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Hero Image */}
          <ScrollReveal direction="up" delay={0.2} className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl rotate-6 opacity-20 blur-2xl animate-pulse" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src={profileImageUrl}
                  alt="VEMURI PRINCE TARUN"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, 450px"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* --- FEATURES --- */}
        <section className="py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.98 }}
                className="p-6 rounded-2xl bg-secondary/20 border border-white/5 backdrop-blur-sm"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-4`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- PROJECTS --- */}
        <section className="py-20">
          <div className="space-y-4 mb-12 text-center sm:text-left">
            <h2 className="text-3xl sm:text-5xl font-bold">Latest Projects</h2>
            <p className="text-muted-foreground">Recent work from my portfolio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-bold text-blue-500 hover:gap-3 transition-all"
            >
              Explore All Projects <ArrowRight size={20} />
            </Link>
          </div>
        </section>

        {/* --- CTA --- */}
        <section className="py-20 pb-32">
          <div className="relative p-8 sm:p-16 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-center text-white">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black">Let’s work together</h2>
              <p className="text-blue-100 max-w-md mx-auto">
                Ready to take your digital presence to the next level?
              </p>
              <Link
                href="/contact"
                className="inline-block px-10 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
