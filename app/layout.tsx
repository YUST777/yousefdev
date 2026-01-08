import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import FontAwesomeLoader from '@/components/FontAwesomeLoader'
import ClarityAnalytics from '@/components/ClarityAnalytics'
import SmoothScroll from '@/components/SmoothScroll'
import { Analytics } from "@vercel/analytics/next"
import { MapExpandedProvider } from '@/context/MapExpandedContext'

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
    default: 'yousefdev - Full-Stack Developer',
    template: '%s | yousefdev'
  },
  description: 'yousefdev is a Full-Stack Developer specializing in modern web applications, clean architecture, and production-grade systems. Expert in Next.js, React, Node.js, and TypeScript.',
  keywords: [
    'yousefdev',
    'Full-Stack Developer',
    'Full-Stack Developer',
    'Lead Software Engineer',
    'Hardened Web Systems',
    'Secure Online Judge',
    'Sandboxed Code Execution',
    'Next.js 16 Developer',
    'React 19 Specialist',
    'OWASP Compliance',
    'Defense-in-Depth',
    'Cybersecurity Portfolio',
    'Award-winning Developer',
    'Zero Threat AI',
    'ICPC HUE Ecosystem',
    'Penetration Testing',
    'Security Engineering',
    'Web Application Security',
    'System Architect',
    'Node.js Security',
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
    title: 'yousefdev - Full-Stack Developer',
    description: 'Full-stack developer building practical tools and applications with React, Next.js, and TypeScript. Expert in web development and automation.',
    images: [
      {
        url: 'https://yousefdev.xyz/images/og-preview-v2.png',
        width: 1200,
        height: 630,
        alt: 'yousefdev - Full-Stack Developer',
        type: 'image/png',
      },
    ],
    emails: ['contact@yousefdev.xyz'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yousefdev - Full-Stack Developer',
    description: 'Full-stack developer building practical tools and applications with React, Next.js, and TypeScript.',
    images: ['https://yousefdev.xyz/images/og-preview-v2.png'],
    creator: '@yousefdev',
    site: '@yousefdev',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    ],
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
  verification: {
    google: 'ozdDj18j8TF3lqLZ1MD3kbtVhKnV8Dp8XYo4TwmAWsI',
  },
  category: 'Technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'yousefdev',
  },
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
    alternateName: 'Yousef',
    url: 'https://yousefdev.xyz',
    jobTitle: 'Full-Stack Developer',
    description: 'Full-stack developer building practical tools and applications with clean design and solid architecture.',
    image: 'https://yousefdev.xyz/icons/browser-icon.webp',
    sameAs: [
      'https://github.com/YUST777',
    ],
    email: 'contact@yousefdev.xyz',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Business Inquiries',
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'Worldwide',
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      'Software Development',
      'Full-Stack Development',
      'Cybersecurity',
      'Web Development',
      'Application Development',
      'Automation',
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Security Engineering',
      'Penetration Testing',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Horus University',
    },
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'yousefdev',
    alternateName: 'yousefdev Portfolio',
    url: 'https://yousefdev.xyz',
    description: 'Full-stack developer building practical tools and applications',
    publisher: {
      '@type': 'Person',
      name: 'yousefdev',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yousefdev.xyz/?s={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
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

  // Professional Service schema
  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'yousefdev Development Services',
    description: 'Full-stack development, cybersecurity, and automation services',
    provider: {
      '@type': 'Person',
      name: 'yousefdev',
      url: 'https://yousefdev.xyz',
    },
    areaServed: 'Worldwide',
    serviceType: ['Software Development', 'Cybersecurity', 'Web Development', 'Automation'],
    url: 'https://yousefdev.xyz',
  }

  // Service schema
  const servicesStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services Offered',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'Service',
          name: 'Full-Stack Web Development',
          description: 'Custom web applications built with React, Next.js, and TypeScript',
          provider: {
            '@type': 'Person',
            name: 'yousefdev',
          },
          areaServed: 'Worldwide',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'Service',
          name: 'Cybersecurity Services',
          description: 'Security engineering, penetration testing, and threat analysis',
          provider: {
            '@type': 'Person',
            name: 'yousefdev',
          },
          areaServed: 'Worldwide',
        },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: {
          '@type': 'Service',
          name: 'Automation Solutions',
          description: 'Automated systems and data processing solutions',
          provider: {
            '@type': 'Person',
            name: 'yousefdev',
          },
          areaServed: 'Worldwide',
        },
      },
    ],
  }

  // FAQ schema for recruiters
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What are your core security specialties?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'I specialize in hardened web systems, secure code execution engines, sandboxed environments (Zero Threat), and OWASP-compliant architecture.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What is your primary tech stack?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'My primary stack includes Next.js, React, Node.js, TypeScript, and Supabase, with a heavy focus on security-by-design.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Have you won any competitions?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, my project Zero Threat secured 3rd place in a national student forum at Tanta University, outperforming senior-level entries.'
        }
      }
    ]
  }

  // WebApplication schema for PWA
  const webApplicationData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'yousefdev Portfolio',
    description: 'The official portfolio and PWA of Yousef, a Full-Stack Developer.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    url: 'https://yousefdev.xyz',
    screenshot: 'https://yousefdev.xyz/images/og-preview-v2.png',
    author: {
      '@type': 'Person',
      name: 'yousefdev',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationData) }}
        />
      </head>
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden`}>
        <MapExpandedProvider>
          <SmoothScroll>
            <FontAwesomeLoader />
            <ClarityAnalytics />
            <div className="noise-overlay"></div>
            {children}
            <Analytics />
          </SmoothScroll>
        </MapExpandedProvider>
      </body>
    </html>
  )
}

