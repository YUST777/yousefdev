'use client'

import { useState } from 'react'
import StaggeredMenu from './StaggeredMenu'
import Image from 'next/image'
import { useMapExpanded } from '@/context/MapExpandedContext'

export default function Navigation() {
  const { isMapExpanded } = useMapExpanded()

  const menuItems = [
    { label: 'About', link: '#about', ariaLabel: 'Navigate to About section' },
    { label: 'Services', link: '#services', ariaLabel: 'Navigate to Services section' },
    { label: 'Projects', link: '#projects', ariaLabel: 'Navigate to Projects section' },
    { label: 'Contact', link: '#contact', ariaLabel: 'Navigate to Contact section' },
  ]

  // Hide navigation when map is expanded
  if (isMapExpanded) {
    return null
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed w-full z-50 top-0 left-0 px-6 py-6 transition-all duration-300 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
          <a href="/" className="flex items-center">
            <Image
              src="/icons/logo.webp"
              alt="yousefdev Logo"
              width={128}
              height={128}
              className="h-16 md:h-24 w-auto"
              priority
            />
          </a>

          <div className="flex items-center space-x-1 bg-white/5 backdrop-blur-md px-2 py-2 rounded-full border border-white/10">
            <a href="#about" className="px-5 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">About</a>
            <a href="#services" className="px-5 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">Services</a>
            <a href="#projects" className="px-5 py-2 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">Repo</a>
            <a href="#contact" className="px-5 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition-all duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation with StaggeredMenu */}
      <div className="md:hidden fixed w-full z-50 top-0 left-0">
        <StaggeredMenu
          position="right"
          colors={['#ffffff', '#000000']}
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={true}
          logoUrl="/icons/logo.webp"
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          accentColor="#5227FF"
          changeMenuColorOnOpen={true}
          isFixed={true}
          closeOnClickAway={true}
        />
      </div>
    </>
  )
}
