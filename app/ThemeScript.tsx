'use client'

import { useEffect } from 'react'

export default function ThemeScript() {
    useEffect(() => {
        // Add any theme initialization logic here if needed
        // Currently this component seems to be a placeholder or was intended for
        // raw script injection which Next.js handles better with script tags.
        // However, to satisfy the import, we return null or a minimal effect.
    }, [])

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          } catch (_) {}
        `,
            }}
        />
    )
}
