import { ImageResponse } from 'next/og'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

/** Branded 1200×630 social card: plum field, gold rule, page title. */
export function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #3A0D27 0%, #6B153F 100%)',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 56, height: 6, background: '#EFB83C' }} />
          <div style={{ fontSize: 28, letterSpacing: 6, color: '#EFB83C', textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ fontSize: title.length > 60 ? 60 : 72, lineHeight: 1.1, fontWeight: 700, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28, color: 'rgba(255,255,255,0.75)' }}>
          <span style={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: 2 }}>SIX JARS GLOBAL</span>
          <span>sixjarsglobal.com</span>
        </div>
      </div>
    ),
    ogSize,
  )
}
