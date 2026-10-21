import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Six Jars Global — Practical help to bring your ideas to life'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return renderOgImage({ eyebrow: 'Bengaluru · Six services', title: 'Practical help to bring your ideas to life.' })
}
