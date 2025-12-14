import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import FontAwesomeLoader from '@/components/FontAwesomeLoader'
import ClarityAnalytics from '@/components/ClarityAnalytics'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600']
})

const syne = Syne({ 
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '700', '800']
})

export const metadata: Metadata = {
  title: {
    default: 'yousefdev - Developer | Full-Stack & Cybersecurity',
    template: '%s | yousefdev'
  },
  description: 'yousefdev is a full-stack developer and cybersecurity engineer building practical tools and applications with clean design and solid architecture.',
  keywords: [
    'Developer',
    'Full-Stack Developer',
    'Cybersecurity Engineer',
    'Software Development',
    'Web Development',
    'Application Development',
    'Automation',
    'System Design'
  ],
  authors: [{ name: 'yousefdev', url: 'https://yousefdev.xyz' }],
  creator: 'yousefdev',
  publisher: 'yousefdev',
  metadataBase: new URL('https://yousefdev.xyz'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': 'https://yousefdev.xyz',
      'x-default': 'https://yousefdev.xyz',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yousefdev.xyz',
    siteName: 'yousefdev',
    title: 'yousefdev - Developer | Full-Stack & Cybersecurity',
    description: 'Full-stack developer and cybersecurity engineer building practical tools and applications.',
    images: [
      {
        url: '/icons/logo.webp',
        width: 1200,
        height: 630,
        alt: 'yousefdev - Developer',
        type: 'image/webp',
      },
    ],
    emails: ['contact@yousefdev.xyz'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yousefdev - Developer | Full-Stack & Cybersecurity',
    description: 'Full-stack developer and cybersecurity engineer building practical tools and applications.',
    images: ['/icons/logo.webp'],
    creator: '@yousefdev',
    site: '@yousefdev',
  },
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/images/favicon-16.webp', sizes: '16x16', type: 'image/webp' },
      { url: '/images/favicon-32.webp', sizes: '32x32', type: 'image/webp' },
      { url: '/images/favicon-192.webp', sizes: '192x192', type: 'image/webp' },
      { url: '/images/favicon-512.webp', sizes: '512x512', type: 'image/webp' },
      { url: '/icons/logo.webp', type: 'image/webp' },
    ],
    apple: [
      { url: '/images/favicon-192.webp', sizes: '192x192', type: 'image/webp' },
    ],
    shortcut: [
      { url: '/icons/favicon.ico' },
    ],
  },
  manifest: '/manifest.json',
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
  verification: {
    google: 'ozdDj18j8TF3lqLZ1MD3kbtVhKnV8Dp8XYo4TwmAWsI',
  },
  category: 'Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'yousefdev',
    url: 'https://yousefdev.xyz',
    jobTitle: 'Developer',
    description: 'Full-stack developer and cybersecurity engineer building practical tools and applications.',
    sameAs: [
      'https://github.com/YUST777',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business Inquiries',
      availableLanguage: ['English'],
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Software Development',
      'Full-Stack Development',
      'Cybersecurity',
      'Web Development',
      'Application Development',
      'Automation',
    ],
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'yousefdev',
    url: 'https://yousefdev.xyz',
    description: 'Full-stack developer and cybersecurity engineer',
    publisher: {
      '@type': 'Person',
      name: 'yousefdev',
    },
  }

  // Person schema
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'yousefdev',
    jobTitle: 'Developer',
    sameAs: [
      'https://github.com/YUST777',
    ],
  }

  // Service schema
  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'Service',
        name: 'Software Development',
        description: 'Full-stack web and application development',
        provider: {
          '@type': 'Person',
          name: 'yousefdev',
        },
      },
      {
        '@type': 'Service',
        name: 'Cybersecurity',
        description: 'Security engineering and threat analysis',
        provider: {
          '@type': 'Person',
          name: 'yousefdev',
        },
      },
      {
        '@type': 'Service',
        name: 'Automation',
        description: 'Automated systems and data processing',
        provider: {
          '@type': 'Person',
          name: 'yousefdev',
        },
      },
    ],
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="ozdDj18j8TF3lqLZ1MD3kbtVhKnV8Dp8XYo4TwmAWsI" />
        
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://telegram.org" />
        <link rel="dns-prefetch" href="https://tganalytics.xyz" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/icons/logo.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/hero.webp" as="image" type="image/webp" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesStructuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden`}>
        <FontAwesomeLoader />
        <ClarityAnalytics />
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  )
}

