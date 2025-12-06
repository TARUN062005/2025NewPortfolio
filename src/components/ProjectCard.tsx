"use client"

import { useState, memo } from "react"
import Image from "next/image"
import { ExternalLink, Github, Calendar, X } from "lucide-react"
import type { Project } from "@/constants/projects"

interface ProjectCardProps {
  project: Project
  index: number
  delay?: number
  cacheBuster?: number
}

interface ProjectCardContentProps {
  project: Project
  index: number
  onImageClick: () => void
  cacheBuster?: number
}

const ProjectCardContent = memo(({ 
  project, 
  index,
  onImageClick,
  cacheBuster 
}: ProjectCardContentProps) => {
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  // Simple image URL - no dynamic parameters
  const getImageUrl = () => {
    if (!project.image || project.image === "/placeholder.svg") {
      return "/placeholder.svg"
    }
    return project.image
  }

  const imageUrl = getImageUrl()
  const isPlaceholder = imageUrl.includes('placeholder.svg')

  return (
    <div className="rounded-lg overflow-hidden border bg-card shadow-sm hover:shadow-md transition-shadow h-full">
      {/* Image Section */}
      <button
        onClick={onImageClick}
        className="relative aspect-video overflow-hidden w-full bg-muted cursor-pointer group"
        aria-label={`View ${project.title} details`}
      >
        <div className="h-full w-full scale-100 group-hover:scale-105 transition-transform duration-300">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
            unoptimized={isPlaceholder}
          />
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="text-white text-sm font-medium">View Details</span>
        </div>
      </button>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 4).map((tag) => (
            <span 
              key={`${tag}-${project.id}-${cacheBuster || 0}`} 
              className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-[56px]">{project.title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                aria-label="View GitHub repository"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="p-2 hover:bg-secondary rounded-md transition-colors"
                aria-label="View live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </a>
            )}
          </div>

          {formattedDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar size={12} className="mr-1" />
              {formattedDate}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})
ProjectCardContent.displayName = "ProjectCardContent"

export default function ProjectCard({ project, index, delay = 0, cacheBuster }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  // Simple image URL for modal
  const getImageUrl = () => {
    if (!project.image || project.image === "/placeholder.svg") {
      return "/placeholder.svg"
    }
    return project.image
  }

  const imageUrl = getImageUrl()
  const isPlaceholder = imageUrl.includes('placeholder.svg')

  return (
    <>
      <ProjectCardContent 
        project={project}
        index={index}
        onImageClick={() => setIsModalOpen(true)}
        cacheBuster={cacheBuster}
      />

      {/* Project Detail Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-lg mx-4 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors active:scale-90"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Content */}
            <div className="space-y-6 p-6 md:p-8">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
                  priority={false}
                  unoptimized={isPlaceholder}
                />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {formattedDate && (
                    <>
                      <Calendar size={16} />
                      <time>{formattedDate}</time>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-base leading-relaxed text-muted-foreground">{project.description}</p>
                
                {/* Additional project details if available */}
                {project.challenge && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2 text-lg">Challenge</h3>
                    <p className="text-muted-foreground">{project.challenge}</p>
                  </div>
                )}
                
                {project.solution && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-lg">Solution</h3>
                    <p className="text-muted-foreground">{project.solution}</p>
                  </div>
                )}
                
                {project.results && project.results.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-lg">Results</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {project.results.map((result, idx) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-lg">Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-secondary/30 p-3 rounded-lg">
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                          <div className="text-lg font-bold text-primary">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Technologies */}
              <div>
                <h3 className="font-semibold mb-3 text-lg">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${tag}-modal-${project.id}-${cacheBuster || 0}`}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:scale-105 transition-transform"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-6 border-t">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium active:scale-95"
                  >
                    <Github size={18} /> View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium active:scale-95"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}