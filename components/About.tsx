'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import ProfileGiftDrawer, { GiftCard, ProfileInfo, DecorationColors } from './ProfileGiftDrawer'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const textElementRef = useRef<HTMLParagraphElement>(null)
  const statsRowRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const emoji2Ref = useRef<HTMLDivElement>(null)
  const emoji3Ref = useRef<HTMLDivElement>(null)
  const drawerRequestRef = useRef(false)
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [spans, setSpans] = useState<HTMLSpanElement[]>([])
  const [duckData, setDuckData] = useState<any>(null)
  const [heartData, setHeartData] = useState<any>(null)
  const [duck2Data, setDuck2Data] = useState<any>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerGifts, setDrawerGifts] = useState<GiftCard[]>([])
  const [drawerProfile, setDrawerProfile] = useState<ProfileInfo | null>(null)
  const [drawerDecorationColors, setDrawerDecorationColors] = useState<DecorationColors | null>(null)
  const [drawerLoading, setDrawerLoading] = useState(false)
  const [drawerError, setDrawerError] = useState<string | null>(null)
  const [currentUsername, setCurrentUsername] = useState('yousefmsm1')
  const currentUsernameRef = useRef('yousefmsm1')

  useEffect(() => {
    // Load Lottie JSON files
    fetch('/json/duck.json').then(r => r.json()).then(setDuckData)
    fetch('/json/heart.json').then(r => r.json()).then(setHeartData)
    fetch('/json/duck2.json').then(r => r.json()).then(setDuck2Data)
  }, [])

  const clearRefreshTimer = () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current)
      refreshTimerRef.current = null
    }
  }

  const scheduleRefreshPoll = () => {
    if (refreshTimerRef.current) return
    const usernameToRefresh = currentUsernameRef.current // Use ref to get latest value
    refreshTimerRef.current = setTimeout(() => {
      refreshTimerRef.current = null
      // Only refresh if username hasn't changed
      if (currentUsernameRef.current === usernameToRefresh) {
        fetchTelegramGifts({ silent: true, username: usernameToRefresh })
      }
    }, 4000)
  }

  const fetchTelegramGifts = async ({ silent = false, username }: { silent?: boolean; username?: string } = {}) => {
    try {
      if (!silent) {
        setDrawerLoading(true)
      }
      setDrawerError(null)
      const targetUsername = username || currentUsername
      const response = await fetch(`/api/profile-gifts?username=${encodeURIComponent(targetUsername)}`, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Failed to load gifts')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Unable to load gifts')
      }
      setDrawerGifts(data.gifts || [])
      setDrawerProfile(data.profile || null)
      setDrawerDecorationColors(data.decorationColors || null)
      if (data.refreshing) {
        scheduleRefreshPoll()
      } else {
        clearRefreshTimer()
      }
    } catch (error: any) {
      setDrawerError(error.message || 'Unexpected error while loading gifts.')
      clearRefreshTimer()
    } finally {
      if (!silent) {
        setDrawerLoading(false)
      }
    }
  }

  const handleUsernameChange = (username: string) => {
    // Clear any pending refresh timers to prevent reverting to old user
    clearRefreshTimer()
    const cleanUsername = username.replace('@', '')
    currentUsernameRef.current = cleanUsername // Update ref immediately
    setCurrentUsername(cleanUsername)
    fetchTelegramGifts({ username: cleanUsername, silent: false })
  }
  
  // Keep ref in sync with state
  useEffect(() => {
    currentUsernameRef.current = currentUsername
  }, [currentUsername])

  useEffect(() => {
    if (drawerOpen && !drawerRequestRef.current) {
      drawerRequestRef.current = true
      fetchTelegramGifts({ username: currentUsername })
    }
    if (!drawerOpen) {
      drawerRequestRef.current = false
      clearRefreshTimer()
    }
  }, [drawerOpen])

  useEffect(() => {
    return () => {
      clearRefreshTimer()
    }
  }, [])

  const handleDuckClick = () => {
    setDrawerOpen(true)
  }

  useEffect(() => {
    if (!textElementRef.current) return

    const textContent = textElementRef.current.innerText
    textElementRef.current.innerHTML = ''
    
    const words = textContent.split(' ')
    const spanElements: HTMLSpanElement[] = []
    
    words.forEach(word => {
      const span = document.createElement('span')
      span.textContent = word
      span.className = 'opacity-20 transition-opacity duration-200'
      textElementRef.current?.appendChild(span)
      spanElements.push(span)
      textElementRef.current?.appendChild(document.createTextNode(' '))
    })

    setSpans(spanElements)
  }, [])

  useEffect(() => {
    if (!aboutSectionRef.current || spans.length === 0) return

    const ctx = gsap.context(() => {
      // Scroll-triggered text reveal - faster and completes before section ends
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
        ease: 'power3.out'
      })

      // Emoji flying animations - from outside screen to their positions
      // Emoji 2 (🦆) - positioned on RIGHT, flies in from right
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
        delay: 0.2
      })

      // Emoji 3 (❤️) - positioned on RIGHT, flies in from right
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
        delay: 0.4
      })

      // Floating emojis parallax after they land
      const emojiRefs = [emoji2Ref.current, emoji3Ref.current].filter(Boolean)
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
        ease: 'none'
      })
      }
    }, aboutSectionRef)

    return () => ctx.revert()
  }, [spans])

  return (
    <section id="about" ref={aboutSectionRef} className="relative bg-dark min-h-[120vh] md:min-h-[150vh] flex flex-col justify-center items-center">
      {/* Floating Elements - Lottie Animations */}
      <div ref={emoji2Ref} className="hidden md:block absolute bottom-20 right-10 w-32 h-32 opacity-30 pointer-events-none select-none">
        {duckData && <Lottie animationData={duckData} loop={true} />}
      </div>
      <div ref={emoji3Ref} className="hidden md:block absolute top-[40%] right-20 w-24 h-24 opacity-20 pointer-events-none select-none">
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
            <span 
              ref={textElementRef}
              className="inline"
            >
              I'm Yousef (aka yousefdev) — a cybersecurity engineer and full-stack developer building practical tools with AI, automation, and security focus. Since starting in June 2024, I've been focused on shipping products with clean design, solid architecture, and real impact.
            </span>
            <div className="inline-flex flex-col items-center relative group">
              <button
                type="button"
                onClick={handleDuckClick}
                className="inline-flex w-10 h-10 md:w-12 md:h-12 -mb-1 md:-mb-2 items-center justify-center rounded-xl border border-white/10 hover:border-white/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Open live Telegram gifts"
              >
                {duck2Data && <Lottie animationData={duck2Data} loop={true} />}
              </button>
              
              {/* "click me :)" text under the duck */}
              <div 
                className="text-gray-400 text-[8px] md:text-[10px] font-medium whitespace-nowrap mt-1 pointer-events-none"
              >
                click me :)
              </div>
            </div>
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
      <ProfileGiftDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onRefresh={() => fetchTelegramGifts()}
        onUsernameChange={handleUsernameChange}
        gifts={drawerGifts}
        profile={drawerProfile}
        decorationColors={drawerDecorationColors}
        loading={drawerLoading}
        error={drawerError}
        currentUsername={currentUsername}
      />
    </section>
  )
}


