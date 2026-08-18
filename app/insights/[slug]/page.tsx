import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Clock } from 'lucide-react'
import PageHeader from '@/components/page-header'
import { articles, getArticle } from '@/lib/content'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/insights/${article.slug}`,
      publishedTime: article.isoDate,
    },
  }
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <PageHeader
        eyebrow={article.capability}
        title={article.title}
        breadcrumbs={[
          { label: 'Insights', href: '/insights' },
          { label: article.capability, href: `/insights/${article.slug}` },
        ]}
      />

      <article className="py-14 lg:py-20" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div
            className="flex flex-wrap items-center gap-4 text-sm pb-6"
            style={{
              color: 'rgba(75,13,36,0.6)',
              borderBottom: '1px solid var(--color-line)',
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} aria-hidden="true" />
              {article.readTime} read
            </span>
            <time dateTime={article.isoDate}>{article.date}</time>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden my-8">
            <Image
              src={article.image}
              // Illustrative, not informative — the article text carries the meaning.
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>

          <p
            className="text-lg leading-relaxed font-medium"
            style={{ color: 'var(--color-plum)' }}
          >
            {article.excerpt}
          </p>

          <div className="mt-6 space-y-5">
            {article.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-[1.8]"
                style={{ color: 'rgba(75,13,36,0.82)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div
            className="mt-10 rounded-2xl p-6"
            style={{
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-line)',
            }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(75,13,36,0.8)' }}
            >
              Facing this in your own organization? Tell us what must work and what cannot
              be compromised.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
              style={{ color: 'var(--color-wine)' }}
            >
              Start a conversation
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>

      <section
        className="py-16 lg:py-20"
        style={{ background: 'var(--color-parchment)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ color: 'var(--color-plum)' }}
          >
            More insights
          </h2>
          <ul className="grid sm:grid-cols-3 gap-5">
            {more.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="flex flex-col h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--color-line)',
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-[0.16em] uppercase"
                    style={{ color: 'var(--color-rose)' }}
                  >
                    {a.capability}
                  </span>
                  <span
                    className="text-base font-bold leading-snug mt-2 flex-1"
                    style={{ color: 'var(--color-plum)' }}
                  >
                    {a.title}
                  </span>
                  <span
                    className="text-xs mt-4"
                    style={{ color: 'rgba(75,13,36,0.5)' }}
                  >
                    {a.readTime} read · <time dateTime={a.isoDate}>{a.date}</time>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
