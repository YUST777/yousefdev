import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - Cybersecurity Solutions & Hardened Web Systems',
  description: 'A deep dive into my portfolio of cybersecurity tools, hardened web systems, and high-performance software engineering case studies. Built with security by design.',
  keywords: [
    'Cybersecurity Portfolio',
    'Hardened Web Systems',
    'Security Engineering Projects',
    'Software Architecture',
    'AI-Driven Security',
    'Online Judge Platform',
    'React OS Simulation',
    'Full-Stack Case Studies',
    'Award-winning Software',
    'Defense-in-Depth Implementation',
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
