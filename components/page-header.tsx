import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { patternVars, type PatternName } from '@/lib/patterns'

export type HeaderPattern = PatternName

/** Image and texture for each vertical, shared by capability and insight pages. */
export const verticalVisuals: Record<string, { image: string; alt: string; pattern: HeaderPattern }> = {
  publishing: { image: '/images/publishing-ops.png', alt: 'A publishing production floor with proofs under review.', pattern: 'hatch' },
  media: { image: '/images/insights-editorial.png', alt: 'An editorial desk preparing media content.', pattern: 'waves' },
  'digital-platforms': { image: '/images/mission-editorial.png', alt: 'A specialist working on a digital platform.', pattern: 'circuit' },
  'data-operations': { image: '/images/hero-cinematic.png', alt: 'An operations team coordinating work.', pattern: 'grid' },
  'ai-academy': { image: '/images/mission-editorial.png', alt: 'A learner working through a training module.', pattern: 'dots' },
  'cybersecurity-forensics': { image: '/images/cybersecurity-ops.png', alt: 'A security operations room monitoring systems.', pattern: 'diagonal' },
}

/**
 * Shared page masthead: patterned plum field, a relevant image on the left
 * and the heading on the right, with a real breadcrumb trail.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  breadcrumbs = [],
  image = '/images/hero-cinematic.png',
  imageAlt = '',
  pattern = 'hatch',
}: {
  eyebrow: string
  title: string
  intro?: string
  breadcrumbs?: { label: string; href: string }[]
  image?: string
  imageAlt?: string
  pattern?: HeaderPattern
}) {
  return (
    <header
      className="on-dark patterned overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-20"
      style={{ background: 'var(--color-plum)', ...patternVars(pattern) }}
    >
      {/* Soft vignette so the texture never competes with the heading. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, transparent 0%, rgba(75,13,36,0.55) 75%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
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

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1 relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            style={{ border: '1px solid rgba(241,181,59,0.28)' }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(75,13,36,0.45))' }}
            />
          </div>

          <div className="order-1 lg:order-2">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              {eyebrow}
            </p>
            <h1
              className="mt-3 font-extrabold tracking-tight leading-[1.08]"
              style={{
                color: 'var(--color-ivory)',
                fontSize: 'clamp(2.25rem, 4.6vw, 3.5rem)',
              }}
            >
              {title}
            </h1>
            {intro && (
              <p
                className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
                style={{ color: 'rgba(252,251,248,0.76)' }}
              >
                {intro}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
