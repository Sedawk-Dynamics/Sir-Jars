import { capabilities, getCapability } from '@/lib/content'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Six Jars Global service'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = getCapability(slug)
  return renderOgImage({ eyebrow: 'Service', title: c?.fullName ?? 'Six Jars Global' })
}
