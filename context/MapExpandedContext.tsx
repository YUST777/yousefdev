'use client'

import { createContext, useContext, useState, useMemo, ReactNode } from 'react'

interface MapExpandedContextType {
    isMapExpanded: boolean
    setIsMapExpanded: (value: boolean) => void
}

const MapExpandedContext = createContext<MapExpandedContextType | undefined>(undefined)

export function MapExpandedProvider({ children }: { children: ReactNode }) {
    const [isMapExpanded, setIsMapExpanded] = useState(false)

    // Memoize to prevent new object reference on every parent render
    const value = useMemo(() => ({ isMapExpanded, setIsMapExpanded }), [isMapExpanded])

    return (
        <MapExpandedContext.Provider value={value}>
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
