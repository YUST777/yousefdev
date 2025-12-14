import { NextResponse } from 'next/server'
import { spawn } from 'child_process'
import { randomUUID } from 'crypto'
import path from 'path'
import { getCachedProfile, setCachedProfile, type CachedProfilePayload } from '@/lib/profileCache'

const PYTHON_BIN = '/usr/bin/python3'
const COLLECTIBLE_KIT_ROOT = '/root/01studio/CollectibleKIT'
const SCRIPT_PATH = path.join(COLLECTIBLE_KIT_ROOT, 'bot', 'services', 'get_profile_gifts.py')
const PROFILE_SCRIPT_PATH = path.join(COLLECTIBLE_KIT_ROOT, 'bot', 'services', 'get_user_profile.py')
const DEFAULT_PROFILE = 'yousefmsm1'
const MAX_GIFTS = 60

let refreshPromise: Promise<void> | null = null
export const runtime = 'nodejs'

type GiftPayload = {
  id: string
  slug?: string | null
  number?: number | null
  giftId?: number | null
  isUpgraded?: boolean
  price?: number | null
  fragmentUrl?: string | null
  fragmentLink?: string | null
}

async function fetchProfileFromPython(username: string = DEFAULT_PROFILE): Promise<CachedProfilePayload> {
  const profileArg = username.startsWith('@') ? username : `@${username}`
  return new Promise((resolve, reject) => {
    const python = spawn(
      PYTHON_BIN,
      [SCRIPT_PATH, profileArg, '--include-user'],
      { cwd: COLLECTIBLE_KIT_ROOT }
    )

    let stdout = ''
    let stderr = ''

    python.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    python.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    python.on('error', (error) => {
      reject(new Error(`Failed to start Python script: ${error.message}`))
    })

    python.on('close', (code) => {
      if (code !== 0) {
        const errorMessage = stderr.trim() || 'Python script exited with an error'
        reject(new Error(errorMessage))
        return
      }

      try {
        const payloadLine = stdout
          .trim()
          .split('\n')
          .filter(Boolean)
          .pop() || '{}'
        const parsed = JSON.parse(payloadLine)

        if (!parsed.success) {
          reject(new Error(parsed.error || 'Unable to load gifts'))
          return
        }

        const gifts: GiftPayload[] = (parsed.gifts || [])
          .slice(0, MAX_GIFTS)
          .map((gift: any) => ({
            id: gift.num?.toString()
              ?? gift.gift_id?.toString()
              ?? gift.slug
              ?? randomUUID(),
            slug: gift.slug,
            number: gift.num,
            giftId: gift.gift_id,
            isUpgraded: Boolean(gift.is_upgraded),
            price: gift.price ?? null,
            fragmentUrl: gift.fragment_url,
            fragmentLink: gift.fragment_link
          }))

        const profile = parsed.user
          ? {
              id: parsed.user.id,
              username: parsed.user.username || 'yousefmsm1',
              displayName: parsed.user.display_name || 'Yousef',
              photoDataUrl: parsed.user.photo_data_url || null,
              decorationColors: parsed.user.decoration_colors || null
            }
          : {
              username: 'yousefmsm1',
              displayName: 'Yousef',
              photoDataUrl: null,
              decorationColors: null
            }
        
        // Extract colors from profile if available (from get_profile_gifts.py)
        let profileColors = null
        if (parsed.user?.decoration_colors) {
          profileColors = {
            centerColor: parsed.user.decoration_colors.center_color || null,
            edgeColor: parsed.user.decoration_colors.edge_color || null
          }
        }

        resolve({
          success: true,
          gifts,
          profile,
          total: parsed.total,
          nftCount: parsed.nft_count,
          totalValue: parsed.total_value,
          fetchedAt: Date.now(),
          decorationColors: profileColors // Include colors from get_profile_gifts.py
        })
      } catch (error: any) {
        reject(new Error(`Failed to parse Python response: ${error.message}`))
      }
    })
  })
}

async function fetchProfileDecoration(username: string = DEFAULT_PROFILE): Promise<any> {
  const cleanUsername = username.replace('@', '')
  return new Promise((resolve, reject) => {
    const python = spawn(
      PYTHON_BIN,
      [PROFILE_SCRIPT_PATH, cleanUsername],
      { cwd: COLLECTIBLE_KIT_ROOT }
    )

    let stdout = ''
    let stderr = ''

    python.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    python.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    python.on('error', (error) => {
      reject(new Error(`Failed to start profile script: ${error.message}`))
    })

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(stderr.trim() || 'Profile script exited with error'))
        return
      }

      try {
        const payloadLine = stdout
          .trim()
          .split('\n')
          .filter(Boolean)
          .pop() || '{}'
        const parsed = JSON.parse(payloadLine)
        resolve(parsed)
      } catch (error: any) {
        reject(new Error(`Failed to parse profile response: ${error.message}`))
      }
    })
  })
}

function triggerBackgroundRefresh(username: string) {
  if (refreshPromise) return
  refreshPromise = fetchProfileFromPython(username)
    .then((payload) => {
      const cacheKey = username.replace('@', '')
      setCachedProfile(cacheKey, payload)
    })
    .catch((error) => {
      console.error('profile-gifts background refresh failed:', error.message)
    })
    .finally(() => {
      refreshPromise = null
    })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username') || DEFAULT_PROFILE
  const cleanUsername = username.replace('@', '')
  const cacheKey = cleanUsername
  
  const cached = getCachedProfile(cacheKey)
  
  // Fetch profile decoration (non-blocking for cached, blocking for fresh)
  let decorationData: any = null
  const fetchDecoration = async () => {
    try {
      decorationData = await fetchProfileDecoration(cleanUsername)
    } catch (error: any) {
      console.error('profile decoration fetch failed:', error.message)
    }
  }

  if (cached) {
    triggerBackgroundRefresh(cleanUsername)
    // Try to fetch decoration synchronously for cached response (with timeout)
    // This ensures colors are available immediately
    try {
      await Promise.race([
        fetchDecoration(),
        new Promise(resolve => setTimeout(resolve, 2000)) // 2 second timeout
      ])
    } catch (e) {
      // Ignore errors, continue with cached data
    }
    
    const response: any = {
      ...cached.payload,
      cached: true,
      updatedAt: cached.updatedAt,
      refreshing: Boolean(refreshPromise)
    }
    
    // Prioritize colors from get_profile_gifts.py (already in payload)
    // Only use get_user_profile.py colors as fallback if not available
    if (!response.decorationColors && decorationData?.success) {
      response.decoration = decorationData.worn_gift
      const extractedColors = extractDecorationColors(decorationData)
      response.decorationColors = extractedColors
      console.log(`[profile-gifts] Using fallback colors from get_user_profile.py for ${cleanUsername}:`, JSON.stringify(extractedColors, null, 2))
    } else if (response.decorationColors) {
      console.log(`[profile-gifts] Using colors from get_profile_gifts.py for ${cleanUsername}:`, JSON.stringify(response.decorationColors, null, 2))
    } else {
      console.log(`[profile-gifts] No decoration colors found for ${cleanUsername}`)
    }
    
    return NextResponse.json(response)
  }

  try {
    const payload = await fetchProfileFromPython(cleanUsername)
    const updatedAt = setCachedProfile(cacheKey, payload)
    
    // Fetch decoration data
    await fetchDecoration()
    
    const response: any = {
      ...payload,
      cached: false,
      updatedAt,
      refreshing: false
    }
    
    // Prioritize colors from get_profile_gifts.py (already in payload)
    // Only use get_user_profile.py colors as fallback if not available
    if (!response.decorationColors && decorationData?.success) {
      response.decoration = decorationData.worn_gift
      const extractedColors = extractDecorationColors(decorationData)
      response.decorationColors = extractedColors
      console.log(`[profile-gifts] Using fallback colors from get_user_profile.py for ${cleanUsername} (fresh):`, JSON.stringify(extractedColors, null, 2))
    } else if (response.decorationColors) {
      console.log(`[profile-gifts] Using colors from get_profile_gifts.py for ${cleanUsername} (fresh):`, JSON.stringify(response.decorationColors, null, 2))
    } else {
      console.log(`[profile-gifts] No decoration colors found for ${cleanUsername} (fresh)`)
    }
    
    return NextResponse.json(response)
  } catch (error: any) {
    console.error('profile-gifts error:', error.message)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

// Telegram profile color ID to RGB mapping
// Based on Telegram's predefined profile colors
const TELEGRAM_COLOR_MAP: Record<number, { r: number; g: number; b: number }> = {
  0: { r: 170, g: 85, b: 0 },      // Orange
  1: { r: 170, g: 0, b: 170 },     // Purple
  2: { r: 0, g: 170, b: 170 },     // Cyan
  3: { r: 170, g: 170, b: 0 },     // Yellow
  4: { r: 0, g: 170, b: 0 },       // Green
  5: { r: 170, g: 0, b: 0 },       // Red
  6: { r: 0, g: 0, b: 170 },       // Blue
  7: { r: 170, g: 0, b: 85 },      // Pink
  8: { r: 0, g: 85, b: 170 },      // Light Blue
  9: { r: 85, g: 0, b: 170 },      // Violet
  10: { r: 170, g: 85, b: 85 },    // Light Red
  11: { r: 85, g: 170, b: 0 },     // Light Green
  12: { r: 170, g: 170, b: 85 },    // Light Yellow
  13: { r: 85, g: 170, b: 170 },    // Light Cyan
  14: { r: 170, g: 85, b: 170 },    // Light Purple
  15: { r: 85, g: 85, b: 170 },     // Light Violet
}

function telegramColorIdToRgb(colorId: number | null | undefined): { r: number; g: number; b: number } | null {
  if (colorId === null || colorId === undefined) return null
  return TELEGRAM_COLOR_MAP[colorId] || null
}

function extractDecorationColors(profileData: any): any {
  console.log('[extractDecorationColors] Input profileData:', JSON.stringify(profileData, null, 2).substring(0, 500))
  
  // Extract colors from profile data if available
  const colors: any = {}
  
  // Try to parse RGB colors from raw attributes or specific fields
  // The Python script should extract these from the gift decoration metadata
  if (profileData.worn_gift) {
    console.log('[extractDecorationColors] Found worn_gift:', profileData.worn_gift)
    // If the script provides specific RGB colors, use them
    if (profileData.worn_gift.center_color) {
      colors.centerColor = profileData.worn_gift.center_color
    }
    if (profileData.worn_gift.edge_color) {
      colors.edgeColor = profileData.worn_gift.edge_color
    }
    if (profileData.worn_gift.pattern_color) {
      colors.patternColor = profileData.worn_gift.pattern_color
    }
    if (profileData.worn_gift.text_color) {
      colors.textColor = profileData.worn_gift.text_color
    }
  }
  
  // Extract from profile_color (Telegram color ID)
  if (!colors.centerColor && profileData.profile_color) {
    const colorId = typeof profileData.profile_color === 'object' 
      ? profileData.profile_color.color 
      : profileData.profile_color
    
    const rgb = telegramColorIdToRgb(colorId)
    if (rgb) {
      colors.centerColor = rgb
    } else if (typeof colorId === 'object' && colorId.r !== undefined) {
      // Already RGB format
      colors.centerColor = colorId
    } else if (typeof colorId === 'string' && colorId.match(/rgb/i)) {
      // RGB string format
      const match = colorId.match(/(\d+),\s*(\d+),\s*(\d+)/i)
      if (match) {
        colors.centerColor = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) }
      }
    }
  }
  
  // Extract from profile_accent (Telegram color ID)
  if (!colors.edgeColor && profileData.profile_accent) {
    const colorId = typeof profileData.profile_accent === 'object' 
      ? profileData.profile_accent.color 
      : profileData.profile_accent
    
    const rgb = telegramColorIdToRgb(colorId)
    if (rgb) {
      colors.edgeColor = rgb
    } else if (typeof colorId === 'object' && colorId.r !== undefined) {
      // Already RGB format
      colors.edgeColor = colorId
    } else if (typeof colorId === 'string' && colorId.match(/rgb/i)) {
      // RGB string format
      const match = colorId.match(/(\d+),\s*(\d+),\s*(\d+)/i)
      if (match) {
        colors.edgeColor = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) }
      }
    }
  }
  
  // Try to extract from raw attributes (debugging fallback)
  // Search ALL attributes for RGB patterns, not just color-named ones
  if (!colors.centerColor && profileData.raw_full_user_attributes) {
    const rawAttrs = profileData.raw_full_user_attributes
    const rgbPattern = /RGB\((\d+),\s*(\d+),\s*(\d+)\)/i
    // Look through all attributes for RGB strings
    for (const [key, value] of Object.entries(rawAttrs)) {
      if (typeof value === 'string') {
        const rgbMatch = value.match(rgbPattern)
        if (rgbMatch && !colors.centerColor) {
          colors.centerColor = { 
            r: parseInt(rgbMatch[1]), 
            g: parseInt(rgbMatch[2]), 
            b: parseInt(rgbMatch[3]) 
          }
          console.log(`[extractDecorationColors] Found centerColor in raw attribute '${key}':`, colors.centerColor)
          break
        }
      }
    }
  }
  
  // Also check raw_user_attributes
  if (!colors.centerColor && profileData.raw_user_attributes) {
    const rawAttrs = profileData.raw_user_attributes
    const rgbPattern = /RGB\((\d+),\s*(\d+),\s*(\d+)\)/i
    for (const [key, value] of Object.entries(rawAttrs)) {
      if (typeof value === 'string') {
        const rgbMatch = value.match(rgbPattern)
        if (rgbMatch && !colors.centerColor) {
          colors.centerColor = { 
            r: parseInt(rgbMatch[1]), 
            g: parseInt(rgbMatch[2]), 
            b: parseInt(rgbMatch[3]) 
          }
          console.log(`[extractDecorationColors] Found centerColor in user attribute '${key}':`, colors.centerColor)
          break
        }
      }
    }
  }
  
  // Default colors if nothing found (Blue gradient to match design)
  if (!colors.centerColor) {
    colors.centerColor = { r: 59, g: 130, b: 246 } // Blue
  }
  if (!colors.edgeColor) {
    // Use a darker version of center color, or default blue
    if (colors.centerColor && typeof colors.centerColor === 'object' && colors.centerColor.r !== undefined) {
      colors.edgeColor = {
        r: Math.max(0, colors.centerColor.r - 30),
        g: Math.max(0, colors.centerColor.g - 30),
        b: Math.max(0, colors.centerColor.b - 30)
      }
    } else {
      colors.edgeColor = { r: 37, g: 99, b: 235 } // Darker Blue
    }
  }
  
  return colors
}

