'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useInView } from 'framer-motion'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface LazyLottieProps {
    path: string
    className?: string
    loop?: boolean
}

export default function LazyLottie({ path, className, loop = true }: LazyLottieProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, margin: "200px" })
    const [animationData, setAnimationData] = useState<any>(null)

    useEffect(() => {
        if (isInView && !animationData) {
            fetch(path)
                .then(res => res.json())
                .then(data => setAnimationData(data))
                .catch(err => console.error(`Failed to load Lottie: ${path}`, err))
        }
    }, [isInView, path, animationData])

    return (
        <div ref={containerRef} className={className}>
            {animationData ? (
                <Lottie animationData={animationData} loop={loop} />
            ) : null}
        </div>
    )
}
