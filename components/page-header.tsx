import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/** Shared page masthead with a real breadcrumb trail. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs = [],
}: {
  eyebrow: string
  title: string
  intro?: string
  breadcrumbs?: { label: string; href: string }[]
}) {
  return (
    <header
      className="on-dark pt-12 pb-14 lg:pt-16 lg:pb-20"
      style={{ background: 'var(--color-plum)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:underline"
                  style={{ color: 'rgba(252,251,248,0.6)' }}
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight
                    size={12}
                    aria-hidden="true"
                    style={{ color: 'rgba(252,251,248,0.35)' }}
                  />
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" style={{ color: 'var(--color-gold)' }}>
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:underline"
                      style={{ color: 'rgba(252,251,248,0.6)' }}
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p
          className="text-xs font-bold tracking-[0.18em] uppercase"
          style={{ color: 'var(--color-gold)' }}
        >
          {eyebrow}
        </p>
        <h1
          className="mt-3 font-extrabold tracking-tight leading-[1.08] max-w-4xl"
          style={{
            color: 'var(--color-ivory)',
            fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
          }}
        >
          {title}
        </h1>
        {intro && (
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: 'rgba(252,251,248,0.72)' }}
          >
            {intro}
          </p>
        )}
      </div>
    </header>
  )
}
