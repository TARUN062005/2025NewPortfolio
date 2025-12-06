"use client"

import { memo } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Blog } from "@/constants/blogs"

interface BlogCardProps {
  blog: Blog
  index: number
}

const BlogCardComponent = memo(({ blog }: { blog: Blog }) => {
  return (
    <article className="group">
      <Link href={`/blog/${blog.slug}`}>
        <div className="space-y-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <time dateTime={blog.date}>{blog.date}</time>
              <span>•</span>
              <span>{blog.readingTime} min read</span>
            </div>
            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
            <p className="text-muted-foreground">{blog.excerpt}</p>
          </div>
        </div>
      </Link>
    </article>
  )
})
BlogCardComponent.displayName = "BlogCard"

export default BlogCardComponent
