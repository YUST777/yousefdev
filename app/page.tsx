import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import TestimonialSlider from '@/components/TestimonialSlider'
import Footer from '@/components/Footer'

export default function Home() {
  const pageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'yousefdev - Developer',
    description: 'Full-stack developer and cybersecurity engineer building practical tools and applications.',
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

  // SoftwareApplication schema for projects
  const projectsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [],
  }

  // Review schema for testimonials
  const reviewsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'yousefdev',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '3',
      bestRating: '5',
      worstRating: '5',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Client 1',
        },
        reviewBody: "Working with yousefdev was a game-changer. He built our e-commerce platform with clean architecture, integrated multiple payment gateways seamlessly, and added AI-powered features we didn't even know were possible. The security implementation was top-notch, and the performance is incredible.",
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Client 2',
        },
        reviewBody: "Every time we gave yousefdev a challenge, he didn't just solve it — he built a scalable system around it. From scraping to real-time price tracking, everything ran smoothly with zero downtime.",
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Client 3',
        },
        reviewBody: "What makes yousefdev different is that he cares about both the engineering and the user experience. The product he delivered looked clean, felt intuitive, and performed flawlessly.",
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsStructuredData) }}
      />
      <main>
        <Navigation />
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Projects />
        <TestimonialSlider />
        <Footer />
      </main>
    </>
  )
}


