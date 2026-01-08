'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [time, setTime] = useState('00:00 AM')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer id="contact" className="bg-white text-black py-20 md:py-32 rounded-t-[2rem] md:rounded-t-[3rem] relative overflow-hidden mt-10 md:mt-20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs md:text-sm font-mono mb-6 md:mb-8 uppercase tracking-widest animate-pulse">Ready for new projects</p>
          <div className="group relative inline-block">
            <h2 className="text-5xl md:text-9xl font-display font-black tracking-tighter hover:scale-105 transition-transform duration-500 cursor-pointer text-black">
              yousef
            </h2>
          </div>

          <div className="mt-12 md:mt-20 flex flex-wrap justify-center gap-6 md:gap-20 items-center">
            <a href="https://github.com/YUST777" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-bold hover:line-through decoration-2 transition-all" aria-label="GitHub">GitHub</a>
            <a href="https://www.linkedin.com/in/yousefmsm1/" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-bold hover:line-through decoration-2 transition-all" aria-label="LinkedIn">LinkedIn</a>
            <a href="https://t.me/yousefmsm1" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-bold hover:line-through decoration-2 transition-all" aria-label="Contact me on Telegram">Telegram</a>
          </div>

          <div className="mt-16 md:mt-24 w-full flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-mono text-gray-500 border-t border-black/10 pt-6 md:pt-8 gap-4">
            <p>© 2025 yousef. All Rights Reserved.</p>
            <p>LOCAL TIME: <span>{time}</span></p>
          </div>
        </div>
      </div>
    </footer >
  )
}


