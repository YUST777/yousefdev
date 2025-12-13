'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [isClown, setIsClown] = useState(false)
  const [showGlitch, setShowGlitch] = useState(false)

  useEffect(() => {
    // 5% chance to show clown on load
    const randomChance = Math.random()
    if (randomChance < 0.05) {
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
      // Title animation with 3D effect
      if (titleRef.current) {
        const titleLines = titleRef.current.querySelectorAll('.title-line')
        gsap.from(titleLines, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          transformOrigin: 'top center',
          stagger: 0.2,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.2
        })
      }

      // Avatar animation with scale and rotation
      gsap.from(avatarRef.current, {
        opacity: 0,
        scale: 0.5,
        rotateY: 180,
        duration: 1.5,
        ease: 'back.out(1.7)',
        delay: 0.8
      })

      // Continuous subtle wiggle animation
      const img = avatarRef.current?.querySelector('img')
      if (img) {
        gsap.to(img, {
          y: -10,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
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
          <div className="title-line text-gray-400 text-3xl md:text-5xl font-normal mb-2 md:mb-3">Hey, I'm</div>
          <div className="title-line">YOUSEF</div>
          <div className="title-line text-2xl md:text-4xl font-medium mt-2 md:mt-3">
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
              Developer
            </span>
          </div>
        </h1>

        {/* Hero Avatar with Wiggle */}
        <div
          ref={avatarRef}
          className="relative w-full max-w-xs md:max-w-lg mx-auto h-64 md:h-[22rem] group cursor-pointer"
          style={{ perspective: '1000px' }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width - 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5
            const img = e.currentTarget.querySelector('img')
            if (img) {
              gsap.to(img, {
                rotateY: x * 20,
                rotateX: -y * 20,
                duration: 0.3,
                ease: 'power2.out'
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
                ease: 'elastic.out(1, 0.3)'
              })
            }
          }}
        >
          <img
            src={isClown ? "/images/clown.webp" : "/images/hero.webp"}
            alt="Yousef - Developer"
            width={800}
            height={600}
            className={`relative w-full h-full object-contain drop-shadow-2xl animate-wiggle hover:scale-105 transition-transform duration-300 ${showGlitch ? 'glitch-effect' : ''}`}
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


