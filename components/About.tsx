'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

const bioText = "I’m Yousef, a Cybersecurity Engineer and Full-stack Developer based in Egypt. Since June 2024, I have specialized in architecting hardened web systems with a focus on security by design. While many developers prioritize UI, I build production-grade environments that implement defense-in-depth strategies, achieving A+ security ratings and strict OWASP compliance without compromising performance."

export default function About() {
  const statsRowRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const emoji1Ref = useRef<HTMLDivElement>(null)
  const emoji2Ref = useRef<HTMLDivElement>(null)
  const emoji3Ref = useRef<HTMLDivElement>(null)
  const emoji4Ref = useRef<HTMLDivElement>(null)
  const [codingDuckData, setCodingDuckData] = useState<any>(null)
  const [duckData, setDuckData] = useState<any>(null)
  const [codeDuck2Data, setCodeDuck2Data] = useState<any>(null)
  const [heartData, setHeartData] = useState<any>(null)

  useEffect(() => {
    // Load Lottie JSON files
    fetch('/json/duck.json').then(r => r.json()).then(setDuckData)
    fetch('/json/heart.json').then(r => r.json()).then(setHeartData)
    fetch('/json/Coding Duck.json').then(r => r.json()).then(setCodingDuckData)
    fetch('/json/codeduck2.json').then(r => r.json()).then(setCodeDuck2Data)
  }, [])

  useEffect(() => {
    if (!aboutSectionRef.current) return

    const ctx = gsap.context(() => {
      // Find all reveal spans
      const spans = gsap.utils.toArray<HTMLElement>('.reveal-word')

      if (spans.length > 0) {
        // Scroll-triggered text reveal
        gsap.to(spans, {
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: 'top center',
            end: 'center top',
            scrub: 1,
            onUpdate: (self) => {
              // Accelerate the reveal - text fully visible at 70% scroll
              const progress = Math.min(self.progress * 1.4, 1)
              const totalSpans = spans.length
              const activeCount = Math.floor(progress * totalSpans)

              spans.forEach((span, index) => {
                if (index < activeCount) {
                  span.classList.remove('opacity-20')
                  span.classList.add('opacity-100', 'text-white')
                } else {
                  span.classList.add('opacity-20')
                  span.classList.remove('opacity-100', 'text-white')
                }
              })
            }
          }
        })
      }

      // Stats row animation
      gsap.from(statsRowRef.current, {
        scrollTrigger: {
          trigger: statsRowRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        force3D: true
      })

      // Emoji flying animations
      gsap.from(emoji2Ref.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        },
        x: window.innerWidth,
        rotation: 720,
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.2,
        force3D: true
      })

      gsap.from(emoji1Ref.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        },
        x: -window.innerWidth,
        rotation: -720,
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        delay: 0.1,
        force3D: true
      })

      gsap.from(emoji3Ref.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        },
        x: window.innerWidth,
        rotation: 360,
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.4,
        force3D: true
      })

      gsap.from(emoji4Ref.current, {
        scrollTrigger: {
          trigger: aboutSectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none none reverse'
        },
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
        delay: 0.5,
        force3D: true
      })

      // Floating emojis parallax
      const emojiRefs = [emoji1Ref.current, emoji2Ref.current, emoji3Ref.current, emoji4Ref.current].filter(Boolean)
      if (emojiRefs.length > 0) {
        gsap.to(emojiRefs, {
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          },
          y: -100,
          rotation: '+=15',
          ease: 'none',
          force3D: true
        })
      }
    }, aboutSectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={aboutSectionRef} className="relative bg-dark min-h-[120vh] md:min-h-[150vh] flex flex-col justify-center items-center">
      {/* Floating Elements - Lottie Animations */}
      <div ref={emoji1Ref} className="hidden md:block absolute top-[30%] left-10 w-40 h-40 opacity-30 pointer-events-none select-none" role="img" aria-label="Animated mascot: coding duck">
        {codingDuckData && <Lottie animationData={codingDuckData} loop={true} />}
      </div>
      <div ref={emoji4Ref} className="hidden md:block absolute bottom-20 left-10 w-32 h-32 opacity-30 pointer-events-none select-none" role="img" aria-label="Animated mascot: duck">
        {duckData && <Lottie animationData={duckData} loop={true} />}
      </div>
      <div ref={emoji2Ref} className="hidden md:block absolute bottom-20 right-10 w-32 h-32 opacity-30 pointer-events-none select-none" role="img" aria-label="Animated mascot: code duck 2">
        {codeDuck2Data && <Lottie animationData={codeDuck2Data} loop={true} />}
      </div>
      <div ref={emoji3Ref} className="hidden md:block absolute top-[40%] right-20 w-24 h-24 opacity-20 pointer-events-none select-none" role="img" aria-label="Animated mascot: heart">
        {heartData && <Lottie animationData={heartData} loop={true} />}
      </div>

      {/* Sticky Container */}
      <div className="sticky top-20 md:top-0 h-auto md:h-screen flex flex-col items-center justify-center max-w-4xl mx-auto px-4 md:px-6 text-center z-10 py-20 md:py-0">
        {/* Massive Headline */}
        <h2 className="text-5xl md:text-9xl font-display font-black mb-8 md:mb-12 tracking-widest text-white select-none uppercase">
          ABOUT ME
        </h2>

        {/* Scroll Reveal Text Container */}
        <div className="relative bg-dark/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/5 w-full">
          <div className="text-xl md:text-4xl font-display font-bold leading-tight flex flex-wrap justify-center items-baseline gap-x-2 md:gap-x-3 gap-y-1 md:gap-y-2">
            <span className="inline">
              {bioText.split(' ').map((word, i) => (
                <span key={i} className="reveal-word opacity-20 transition-opacity duration-200">
                  {word}{' '}
                </span>
              ))}
            </span>
          </div>

          {/* Stats Row */}
          <div
            ref={statsRowRef}
            className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-6 md:pt-8 opacity-0 transition-opacity duration-500"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 md:mb-2">06+</h3>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Projects</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 md:mb-2">16</h3>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Repos</p>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1 md:mb-2">100%</h3>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">Commitment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
