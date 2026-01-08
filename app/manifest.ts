import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'yousefdev - Developer',
        short_name: 'yousefdev',
        description: 'Full-stack developer and cybersecurity engineer building practical tools and applications.',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#000000',
        theme_color: '#000000',
        scope: '/',
        lang: 'en-US',
        dir: 'ltr',
        categories: ['technology', 'business', 'developer'],
        icons: [
            {
                src: '/images/favicon-16.webp',
                sizes: '16x16',
                type: 'image/webp',
                purpose: 'any'
            },
            {
                src: '/images/favicon-32.webp',
                sizes: '32x32',
                type: 'image/webp',
                purpose: 'any'
            },
            {
                src: '/images/favicon-192.webp',
                sizes: '192x192',
                type: 'image/webp',
                purpose: 'any maskable' as any
            },
            {
                src: '/images/favicon-512.webp',
                sizes: '512x512',
                type: 'image/webp',
                purpose: 'any maskable' as any
            },
            {
                src: '/icons/browser-icon.webp',
                sizes: 'any',
                type: 'image/webp',
                purpose: 'any maskable' as any
            }
        ],
        prefer_related_applications: false,
    }
}
