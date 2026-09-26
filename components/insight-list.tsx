'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { articles, capabilities, readTime } from '@/lib/content'

/**
 * Insight cards: service label, plain-language title, short summary, then
 * author, date and reading time. The takeaway and scope note live inside the
 * article, not on the card.
 *
 * The capability filter is client state on top of a fully-rendered list; the
 * cards themselves are anchors, not JavaScript-only handlers.
 */
export default function InsightList({
  filterable = true,
  limit,
}: {
  filterable?: boolean
  limit?: number
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
                disabled={count === 0}
                className="inline-flex items-center gap-2 px-4 rounded-full text-sm font-semibold transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  minHeight: 44,
                  background: isActive ? 'var(--color-wine)' : '#FFFFFF',
                  color: isActive ? 'var(--color-ivory)' : 'rgba(75,13,36,0.75)',
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

      <p className="sr-only" role="status">
        Showing {visible.length} {visible.length === 1 ? 'article' : 'articles'}
        {filter !== 'All' ? ` in ${filter}` : ''}.
      </p>

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
              <span className="relative block h-44 overflow-hidden">
                <Image
                  src={article.image}
                  // Decorative relative to the headline that follows it —
                  // the card's meaning is fully carried by its text.
                  alt=""
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
                  style={{ color: 'rgba(75,13,36,0.66)' }}
                >
                  {article.excerpt}
                </span>
                <span
                  className="block mt-4 pt-3 text-xs font-semibold"
                  style={{ color: 'rgba(75,13,36,0.75)', borderTop: '1px solid var(--color-line)' }}
                >
                  {article.author.name}, {article.author.role}
                </span>
                <span
                  className="flex items-center gap-3 mt-1 text-xs"
                  style={{ color: 'rgba(75,13,36,0.55)' }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} aria-hidden="true" />
                    {readTime(article)} read
                  </span>
                  <time dateTime={article.isoDate}>{article.date}</time>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
