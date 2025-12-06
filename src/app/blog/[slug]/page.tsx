import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import Image from "next/image"
import { blogs } from "@/constants/blogs"
import { ArrowLeft, Calendar, Clock, Eye, BookOpen, Sparkles } from "lucide-react"
import Link from "next/link"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const blog = blogs.find((blog) => blog.slug === params.slug)

  if (!blog) {
    return {
      title: "Article Coming Soon | Alex Chen's Blog",
      description: "This article is currently being written. Check back soon!",
    }
  }

  return {
    title: `${blog.title} | Alex Chen's Blog`,
    description: blog.excerpt,
    openGraph: {
      type: "article",
      publishedTime: blog.date,
      authors: ["Alex Chen"],
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = blogs.find((blog) => blog.slug === params.slug)

  // If no blog exists, show coming soon page
  if (!blog) {
    return (
      <div className="py-24 md:py-32">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Coming Soon Content */}
          <div className="text-center space-y-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center"
            >
              <BookOpen className="h-16 w-16 text-primary/50" />
            </motion.div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Coming Soon</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                This Article is Brewing ☕
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                I'm currently writing this article with great care and attention to detail.
                It will be published soon!
              </p>
            </div>

            {/* Article Preview Info */}
            <div className="bg-card border rounded-2xl p-8 mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">What to Expect</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Estimated Release</h3>
                  <p className="text-sm text-muted-foreground">Within the next 2 weeks</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Reading Time</h3>
                  <p className="text-sm text-muted-foreground">~10 minute read</p>
                </div>

                <div className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Preview Access</h3>
                  <p className="text-sm text-muted-foreground">Email subscribers get early access</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-muted-foreground mb-4">
                  Want to be the first to know when this article is published?
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Notify Me When Ready
                </button>
              </div>
            </div>

            {/* Suggested Articles */}
            <div className="mt-12 text-left">
              <h3 className="text-xl font-bold mb-6">In the meantime, check out:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.slice(0, 2).map((suggestedBlog, index) => (
                  <Link
                    key={suggestedBlog.id}
                    href={`/blog/${suggestedBlog.slug}`}
                    className="group border rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                        {suggestedBlog.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {suggestedBlog.readingTime} min read
                      </span>
                    </div>
                    <h4 className="font-semibold group-hover:text-primary transition-colors">
                      {suggestedBlog.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      {suggestedBlog.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If blog exists, show the actual article
  return (
    <div className="py-24 md:py-32">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Blog Content */}
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                {blog.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {blog.readingTime} min read
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{blog.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <time dateTime={blog.date} className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </time>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {blog.views || "1.2k"} views
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image 
              src={blog.coverImage || "/placeholder.svg"} 
              alt={blog.title} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <p className="lead text-xl text-muted-foreground">
              {blog.excerpt}
            </p>

            <h2>Introduction</h2>
            <p>
              In this article, we'll explore the fundamentals and advanced concepts of {blog.category.toLowerCase()}. 
              Whether you're a beginner looking to get started or an experienced developer seeking deeper insights, 
              this guide has something for you.
            </p>

            <h2>Key Concepts</h2>
            <p>
              Understanding the core principles is crucial for mastering any technology. Let's dive into the essential
              concepts that form the foundation of modern web development.
            </p>

            <pre className="rounded-xl">
              <code className="language-javascript">
{`// Example demonstrating modern patterns
const BlogPost = ({ title, content }) => {
  const [isPublished, setIsPublished] = useState(false);
  
  useEffect(() => {
    // Initialize article
    setIsPublished(true);
  }, []);
  
  return (
    <article className="prose">
      <h1>{title}</h1>
      <div className="content">{content}</div>
    </article>
  );
};`}
              </code>
            </pre>

            <h2>Best Practices</h2>
            <p>
              Following industry best practices ensures your applications are maintainable, scalable, and performant. 
              Here are some proven techniques:
            </p>

            <ul>
              <li>Write clean, self-documenting code</li>
              <li>Implement proper error handling</li>
              <li>Optimize for performance</li>
              <li>Ensure accessibility compliance</li>
              <li>Write comprehensive tests</li>
            </ul>

            <h2>Advanced Implementation</h2>
            <p>
              Once you've mastered the basics, it's time to explore more advanced patterns and techniques that can
              elevate your development skills to the next level.
            </p>

            <h2>Conclusion</h2>
            <p>
              Mastering {blog.category.toLowerCase()} is an ongoing journey. By understanding the fundamentals,
              following best practices, and continuously learning, you can build exceptional applications that stand
              the test of time.
            </p>
          </article>

          {/* Newsletter CTA at bottom */}
          <div className="mt-12 pt-8 border-t">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold mb-3">Enjoyed this article?</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to get more in-depth tutorials and insights directly in your inbox.
              </p>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300">
                Subscribe for More Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add motion import
import { motion } from "framer-motion"