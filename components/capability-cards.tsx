import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { capabilities } from '@/lib/content'

/**
 * Compact capability cards. Short labels on the card, full names on the detail
 * page. Services are differentiated by number, mark and name — never by colour
 * alone, so the grid still reads for colour-blind visitors and in print.
 *
 * The whole card is one anchor: a real, copyable, deep-linkable URL.
 */
export default function CapabilityCards({
  heading = 'What do you need help with?',
  intro = 'Start with what you need help with. If your project needs more than one service, we will help you plan the work together.',
  eyebrow = 'Our services',
  headingLevel: Heading = 'h2',
  images,
  compactTop = false,
}: {
  heading?: string
  intro?: string
  eyebrow?: string
  headingLevel?: 'h1' | 'h2'
  /** Per-slug card image. When given, each card reads image, title, paragraph, button. */
  images?: Record<string, { src: string; alt: string }>
  /** Smaller top padding, for when it follows another light band. */
  compactTop?: boolean
}) {
  return (
    <section
      id="capabilities"
      className={compactTop ? 'pt-8 lg:pt-10 pb-8 lg:pb-10' : 'py-8 lg:py-10'}
      style={{ background: 'var(--color-ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-8">
          <div>
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-wine)' }}
            >
              {eyebrow}
            </p>
            <Heading
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{
                color: 'var(--color-plum)',
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              }}
            >
              {heading}
            </Heading>
          </div>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'rgba(0,0,0,0.72)' }}
          >
            {intro}
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c) => {
            const image = images?.[c.slug]
            return (
            <li key={c.slug}>
              <Link
                href={`/capabilities/${c.slug}`}
                className="capability-card group relative flex flex-col h-full rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--color-line)',
                  boxShadow: '0 1px 3px rgba(58,13,39,0.04)',
                }}
              >
                {/* Warm wash that lifts in on hover. */}
                <span
                  aria-hidden="true"
                  className="capability-card__wash absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(22rem 14rem at 100% 0%, rgba(239,184,60,0.16), transparent 70%)',
                  }}
                />

                {image ? (
                  <span className="relative block -mx-6 -mt-6 aspect-[3/2] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                ) : (
                <span className="relative flex items-center justify-between gap-3">
                  {/* The number, plainly legible — a filled chip, not a ghost. */}
                  <span
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-extrabold tracking-tight"
                    style={{
                      background: 'var(--color-plum)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    {c.number}
                  </span>
                  <span
                    className="text-[10px] font-bold tracking-[0.18em] uppercase"
                    style={{ color: 'var(--color-rose)' }}
                  >
                    {c.cue}
                  </span>
                </span>
                )}

                <span
                  className="relative block text-xl font-extrabold leading-tight tracking-tight mt-5"
                  style={{ color: 'var(--color-plum)' }}
                >
                  {c.shortName}
                </span>

                <span
                  className="relative block text-sm leading-relaxed mt-2 flex-1"
                  style={{ color: 'rgba(0,0,0,0.72)' }}
                >
                  {c.intro}
                </span>

                <span
                  className="relative inline-flex items-center gap-1.5 text-sm font-bold mt-6"
                  style={{ color: 'var(--color-wine)' }}
                >
                  See service
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
