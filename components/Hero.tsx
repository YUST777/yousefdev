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
      // Title animation - now just a subtle finish to the CSS entrance
      if (titleRef.current) {
        const titleLines = titleRef.current.querySelectorAll('.title-line')
        gsap.to(titleLines, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.1
        })
      }

      // Avatar subtle entrance finish
      gsap.to(avatarRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3
      })

      // Continuous subtle wiggle animation
      const img = avatarRef.current?.querySelector('img')
      if (img) {
        gsap.to(img, {
          y: -10,
          duration: 2,
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
          <div className="title-line hero-line-entrance text-white/50 text-sm md:text-lg font-bold tracking-[0.2em] mb-4 uppercase">Hey, I'm</div>
          <div className="title-line hero-line-entrance">YOUSEF</div>
          <div className="title-line hero-line-entrance text-[9px] md:text-[11px] font-bold mt-6 tracking-[0.4em] text-white/40 uppercase">
            <span className="relative inline-block">
              Full-Stack Developer
            </span>
          </div>
        </h1>

        {/* Hero Avatar with Wiggle */}
        <div
          ref={avatarRef}
          className="relative w-full max-w-xs md:max-w-lg mx-auto h-64 md:h-[22rem] group cursor-pointer head-pop"
          style={{ perspective: '1000px' }}
          onMouseEnter={(e) => {
            // Cache dimensions one time on enter
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.dataset.cx = (rect.left + rect.width / 2).toString();
            e.currentTarget.dataset.cy = (rect.top + rect.height / 2).toString();
            e.currentTarget.dataset.w = rect.width.toString();
            e.currentTarget.dataset.h = rect.height.toString();
          }}
          onMouseMove={(e) => {
            const el = e.currentTarget;
            if (!el.dataset.w) return; // Guard clause

            const cx = parseFloat(el.dataset.cx!);
            const cy = parseFloat(el.dataset.cy!);
            const w = parseFloat(el.dataset.w!);
            const h = parseFloat(el.dataset.h!);

            const x = (e.clientX - cx) / w;
            const y = (e.clientY - cy) / h;

            const img = el.querySelector('img')
            if (img) {
              gsap.to(img, {
                rotateY: x * 20,
                rotateX: -y * 20,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: true
              })
            }
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector('img')
            if (img) {
              gsap.to(img, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)',
                overwrite: true
              })
            }
          }}
        >
          <Image
            src={isClown ? "/images/clown.webp" : "/images/hero.webp"}
            alt="Yousef - Developer"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 280px, 352px"
            className={`relative object-contain drop-shadow-2xl animate-wiggle hover:scale-105 transition-transform duration-300 ${showGlitch ? 'glitch-effect' : ''}`}
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


