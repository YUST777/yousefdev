'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      serviceItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 100,
            rotateX: -15,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.1
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
    {
      number: '01',
      title: 'Hardened Security Engineering',
      description: ' Designing compliant, zero-trust architectures with secure execution environments. Specialized in OWASP standards, threat modeling, and building defense-in-depth security infrastructure.',
      tags: ['Zero Trust', 'OWASP', 'Sandboxing']
    },
    {
      number: '02',
      title: 'Scalable Full-Stack Ecosystems',
      description: 'Architecting high-performance platforms using Next.js 15+, Docker, and PostgreSQL. Expert in building resilient, containerized systems that scale to thousands of users with sub-second latency.',
      tags: ['Next.js 16', 'Docker', 'System Design']
    },
    {
      number: '03',
      title: 'Complex Interactive Interfaces',
      description: 'Engineering desktop-class web applications with custom windowing systems and fluid state management. creating immersive, WebGL-powered user experiences that push the boundaries of browser capabilities.',
      tags: ['RetroOS', 'GSAP', 'React 19']
    },
    {
      number: '04',
      title: 'AI & Automation Solutions',
      description: 'Integrating intelligent agents and automated workflows into business logic. From malware detection models to smart recruitment pipelines, leveraging AI to solve complex operational challenges.',
      tags: ['AI Integration', 'Automation', 'Python']
    }
  ]

  return (
    <section ref={sectionRef} id="services" className="py-8 md:py-16 bg-dark relative z-20">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="bg-white text-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gray-100 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>

          <h2 className="text-3xl md:text-8xl font-display font-black mb-12 md:mb-20 tracking-tighter text-center relative z-10">SERVICES</h2>

          <div className="flex flex-col gap-12 md:gap-20 max-w-5xl mx-auto relative z-10">
            {services.map((service, index) => (
              <div
                key={index}
                ref={el => { serviceItemsRef.current[index] = el }}
                className="service-reveal flex flex-col md:flex-row gap-4 md:gap-12 items-center md:items-start text-center md:text-left border-b border-gray-200 pb-10 md:pb-12 last:border-b-0"
                style={{ perspective: '1000px' }}
              >
                <span className="text-3xl md:text-5xl font-display font-bold text-gray-300">{service.number}</span>
                <div className="w-full">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-display font-bold mb-3 md:mb-4 hover:text-gray-600 transition-colors">{service.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 md:mt-4 justify-center md:justify-start">
                    {service.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


