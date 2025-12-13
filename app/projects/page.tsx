'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BentoTilt from '@/components/BentoTilt'

// Terminal Typing Animation Component
function TerminalTyping({ text, className }: { text: string; className?: string }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = 100 // milliseconds per character
    const deletingSpeed = 50
    const pauseDuration = 2000 // pause before deleting
    const pauseAfterDelete = 500 // pause after deleting before retyping

    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        }, typingSpeed)
      } else {
        // Finished typing, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1))
        }, deletingSpeed)
      } else {
        // Finished deleting, wait then restart typing
        timeout = setTimeout(() => {
          setIsDeleting(false)
        }, pauseAfterDelete)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, text])

  return (
    <span className={className}>
      {displayedText}
    </span>
  )
}

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState('All Tags')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDrawer, setOpenDrawer] = useState<string | null>(null) // Unified drawer state
  const router = useRouter()

  const tags = [
    "All Tags",
    "Landing Page",
    "Web Development",
    "Portfolio",
    "Cybersecurity",
    "Tools"
  ]

  const projects = [
    {
      id: 1,
      title: "panoblue",
      category: "Landing Page",
      tags: ["Landing Page"],
      description: "Modern landing page design",
      video: "/videos/panoblue.webm",
      status: "active"
    },
    {
      id: 2,
      title: "fazzah",
      category: "Landing Page",
      tags: ["Landing Page"],
      description: "Creative landing page solution",
      video: "/videos/fazzah.webm",
      status: "active"
    },
    {
      id: 3,
      title: "zerothreat",
      category: "Cybersecurity",
      tags: ["Cybersecurity", "Tools"],
      description: "Cybersecurity website project",
      video: "/videos/zerothreat.webm",
      status: "active",
      isPlaceholder: true
    },
    {
      id: 4,
      title: "retroOS",
      category: "Web Development",
      tags: ["Web Development", "Tools"],
      description: "Retro operating system UI",
      video: "/videos/RetroOS_Project.webm",
      status: "active"
    },
    {
      id: 5,
      title: "ICPCHUE",
      category: "Web Development",
      tags: ["Web Development"],
      description: "Creative web project",
      video: "/videos/ICPCHUE.webm",
      status: "active",
      isPlaceholder: true
    },
    {
      id: 6,
      title: "yousefdev",
      category: "Portfolio",
      tags: ["Portfolio", "Web Development"],
      description: "Building practical solutions",
      video: "/videos/yousefdev.webm",
      status: "active",
      isLarge: true
    }
  ]

  // Filter Logic
  const filteredProjects = activeTag === 'All Tags' 
    ? projects 
    : projects.filter(project => project.tags.includes(activeTag))

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'retired':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'archive':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-white/10 text-white border-white/20'
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-dark font-sans text-white">
      
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-dark/80 backdrop-blur-xl z-50">
        <Link href="/" className="text-xl font-display font-bold">yousefdev</Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white"
        >
          {isMobileMenuOpen ? (
            <i className="fas fa-times w-6 h-6"></i>
          ) : (
            <i className="fas fa-bars w-6 h-6"></i>
          )}
        </button>
      </div>

      {/* Sidebar Filter - Left Side */}
      <aside className={`
        fixed md:sticky md:top-0 top-[73px] left-0 h-[calc(100vh-73px)] md:h-screen w-full md:w-72 bg-dark z-40
        transform transition-transform duration-300 ease-in-out border-r border-white/10
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex flex-col py-12 px-8 overflow-y-auto
      `}>
        <div className="hidden md:block mb-12 h-8 flex items-center">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight hover:text-white/80 transition-colors font-mono block">
            <TerminalTyping text="yousefdev |" />
          </Link>
        </div>

        <nav className="flex flex-col space-y-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag)
                setIsMobileMenuOpen(false)
              }}
              className={`
                group flex items-center justify-between text-left py-3 px-2 rounded-lg transition-all duration-200
                ${activeTag === tag 
                  ? 'text-white font-bold bg-white/5' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }
              `}
            >
              <span className="text-sm md:text-base">{tag}</span>
              {/* Active Indicator Line */}
              {activeTag === tag && (
                <div className="h-4 w-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-12 hidden md:block text-xs text-gray-500">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Projects</span>
          </button>
        </div>
      </aside>

      {/* Main Content - Right Side Grid */}
      <main className="flex-1 p-6 md:p-12 lg:p-16 bg-dark min-h-screen">
        
        {/* Header Area */}
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">{activeTag}</h2>
            <p className="text-gray-400">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project) => (
            <BentoTilt
              key={project.id}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
              onClick={() => {
                setOpenDrawer(project.title.toLowerCase())
              }}
            >
              <div className="w-full h-full aspect-[4/3]">
                <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                  {project.video ? (
                    <>
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none"></div>
                    </>
                  ) : (project as any).image ? (
                    <>
                      <img 
                        src={(project as any).image} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none"></div>
                    </>
                  ) : null}
                  
                  {/* Status Badge */}
                  <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(project.status)}`}>
                    {project.category}
                  </div>
                </div>
                
                {/* Text Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 font-medium text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p className="text-lg">No projects found in this category.</p>
            <button 
              onClick={() => setActiveTag('All Tags')}
              className="mt-4 text-white hover:underline font-medium"
            >
              View all projects
            </button>
          </div>
        )}
      </main>

      {/* Project Drawer */}
      {openDrawer && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setOpenDrawer(null)}
          />
          <div
            className="fixed inset-x-0 bottom-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl px-6 md:px-10 pb-10 pt-6 transition-transform duration-500 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col translate-y-0"
          >
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              {openDrawer === 'fazzah' ? 'FAZAAH' :
               openDrawer === 'panoblue' ? 'PanoBlue' :
               openDrawer === 'zerothreat' ? 'Zero Threat' :
               openDrawer === 'retroos' ? 'retroOS' :
               openDrawer === 'icpchue' ? 'ICPCHUE' :
               openDrawer === 'yousefdev' ? 'yousefdev' : ''}
            </p>
            <h3 className="text-2xl md:text-4xl font-display font-black text-white">
              {openDrawer === 'fazzah' ? 'FAZAAH - Outerwear Studio' :
               openDrawer === 'panoblue' ? 'PanoBlue - Freight Solutions Without Borders' :
               openDrawer === 'zerothreat' ? 'Zero Threat - Cybersecurity Website Project' :
               openDrawer === 'retroos' ? 'retroOS - Retro Operating System UI' :
               openDrawer === 'icpchue' ? 'ICPCHUE - Creative Web Project' :
               openDrawer === 'yousefdev' ? 'yousefdev - Building Practical Solutions' : ''}
            </h3>
          </div>
          <button
            onClick={() => setOpenDrawer(null)}
            className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
          >
            <i className="fas fa-times w-5 h-5"></i>
          </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-6 custom-scrollbar">
          {/* Video Hero */}
          {openDrawer && (
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex-shrink-0">
              <video
                src={
                  openDrawer === 'fazzah' ? '/videos/fazzah.webm' :
                  openDrawer === 'panoblue' ? '/videos/panoblue.webm' :
                  openDrawer === 'zerothreat' ? '/videos/zerothreat.webm' :
                  openDrawer === 'retroos' ? '/videos/RetroOS_Project.webm' :
                  openDrawer === 'icpchue' ? '/videos/ICPCHUE.webm' :
                  openDrawer === 'yousefdev' ? '/videos/yousefdev.webm' : ''
                }
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Dynamic Content Based on Project */}
          {openDrawer === 'fazzah' && (
            <>
              {/* Tech Stack */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🚀 Tech Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Core Framework</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Next.js 16.0.10 - React framework with App Router</li>
                      <li>• React 18.3.1 - Latest stable React</li>
                      <li>• TypeScript 5.3.3 - Type-safe development</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Styling & UI</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Tailwind CSS 3.4.1 - Utility-first CSS</li>
                      <li>• Lucide React - Icon library</li>
                      <li>• Custom Animations - Smooth transitions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">✨ Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🛍️</span>
                    <span className="text-sm text-gray-300">Full Shopping Experience - Browse, cart, checkout</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎯</span>
                    <span className="text-sm text-gray-300">Product Catalog with filtering and search</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">📦</span>
                    <span className="text-sm text-gray-300">Shopping Cart with quantity, size, color selection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💳</span>
                    <span className="text-sm text-gray-300">Multi-Payment Gateway - Stripe, PayPal, Apple Pay</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎨</span>
                    <span className="text-sm text-gray-300">AI Concept Lab - Generate designs with AI</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm text-gray-300">Lightning Fast - Next.js 16 App Router</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎭</span>
                    <span className="text-sm text-gray-300">Smooth Animations - Elegant transitions</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">📱</span>
                    <span className="text-sm text-gray-300">Fully Responsive - Mobile-first design</span>
                  </div>
                </div>
              </div>

              {/* Visit Project Button */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <a 
                  href="https://fazzah.yousefdev.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Visit FAZAAH</span>
                  <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </>
          )}

          {openDrawer === 'panoblue' && (
            <>
              {/* Tech Stack */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🚀 Tech Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Core Technologies</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Next.js 16.0.7 - React framework with App Router</li>
                      <li>• React 19.0.0 - Latest React</li>
                      <li>• TypeScript 5 - Type-safe development</li>
                      <li>• Tailwind CSS 3.4 - Utility-first CSS</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Key Libraries</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• GSAP - Professional animation library</li>
                      <li>• Lucide React - Beautiful icon library</li>
                      <li>• clsx & tailwind-merge - Conditional styling</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">✨ Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🌍</span>
                    <span className="text-sm text-gray-300">Multi-language Support - English and Arabic</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎨</span>
                    <span className="text-sm text-gray-300">Modern UI/UX with smooth animations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm text-gray-300">Performance Optimized - Next.js 16 and React 19</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🖼️</span>
                    <span className="text-sm text-gray-300">Image Optimization - Next.js Image component</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">📱</span>
                    <span className="text-sm text-gray-300">Fully Responsive - Mobile-first design</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎭</span>
                    <span className="text-sm text-gray-300">Advanced Animations - GSAP-powered</span>
                  </div>
                </div>
              </div>

              {/* Visit Project Button */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <a 
                  href="https://panoblue.yousefdev.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Visit PanoBlue</span>
                  <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </>
          )}

          {openDrawer === 'zerothreat' && (
            <>
              {/* Tech Stack */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🚀 Tech Stack</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Frontend</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• React 18.3.1 - Modern React with hooks</li>
                      <li>• Vite 5.4.10 - Fast build tool</li>
                      <li>• Tailwind CSS 3.4.14 - Utility-first CSS</li>
                      <li>• GSAP 3.12.5 - Animation library</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Development Tools</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• ESLint 9.14.0 - Code quality</li>
                      <li>• PostCSS 8.4.49 - CSS processing</li>
                      <li>• Prettier 3.3.3 - Code formatting</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">✨ Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎬</span>
                    <span className="text-sm text-gray-300">Interactive Video Hero Section with GSAP animations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎨</span>
                    <span className="text-sm text-gray-300">Modern UI/UX Design with custom animations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">📱</span>
                    <span className="text-sm text-gray-300">Fully Responsive for all devices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⚡</span>
                    <span className="text-sm text-gray-300">Performance Optimized with Vite</span>
                  </div>
                </div>
              </div>

              {/* Visit Project Button */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <a 
                  href="https://zerothreat.yousefdev.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Visit Zero Threat</span>
                  <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </>
          )}

          {openDrawer === 'retroos' && (
            <>
              {/* Description */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">About Project</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  A fully interactive retro operating system built with Next.js and React. Experience a nostalgic desktop environment with working terminal, file system, window management, and multiple applications.
                </p>
              </div>

              {/* Technologies */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🛠️ Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Draggable'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visit Project Button */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <a 
                  href="https://retroos.yousefdev.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Visit retroOS</span>
                  <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </>
          )}

          {openDrawer === 'icpchue' && (
            <>
              {/* Overview */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🔒 Security Overview</h4>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  ICPC HUE application follows industry best practices for web application security with comprehensive security measures implemented throughout the application.
                </p>
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                  <p className="text-green-400 font-bold text-sm">Security Score: 9/10</p>
                </div>
              </div>

              {/* Authentication & Authorization */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🔐 Authentication & Authorization</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">JWT Authentication</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Secure token-based authentication</li>
                      <li>• Token expiration: 1 day</li>
                      <li>• Secret key validation required</li>
                      <li>• No fallback secrets in production</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">Password Security</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Minimum 8 characters</li>
                      <li>• Strength requirements enforced</li>
                      <li>• bcrypt hashing (10 rounds)</li>
                      <li>• Multi-Factor Authentication (MFA)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Protection Measures */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🛡️ Protection Measures</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🔒</span>
                    <div>
                      <span className="text-sm font-bold text-white">SQL Injection Protection</span>
                      <p className="text-xs text-gray-400">Parameterized queries with PostgreSQL</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🚫</span>
                    <div>
                      <span className="text-sm font-bold text-white">XSS Protection</span>
                      <p className="text-xs text-gray-400">Input sanitization & CSP headers</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">⏱️</span>
                    <div>
                      <span className="text-sm font-bold text-white">Rate Limiting</span>
                      <p className="text-xs text-gray-400">Protected endpoints with IP-based limits</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🤖</span>
                    <div>
                      <span className="text-sm font-bold text-white">Bot Protection</span>
                      <p className="text-xs text-gray-400">reCAPTCHA v3 integration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🔐</span>
                    <div>
                      <span className="text-sm font-bold text-white">Data Encryption</span>
                      <p className="text-xs text-gray-400">Encryption at rest for sensitive data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🌐</span>
                    <div>
                      <span className="text-sm font-bold text-white">HTTPS Enforcement</span>
                      <p className="text-xs text-gray-400">HSTS headers with 1-year max-age</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Headers */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">📋 Security Headers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">Content Security Policy (CSP)</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">HSTS</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">X-Frame-Options</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">X-Content-Type-Options</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">X-XSS-Protection</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">CORP</span>
                </div>
              </div>

              {/* Rate Limiting Details */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">⏱️ Rate Limiting</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-xs font-bold text-white mb-1">Application Submission</p>
                    <p className="text-xs text-gray-400">5 requests per 15 minutes</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-xs font-bold text-white mb-1">Login Attempts</p>
                    <p className="text-xs text-gray-400">5 requests per 15 minutes</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-xs font-bold text-white mb-1">Registration</p>
                    <p className="text-xs text-gray-400">3 requests per hour</p>
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-xs font-bold text-white mb-1">Admin Endpoints</p>
                    <p className="text-xs text-gray-400">10 requests per minute</p>
                  </div>
                </div>
              </div>

              {/* Visit Project Button */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <a 
                  href="https://icpchue.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Visit ICPCHUE</span>
                  <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </>
          )}

          {openDrawer === 'yousefdev' && (
            <>
              {/* Description */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">About Project</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  A developer focused on building practical tools and applications. Creating clean, well-architected solutions with a focus on user experience and impact.
                </p>
              </div>

              {/* Technologies */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">🛠️ Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {['Full-Stack Development', 'Cybersecurity', 'Automation'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
