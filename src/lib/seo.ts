import type { Metadata } from "next"

interface GenerateMetadataProps {
  title: string
  description: string
  url?: string
  image?: string
}

export function generateMetadata({
  title,
  description,
  url = "https://alexchen.dev",
  image = "https://alexchen.dev/og-image.jpg",
}: GenerateMetadataProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Alex Chen - Full Stack Developer",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@alexchen",
    },
  }
}
