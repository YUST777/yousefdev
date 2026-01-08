import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'

const About = dynamic(() => import('@/components/About'))
const Services = dynamic(() => import('@/components/Services'))
const Projects = dynamic(() => import('@/components/Projects'))
const BuildingPublicly = dynamic(() => import('@/components/BuildingPublicly'))
const Footer = dynamic(() => import('@/components/Footer'))

export default function Home() {
  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'yousefdev - Developer',
    description: 'Full-stack developer building practical tools and applications.',
    url: 'https://yousefdev.xyz',
    mainEntity: {
      '@type': 'Person',
      name: 'yousefdev',
      url: 'https://yousefdev.xyz',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://yousefdev.xyz',
        },
      ],
    },
  }

  const projectsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Featured Projects',
    'description': 'A collection of advanced software engineering projects.',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'item': {
          '@type': 'SoftwareApplication',
          'name': 'Zero Threat',
          'operatingSystem': 'Windows, Web',
          'applicationCategory': 'SecurityApplication',
          'description': 'National award-winning AI-driven security ecosystem featuring a file scanner, browser extension, and Windows agent.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        }
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'item': {
          '@type': 'SoftwareApplication',
          'name': 'ICPCHUE',
          'operatingSystem': 'Web',
          'applicationCategory': 'EducationalApplication',
          'description': 'Hardened, sandboxed online judge platform for competitive programming training.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        }
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'item': {
          '@type': 'SoftwareApplication',
          'name': 'retroOS',
          'operatingSystem': 'Web',
          'applicationCategory': 'DeveloperApplication',
          'description': 'Advanced React OS simulation with custom windowing and file systems.',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        }
      }
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsStructuredData) }}
      />
      <main>
        <Navigation />
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <BuildingPublicly />
        <Footer />
      </main>
    </>
  )
}


