# Tarun's Portfolio

A modern, responsive portfolio website built with Next.js 14, React 19, and Tailwind CSS.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

\`\`\`bash
# Install dependencies
npm i

# Start development server
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Project Structure

\`\`\`
src/
├── app/                    # Next.js app router
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   └── tech-stack/        # Tech stack page
├── components/            # Reusable components
│   ├── Sidebar.tsx        # Navigation sidebar
│   ├── Footer.tsx         # Footer
│   ├── Navbar.tsx         # Navigation bar
│   ├── ProjectCard.tsx    # Project card component
│   ├── BlogCard.tsx       # Blog card component
│   └── ...                # Other components
├── constants/             # Data files
│   ├── projects.ts        # Projects data
│   ├── blogs.ts           # Blog posts data
│   ├── skills.ts          # Skills data
│   └── timeline.ts        # Timeline data
├── hooks/                 # Custom React hooks
│   └── use-toast.ts       # Toast notifications
└── lib/                   # Utility functions
    └── seo.ts            # SEO utilities
\`\`\`

## Features

- Modern, responsive design
- Dark/Light mode support
- Smooth animations with Framer Motion
- Mobile-optimized layout
- Fast performance
- Clean, maintainable code

## Technologies

- **Next.js 14** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide Icons** - Icons
- **Next Themes** - Dark mode support

## Customization

Edit the data files in `src/constants/` to customize:
- Projects in `projects.ts`
- Blog posts in `blogs.ts`
- Skills in `skills.ts`
- Timeline in `timeline.ts`

## Performance

- Optimized images
- Minimal dependencies
- Code splitting
- Fast build times
- Responsive on all devices

## License

Private - Personal portfolio
