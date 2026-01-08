'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BentoTilt from './BentoTilt'
import ProjectModal from './ProjectModal'
import { useLenis } from './SmoothScroll'
import ScopedSmoothScroll from './ScopedSmoothScroll'
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
  const [typewriterText, setTypewriterText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const { stop: stopLenis, start: startLenis } = useLenis()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Stop/Start Lenis when drawer opens/closes
  useEffect(() => {
    if (openDrawer) {
      stopLenis()
    } else {
      startLenis()
    }
  }, [openDrawer, stopLenis, startLenis])

  // Typewriter animation effect
  useEffect(() => {
    if (openDrawer !== 'yousefdev') return

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
  }, [openDrawer, typewriterText, isDeleting])

  // Reset typewriter when drawer opens
  useEffect(() => {
    if (openDrawer === 'yousefdev') {
      setTypewriterText('')
      setIsDeleting(false)
    }
  }, [openDrawer])

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
            delay: index * 0.1,
            force3D: true
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const projectsData = [
    {
      id: 2,
      title: 'retroOS',
      description: 'Advanced React OS simulation with custom windowing & file systems.',
      fullDescription: 'A technical showcase of complex state management and UI engineering, featuring an interactive windowing system, functional terminal, and virtual file system built entirely with React and Next.js.',
      tag: 'UI/UX',
      icon: 'fa-desktop',
      span: 'md:col-span-1 md:row-span-1',
      delay: 'delay-100',
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
      id: 4,
      title: 'ICPCHUE',
      description: 'Hardened, sandboxed online judge platform.',
      fullDescription: 'I led the development of ICPCHUE.XYZ, a comprehensive platform serving the community. Built with Next.js, featuring secure registration, gamified dashboards, and Skill trackers.',
      tag: 'Platform',
      icon: 'fa-code',
      span: 'md:col-span-2 md:row-span-1',
      delay: 'delay-100',
      video: '/videos/icpchue2.webm',
    },
    {
      id: 1,
      title: 'Zero Threat',
      description: 'National award-winning AI-driven security ecosystem.',
      fullDescription: 'A comprehensive AI-powered cybersecurity suite comprising a web platform, browser extension, and Windows agent, designed for advanced threat intelligence and real-time protection.',
      tag: 'Cybersecurity',
      icon: 'fa-shield-alt',
      span: 'md:col-span-2 md:row-span-1',
      delay: 'delay-200',
      video: '/videos/zerothreat.webm',
    },
    {
      id: 5,
      title: 'More Projects',
      description: 'Additional projects and experiments',
      fullDescription: 'Explore additional projects, experiments, and creative work showcasing various technologies and solutions.',
      icon: 'fa-archive',
      span: 'md:col-span-1 md:row-span-1',
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
          items: ['Full-stack development', 'Web applications', 'Automation systems']
        }
      ]
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end mb-12 md:mb-20 px-0 md:px-4"
        >
          <div className="w-full md:w-auto">
            <h2 className="text-3xl md:text-8xl font-display font-black text-white tracking-tighter text-center md:text-left">PROJECTS</h2>
          </div>
          <a
            href="https://github.com/YUST777"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block border border-white/20 px-8 py-3 rounded-full text-sm tracking-widest uppercase hover:bg-white/10 transition-colors"
          >
            View GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[350px] md:auto-rows-[450px]">
          {hasMounted && projectsData.map((project, index) => {
            // --- Large Card (e.g. YousefDev) ---
            if (project.isLarge) {
              return (
                <BentoTilt
                  key={project.id}
                  className={`${project.span} rounded-2xl overflow-hidden relative group cursor-pointer`}
                >
                  {/* Clickable overlay for mobile touch */}
                  <button
                    onClick={() => {
                      setSelectedProject(project)
                      setIsModalOpen(true)
                    }}
                    className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
                    aria-label={`View ${project.title || 'project'} details`}
                  />
                  <div
                    ref={el => { revealRefs.current[index + 1] = el }}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none"
                          title={`${project.title} project preview video`}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black pointer-events-none" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                      {project.video && project.video !== '/videos/yousefdev.webm' && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none"></div>
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
                  {/* Clickable overlay for mobile touch */}
                  <button
                    onClick={() => {
                      if (project.isArchive) {
                        router.push('/projects')
                        return
                      }
                      setSelectedProject(project)
                      setIsModalOpen(true)
                    }}
                    className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
                    aria-label={`View ${project.title || 'project'} details`}
                  />
                  <div
                    ref={el => { revealRefs.current[index + 1] = el }}
                    className="relative w-full h-full"
                  >
                    {project.video ? (
                      <>
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none"
                          title={`${project.title} archive preview video`}
                        />
                        {project.video !== '/videos/moreprojects.webm' && (
                          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none"></div>
                        )}
                      </>
                    ) : (
                      <div className="bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center h-full text-center p-4 border border-white/10 w-full h-full pointer-events-none">
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
                {/* Clickable overlay for mobile touch */}
                <button
                  onClick={() => {
                    if (project.video === '/videos/zerothreat.webm') {
                      setOpenDrawer('zerothreat')
                      return
                    }
                    if (project.video === '/videos/RetroOS_Project.webm') {
                      setOpenDrawer('retroOS')
                      return
                    }
                    if (project.video === '/videos/icpchue2.webm' || project.video === '/videos/ICPCHUE.webm') {
                      setOpenDrawer('ICPCHUE')
                      return
                    }
                    if (project.video === '/videos/yousefdev.webm') {
                      setOpenDrawer('yousefdev')
                      return
                    }
                    if (project.video === '/videos/fazzah.webm') {
                      setOpenDrawer('fazzah')
                      return
                    }
                    if (project.video === '/videos/panoblue.webm') {
                      setOpenDrawer('panoblue')
                      return
                    }
                    setSelectedProject(project)
                    setIsModalOpen(true)
                  }}
                  className="absolute inset-0 z-50 w-full h-full bg-transparent cursor-pointer"
                  aria-label={`View ${project.title || 'project'} details`}
                />
                <div
                  ref={el => { revealRefs.current[index + 1] = el }}
                  className="w-full h-full"
                >
                  <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                    {project.video ? (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl pointer-events-none"
                        title={`${project.title} showcase video`}
                      />
                    ) : (
                      <i className={`fas ${project.icon} text-8xl md:text-9xl text-white/20 group-hover:text-white/30 transition-colors duration-500`}></i>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                    {project.video && (
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm group-hover:bg-transparent group-hover:backdrop-blur-none transition-all duration-500 pointer-events-none"></div>
                    )}
                  </div>
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
                </div>
              </BentoTilt>
            )
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://github.com/YUST777"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-8 py-3 rounded-full text-sm tracking-widest uppercase w-full inline-block hover:bg-white/10 transition-colors"
          >
            View GitHub
          </a>
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
                        openDrawer === 'yousefdev' ? (
                          <span className="font-mono">
                            {typewriterText}
                            <span className="animate-pulse">|</span>
                          </span>
                        ) :
                          openDrawer === 'panoblue' ? 'PanoBlue' :
                            openDrawer === 'fazzah' ? 'Fazzah' : ''}
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

            <ScopedSmoothScroll className="overflow-y-auto flex-1 pr-2 space-y-6 custom-scrollbar">
              {/* Video Hero */}
              {openDrawer && (
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5 mb-6 flex-shrink-0 relative">
                  {openDrawer === 'ICPCHUE' ? (
                    <iframe
                      src="https://www.youtube.com/embed/tH--wuGCMuM?autoplay=1&mute=1&loop=1&playlist=tH--wuGCMuM"
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={
                        openDrawer === 'zerothreat' ? '/videos/zerothreat.webm' :
                          openDrawer === 'retroOS' ? '/videos/RetroOS_Project.webm' :
                            openDrawer === 'yousefdev' ? '/videos/yousefdev.webm' :
                              openDrawer === 'panoblue' ? '/videos/panoblue.webm' :
                                openDrawer === 'fazzah' ? '/videos/fazzah.webm' : ''
                      }
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      title={`${openDrawer} detailed showcase video`}
                    />
                  )}
                </div>
              )}

              {/* Dynamic Content Based on Project */}
              {openDrawer === 'zerothreat' && (
                <>
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">Zero Threat – AI-Driven Cybersecurity Suite</h4>
                    <p className="text-sm text-gray-400"><i className="fas fa-calendar-alt mr-2"></i>August 1 – August 28, 2025</p>
                    <p className="text-sm text-gray-400 mt-1"><i className="fas fa-trophy mr-2"></i>3rd Place at the National Student Forum (Al-Multaqy Al-Qammy), Tanta University</p>
                    <p className="text-sm text-gray-400 mt-1">Role: Lead Web Developer & UI/UX Designer</p>
                  </div>

                  {/* The Achievement */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-trophy mr-2"></i>The Achievement</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      This project secured 3rd place in a national competition featuring <strong className="text-white">20 universities from across Egypt</strong>. As freshmen from a private university, my team competed against and outperformed 4th and 5th-year Engineering and Computer Science seniors. Our project was evaluated and commended by the Dean of Computer Science and a Professor of Cybersecurity at Tanta University.
                    </p>
                  </div>

                  {/* The Solution */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-lightbulb mr-2"></i>The Solution</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Zero Threat is a comprehensive security ecosystem combining a web platform, a browser extension, and a Windows application.
                    </p>
                  </div>

                  {/* My Contribution */}
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

                  {/* The Windows Agent */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-desktop mr-2"></i>The Windows Agent</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Developed by my teammate Abdelrahman Mohsen, the desktop client utilizes the YARA protocol and AI integration. In our benchmarks, it achieved a <strong className="text-white">90% detection rate</strong> across 90 test subjects, outperforming many traditional signature-based antivirus solutions.
                    </p>
                  </div>

                  {/* Official Documentation */}
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
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">RetroOS</h4>
                    <p className="text-sm text-gray-400"><i className="fas fa-trophy mr-2"></i>Operating Systems Course Project & Hackathon Winner</p>
                    <p className="text-sm text-gray-400 mt-1">Tech Stack: Next.js, React</p>
                  </div>

                  {/* Overview */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Overview</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      RetroOS is a web-based simulation designed to trigger nostalgia by faithfully recreating the iconic Windows XP user interface. Originally developed as a project for my Operating Systems university course, it serves as a visual mimic of an OS environment entirely within the browser.
                    </p>
                  </div>

                  {/* The Experience */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-laptop-code mr-2"></i>The Experience</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      While it doesn't run on a low-level kernel, the application uses advanced React state management to simulate windowing systems, taskbars, and file navigation. The attention to detail in the UI/UX design made the project stand out immediately.
                    </p>
                  </div>

                  {/* Key Achievement */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-trophy mr-2"></i>Key Achievement</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      We took this project to a hackathon, where its unique concept and execution earned us a <strong className="text-white">$150 cash prize</strong>. It was a wild experience turning a course assignment into a winning hackathon entry.
                    </p>
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
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2"><i className="fas fa-rocket mr-2"></i>Project: ICPC HUE Ecosystem</h4>
                    <p className="text-sm text-gray-400 font-bold">Role: Lead Software & Security Engineer</p>
                    <p className="text-sm text-gray-400 mt-1">Timeline: Nov 2025 – Present</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {['Next.js 16', 'React 19', 'Express.js', 'PostgreSQL', 'Docker', 'TypeScript'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-white/10 rounded-md text-[10px] text-white border border-white/10 uppercase tracking-tighter">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-info-circle mr-2"></i>Project Overview</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      ICPC HUE is a high-performance competitive programming ecosystem built for the Faculty of AI at Horus University. Moving beyond generic landing pages, I engineered a custom Online Judge (OJ), a secure recruitment pipeline, and a student dashboard that scales to hundreds of concurrent users.
                    </p>
                  </div>

                  {/* Security */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-shield-alt mr-2"></i>Hardened Security Infrastructure (A+ Rated)</h4>
                    <p className="text-sm text-gray-300 mb-4">Instead of relying on third-party security, I implemented a Defense-in-Depth model that achieved an A+ SSL Rating from Qualys SSL Labs.</p>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li><strong className="text-white">Zero-Trust Auth:</strong> Stateless JWT management with Bcrypt high-iteration hashing.</li>
                      <li><strong className="text-white">Infrastructure Hardening:</strong> Nonce-based Content Security Policy (CSP), Cloudflare WAF Layer 7 protection, and DNSSEC implementation.</li>
                      <li><strong className="text-white">Compliance:</strong> Fully compliant with OWASP Top 10 standards and PCI DSS 4.0.1.</li>
                    </ul>
                  </div>

                  {/* The Judge */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-gavel mr-2"></i>Custom Execution Engine (The Judge)</h4>
                    <p className="text-sm text-gray-300 mb-4">To ensure academic integrity and system stability, I developed a proprietary code execution engine.</p>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li><strong className="text-white">Sandboxed Environment:</strong> Every submission runs in an isolated Docker (Alpine Linux) container with --network none flags to prevent data leaks.</li>
                      <li><strong className="text-white">Resource Throttling:</strong> Strict CPU (1.0) and Memory (&lt;256MB) limits prevent DoS attacks via student code.</li>
                      <li><strong className="text-white">Scale:</strong> Manually curated 100+ test cases across 26 problems with sub-second asynchronous grading.</li>
                    </ul>
                  </div>

                  {/* Impact & Metrics */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-chart-line mr-2"></i>Objective Impact & Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Performance</p>
                        <p className="text-lg font-display font-bold text-white">1,395ms</p>
                        <p className="text-[10px] text-gray-400">Avg Load Time</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Adoption</p>
                        <p className="text-lg font-display font-bold text-white">300+</p>
                        <p className="text-[10px] text-gray-400">Reg in 48h</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Reach</p>
                        <p className="text-lg font-display font-bold text-white">3,840+</p>
                        <p className="text-[10px] text-gray-400">Monthly Views</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Engagement</p>
                        <p className="text-lg font-display font-bold text-white">52/48</p>
                        <p className="text-[10px] text-gray-400">Gender Parity</p>
                      </div>
                    </div>
                  </div>

                  {/* Design */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-palette mr-2"></i>Design Philosophy</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Built on a high-contrast Glassmorphism system, the UI utilizes reusable primitives and optimized WebM backgrounds to maintain a premium feel without sacrificing the 1.3s load time performance.
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
                    <h4 className="text-xl font-display font-bold text-white mb-4"><i className="fas fa-tools mr-2"></i>Expertise</h4>
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

              {openDrawer === 'panoblue' && (
                <>
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">PanoBlue – Import/Export Corporate Platform</h4>
                    <p className="text-sm text-gray-400">Role: Frontend Developer & UI Designer</p>
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

              {openDrawer === 'fazzah' && (
                <>
                  {/* Header */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-display font-bold text-white mb-2">Fazzah – Streetwear E-Commerce Store</h4>
                    <p className="text-sm text-gray-400">Role: Full-Stack Shopify Developer</p>
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
            </ScopedSmoothScroll>
          </div>
        </>
      )}
    </section >
  )
}
