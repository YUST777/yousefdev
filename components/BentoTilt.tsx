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

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onTouchEnd={handleTouchEnd}
      style={{ 
        transform: transformStyle,
        transition: 'transform 0.1s ease-out',
        touchAction: 'manipulation'
      }}
    >
      {children}
    </div>
  )
}
