'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export type GiftCard = {
  id: string
  title: string
  slug?: string | null
  number?: number | null
  giftId?: number | null
  pinned?: boolean
  isUpgraded?: boolean
  price?: number | null
  totalSupply?: string | null
  fragmentUrl?: string | null
  fragmentLink?: string | null
}

export type ProfileInfo = {
  username?: string
  displayName?: string
  photoDataUrl?: string | null
}

export type DecorationColors = {
  centerColor?: string | { r: number; g: number; b: number }
  edgeColor?: string | { r: number; g: number; b: number }
  patternColor?: string | { r: number; g: number; b: number }
  textColor?: string | { r: number; g: number; b: number }
}

type Props = {
  open: boolean
  onClose: () => void
  onRefresh?: () => void
  onUsernameChange?: (username: string) => void
  gifts: GiftCard[]
  profile?: ProfileInfo | null
  decorationColors?: DecorationColors | null
  loading?: boolean
  error?: string | null
  currentUsername?: string
}

function rgbToCss(color: string | { r: number; g: number; b: number } | undefined): string {
  if (!color) return 'rgb(59, 130, 246)' // Default blue
  
  if (typeof color === 'string') {
    if (color.startsWith('rgb') || color.startsWith('#')) return color
    const match = color.match(/RGB\((\d+),\s*(\d+),\s*(\d+)\)/i)
    if (match) {
      return `rgb(${match[1]}, ${match[2]}, ${match[3]})`
    }
    return color
  }
  
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export default function ProfileGiftDrawer({
  open,
  onClose,
  onRefresh,
  onUsernameChange,
  gifts,
  profile,
  decorationColors,
  loading,
  error,
  currentUsername = 'yousefmsm1'
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const expandedContentRef = useRef<HTMLDivElement>(null)
  const collapsedContentRef = useRef<HTMLDivElement>(null)
  const scrollInfoRef = useRef<HTMLDivElement>(null)
  const [usernameInput, setUsernameInput] = useState('')
  const [showUsernameInput, setShowUsernameInput] = useState(false)

  useEffect(() => {
    if (open) {
      // Lock body and html scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.classList.add('overflow-hidden')
      document.documentElement.classList.add('overflow-hidden')
    } else {
      // Unlock scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.classList.remove('overflow-hidden')
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [open])

  useEffect(() => {
    if (!open || !scrollContainerRef.current || !headerRef.current) return

    const scrollContainer = scrollContainerRef.current
    const header = headerRef.current
    const expandedContent = expandedContentRef.current
    const collapsedContent = collapsedContentRef.current
    const scrollInfo = scrollInfoRef.current

    const initialHeight = 240
    const collapsedHeight = 64
    const scrollRange = 150

    // Reset all animations on open
    gsap.set(header, { height: initialHeight })
    if (expandedContent) {
      gsap.set(expandedContent, { opacity: 1, y: 0, scale: 1 })
    }
    if (collapsedContent) {
      gsap.set(collapsedContent, { opacity: 0, y: 20, pointerEvents: 'none' })
    }
    if (scrollInfo) {
      gsap.set(scrollInfo, { y: 0 })
    }

    // Reset scroll position
    scrollContainer.scrollTop = 0

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop
      const progress = Math.min(scrollTop / scrollRange, 1)

      // Animate Header
      gsap.to(header, {
        height: initialHeight - ((initialHeight - collapsedHeight) * progress),
        duration: 0.05,
        ease: 'none',
        overwrite: true
      })

      // Animate Avatar
      if (expandedContent) {
        gsap.to(expandedContent, {
          opacity: 1 - progress,
          y: -50 * progress,
          scale: 1 - (0.2 * progress),
          duration: 0.05,
          ease: 'none',
          overwrite: true
        })
      }

      // Animate Collapsed Header
      if (collapsedContent) {
        gsap.to(collapsedContent, {
          opacity: progress > 0.8 ? (progress - 0.8) * 5 : 0,
          y: progress > 0.8 ? 0 : 20,
          pointerEvents: progress > 0.9 ? 'auto' : 'none',
          duration: 0.05,
          overwrite: true
        })
      }

      // Animate Info parallax
      if (scrollInfo) {
        gsap.to(scrollInfo, {
          y: -10 * progress,
          duration: 0.05,
          overwrite: true
        })
      }
    }

    scrollContainer.addEventListener('scroll', handleScroll)

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [open])

  const showGrid = gifts.length > 0 && !error
  const showLoadingMessage = loading && !showGrid

  // Get gradient colors from decoration or use default blue
  const centerColor = decorationColors?.centerColor
    ? rgbToCss(decorationColors.centerColor)
    : 'rgb(59, 130, 246)'
  const edgeColor = decorationColors?.edgeColor
    ? rgbToCss(decorationColors.edgeColor)
    : 'rgb(37, 99, 235)'

  const headerGradient = `linear-gradient(135deg, ${centerColor} 0%, ${edgeColor} 100%)`
  const drawerRef = useRef<HTMLDivElement>(null)

  // Animate drawer sliding from bottom
  useEffect(() => {
    if (!drawerRef.current) return

    if (open) {
      // Reset position - start from below screen
      gsap.set(drawerRef.current, { y: '100%', opacity: 0 })
      
      // Slide up from bottom - on desktop it will be 50vh tall (reaching to middle)
      // On mobile it will be full height
      gsap.to(drawerRef.current, {
        y: 0, // Always anchored at bottom
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out'
      })
    } else {
      // Slide down and fade out
      gsap.to(drawerRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-auto">
      {/* Overlay - no blur on desktop */}
      <div
        className="absolute inset-0 bg-black/80 sm:bg-black/60 sm:backdrop-blur-none backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer Container - 20% bigger (78vh on desktop), slides from bottom */}
      <div
        ref={drawerRef}
        className="relative w-full h-[100dvh] sm:h-[78vh] sm:max-w-[380px] bg-[#1c1c1e] sm:rounded-[32px] overflow-hidden shadow-2xl border-0 sm:border border-gray-800 flex flex-col"
      >
        
        {/* Sticky Header */}
        <div
          ref={headerRef}
          className="absolute top-0 left-0 right-0 overflow-hidden shadow-lg pointer-events-none z-20"
          style={{ background: headerGradient }}
        >
          {/* Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Top Right Icons */}
          <div className="absolute top-5 right-6 flex items-center gap-3 z-50 pointer-events-auto">
            {/* Username Input Toggle with Loading Animation */}
            <button
              onClick={() => setShowUsernameInput(!showUsernameInput)}
              disabled={loading}
              className="text-white/80 hover:text-white transition-colors cursor-pointer p-1.5 disabled:opacity-40 relative"
              title="Search username"
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors cursor-pointer p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Username Input Field */}
          {showUsernameInput && (
            <div className="absolute top-16 right-6 z-50 pointer-events-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-xl min-w-[200px]">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && usernameInput.trim()) {
                      const username = usernameInput.trim().replace('@', '')
                      if (onUsernameChange) {
                        onUsernameChange(username)
                      }
                      setShowUsernameInput(false)
                      setUsernameInput('')
                    }
                    if (e.key === 'Escape') {
                      setShowUsernameInput(false)
                      setUsernameInput('')
                    }
                  }}
                  placeholder="Enter username"
                  className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/40"
                  autoFocus
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      if (usernameInput.trim()) {
                        const username = usernameInput.trim().replace('@', '')
                        if (onUsernameChange) {
                          onUsernameChange(username)
                        }
                        setShowUsernameInput(false)
                        setUsernameInput('')
                      }
                    }}
                    disabled={!usernameInput.trim() || loading}
                    className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs py-1.5 px-3 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setShowUsernameInput(false)
                      setUsernameInput('')
                    }}
                    className="px-3 py-1.5 text-white/80 hover:text-white text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed Content (Name/Status - Initially Hidden) */}
          <div
            ref={collapsedContentRef}
            className="absolute inset-0 flex items-center justify-between px-6 opacity-0 pointer-events-none"
          >
            <div className="flex flex-col pt-1">
              <h2 className="text-lg font-bold flex items-center gap-1">
                <span>{profile?.displayName ?? 'yousef'}</span>
                <span className="text-white">✓</span>
              </h2>
              <span className="text-xs text-white/80 font-medium">online</span>
            </div>
          </div>

          {/* Expanded Content (Avatar + Name) */}
          <div
            ref={expandedContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center pt-4 pointer-events-none"
          >
            {/* Avatar Container - Telegram profile picture */}
            <div className="relative transform transition-transform mb-2">
              <div className="w-28 h-28 rounded-full shadow-2xl overflow-hidden border-4 border-white/20 bg-white/10 flex items-center justify-center">
                {profile?.photoDataUrl ? (
                  <img
                    src={profile.photoDataUrl}
                    alt={`${profile.displayName ?? 'Profile'} avatar`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">🦆</span>
                  </div>
                )}
              </div>
            </div>

            {/* Name & Checkmark */}
            <div className="relative flex items-center justify-center">
              <h2 className="text-sm font-bold">{profile?.displayName ?? 'yousef'}</h2>
              <div className="absolute left-full ml-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Drag Handle */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full z-30 opacity-50" />
        </div>

        {/* Scrollable Content Area */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto relative pt-[240px] z-10 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >

          {/* User Info */}
          <div ref={scrollInfoRef} className="px-6 pt-2 pb-6 text-left">
            <p className="text-gray-400 font-medium text-sm">
              @{profile?.username ?? 'yousefmsm1'}
            </p>
          </div>

          {/* The 3x3 Grid Section */}
          {showLoadingMessage && (
            <div className="text-center py-10 text-gray-400 px-6">
              Fetching live portfolio…
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-red-400 text-sm px-6">
              {error}
            </div>
          )}

          {showGrid && (
            <div className="px-4">
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 ml-1">
                Collections
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {gifts.map((gift) => (
                  <a
                    key={gift.id}
                    href={gift.fragmentLink || undefined}
                    target={gift.fragmentLink ? '_blank' : undefined}
                    rel="noreferrer"
                    className="aspect-square rounded-xl bg-[#2c2c2e] overflow-hidden relative group cursor-pointer active:scale-95 transition-transform border border-white/5 hover:border-white/20"
                  >
                    {gift.fragmentUrl ? (
                      <img
                        src={gift.fragmentUrl}
                        alt={gift.title}
                        className="w-full h-full object-cover pointer-events-none"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        No preview
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {!loading && !error && gifts.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm px-6">
              No gifts found for @{profile?.username ?? 'yousefmsm1'} right now.
            </div>
          )}

          {/* Force Scroll Spacer */}
          <div className="h-[200px] w-full pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
