'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { phases } from '@/lib/content'

/**
 * Three-phase story rail: Understand, Execute, Prove.
 *
 * The six operational stages stay underneath, on /how-it-works.
 *
 * Motion contract: every phase is fully rendered in the DOM from first paint.
 * Scrolling only shifts which one is *emphasised* — it never reveals text that
 * was not already there. Reduced-motion and no-JS visitors see all three
 * phases in their final state, which is the point of the rule.
 */
export default function PhaseRail() {
  const [active, setActive] = useState(0)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLLIElement)
            if (index !== -1) setActive(index)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    itemRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how-we-work"
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-parchment)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-wine)' }}
          >
            How it works
          </p>
          <h2
            className="mt-3 font-extrabold tracking-tight leading-tight"
            style={{
              color: 'var(--color-plum)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            }}
          >
            Understand. Execute. Prove.
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'rgba(75,13,36,0.72)' }}
          >
            Three phases on the surface, six operational stages underneath. Authorisation
            is documented before work begins, and evidence is documented before it closes.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-5">
          {phases.map((phase, i) => {
            const isActive = i === active
            return (
              <li
                key={phase.slug}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="rounded-2xl p-6 lg:p-7 transition-all duration-500"
                style={{
                  background: isActive ? 'var(--color-plum)' : '#FFFFFF',
                  border: `1px solid ${isActive ? 'var(--color-plum)' : 'var(--color-line)'}`,
                  boxShadow: isActive
                    ? '0 18px 48px rgba(75,13,36,0.18)'
                    : '0 1px 3px rgba(75,13,36,0.04)',
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-3xl font-black leading-none"
                    style={{
                      color: isActive ? 'var(--color-gold)' : 'rgba(112,13,44,0.22)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: isActive ? 'var(--color-ivory)' : 'var(--color-plum)',
                    }}
                  >
                    {phase.name}
                  </h3>
                </div>

                <p
                  className="text-sm font-semibold mt-4 leading-snug"
                  style={{
                    color: isActive ? 'var(--color-gold)' : 'var(--color-wine)',
                  }}
                >
                  {phase.headline}
                </p>

                <p
                  className="text-sm leading-relaxed mt-3"
                  style={{
                    color: isActive ? 'rgba(252,251,248,0.7)' : 'rgba(75,13,36,0.68)',
                  }}
                >
                  {phase.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {phase.stages.map((stage) => (
                    <li key={stage.number} className="flex items-center gap-2">
                      <Check
                        size={14}
                        aria-hidden="true"
                        className="flex-shrink-0"
                        style={{
                          color: isActive ? 'var(--color-gold)' : 'var(--color-rose)',
                        }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{
                          color: isActive
                            ? 'rgba(252,251,248,0.8)'
                            : 'rgba(75,13,36,0.7)',
                        }}
                      >
                        Stage {stage.number} — {stage.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>

        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 mt-10 text-sm font-semibold"
          style={{ color: 'var(--color-wine)' }}
        >
          See all six stages and what each one produces
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
