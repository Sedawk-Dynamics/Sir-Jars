'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
                className="phase-card relative flex flex-col rounded-3xl p-7 lg:p-8 overflow-hidden transition-all duration-500"
                style={{
                  background: isActive
                    ? 'linear-gradient(155deg, #6A1633 0%, #4B0D24 60%, #3A0A1C 100%)'
                    : '#FFFFFF',
                  border: `1px solid ${isActive ? 'transparent' : 'var(--color-line)'}`,
                  boxShadow: isActive
                    ? '0 24px 60px -24px rgba(75,13,36,0.5)'
                    : '0 1px 3px rgba(75,13,36,0.04)',
                  transform: isActive ? 'translateY(-6px)' : 'none',
                }}
              >
                {/* Gold rule across the top of the phase in focus. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    background:
                      'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                  }}
                />

                {/* Oversized numeral, set as a watermark that stays legible. */}
                <span
                  aria-hidden="true"
                  className="absolute -top-3 right-4 text-[5.5rem] font-black leading-none select-none transition-colors duration-500"
                  style={{
                    color: isActive ? 'rgba(241,181,59,0.22)' : 'rgba(112,13,44,0.09)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span
                  className="relative text-[11px] font-bold tracking-[0.18em] uppercase"
                  style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-rose)' }}
                >
                  Phase {String(i + 1).padStart(2, '0')}
                </span>

                <h3
                  className="relative text-2xl lg:text-[1.75rem] font-extrabold tracking-tight mt-1.5"
                  style={{ color: isActive ? 'var(--color-ivory)' : 'var(--color-plum)' }}
                >
                  {phase.name}
                </h3>

                <p
                  className="relative text-base font-semibold leading-snug mt-4"
                  style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-wine)' }}
                >
                  {phase.headline}
                </p>

                <p
                  className="relative text-sm leading-relaxed mt-3"
                  style={{
                    color: isActive ? 'rgba(252,251,248,0.76)' : 'rgba(75,13,36,0.7)',
                  }}
                >
                  {phase.description}
                </p>

                {/* Stages as pills — lighter than a tick list, and scannable. */}
                <ul className="relative flex flex-wrap gap-2 mt-6 pt-5" style={{
                  borderTop: `1px solid ${isActive ? 'rgba(252,251,248,0.16)' : 'var(--color-line)'}`,
                }}>
                  {phase.stages.map((stage) => (
                    <li
                      key={stage.number}
                      className="text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full"
                      style={{
                        background: isActive
                          ? 'rgba(241,181,59,0.14)'
                          : 'var(--color-parchment)',
                        color: isActive ? 'var(--color-gold)' : 'var(--color-wine)',
                        border: `1px solid ${isActive ? 'rgba(241,181,59,0.32)' : 'var(--color-line)'}`,
                      }}
                    >
                      {stage.number} · {stage.name}
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
