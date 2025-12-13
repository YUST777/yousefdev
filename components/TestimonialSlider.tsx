'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: number
  client: string
  text: string
  project: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    client: 'Client 1',
    text: "Working with yousefdev was a game-changer. He built our e-commerce platform with clean architecture, integrated multiple payment gateways seamlessly, and added AI-powered features we didn't even know were possible. The security implementation was top-notch, and the performance is incredible. Highly reliable, incredibly fast, and always delivers exactly what we need — sometimes better.",
    project: 'E-Commerce Platform',
    avatar: '/images/customor1.webp'
  },
  {
    id: 2,
    client: 'Client 2',
    text: "Every time we gave yousefdev a challenge, he didn't just solve it — he built a scalable system around it. From scraping to real-time price tracking, everything ran smoothly with zero downtime. One of the most resourceful developers I've worked with.",
    project: 'Monitoring Suite',
    avatar: '/images/customor2.webp'
  },
  {
    id: 3,
    client: 'Client 3',
    text: "What makes yousefdev different is that he cares about both the engineering and the user experience. The product he delivered looked clean, felt intuitive, and performed flawlessly. It's rare to find someone strong in backend, security, and design at the same time.",
    project: 'Product Launch',
    avatar: '/images/customor3.webp'
  }
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial position off-screen
      gsap.set(sliderRef.current, { y: '100%' })

      // Find the Projects section to use as trigger
      const projectsSection = document.querySelector('#projects')

      // Slide up animation - plays once and stays
      // Triggers when Projects section ends (after CanvasStory box)
      ScrollTrigger.create({
        trigger: projectsSection || sliderRef.current,
        start: 'bottom center',
        once: true, // Only trigger once
        onEnter: () => {
          gsap.to(sliderRef.current, {
            y: 0,
            duration: 1.2,
            ease: 'power3.out'
          })
        }
      })

      // Animate cards on enter - also once
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top center+=100',
          once: true // Only trigger once
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5
      })
    }, sliderRef)

    return () => ctx.revert()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      ref={sliderRef}
      className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden py-12 md:py-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-3 tracking-tight uppercase">
            Clients Feedback
          </h2>
        </div>

        {/* Testimonial Cards Stack */}
        <div className="relative max-w-5xl mx-auto">
          {/* Card Numbers at Top */}
          <div className="flex gap-3 mb-6 flex-wrap justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 cursor-pointer ${
                  index === currentIndex
                    ? 'bg-white/10 border-white/30 scale-105'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="text-2xl md:text-3xl font-display font-black text-white">
                  0{testimonial.id}
                </span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">
                    {testimonial.client}
                  </p>
                  <button className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white mt-0.5 hover:bg-white/10 transition-colors">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Main Testimonial Display */}
          <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 md:p-12 flex flex-col">
            {/* Avatar and Client Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border border-white/20 bg-white/5 flex-shrink-0">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={`${testimonials[currentIndex].client} portrait`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-white">
                  {testimonials[currentIndex].client}
                </h3>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                  {testimonials[currentIndex].project}
                </p>
              </div>
            </div>

            {/* Testimonial Text - Properly Sized */}
            <blockquote className="text-base md:text-xl font-normal text-white/90 leading-relaxed mb-8 flex-grow">
              "{testimonials[currentIndex].text}"
            </blockquote>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-12 bg-white' : 'w-2 bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  aria-label="Previous testimonial"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
