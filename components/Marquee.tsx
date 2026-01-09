'use client'

export default function Marquee() {
  return (
    <div className="w-screen bg-white text-black py-4 md:py-6 overflow-hidden border-y border-white/10 z-20 relative">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee shrink-0 will-change-transform">
          <span className="text-4xl md:text-6xl font-display font-black mx-6 md:mx-12 tracking-tighter">
            SECURE ARCHITECTURE <span className="text-gray-400 mx-4">•</span> FULL STACK ENGINEERING <span className="text-gray-400 mx-4">•</span> TYPESCRIPT <span className="text-gray-400 mx-4">•</span> PYTHON <span className="text-gray-400 mx-4">•</span>
          </span>
        </div>
        <div className="flex animate-marquee shrink-0 will-change-transform">
          <span className="text-4xl md:text-6xl font-display font-black mx-6 md:mx-12 tracking-tighter">
            SECURE ARCHITECTURE <span className="text-gray-400 mx-4">•</span> FULL STACK ENGINEERING <span className="text-gray-400 mx-4">•</span> TYPESCRIPT <span className="text-gray-400 mx-4">•</span> PYTHON <span className="text-gray-400 mx-4">•</span>
          </span>
        </div>
      </div>
    </div>
  )
}


