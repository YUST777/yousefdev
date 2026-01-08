import { ImageResponse } from 'next/og'

export const alt = 'yousefdev - Developer | Full-Stack & Cybersecurity'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
              padding: '2px',
              background: 'linear-gradient(to bottom right, #ffffff33, #ffffff11)',
              borderRadius: '24px',
              display: 'flex',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                background: '#0a0a0a',
                padding: '40px 80px',
                borderRadius: '22px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #ffffff11',
              }}
            >
              <div
                style={{
                  fontSize: '120px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginBottom: '20px',
                }}
              >
                yousefdev
              </div>
              <div
                style={{
                  height: '4px',
                  width: '100px',
                  background: '#facc15', // Yellow accent from design
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: '44px',
              fontWeight: '700',
              color: '#ffffff',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: '1.2',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Cybersecurity Engineer & Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#888888',
              marginTop: '30px',
              textAlign: 'center',
              maxWidth: '700px',
            }}
          >
            Architecting Hardened Systems & High-Performance Web Applications
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

