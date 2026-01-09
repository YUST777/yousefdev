'use client'

import dynamic from 'next/dynamic'

const BuildingPublicly = dynamic(() => import('@/components/BuildingPublicly'), { ssr: false })

export default function BuildingPubliclyWrapper() {
    return <BuildingPublicly />
}
