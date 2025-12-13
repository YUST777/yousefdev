'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BentoTilt from './BentoTilt'
import ProjectModal from './ProjectModal'
// Icons will use FontAwesome classes instead

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const router = useRouter()
  const revealRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openDrawer, setOpenDrawer] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation - plays once and stays
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top bottom-=100',
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      })

      // Project cards staggered animation - plays once and stays
      revealRefs.current.forEach((el, index) => {
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top bottom-=50',
              once: true
            },
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.8,
            ease: 'back.out(1.4)',
            delay: index * 0.1
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projectsData = [
    {
      id: 1,
      title: '',
      description: '',
      fullDescription: '',
      tag: '',
      icon: 'fa-shapes',
      span: 'md:col-span-2 md:row-span-1',
      delay: 'delay-100',
      video: '/videos/zerothreat.webm',
      isPlaceholder: true,
    },
    {
      id: 4,
      title: '',
      description: '',
      fullDescription: '',
      tag: '',
      icon: 'fa-chart-line',
      span: 'md:col-span-1 md:row-span-1 md:col-start-3',
      delay: 'delay-100',
      video: '/videos/ICPCHUE.webm',
      isPlaceholder: true,
    },
    {
      id: 2,
      title: 'retroOS',
      description: 'Retro operating system UI',
      fullDescription: 'A fully interactive retro operating system built with Next.js and React. Experience a nostalgic desktop environment with working terminal, file system, window management, and multiple applications.',
      icon: 'fa-desktop',
      span: 'md:col-span-2 md:row-span-1',
      delay: 'delay-200',
      video: '/videos/RetroOS_Project.webm',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Draggable'],
      features: [
        {
          category: 'Desktop Environment',
          svgIcon: 'desktop',
          items: ['Interactive desktop', 'Window management', 'Drag and drop', 'Multiple wallpapers']
        },
        {
          category: 'Terminal',
          svgIcon: 'code',
          items: ['Full terminal emulator', 'File system commands', 'Process management', 'Command history']
        },
        {
          category: 'File System',
          svgIcon: 'wallet',
          items: ['Hierarchical structure', 'CRUD operations', 'Trash and restore', 'File editor']
        },
        {
          category: 'OS Concepts',
          svgIcon: 'chart',
          items: ['Process management', 'Memory tracking', 'User sessions', 'Resource allocation']
        }
      ]
    },
    {
      id: 5,
      title: 'More Projects',
      description: 'Additional projects and experiments',
      fullDescription: 'Explore additional projects, experiments, and creative work showcasing various technologies and solutions.',
      icon: 'fa-archive',
      span: 'md:col-span-1 md:row-span-1 md:col-start-3',
      delay: 'delay-200',
      isMinimal: true,
      isArchive: true,
      video: '/videos/moreprojects.webm',
      technologies: ['Various Technologies']
    },
    {
      id: 6,
      title: 'yousefdev',
      description: 'Building practical solutions',
      fullDescription: 'A developer focused on building practical tools and applications. Creating clean, well-architected solutions with a focus on user experience and impact.',
      tag: '',
      span: 'md:col-span-3 md:row-span-1',
      delay: 'delay-300',
      isLarge: true,
      video: '/videos/yousefdev.webm',
      technologies: ['Full-Stack Development', 'Cybersecurity', 'Automation'],
      features: [
        {
          category: 'Services',
          svgIcon: 'code',
          items: ['Web development', 'Application development', 'System design']
        },
        {
          category: 'Expertise',
          svgIcon: 'lightbulb',
          items: ['Full-stack development', 'Cybersecurity engineering', 'Automation systems']
        }
      ]
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 px-0 md:px-4"
        >
          <div>
            <h2 className="text-5xl md:text-8xl font-display font-black text-white tracking-tighter">PROJECTS</h2>
          </div>
          <button className="hidden md:block border border-white/20 hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 text-sm tracking-widest uppercase">
            View GitHub
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px] md:auto-rows-[450px]">
          {projectsData.map((project, index) => {
            // --- Large Card (e.g. YousefDev) ---
            if (project.isLarge) {
              return (
                <BentoTilt
                  key={project.id}
                  className={`${project.span} rounded-2xl overflow-hidden relative group cursor-pointer`}
                >
                  <div
                    ref={el => { revealRefs.current[index + 1] = el }}
                    className="w-full h-full"
                    onClick={() => {
                      setSelectedProject(project)
                      setIsModalOpen(true)
                    }}
                  >
                  <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    {project.video && project.video !== '/videos/yousefdev.webm' && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500"></div>
                    )}
                  </div>
                  </div>
                </BentoTilt>
              )
            }

            // --- Minimal Card (e.g. Archive) ---
            if (project.isMinimal) {
              return (
                <BentoTilt
                  key={project.id}
                  className={`${project.span} rounded-2xl overflow-hidden relative group cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 shadow-2xl transition-all duration-300`}
                >
                  <div
                    ref={el => { revealRefs.current[index + 1] = el }}
                    className="relative w-full h-full"
                    onClick={() => {
                      if (project.isArchive) {
                        router.push('/projects')
                        return
                      }
                      setSelectedProject(project)
                      setIsModalOpen(true)
                    }}
                  >
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
                        {project.video !== '/videos/moreprojects.webm' && (
                          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none"></div>
                        )}
                      </>
                    ) : (
                      <div className="bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center h-full text-center p-4 border border-white/10 w-full h-full">
                        <i className={`fas ${project.icon} w-10 h-10 text-white/40 mb-4 group-hover:text-white/60 transition-colors`}></i>
                        <h3 className="text-lg md:text-xl font-display font-bold text-white">{project.title}</h3>
                        <p className="text-white/60 mt-2 text-[10px] md:text-xs uppercase tracking-widest">{project.description}</p>
                      </div>
                    )}
                  </div>
                </BentoTilt>
              )
            }

            // --- Standard Card (e.g. RetroOS, ICPCHUE) ---
            return (
              <BentoTilt
                key={project.id}
                className={`${project.span} rounded-2xl overflow-hidden relative group cursor-pointer`}
              >
                <div
                  ref={el => { revealRefs.current[index + 1] = el }}
                  className="w-full h-full"
                  onClick={() => {
                    if (project.video === '/videos/zerothreat.webm') {
                      setOpenDrawer('zerothreat')
                      return
                    }
                    if (project.video === '/videos/RetroOS_Project.webm') {
                      setOpenDrawer('retroOS')
                      return
                    }
                    if (project.video === '/videos/ICPCHUE.webm') {
                      setOpenDrawer('ICPCHUE')
                      return
                    }
                    if (project.video === '/videos/yousefdev.webm') {
                      setOpenDrawer('yousefdev')
                      return
                    }
                    if (!project.isPlaceholder) {
                      setSelectedProject(project)
                      setIsModalOpen(true)
                    }
                  }}
                  >
                  <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                    ) : project.isPlaceholder ? null : (
                      <i className={`fas ${project.icon} text-8xl md:text-9xl text-white/20 group-hover:text-white/30 transition-colors duration-500`}></i>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    {project.video && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500"></div>
                    )}
                  </div>
                  {!project.isPlaceholder && (
                    <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-all duration-500 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
                      {project.tag && (
                        <div className="flex justify-between items-start">
                          <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20 uppercase tracking-widest text-white shadow-lg">{project.tag}</span>
                        </div>
                      )}
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl md:text-3xl font-display font-bold mb-1 text-white">{project.title}</h3>
                        <p className="text-gray-300 text-xs md:text-sm font-light">{project.description}</p>
                      </div>
                    </div>
                  )}
                </div>
              </BentoTilt>
            )
          })}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <button className="border border-white/20 hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 text-sm tracking-widest uppercase w-full">
            View GitHub
          </button>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProject(null)
        }}
        project={selectedProject}
      />

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
              {openDrawer === 'zerothreat' ? 'Zero Threat' :
               openDrawer === 'retroOS' ? 'retroOS' :
               openDrawer === 'ICPCHUE' ? 'ICPCHUE' :
               openDrawer === 'yousefdev' ? 'yousefdev' : ''}
            </p>
            <h3 className="text-2xl md:text-4xl font-display font-black text-white">
              {openDrawer === 'zerothreat' ? 'Zero Threat - Cybersecurity Website Project' :
               openDrawer === 'retroOS' ? 'retroOS - Retro Operating System UI' :
               openDrawer === 'ICPCHUE' ? 'ICPCHUE - Creative Web Project' :
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
                  openDrawer === 'zerothreat' ? '/videos/zerothreat.webm' :
                  openDrawer === 'retroOS' ? '/videos/RetroOS_Project.webm' :
                  openDrawer === 'ICPCHUE' ? '/videos/ICPCHUE.webm' :
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
                      <li>• React Icons 5.3.0 - Icon library</li>
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
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎭</span>
                    <span className="text-sm text-gray-300">Smooth GSAP-powered animations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🎵</span>
                    <span className="text-sm text-gray-300">Audio Integration with background music</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-lg">🖼️</span>
                    <span className="text-sm text-gray-300">Rich Media Content with high-quality assets</span>
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

          {openDrawer === 'retroOS' && (
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

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">✨ Key Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">🖥️ Desktop Environment</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Interactive desktop</li>
                      <li>• Window management</li>
                      <li>• Drag and drop</li>
                      <li>• Multiple wallpapers</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">💻 Terminal</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Full terminal emulator</li>
                      <li>• File system commands</li>
                      <li>• Process management</li>
                      <li>• Command history</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">📁 File System</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Hierarchical structure</li>
                      <li>• CRUD operations</li>
                      <li>• Trash and restore</li>
                      <li>• File editor</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">⚙️ OS Concepts</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Process management</li>
                      <li>• Memory tracking</li>
                      <li>• User sessions</li>
                      <li>• Resource allocation</li>
                    </ul>
                  </div>
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

          {openDrawer === 'ICPCHUE' && (
            <>
              {/* Description */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">About Project</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  A creative web project showcasing modern design and interactive elements. Built with cutting-edge technologies for an engaging user experience.
                </p>
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

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <h4 className="text-xl font-display font-bold text-white mb-4">✨ Services</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">💻 Services</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Web development</li>
                      <li>• Application development</li>
                      <li>• System design</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white/80 mb-2">🎯 Expertise</h5>
                    <ul className="space-y-1 text-sm text-gray-300">
                      <li>• Full-stack development</li>
                      <li>• Cybersecurity engineering</li>
                      <li>• Automation systems</li>
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
    </section>
  )
}
