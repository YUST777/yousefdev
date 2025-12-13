import { NextResponse } from 'next/server'

// CDN base URLs
const STICKER_CARDS_URL = 'https://giftschart.01studio.xyz/api/sticker_price_cards'
const GIFT_CARDS_URL = 'https://giftschart.01studio.xyz/api/new_gift_cards'

export async function GET() {
  try {
    // Fetch both sticker and gift price cards
    const [stickerResponse, giftResponse] = await Promise.all([
      fetch(STICKER_CARDS_URL).catch(() => null),
      fetch(GIFT_CARDS_URL).catch(() => null)
    ])
    
    const allCards: any[] = []
    
    // Process sticker cards
    if (stickerResponse && stickerResponse.ok) {
      const stickerData = await stickerResponse.json()
      const stickerFiles = stickerData.files || []
      stickerFiles.forEach((file: any) => {
        allCards.push({
          name: file.name.replace('_card.png', '').replace(/_/g, ' '),
          filename: file.name,
          imageUrl: `${STICKER_CARDS_URL}/${file.name}`,
          type: 'sticker'
        })
      })
    }
    
    // Process gift cards
    if (giftResponse && giftResponse.ok) {
      const giftData = await giftResponse.json()
      const giftFiles = giftData.files || []
      giftFiles.forEach((file: any) => {
        allCards.push({
          name: file.name.replace('_card.png', '').replace(/_/g, ' '),
          filename: file.name,
          imageUrl: `${GIFT_CARDS_URL}/${file.name}`,
          type: 'gift'
        })
      })
    }
    
    // Shuffle all cards together randomly
    const shuffled = [...allCards].sort(() => Math.random() - 0.5)
    // Get random selection (more cards for variety)
    const selectedCards = shuffled.slice(0, Math.min(12, shuffled.length))
    
    const collections = selectedCards.map((card: any) => ({
      name: card.name,
      filename: card.filename,
      imageUrl: card.imageUrl
    }))

    return NextResponse.json({ collections })
  } catch (error) {
    console.error('CDN fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 })
  }
}
