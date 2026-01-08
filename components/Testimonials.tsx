'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealRefs.current.forEach((el, index) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            rotateX: -20,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.15
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const testimonials = [
    {
      text: '"yousefdev\'s technical expertise is unmatched. The solutions delivered saved us weeks of development time."',
      name: 'Alex Chen',
      role: 'COMMUNITY MEMBER',
      avatar: 'https://i.pravatar.cc/150?img=12',
      delay: 'delay-100'
    },
    {
      text: '"A true \'Vibe Coder\'. The tools are efficient, the code is clean, and the documentation is spot on. Quack!"',
      name: 'Sarah Johnson',
      role: 'COLLABORATOR',
      avatar: 'https://i.pravatar.cc/150?img=47',
      delay: 'delay-200'
    },
    {
      text: '"From zero to fully deployed application in record time. The security-focused approach provided peace of mind."',
      name: 'Michael Rodriguez',
      role: 'CLIENT',
      avatar: 'https://i.pravatar.cc/150?img=33',
      delay: 'delay-300'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-40 border-t border-white/5 bg-black px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          ref={el => { revealRefs.current[0] = el }}
          className="flex items-center gap-4 mb-12 md:mb-20"
        >
          <span className="h-[1px] w-8 bg-white/20"></span>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">Feedback & Stats</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => { revealRefs.current[index + 1] = el }}
              className="flex flex-col justify-between h-full group cursor-default text-center md:text-left"
              style={{ perspective: '1000px' }}
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed mb-6 md:mb-8 group-hover:text-white transition-colors">
                {testimonial.text}
              </p>

              <div className="flex items-center gap-3 sm:gap-4 justify-center md:justify-start">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={56}
                  height={56}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/20 group-hover:border-white/40 transition-all"
                />
                <div className="text-left">
                  <h4 className="font-bold text-sm sm:text-base text-white">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-mono mt-0.5 sm:mt-1">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


