'use client'

import { useEffect } from 'react'

export default function ClarityAnalytics() {
  useEffect(() => {
    // Initialize Clarity with your project ID
    // Replace 'YOUR_PROJECT_ID' with your actual Clarity project ID
    // Get it from: Clarity project > Settings > Overview
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'YOUR_PROJECT_ID'
    
    if (projectId && projectId !== 'YOUR_PROJECT_ID' && typeof window !== 'undefined') {
      // Suppress network errors from ad blockers
      const originalError = window.console.error
      const originalWarn = window.console.warn
      
      // Temporarily suppress console errors for Clarity
      window.console.error = (...args: any[]) => {
        const message = args.join(' ')
        // Don't log Clarity-related errors
        if (message.includes('clarity') || message.includes('ERR_BLOCKED_BY_CLIENT')) {
          return
        }
        originalError.apply(console, args)
      }
      
      window.console.warn = (...args: any[]) => {
        const message = args.join(' ')
        // Don't log Clarity-related warnings
        if (message.includes('clarity') || message.includes('ERR_BLOCKED_BY_CLIENT')) {
          return
        }
        originalWarn.apply(console, args)
      }
      
      try {
        // Dynamically import Clarity to handle ad blocker errors gracefully
        import('@microsoft/clarity').then((Clarity) => {
          try {
            Clarity.default.init(projectId)
          } catch (initError) {
            // Silently handle initialization errors
          }
        }).catch((error) => {
          // Silently handle import errors (e.g., ad blockers blocking the request)
        })
      } catch (error) {
        // Silently handle errors
      }
      
      // Restore console after a short delay
      setTimeout(() => {
        window.console.error = originalError
        window.console.warn = originalWarn
      }, 2000)
    }
  }, [])

  return null
}

