import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Portfolio Showcase',
  description: 'Explore my portfolio of web development projects, cybersecurity solutions, and automation tools. Built with React, Next.js, TypeScript, and modern technologies.',
  keywords: [
    'Portfolio Projects',
    'Web Development Projects',
    'React Projects',
    'Next.js Projects',
    'Cybersecurity Projects',
    'Software Projects',
    'Project Showcase',
    'Development Portfolio',
  ],
  openGraph: {
    title: 'Projects - yousefdev Portfolio',
    description: 'Explore my portfolio of web development and cybersecurity projects',
    url: 'https://yousefdev.xyz/projects',
    siteName: 'yousefdev',
    images: [
      {
        url: '/icons/logo.webp',
        width: 1200,
        height: 630,
        alt: 'yousefdev Projects Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - yousefdev Portfolio',
    description: 'Explore my portfolio of web development and cybersecurity projects',
    images: ['/icons/logo.webp'],
  },
  alternates: {
    canonical: '/projects',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

