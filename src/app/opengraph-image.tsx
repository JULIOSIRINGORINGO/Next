import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#00c896',
            marginBottom: '32px',
          }}
        >
          Full Stack Developer
        </div>
        <div
          style={{
            fontSize: '18px',
            color: '#888888',
          }}
        >
          juliosiringoringo.space
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
