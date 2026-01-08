'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface MapExpandedContextType {
    isMapExpanded: boolean
    setIsMapExpanded: (value: boolean) => void
}

const MapExpandedContext = createContext<MapExpandedContextType | undefined>(undefined)

export function MapExpandedProvider({ children }: { children: ReactNode }) {
    const [isMapExpanded, setIsMapExpanded] = useState(false)

    return (
        <MapExpandedContext.Provider value={{ isMapExpanded, setIsMapExpanded }}>
            {children}
        </MapExpandedContext.Provider>
    )
}

export function useMapExpanded() {
    const context = useContext(MapExpandedContext)
    if (!context) {
        throw new Error('useMapExpanded must be used within MapExpandedProvider')
    }
    return context
}
