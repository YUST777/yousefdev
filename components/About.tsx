'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

import { SiReact, SiNextdotjs, SiPostgresql, SiPython, SiTailwindcss } from "react-icons/si"
import { HiCode } from "react-icons/hi"

const bioText = "I'm Yousef, a Level 2 AI & Cybersecurity student based in Egypt and a passionate Full-Stack Developer. Since June 2024, I've been building real projects to sharpen my skills — from custom judge systems to web platforms. I love learning by doing, and I'm always exploring new technologies to solve interesting problems."

// Tech to Project Mapping
const techProjects: Record<string, { name: string; description: string; link: string; color: string }[]> = {
  React: [
    { name: 'ICPCHUE', description: 'Hardened, sandboxed online judge platform.', link: 'https://icpchue.xyz', color: '#61DAFB' },
    { name: 'Zero Threat', description: 'National award-winning AI-driven security ecosystem.', link: 'https://zerothreat.yousefdev.xyz', color: '#61DAFB' },
  ],
  'Next.js': [
    { name: 'ICPCHUE', description: 'Hardened, sandboxed online judge platform.', link: 'https://icpchue.xyz', color: '#000' },
    { name: 'Zero Threat', description: 'National award-winning AI-driven security ecosystem.', link: 'https://zerothreat.yousefdev.xyz', color: '#000' },
  ],
  PostgreSQL: [
    { name: 'ICPCHUE', description: 'Hardened, sandboxed online judge platform.', link: 'https://icpchue.xyz', color: '#336791' },
    { name: 'Gifts Charts', description: 'High-throughput database for live market data.', link: 'https://t.me/giftsChartBot', color: '#336791' },
  ],
  Python: [
    { name: 'Gifts Charts', description: 'Telegram bot engine handling live API polling.', link: 'https://t.me/giftsChartBot', color: '#3776AB' },
  ],
  Tailwind: [
    { name: 'ICPCHUE', description: 'Hardened, sandboxed online judge platform.', link: 'https://icpchue.xyz', color: '#38B2AC' },
    { name: 'Zero Threat', description: 'National award-winning AI-driven security ecosystem.', link: 'https://zerothreat.yousefdev.xyz', color: '#38B2AC' },
  ],
}

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
  const [selectedTech, setSelectedTech] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const techIcons = [
    { name: 'React', Icon: SiReact, hoverColor: '#61DAFB', spin: false },
    { name: 'Next.js', Icon: SiNextdotjs, hoverColor: '#fff', spin: false },
    { name: 'PostgreSQL', Icon: SiPostgresql, hoverColor: '#336791', spin: false },
    { name: 'Python', Icon: SiPython, hoverColor: '#3776AB', spin: false },
    { name: 'Tailwind', Icon: SiTailwindcss, hoverColor: '#38B2AC', spin: false },
  ]

  return (
    <section id="about" ref={aboutSectionRef} className="relative bg-dark py-12 md:py-16">
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

      {/* Content Container - No longer sticky */}
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 md:px-6 text-center z-10">
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

          {/* Tech Stack */}
          <div className="mt-8 pt-8 pb-6 border-t border-white/10 w-full">
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-6 text-center">Tech Stack</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center mb-4">
              {techIcons.map(({ name, Icon, hoverColor, spin }) => (
                <button
                  key={name}
                  onClick={() => setSelectedTech(name)}
                  className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 focus:outline-none"
                  aria-label={`View projects using ${name}`}
                >
                  <Icon
                    className={`w-8 h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-[${hoverColor}] transition-colors duration-300 ${spin ? 'animate-[spin_10s_linear_infinite]' : ''}`}
                    style={{ '--hover-color': hoverColor } as React.CSSProperties}
                  />
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 animate-pulse">Click me :)</p>
          </div>
        </div>
      </div>

      {/* Tech Project Popup - Chat Bubble Style */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="w-full max-w-sm relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5">
                  {/* Speech Bubble Tail - Visual only, centered */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#0d0d0d] rotate-45 border-r border-b border-white/5"></div>

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                      <HiCode className="text-lg text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-bold text-sm">{selectedTech}</p>
                      <p className="text-[10px] text-gray-500">Used in {techProjects[selectedTech]?.length || 0} project(s)</p>
                    </div>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="w-7 h-7 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Project Messages */}
                  <div className="space-y-2">
                    {techProjects[selectedTech]?.map((project) => (
                      <a
                        key={project.name}
                        href={project.link}
                        target={project.link.startsWith('/') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="block bg-white/5 hover:bg-white/10 rounded-2xl px-4 py-3 transition-all duration-200 group border border-transparent hover:border-white/10"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">{project.name}</h4>
                          <span className="text-[9px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{project.description}</p>
                      </a>
                    ))}
                  </div>

                  {/* Timestamp */}
                  <p className="text-[9px] text-gray-600 text-right mt-3">Click to visit project</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

