'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { articles, capabilities, readTime } from '@/lib/content'

/**
 * Insight cards: service label, plain-language title, short summary, then
 * author, date and reading time. The takeaway and scope note live inside the
 * article, not on the card.
 *
 * The capability filter is client state on top of a fully-rendered list; the
 * cards themselves are anchors, not JavaScript-only handlers.
 *
 * `layout="rows"` is the /insights index: image left, text right, stacked on
 * mobile, with a visible result count and a "Read article" action.
 */
export default function InsightList({
  filterable = true,
  limit,
  layout = 'cards',
}: {
  filterable?: boolean
  limit?: number
  layout?: 'cards' | 'rows'
}) {
  const [filter, setFilter] = useState<string>('All')

  const routes = ['All', ...capabilities.map((c) => c.shortName)]
  const filtered =
    filter === 'All' ? articles : articles.filter((a) => a.capability === filter)
  const visible = limit ? filtered.slice(0, limit) : filtered

  return (
    <div>
      {filterable && (
        <div
          role="group"
          aria-label="Filter insights by capability"
          className="flex flex-wrap gap-2 mb-8"
        >
          {routes.map((route) => {
            const isActive = filter === route
            const count =
              route === 'All'
                ? articles.length
                : articles.filter((a) => a.capability === route).length
            return (
              <button
                key={route}
                type="button"
                onClick={() => setFilter(route)}
                aria-pressed={isActive}
                className="inline-flex items-center gap-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200"
                style={{
                  minHeight: 44,
                  background: isActive ? 'var(--color-wine)' : '#FFFFFF',
                  color: isActive ? 'var(--color-ivory)' : 'rgba(0,0,0,0.75)',
                  border: `1px solid ${isActive ? 'var(--color-wine)' : 'var(--color-line)'}`,
                }}
              >
                {route}
                <span
                  className="text-xs font-bold"
                  style={{ opacity: isActive ? 0.7 : 0.5 }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      <p
        className={layout === 'rows' ? 'mb-6 text-sm font-semibold' : 'sr-only'}
        role="status"
        style={{ color: 'rgba(0,0,0,0.7)' }}
      >
        {visible.length === 0
          ? 'No articles in this category yet.'
          : `Showing ${visible.length} ${visible.length === 1 ? 'article' : 'articles'}.`}
      </p>

      {layout === 'rows' ? (
        <ul className="space-y-6">
          {visible.map((article) => {
            const image = article.listImage ?? { src: article.image, alt: '' }
            return (
              <li key={article.slug}>
                <article
                  className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center rounded-2xl overflow-hidden"
                  style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
                >
                  {/* Always 3:2 (brand guide); height follows width. */}
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-6 lg:p-8">
                    <p
                      className="text-[11px] font-bold tracking-[0.16em] uppercase"
                      style={{ color: 'var(--color-rose)' }}
                    >
                      {article.capability}
                    </p>
                    <h2
                      className="text-xl font-bold leading-snug mt-2"
                      style={{ color: 'var(--color-plum)' }}
                    >
                      {article.title}
                    </h2>
                    <p
                      className="text-base leading-relaxed mt-2"
                      style={{ color: 'rgba(0,0,0,0.7)' }}
                    >
                      {article.excerpt}
                    </p>
                    <p
                      className="mt-4 text-sm"
                      style={{ color: 'rgba(0,0,0,0.65)' }}
                    >
                      {article.author.name}, {article.author.role} · {readTime(article)} read ·{' '}
                      <time dateTime={article.isoDate}>{article.date}</time>
                    </p>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="group mt-5 self-start inline-flex items-center gap-2 px-5 rounded-full text-sm font-bold"
                      style={{
                        minHeight: 44,
                        background: 'var(--color-wine)',
                        color: 'var(--color-ivory)',
                      }}
                    >
                      Read article
                      <span className="sr-only">: {article.title}</span>
                      <ArrowRight
                        size={15}
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      ) : (
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/insights/${article.slug}`}
              className="group flex flex-col h-full rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-line)',
              }}
            >
              <span className="relative block aspect-[3/2] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt ?? ''}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="flex flex-col flex-1 p-5">
                <span
                  className="text-[10px] font-bold tracking-[0.16em] uppercase"
                  style={{ color: 'var(--color-rose)' }}
                >
                  {article.capability}
                </span>
                <span
                  className="text-base font-bold leading-snug mt-2"
                  style={{ color: 'var(--color-plum)' }}
                >
                  {article.title}
                </span>
                <span
                  className="text-sm leading-relaxed mt-2 flex-1"
                  style={{ color: 'rgba(0,0,0,0.66)' }}
                >
                  {article.excerpt}
                </span>
                <span
                  className="block mt-4 pt-3 text-xs font-semibold"
                  style={{ color: 'rgba(0,0,0,0.75)', borderTop: '1px solid var(--color-line)' }}
                >
                  {article.author.name}, {article.author.role}
                </span>
                <span
                  className="flex items-center gap-3 mt-1 text-xs"
                  style={{ color: 'rgba(0,0,0,0.65)' }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" />
                    {readTime(article)} read
                  </span>
                  <time dateTime={article.isoDate}>{article.date}</time>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold"
                  style={{ color: 'var(--color-wine)' }}
                >
                  Read article
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}
