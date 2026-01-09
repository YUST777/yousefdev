'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [isClown, setIsClown] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)

  useEffect(() => {
    // 0.001% chance to show clown on load (Rare Easter Egg)
    const randomChance = Math.random()
    if (randomChance < 0.00001) {
      setTimeout(() => {
        triggerClownMode()
      }, 2000)
    }

    // Console commands
    if (typeof window !== 'undefined') {
      (window as any).clown = () => {
        triggerClownMode()
      }

      (window as any).clownOff = () => {
        setIsClown(false)
        setShowGlitch(false)
      }
    }
  }, [])

  const triggerClownMode = () => {
    setShowGlitch(true)
    setTimeout(() => {
      setIsClown(true)
      setShowGlitch(false)
    }, 500)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // No entrance animations for LCP stability as requested


      // Continuous subtle wiggle animation (GSAP is much better at this than CSS for perf)
      const img = avatarRef.current?.querySelector('img')
      if (img) {
        gsap.to(img, {
          y: -15,
          x: 5,
          rotation: 3,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          force3D: true
        })
      }

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        },
        y: 200,
        opacity: 0.5
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={heroRef} className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-screen">
      {/* Minimal Spotlight Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] spotlight opacity-50 pointer-events-none"></div>

      <div className="text-center z-10 px-4 relative max-w-5xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-display font-black leading-[0.9] md:leading-[0.85] mb-6 md:mb-8 tracking-tighter uppercase"
          style={{ perspective: '1000px' }}
        >
          <div className="title-line text-white/50 text-sm md:text-lg font-bold tracking-[0.2em] mb-4 uppercase">Hey, I'm</div>
          <div className="title-line">YOUSEF</div>
          <div className="title-line text-[9px] md:text-[11px] font-bold mt-6 tracking-[0.4em] text-white/40 uppercase">
            <span className="relative inline-block">
              Full-Stack Developer
            </span>
          </div>
        </h1>

        <div
          ref={avatarRef}
          className="relative w-full max-w-xs md:max-w-lg mx-auto h-64 md:h-[22rem] group"
        >
          <Image
            src={isClown ? "/images/clown.webp" : "/images/hero.webp"}
            alt="Yousef - Developer"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 280px, 352px"
            className={`relative object-contain transition-opacity duration-300 ${showGlitch ? 'glitch-effect' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              objectPosition: 'center top'
            }}
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-white via-white to-transparent"></div>
      </div>
    </header>
  )
}


