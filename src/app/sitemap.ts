import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tarun-vemuri.vercel.app/",
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: "https://tarun-vemuri.vercel.app/about",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://tarun-vemuri.vercel.app/projects",
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: "https://tarun-vemuri.vercel.app/blog",
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: "https://tarun-vemuri.vercel.app/tech-stack",
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: "https://tarun-vemuri.vercel.app/contact",
      lastModified: new Date(),
      priority: 0.6,
    },
  ]
}
