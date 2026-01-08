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
      title: 'Full-Stack Development',
      description: 'Building reliable and scalable web applications. I focus on clean code, good performance, and creating platforms that solve real problems for users.',
      tags: ['Next.js', 'React', 'PostgreSQL']
    },
    {
      number: '02',
      title: 'Cybersecurity & Safety',
      description: 'Creating tools to help people stay safe online. From educational platforms like Zero Threat to secure system design, I aim to make security accessible.',
      tags: ['Zero Trust', 'Education', 'Security']
    },
    {
      number: '03',
      title: 'Competitive Programming Tools',
      description: 'Developing specialized platforms for algorithmic training. My work on ICPCHUE includes custom judge systems and recruitment pipelines for university teams.',
      tags: ['Algorithms', 'Online Judges', 'Education']
    },
    {
      number: '04',
      title: 'Automation & Bots',
      description: 'Writing scripts and bots to automate daily tasks. Whether it\'s managing data or tracking market changes, I use Python to save time and improve efficiency.',
      tags: ['Python', 'Automation', 'Bots']
    }
  ]

  return (
    <section ref={sectionRef} id="services" className="py-8 md:py-16 bg-dark relative z-10 px-3 md:px-6">
      <div className="max-w-7xl mx-auto">
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


