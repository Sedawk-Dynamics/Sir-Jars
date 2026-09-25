import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/**
 * Background textures for the masthead. Each page picks its own so the site
 * reads as a family without every header looking identical. All are drawn in
 * ivory at low opacity over the plum field.
 */
const stroke = 'rgba(252,251,248,0.09)'

/** Short parallel strokes in blocks at varied angles — a woven, hand-hatched texture. */
function hatchTile() {
  const blocks: [number, number, number][] = [
    [20, 20, 0], [70, 15, 60], [120, 25, -30], [165, 20, 90],
    [25, 75, 120], [75, 70, 20], [125, 80, 80], [170, 70, -60],
    [20, 125, 45], [70, 130, -15], [120, 120, 100], [170, 125, 30],
    [25, 175, -45], [75, 170, 75], [125, 175, 10], [170, 180, 135],
  ]
  const lines = blocks
    .map(([cx, cy, a]) => {
      const strokes = Array.from({ length: 7 }, (_, i) => {
        const x = -14 + i * 4.5
        return `<line x1="${x}" y1="-18" x2="${x}" y2="18"/>`
      }).join('')
      return `<g transform="translate(${cx} ${cy}) rotate(${a})">${strokes}</g>`
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="none" stroke="${stroke}" stroke-width="1">${lines}</svg>`
}

const PATTERNS = {
  hatch: { svg: hatchTile(), size: '200px 200px' },
  grid: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="${stroke}"><path d="M48 0H0V48"/><circle cx="0" cy="0" r="2" fill="${stroke}"/></svg>`,
    size: '48px 48px',
  },
  dots: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><circle cx="2" cy="2" r="1.4" fill="rgba(252,251,248,0.13)"/></svg>`,
    size: '22px 22px',
  },
  diagonal: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="${stroke}"><path d="M-4 4l8-8M0 16L16 0M12 20l8-8"/></svg>`,
    size: '16px 16px',
  },
  waves: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="24" fill="none" stroke="${stroke}"><path d="M0 12c10-10 30-10 40 0s30 10 40 0"/></svg>`,
    size: '80px 24px',
  },
  circuit: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="none" stroke="${stroke}"><path d="M0 24h30l12 12v30M96 72H60L48 60V0M24 96V78h18"/><circle cx="42" cy="66" r="3"/><circle cx="48" cy="60" r="0"/><circle cx="60" cy="72" r="3"/><circle cx="30" cy="24" r="3"/></svg>`,
    size: '96px 96px',
  },
  weave: {
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="${stroke}"><path d="M0 10h20M20 30h20M10 0v20M30 20v20"/></svg>`,
    size: '40px 40px',
  },
} as const

export type HeaderPattern = keyof typeof PATTERNS

/** Image and texture for each vertical, shared by capability and insight pages. */
export const verticalVisuals: Record<string, { image: string; alt: string; pattern: HeaderPattern }> = {
  publishing: { image: '/images/publishing-ops.png', alt: 'A publishing production floor with proofs under review.', pattern: 'hatch' },
  media: { image: '/images/insights-editorial.png', alt: 'An editorial desk preparing media content.', pattern: 'waves' },
  'digital-platforms': { image: '/images/mission-editorial.png', alt: 'A specialist working on a digital platform.', pattern: 'circuit' },
  'data-operations': { image: '/images/hero-cinematic.png', alt: 'An operations team coordinating work.', pattern: 'grid' },
  'ai-academy': { image: '/images/mission-editorial.png', alt: 'A learner working through a training module.', pattern: 'dots' },
  'cybersecurity-forensics': { image: '/images/cybersecurity-ops.png', alt: 'A security operations room monitoring systems.', pattern: 'diagonal' },
}

function patternStyle(name: HeaderPattern): React.CSSProperties {
  const p = PATTERNS[name]
  return {
    backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(p.svg)}")`,
    backgroundSize: p.size,
  }
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
      className="on-dark relative overflow-hidden pt-10 pb-14 lg:pt-14 lg:pb-20"
      style={{ background: 'var(--color-plum)' }}
    >
      <div aria-hidden="true" className="absolute inset-0" style={patternStyle(pattern)} />
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
