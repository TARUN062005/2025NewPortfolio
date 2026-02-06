"use client"

import { useState, useMemo, memo, useEffect } from "react"
import Image from "next/image"
import { FileDown, Code, Globe, Laptop, BookOpen, Music, Brain, ExternalLink, GraduationCap, Briefcase, Award, Cloud, School, Building, MapPin } from "lucide-react"
import { timeline } from "@/constants/timeline"
import TimelineItem from "@/components/TimelineItem"
import Button from "@/components/Button"
import SkillBadge from "@/components/SkillBadge"

// Cache buster that only changes when timeline data actually changes
const getTimelineCacheBuster = () => {
  return timeline.reduce((sum, event) => sum + event.title.length + event.date.length, 0)
}

const TIMELINE_CACHE_BUSTER = getTimelineCacheBuster()

const TechStackGrid = memo(({ techStack }: { techStack: any[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    {techStack.map((tech, index) => (
      <div
        key={`${tech.title}-${TIMELINE_CACHE_BUSTER}`}
        className="flex items-start p-4 border rounded-md hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:border-primary/50"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="mr-3 mt-1">{tech.icon}</div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">{tech.title}</h3>
          <p className="text-sm text-muted-foreground">{tech.description}</p>
        </div>
      </div>
    ))}
  </div>
))
TechStackGrid.displayName = "TechStackGrid"

const InterestsList = memo(({ interests }: { interests: any[] }) => (
  <div className="space-y-4">
    {interests.map((interest, index) => (
      <div
        key={`${interest.name}-${TIMELINE_CACHE_BUSTER}`}
        className="flex items-center p-3 rounded-md hover:bg-muted transition-all duration-300 transform hover:scale-[1.01]"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="mr-3">{interest.icon}</div>
        <span className="font-medium mr-2">{interest.name}:</span>
        <span className="text-muted-foreground">{interest.description}</span>
      </div>
    ))}
  </div>
))
InterestsList.displayName = "InterestsList"

const LanguagesList = memo(({ languages }: { languages: any[] }) => (
  <div className="flex flex-wrap gap-3">
    {languages.map((lang, index) => (
      <SkillBadge
        key={`${lang.name}-${TIMELINE_CACHE_BUSTER}`}
        name={lang.name}
        level={lang.level}
        index={index}
      />
    ))}
  </div>
))
LanguagesList.displayName = "LanguagesList"

export default function AboutPageClient() {
  const [activeTab, setActiveTab] = useState<"personal" | "professional">("professional")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const languages = useMemo(
    () => [
      { name: "English", level: "Advanced" as const },
      { name: "Telugu", level: "Expert" as const },
      { name: "Hindi", level: "Intermediate" as const },
    ],
    []
  )

  const interests = useMemo(
    () => [
      { icon: <BookOpen className="text-blue-500" size={20} />, name: "Reading", description: "Tech books and research papers" },
      { icon: <Music className="text-purple-500" size={20} />, name: "Listening Songs", description: "All genres, especially instrumental" },
      { icon: <Brain className="text-green-500" size={20} />, name: "Researching", description: "Latest tech trends and innovations" },
    ],
    []
  )

  const techStack = useMemo(
    () => [
      {
        icon: <Code className="text-blue-500" size={24} />,
        title: "Frontend Development",
        description: "React, Next.js, TypeScript, HTML/CSS",
        details:
          "Building responsive, accessible, and performant user interfaces using modern frontend technologies with focus on clean code and best practices.",
      },
      {
        icon: <Laptop className="text-green-500" size={24} />,
        title: "Backend Development",
        description: "Node.js, Express, MongoDB, Java, Python",
        details:
          "Developing scalable RESTful APIs, server-side applications, and database management systems with both SQL and NoSQL databases.",
      },
      {
        icon: <Cloud className="text-orange-500" size={24} />,
        title: "Cloud & DevOps",
        description: "AWS, Azure, Vercel, Firebase, Docker",
        details:
          "Implementing cloud solutions, CI/CD pipelines, containerization, and deploying applications to various cloud platforms.",
      },
      {
        icon: <BookOpen className="text-indigo-500" size={24} />,
        title: "Learning & Research",
        description: "Cloud Computing, Machine Learning, AI",
        details:
          "Currently expanding knowledge in cloud architectures, ML models, and exploring emerging technologies for innovative solutions.",
      },
    ],
    []
  )

  const professionalItems = useMemo(
    () => [
      {
        title: "Full-Stack Projects",
        description: "Creating end-to-end web applications with modern tech stacks and real-time features.",
      },
      {
        title: "Salesforce Development",
        description: "Building CRM solutions with custom objects, flows, and automation tools for business optimization.",
      },
      {
        title: "Cloud Engineering",
        description: "Exploring scalable cloud solutions and serverless architectures on AWS and Azure platforms.",
      },
    ],
    []
  )

  // Function to open college information in Google
  const openCollegeInfo = (collegeName: string) => {
    const searchQuery = encodeURIComponent(`${collegeName} college information official website`);
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="flex flex-col gap-8 py-24 md:py-32 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="space-y-12">
          {/* Introduction Section */}
          <div className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/4 flex-shrink-0">
                <div className="relative aspect-square rounded-xl overflow-hidden w-40 md:w-full max-w-[200px] mx-auto md:mx-0 group">
                  <Image
                    src="/profile.jpg"
                    alt="VEMURI PRINCE TARUN"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Hello, I'm VEMURI PRINCE TARUN!
                </h1>
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    I'm a passionate <span className="text-primary font-medium">Full-Stack Developer</span>, <span className="text-primary font-medium">Tech Enthusiast</span>, and aspiring <span className="text-primary font-medium">Cloud Engineer</span> from Andhra Pradesh. My journey in tech began during my diploma studies when I discovered my love for building things that solve real-world problems.
                  </p>
                  <p className="leading-relaxed">
                    Currently pursuing my B.Tech in Computer Science Engineering with a CGPA of 9.20%, I've gained hands-on experience in Salesforce development and full-stack web applications through internships and personal projects.
                  </p>
                  <p className="leading-relaxed">
                    I specialize in building scalable applications using modern technologies like React.js, Node.js, MongoDB, and Salesforce. My approach combines technical expertise with a user-focused mindset to create efficient and innovative solutions.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">Andhra Pradesh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">📞</span>
                      <span className="text-sm">+91 9550186473</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">✉️</span>
                      <span className="text-sm">princetarunvemuri@gmail.com</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Button
                    href="/VEMURIPRINCETARUN_Resume.pdf"
                    variant="primary"
                    className="group relative overflow-hidden"
                    download="VEMURI_PRINCE_TARUN_Resume.pdf"
                  >
                    <FileDown className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                    Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* How It All Began Section */}
          <div
            className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 delay-100 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          >
            <h2 className="text-2xl font-bold mb-6">My Journey in Tech</h2>

            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                My tech journey began at{" "}
                <a
                  href="https://www.google.com/search?q=AANM+%26+VVRSR+POLYTECHNIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors duration-300 inline-flex items-center gap-1"
                >
                  AANM & VVRSR POLYTECHNIC <ExternalLink size={14} />
                </a>{" "}
                where I pursued Computer Engineering, graduating with 93.67%. This
                foundation sparked my passion for building and creating digital solutions.
              </p>

              <p className="leading-relaxed">
                I started with{" "}
                <span className="text-primary font-medium">frontend development</span>,
                mastering HTML, CSS, and JavaScript to create beautiful, interactive
                interfaces. My first industrial training at MSME-CITD gave me hands-on
                experience with low-level systems and circuit design.
              </p>

              <p className="leading-relaxed">
                My journey then expanded into{" "}
                <span className="text-primary font-medium">full-stack development</span>{" "}
                during my internship at TheSmartBridge, where I built complete web
                applications with React.js, Node.js, and MongoDB. This experience taught
                me how to create end-to-end solutions with real-time features.
              </p>

              <p className="leading-relaxed">
                Currently, I'm exploring{" "}
                <span className="text-primary font-medium">cloud computing</span> and{" "}
                <span className="text-primary font-medium">AI/ML integration</span>,
                having completed certifications in Azure Fundamentals and Salesforce
                development. I'm also pursuing my B.Tech at{" "}
                <a
                  href="https://www.google.com/search?q=Lakireddy+Bali+Reddy+College+of+Engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:text-primary/80 hover:underline transition-colors duration-300 inline-flex items-center gap-1"
                >
                  Lakireddy Bali Reddy College of Engineering <ExternalLink size={14} />
                </a>{" "}
                with a focus on innovative tech solutions.
              </p>
            </div>
          </div>


          {/* Languages I Speak Section */}
          <div className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-4">Languages I Speak (Human & Code)</h2>
            <p className="text-muted-foreground mb-6">
              I'm comfortable communicating in multiple languages, both human and programming:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 text-primary">Human Languages</h3>
                <LanguagesList languages={languages} />
              </div>

              <div>
                <h3 className="font-medium mb-3 text-primary">Programming Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {["JavaScript", "TypeScript", "Python", "Java", "C"].map((lang, index) => (
                    <div
                      key={`${lang}-${TIMELINE_CACHE_BUSTER}`}
                      className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors duration-300"
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full-Stack Adventures Section */}
          <div className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-4">My Technical Expertise</h2>
            <div className="text-muted-foreground space-y-2">
              <p className="mb-4">
                I've developed expertise across multiple domains in tech. Here's what I bring to the table:
              </p>
              <TechStackGrid techStack={techStack} />

              <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
                <h3 className="font-medium mb-2 text-primary">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {["Git/GitHub", "Vercel", "Firebase", "AWS", "Postman", "VS Code", "Cursor AI", "Jupyter"].map((tool, index) => (
                    <span key={`${tool}-${TIMELINE_CACHE_BUSTER}`} className="px-3 py-1 bg-background rounded-md text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Outside the Code Editor Section */}
          <div className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-4">Beyond Coding</h2>
            <p className="text-muted-foreground mb-6">When I'm not building applications or learning new technologies:</p>

            <div className="flex mb-6 border-b">
              <button
                className={`px-4 py-3 font-medium transition-all duration-300 relative ${activeTab === "professional"
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-muted-foreground hover:text-primary/80"
                  }`}
                onClick={() => setActiveTab("professional")}
              >
                Professional Interests
              </button>
              <button
                className={`px-4 py-3 font-medium transition-all duration-300 relative ${activeTab === "personal"
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-muted-foreground hover:text-primary/80"
                  }`}
                onClick={() => setActiveTab("personal")}
              >
                Personal Interests
              </button>
            </div>

            <div className="transition-all duration-500">
              {activeTab === "personal" ? (
                <InterestsList interests={interests} />
              ) : (
                <div className="space-y-4">
                  {professionalItems.map((item, index) => (
                    <div
                      key={`${item.title}-${TIMELINE_CACHE_BUSTER}`}
                      className="p-4 rounded-lg border hover:border-primary/50 hover:shadow-sm transition-all duration-300 transform hover:translate-x-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h3 className="font-medium mb-2 text-primary">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <h3 className="font-medium mb-2 text-primary">Research Interests</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Currently exploring <strong>Cloud Computing</strong> (virtualization, Kubernetes, Docker, serverless architectures) and <strong>Machine Learning</strong> (neural networks, NLP, model optimization) to understand how these technologies can solve real-world problems efficiently.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* My Journey Section - Fixed Timeline */}
          <div className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-6">My Journey Timeline</h2>
            <p className="text-muted-foreground mb-8">
              Here's a timeline of my educational and professional journey so far:
            </p>

            <div className="relative mt-8">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30"></div>

              <div className="space-y-12">
                {timeline.map((event, index) => (
                  <div
                    key={`${event.id}-${TIMELINE_CACHE_BUSTER}`}
                    className="relative pl-12 md:pl-16"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2 md:left-4 top-2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg"></div>

                    {/* Content */}
                    <div className="bg-background/50 p-5 rounded-xl border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                      <TimelineItem event={event} index={index} cacheBuster={TIMELINE_CACHE_BUSTER} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Let's Connect Section */}
          <div className={`bg-card border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-500 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold mb-4">Let's Connect & Collaborate!</h2>
            <p className="text-muted-foreground mb-6">
              I'm always excited to connect with fellow developers, tech enthusiasts, and potential collaborators. Whether it's discussing new technologies, sharing project ideas, or exploring opportunities, feel free to reach out!
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button
                href="/contact"
                variant="primary"
                className="group relative overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button
                href="https://github.com/TARUN062005"
                variant="secondary"
                className="group relative overflow-hidden"
                target="_blank"
              >
                <span className="relative z-10">GitHub Profile</span>
              </Button>
              <Button
                href="https://www.linkedin.com/in/tarunvemuri"
                variant="secondary"
                className="group relative overflow-hidden"
                target="_blank"
              >
                <span className="relative z-10">LinkedIn</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add these styles to your global CSS or a style tag */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
      `}</style>
    </div>
  )
}