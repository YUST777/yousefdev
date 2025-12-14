'use client'

import { useRef, useState, ReactNode, useCallback } from 'react'
import gsap from 'gsap'

interface BentoTiltProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function BentoTilt({ children, className = '', onClick }: BentoTiltProps) {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef<HTMLDivElement>(null)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return

    const { left, top, width, height } = itemRef.current.getBoundingClientRect()

    const relativeX = (event.clientX - left) / width
    const relativeY = (event.clientY - top) / height

    const tiltX = (relativeY - 0.5) * 10
    const tiltY = (relativeX - 0.5) * -10

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
    setTransformStyle(newTransform)
  }

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, {
      duration: 0.5,
      ease: 'power2.out',
      transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    })
  }

  // Track touch start position to differentiate taps from scrolls
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartPos.current = { x: touch.clientX, y: touch.clientY }
  }, [])

  // Handle touch end - only trigger click if it was a tap (not a scroll)
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartPos.current || !onClick) return

    const touch = e.changedTouches[0]
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x)
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y)

    // If finger moved less than 10px, treat as a tap
    if (deltaX < 10 && deltaY < 10) {
      e.preventDefault()
      onClick()
    }

    touchStartPos.current = null
  }, [onClick])

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role={onClick ? 'button' : undefined}
      style={{
        transform: transformStyle,
        transition: 'transform 0.1s ease-out',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </div>
  )
}
