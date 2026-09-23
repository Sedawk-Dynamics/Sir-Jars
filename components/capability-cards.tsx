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
  heading = 'Six routes into the work.',
  intro = 'Start with the problem you need solved. Six Jars assembles the right specialists and keeps one accountable line from brief to verified outcome.',
  eyebrow = 'Choose the capability',
  headingLevel: Heading = 'h2',
}: {
  heading?: string
  intro?: string
  eyebrow?: string
  headingLevel?: 'h1' | 'h2'
}) {
  return (
    <section
      id="capabilities"
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-12">
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
            style={{ color: 'rgba(75,13,36,0.72)' }}
          >
            {intro}
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/capabilities/${c.slug}`}
                className="capability-card group relative flex flex-col h-full rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--color-line)',
                  boxShadow: '0 1px 3px rgba(75,13,36,0.04)',
                }}
              >
                {/* Warm wash that lifts in on hover. */}
                <span
                  aria-hidden="true"
                  className="capability-card__wash absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(22rem 14rem at 100% 0%, rgba(241,181,59,0.16), transparent 70%)',
                  }}
                />

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

                <span
                  className="relative block text-xl font-extrabold leading-tight tracking-tight mt-5"
                  style={{ color: 'var(--color-plum)' }}
                >
                  {c.shortName}
                </span>

                <span className="relative flex-1" />

                <span
                  className="relative inline-flex items-center gap-1.5 text-sm font-bold mt-6"
                  style={{ color: 'var(--color-wine)' }}
                >
                  See capability
                  <ArrowRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
