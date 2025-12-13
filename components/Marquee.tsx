'use client'

export default function Marquee() {
  return (
    <div className="w-screen bg-white text-black py-4 md:py-6 overflow-hidden border-y border-white/10 z-20 relative">
      <div className="inline-block animate-marquee whitespace-nowrap">
        <span className="text-4xl md:text-6xl font-display font-black mx-6 md:mx-12 tracking-tighter">
          FULL-STACK <span className="text-gray-400 mx-4">•</span> CYBERSECURITY <span className="text-gray-400 mx-4">•</span> TYPESCRIPT <span className="text-gray-400 mx-4">•</span> PYTHON <span className="text-gray-400 mx-4">•</span>
        </span>
        <span className="text-4xl md:text-6xl font-display font-black mx-6 md:mx-12 tracking-tighter">
          FULL-STACK <span className="text-gray-400 mx-4">•</span> CYBERSECURITY <span className="text-gray-400 mx-4">•</span> TYPESCRIPT <span className="text-gray-400 mx-4">•</span> PYTHON <span className="text-gray-400 mx-4">•</span>
        </span>
      </div>
    </div>
  )
}


