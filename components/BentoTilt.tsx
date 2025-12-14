'use client'

import { useRef, useState, ReactNode } from 'react'
import gsap from 'gsap'

interface BentoTiltProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function BentoTilt({ children, className = '', onClick }: BentoTiltProps) {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef<HTMLDivElement>(null)

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

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (onClick && e.touches.length === 1) {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!onClick || !touchStartRef.current) return

    const touch = e.changedTouches[0]
    const deltaX = Math.abs(touch.clientX - touchStartRef.current.x)
    const deltaY = Math.abs(touch.clientY - touchStartRef.current.y)
    const deltaTime = Date.now() - touchStartRef.current.time

    // Only trigger if it was a tap (not a swipe) and within reasonable time
    if (deltaX < 10 && deltaY < 10 && deltaTime < 300) {
      e.preventDefault()
      e.stopPropagation()
      onClick()
    }

    touchStartRef.current = null
  }

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ 
        transform: transformStyle,
        transition: 'transform 0.1s ease-out',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  )
}
