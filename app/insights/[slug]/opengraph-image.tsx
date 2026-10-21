import { articles, getArticle } from '@/lib/content'
import { ogContentType, ogSize, renderOgImage } from '@/lib/og'

export const alt = 'Six Jars Global insight'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = getArticle(slug)
  return renderOgImage({ eyebrow: a ? `Insight · ${a.capability}` : 'Insight', title: a?.title ?? 'Six Jars Global' })
}
