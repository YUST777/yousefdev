'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BentoTilt from '@/components/BentoTilt'

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState('All Tags')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
        <div className="hidden md:block mb-12">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight hover:text-white/80 transition-colors font-mono">
            {typewriterText || 'y'}
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
                            openDrawer === 'yousefdev' ? (
                              <span className="font-mono">
                                {typewriterText}
                                <span className="animate-pulse">|</span>
                              </span>
                            ) : ''}
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
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">Fazzah – Streetwear E-Commerce Store</h4>
                    <p className="text-sm text-gray-400">December 3, 2025 • Role: Full-Stack Shopify Developer</p>
                  </div>

                  {/* Overview */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Fazzah is a modern streetwear brand launched to capitalize on the rising demand for high-quality hoodies and apparel. The client needed a rapid-deployment e-commerce solution to enter the market quickly without sacrificing quality.
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Key Contributions</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li><strong className="text-white">End-to-End Development:</strong> Built a comprehensive landing page and storefront using the Shopify ecosystem.</li>
                      <li><strong className="text-white">Logistics & Payments:</strong> Integrated a secure payment gateway and set up a backend warehouse management system to track inventory and orders.</li>
                      <li><strong className="text-white">Brand Identity:</strong> Designed a clean, minimalist GUI that highlights the products and aligns with current streetwear aesthetics.</li>
                    </ul>
                  </div>

                  {/* Visit Project Button */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <a
                      href="https://fazzah.yousefdev.xyz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>Visit Fazzah</span>
                      <i className="fas fa-external-link-alt group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </div>
                </>
              )}

              {openDrawer === 'panoblue' && (
                <>
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">PanoBlue – Import/Export Corporate Platform</h4>
                    <p className="text-sm text-gray-400">December 8, 2025 • Role: Frontend Developer & UI Designer</p>
                  </div>

                  {/* Overview */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      PanoBlue is an established import/export company that needed to modernize its digital presence to compete in the international market. The client required a shift away from restrictive WordPress templates to a fully custom, unique web solution.
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Key Contributions</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li><strong className="text-white">Custom Architecture:</strong> Migrated the client from a generic template to a bespoke codebase, allowing for limitless customization and improved performance.</li>
                      <li><strong className="text-white">Interactive UI:</strong> Implemented advanced animations and interactivity to create a premium user experience that reflects the company's market standing.</li>
                      <li><strong className="text-white">Market-Ready:</strong> Delivered a polished, production-ready site that currently serves real customers and facilitates actual business operations.</li>
                    </ul>
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
                </>
              )}

              {openDrawer === 'retroos' && (
                <>
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">retroOS – Retro Operating System UI</h4>
                    <p className="text-sm text-gray-400">December 5, 2025 • Operating Systems Course Project & Hackathon Winner</p>
                  </div>

                  {/* Description */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>About Project</h4>
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
                </>
              )}

              {openDrawer === 'icpchue' && (
                <>
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">ICPC HUE Platform</h4>
                    <p className="text-sm text-gray-400">December 8, 2025 • Lead Full-Stack Developer & Co-Founder</p>
                  </div>

                  {/* Overview */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      ICPC HUE is a competitive programming community established at Horus University. Recognizing the lack of a dedicated ICPC chapter in our faculty, I collaborated with my team to build this initiative from the ground up. Over the course of three semesters (Summer Year 1 to Fall Year 2), we developed the branding, curriculum, and digital infrastructure to support our fellow students.
                    </p>
                  </div>

                  {/* Technical Contributions */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Technical Contributions</h4>
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">
                      I led the development of ICPCHUE.XYZ, a comprehensive platform serving the community:
                    </p>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li><strong className="text-white">Modern Landing Page:</strong> Built with Next.js and React for a high-performance, clean user interface.</li>
                      <li><strong className="text-white">Secure Registration:</strong> Implemented a robust candidate application system using Supabase for database management. Security was prioritized using reCAPTCHA, Cloudflare, and Fail2Ban to prevent DDoS attacks and spam.</li>
                      <li><strong className="text-white">Gamified Dashboard:</strong> Created an interactive student dashboard featuring live 3D assets and "Easter eggs" to increase user motivation. Features include session file downloads, quiz submissions, and a real-time skills tracker.</li>
                      <li><strong className="text-white">Performance & Security:</strong> The platform is fully responsive for mobile and desktop. Sensitive data is protected via client-side encryption using CryptoJS.</li>
                    </ul>
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
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">yousefdev – Personal Portfolio</h4>
                    <p className="text-sm text-gray-400">December 15, 2025 • Full-Stack Developer & Cybersecurity Engineer</p>
                  </div>

                  {/* Overview */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      This is my personal portfolio website showcasing my journey as a full-stack developer and cybersecurity engineer. Built with Next.js 15, React 19, and modern web technologies, it features smooth GSAP animations, a unique bento grid layout, and an interactive project showcase with detailed case studies.
                    </p>
                  </div>

                  {/* Key Achievements */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-trophy mr-2"></i>Key Achievements</h4>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li><strong className="text-white">3rd Place National Competition:</strong> Zero Threat project won at Al-Multaqy Al-Qammy, Tanta University, competing against 20 universities.</li>
                      <li><strong className="text-white">Hackathon Winner:</strong> RetroOS earned $150 cash prize for its unique Windows XP simulation concept.</li>
                      <li><strong className="text-white">Community Builder:</strong> Co-founded ICPC HUE, building the digital infrastructure from scratch.</li>
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-code mr-2"></i>Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Node.js', 'Supabase', 'Vercel'].map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-briefcase mr-2"></i>Services</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-bold text-white/80 mb-2">Development</h5>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• Full-stack web applications</li>
                          <li>• E-commerce solutions</li>
                          <li>• Custom dashboards & admin panels</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white/80 mb-2">Security & Automation</h5>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• Security audits & hardening</li>
                          <li>• Bot development & automation</li>
                          <li>• API integrations</li>
                        </ul>
                      </div>
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
