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
        <aside className={`
          fixed md:sticky md:top-0 top-[73px] left-0 h-[calc(100vh-73px)] md:h-screen w-full md:w-72 bg-dark z-40
          transform transition-transform duration-300 ease-in-out border-r border-white/10
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:flex flex-col py-12 px-8 overflow-y-auto
        `}
        >
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
              <span>Back to Home</span>
            </button>
          </div>
        </aside>

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

              <div className="overflow-y-auto flex-1 pr-2 space-y-6 custom-scrollbar">
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex-shrink-0">
                  <video
                    src={`/videos/${openDrawer === 'retroos' ? 'RetroOS_Project' : openDrawer}.webm`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
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
                        Migrated an established import/export company from restrictive WordPress templates to a bespoke, high-performance Next.js solution.
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Key Contributions</h4>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-white">Custom Architecture:</strong> Bespoke codebase for limitless customization.</li>
                        <li><strong className="text-white">Interactive UI:</strong> Premium user experience with advanced animations.</li>
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
                      <p className="text-sm text-gray-400"><i className="fas fa-trophy mr-2"></i>3rd Place National Student Forum, Egypt</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>My Contribution</h4>
                      <p className="text-sm text-gray-300 leading-relaxed mb-4">
                        I led the development of the web platform, implementing:
                      </p>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li><strong className="text-white">Universal File Scanner:</strong> Multi-format malware detection.</li>
                        <li><strong className="text-white">Security Auditing:</strong> Built-in vulnerability assessment tools.</li>
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
                      <h4 className="text-xl font-display font-bold text-white mb-2">retroOS – Advanced React OS Simulation</h4>
                      <p className="text-sm text-gray-400">Technical Showcase • Hackathon Winner</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4">The Challenge</h4>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Recreating an entire OS desktop environment using only React state management. Features custom windowing, file systems, and a functional terminal.
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <a href="https://retroos.yousefdev.xyz/" target="_blank" rel="noopener noreferrer" className="w-full bg-white text-black hover:bg-gray-200 font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                        <span>Explore retroOS</span>
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
                        Built a secure code submission platform using sandboxed execution, Cloudflare protection, and client-side encryption.
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
                      <h4 className="text-xl font-display font-bold text-white mb-2">yousefdev – Personal Portfolio</h4>
                      <p className="text-sm text-gray-400">Lead Architectural Showcase</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h4 className="text-xl font-display font-bold text-white mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Next.js 16', 'React 19', 'TypeScript', 'GSAP', 'Node.js'].map((tech) => (
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
    </>
  )
}
