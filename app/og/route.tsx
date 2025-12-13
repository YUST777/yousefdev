// @ts-ignore
import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <div
            style={{
              fontSize: '120px',
              fontWeight: 'bold',
              color: '#ffffff',
              marginBottom: '40px',
              letterSpacing: '-0.02em',
            }}
          >
            yousefdev
          </div>
          <div
            style={{
              fontSize: '40px',
              color: '#a0a0a0',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: '1.4',
            }}
          >
            Full-Stack Developer & Cybersecurity Engineer
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#666666',
              marginTop: '40px',
              textAlign: 'center',
            }}
          >
            Building practical tools and applications
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

