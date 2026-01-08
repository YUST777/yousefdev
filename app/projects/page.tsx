'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BentoTilt from '@/components/BentoTilt'
import ScopedSmoothScroll from '@/components/ScopedSmoothScroll'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState('All Tags')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [openDrawer, setOpenDrawer] = useState<string | null>(null) // Unified drawer state
  const router = useRouter()
  const [typewriterText, setTypewriterText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter animation effect for sidebar logo
  useEffect(() => {
    const fullText = 'yousefdev |'
    const typingSpeed = 150
    const deletingSpeed = 100
    const pauseTime = 2000

    const typewriterInterval = setInterval(() => {
      if (!isDeleting) {
        if (typewriterText.length < fullText.length) {
          setTypewriterText(fullText.slice(0, typewriterText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(fullText.slice(0, typewriterText.length - 1))
        } else {
          setIsDeleting(false)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearInterval(typewriterInterval)
  }, [typewriterText, isDeleting])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [openDrawer])

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
      description: "National award-winning AI-driven security ecosystem.",
      video: "/videos/zerothreat.webm",
      status: "active",
      isPlaceholder: true
    },
    {
      id: 4,
      title: "retroOS",
      category: "Web Development",
      tags: ["Web Development", "Tools"],
      description: "Advanced React OS simulation with custom windowing & file systems.",
      video: "/videos/RetroOS_Project.webm",
      status: "active"
    },
    {
      id: 5,
      title: "ICPCHUE",
      category: "Web Development",
      tags: ["Web Development"],
      description: "Hardened, sandboxed online judge platform.",
      video: "/videos/icpchue2.webm",
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

  const projectsArchiveStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Projects Archive - yousefdev',
    'description': 'A comprehensive archive of software engineering and cybersecurity projects including Zero Threat, ICPCHUE, and retroOS.',
    'url': 'https://yousefdev.xyz/projects',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': projects.map((p, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'item': {
          '@type': 'SoftwareApplication',
          'name': p.title,
          'description': p.description,
          'applicationCategory': p.category === 'Cybersecurity' ? 'SecurityApplication' : 'DeveloperApplication',
          'operatingSystem': 'Web',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
          }
        }
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsArchiveStructuredData) }}
      />
      <div className="flex flex-col md:flex-row min-h-screen bg-dark font-sans text-white">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-dark/80 backdrop-blur-xl z-50">
          <Link href="/" className="text-xl font-display font-bold">yousefdev</Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </button>
        </div>

        {/* Sidebar Filter - Left Side */}
        {/* Sidebar Filter - Left Side */}
        <AnimatePresence mode='wait'>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 288, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className={`
                fixed md:sticky md:top-0 top-[73px] left-0 h-[calc(100vh-73px)] md:h-screen bg-dark z-40
                border-r border-white/10 flex flex-col overflow-y-auto overflow-x-hidden
                ${isMobileMenuOpen ? 'block w-full' : 'hidden md:flex'}
              `}
            >
              <div className="p-8 min-w-[288px]">
                <div className="hidden md:flex justify-between items-center mb-12">
                  <Link href="/" className="text-2xl font-display font-bold tracking-tight hover:text-white/80 transition-colors font-mono">
                    {typewriterText || 'y'}
                  </Link>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="fas fa-arrow-left"></i>
                  </button>
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
                  group flex items-center justify-between text-left py-3 px-2 rounded-lg transition-all duration-200 w-full
                  ${activeTag === tag
                          ? 'text-white font-bold bg-white/5'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                        }
                `}
                    >
                      <span className="text-sm md:text-base whitespace-nowrap">{tag}</span>
                      {activeTag === tag && (
                        <div className="h-4 w-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                      )}
                    </button>
                  ))}
                </nav>

                <div className="mt-auto pt-12 hidden md:block text-xs text-gray-500 border-t border-white/10">
                  <button
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <i className="fas fa-arrow-left"></i>
                    <span>Back to Home</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar Toggle Button (Visible when closed) */}
        {!isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block fixed top-8 left-8 z-50"
          >
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <i className="fas fa-filter"></i>
            </button>
          </motion.div>
        )}

        {/* Main Content - Right Side Grid */}
        <main className="flex-1 p-6 md:p-12 lg:p-16 bg-dark min-h-screen">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-white">{activeTag}</h2>
              <p className="text-gray-400">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>
          </div>

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
                    ) : null}
                    <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(project.status)}`}>
                      {project.category}
                    </div>
                  </div>
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
            <div className="fixed inset-x-0 bottom-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl px-6 md:px-10 pb-10 pt-6 transition-transform duration-500 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col translate-y-0">
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    {openDrawer.toUpperCase()}
                  </p>
                  <h3 className="text-2xl md:text-4xl font-display font-black text-white">
                    {openDrawer === 'fazzah' ? 'FAZAAH - Outerwear Studio' :
                      openDrawer === 'panoblue' ? 'PanoBlue - Freight Solutions' :
                        openDrawer === 'zerothreat' ? 'Zero Threat - AI-Driven Cybersecurity' :
                          openDrawer === 'retroos' ? 'retroOS - React OS Simulation' :
                            openDrawer === 'icpchue' ? 'ICPCHUE - Hardened Judge Platform' :
                              openDrawer === 'yousefdev' ? 'yousefdev - Portfolio' : ''}
                  </h3>
                </div>
                <button
                  onClick={() => setOpenDrawer(null)}
                  className="w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <ScopedSmoothScroll className="flex-1 pr-2 space-y-6 custom-scrollbar overflow-y-auto overscroll-y-contain">
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex-shrink-0 relative">
                  {openDrawer === 'icpchue' ? (
                    <iframe
                      src="https://www.youtube.com/embed/tH--wuGCMuM?autoplay=1&mute=1&loop=1&playlist=tH--wuGCMuM"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={projects.find(p => p.title.toLowerCase() === openDrawer)?.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Dynamic Content Based on Project */}
                {openDrawer === 'fazzah' && (
                  <>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-2">Fazzah – Streetwear E-Commerce Store</h4>
                      <p className="text-sm text-gray-400">Role: Full-Stack Shopify Developer</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Fazzah is a modern streetwear brand. I built a rapid-deployment e-commerce solution using the Shopify ecosystem, focusing on rapid time-to-market without sacrificing architectural quality.
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Key Contributions</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-white">End-to-End Development:</strong> Built the landing page and storefront.</li>
                        <li><strong className="text-white">Logistics & Payments:</strong> Integrated secure payment gateways and warehouse management.</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <a href="https://fazzah.yousefdev.xyz/" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Visit Fazzah</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                )}

                {openDrawer === 'panoblue' && (
                  <>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-2">PanoBlue – Import/Export Corporate Platform</h4>
                      <p className="text-sm text-gray-400">Role: Frontend Developer & UI Designer</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        PanoBlue is an established import/export company that needed to modernize its digital presence to compete in the international market. The client required a shift away from restrictive WordPress templates to a fully custom, unique web solution.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Key Contributions</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-white">Custom Architecture:</strong> Migrated the client from a generic template to a bespoke codebase, allowing for limitless customization and improved performance.</li>
                        <li><strong className="text-white">Interactive UI:</strong> Implemented advanced animations and interactivity to create a premium user experience that reflects the company's market standing.</li>
                        <li><strong className="text-white">Market-Ready:</strong> Delivered a polished, production-ready site that currently serves real customers and facilitates actual business operations.</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <a href="https://panoblue.yousefdev.xyz/" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Visit PanoBlue</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                )}

                {openDrawer === 'zerothreat' && (
                  <>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-2">Zero Threat – AI-Driven Cybersecurity Suite</h4>
                      <p className="text-sm text-gray-400"><i className="fas fa-calendar-alt mr-2"></i>August 1 – August 28, 2025</p>
                      <p className="text-sm text-gray-400 mt-1"><i className="fas fa-trophy mr-2"></i>3rd Place at the National Student Forum (Al-Multaqy Al-Qammy), Tanta University</p>
                      <p className="text-sm text-gray-400 mt-1">Role: Lead Web Developer & UI/UX Designer</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-trophy mr-2"></i>The Achievement</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        This project secured 3rd place in a national competition featuring <strong className="text-white">20 universities from across Egypt</strong>. As freshmen from a private university, my team competed against and outperformed 4th and 5th-year Engineering and Computer Science seniors. Our project was evaluated and commended by the Dean of Computer Science and a Professor of Cybersecurity at Tanta University.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-lightbulb mr-2"></i>The Solution</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Zero Threat is a comprehensive security ecosystem combining a web platform, a browser extension, and a Windows application.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-globe mr-2"></i>My Contribution (The Web Platform)</h4>
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        I led the development of the web interface using Next.js and React, focusing on a high-performance UI with smooth animations. Key features I implemented include:
                      </p>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-white">Universal File Scanner:</strong> An integrated tool to scan various file types (ZIP, PNG, MP4) for hidden malware.</li>
                        <li><strong className="text-white">Web Security Tools:</strong> Built-in developer tools for open port scanning and vulnerability assessment (similar to OWASP ZAP).</li>
                        <li><strong className="text-white">Browser Extension:</strong> A companion extension to ensure safe downloads in real-time.</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-desktop mr-2"></i>The Windows Agent</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Developed by my teammate Abdelrahman Mohsen, the desktop client utilizes the YARA protocol and AI integration. In our benchmarks, it achieved a <strong className="text-white">90% detection rate</strong> across 90 test subjects, outperforming many traditional signature-based antivirus solutions.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-file-alt mr-2"></i>Official Documentation</h4>
                      <p className="text-sm text-gray-400 mb-4">Official posts from Tanta University and Horus University:</p>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a href="https://www.facebook.com/share/p/1DAW9yMMH1/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                            <i className="fab fa-facebook"></i> Horus University Official Post
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/share/p/1XakrE3nLE/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                            <i className="fab fa-facebook"></i> Tanta University Official Post
                          </a>
                        </li>
                        <li>
                          <a href="https://www.facebook.com/share/v/1HBLEF92ep/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
                            <i className="fab fa-facebook"></i> Award Ceremony Video (2:13)
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <a href="https://zerothreat.yousefdev.xyz/" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Visit Zero Threat</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                )}

                {openDrawer === 'retroos' && (
                  <>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-2">RetroOS</h4>
                      <p className="text-sm text-gray-400"><i className="fas fa-trophy mr-2"></i>Operating Systems Course Project & Hackathon Winner</p>
                      <p className="text-sm text-gray-400 mt-1">Tech Stack: Next.js, React</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        RetroOS is a web-based simulation designed to trigger nostalgia by faithfully recreating the iconic Windows XP user interface. Originally developed as a project for my Operating Systems university course, it serves as a visual mimic of an OS environment entirely within the browser.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-laptop-code mr-2"></i>The Experience</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        While it doesn't run on a low-level kernel, the application uses advanced React state management to simulate windowing systems, taskbars, and file navigation. The attention to detail in the UI/UX design made the project stand out immediately.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-trophy mr-2"></i>Key Achievement</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        We took this project to a hackathon, where its unique concept and execution earned us a <strong className="text-white">$150 cash prize</strong>. It was a wild experience turning a course assignment into a winning hackathon entry.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <a href="https://retroos.yousefdev.xyz/" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Visit retroOS</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                )}

                {openDrawer === 'icpchue' && (
                  <>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-2">ICPCHUE – Hardened Judge Platform</h4>
                      <p className="text-sm text-gray-400">Co-Founder & Lead Engineer</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4">Technical Hardening</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        I led the development of ICPCHUE.XYZ, a comprehensive platform serving the community. Built with Next.js, featuring secure registration, gamified dashboards, and Skill trackers.
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <a href="https://icpchue.xyz" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Visit ICPCHUE</span>
                        <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                  </>
                )}

                {openDrawer === 'yousefdev' && (
                  <>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4">About Project</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        A developer focused on building practical tools and applications. Creating clean, well-architected solutions with a focus on user experience and impact.
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Full-Stack Development', 'Cybersecurity', 'Automation'].map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-star mr-2"></i>Services</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-bold text-white/80 mb-2"><i className="fas fa-code mr-2"></i>Services</h5>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Web development</li>
                            <li>• Application development</li>
                            <li>• System design</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white/80 mb-2"><i className="fas fa-bullseye mr-2"></i>Expertise</h5>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Full-stack development</li>
                            <li>• Web applications</li>
                            <li>• Automation systems</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </ScopedSmoothScroll>
            </div>
          </>
        )}
      </div >
    </>
  )
}
