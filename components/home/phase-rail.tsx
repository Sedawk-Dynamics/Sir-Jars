'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileCheck2, UserRound } from 'lucide-react'
import { phases } from '@/lib/content'

/**
 * Six-stage method rail: Understand → Plan → Execute → Review → Validate →
 * Improve, each with a named owner and the exit evidence that closes it.
 *
 * Motion contract: every stage is fully rendered in the DOM from first paint.
 * Scrolling only shifts which one is *emphasised* — it never reveals text that
 * was not already there. Reduced-motion and no-JS visitors see all six stages
 * in their final state.
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
            Clear scope. Coordinated delivery. Evidence at close.
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'rgba(75,13,36,0.72)' }}
          >
            Understand → Plan → Execute → Review → Validate → Improve. Every stage has a
            named owner and cannot close until its exit evidence exists.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {phases.map((phase, i) => {
            const isActive = i === active
            return (
              <li
                key={phase.slug}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="relative flex flex-col rounded-3xl p-7 overflow-hidden transition-all duration-500"
                style={{
                  background: isActive
                    ? 'linear-gradient(155deg, #6A1633 0%, #4B0D24 60%, #3A0A1C 100%)'
                    : '#FFFFFF',
                  border: `1px solid ${isActive ? 'transparent' : 'var(--color-line)'}`,
                  boxShadow: isActive
                    ? '0 24px 60px -24px rgba(75,13,36,0.5)'
                    : '0 1px 3px rgba(75,13,36,0.04)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 transition-opacity duration-500"
                  style={{
                    opacity: isActive ? 1 : 0,
                    background:
                      'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
                  }}
                />

                {/* Label row: the numeral sits in the flow, inside the card. */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="block text-xs font-bold tracking-[0.18em] uppercase"
                      style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-rose)' }}
                    >
                      Phase {phase.number}
                    </span>
                    <h3
                      className="text-2xl font-extrabold tracking-tight mt-1"
                      style={{ color: isActive ? 'var(--color-ivory)' : 'var(--color-plum)' }}
                    >
                      {phase.name}
                    </h3>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-5xl font-black leading-none select-none tabular-nums"
                    style={{
                      color: isActive ? 'rgba(241,181,59,0.35)' : 'rgba(112,13,44,0.14)',
                    }}
                  >
                    {phase.number}
                  </span>
                </div>

                <p
                  className="text-base font-bold leading-snug mt-4"
                  style={{ color: isActive ? 'var(--color-gold)' : 'var(--color-wine)' }}
                >
                  {phase.headline}
                </p>

                <p
                  className="text-sm leading-relaxed mt-3 flex-1"
                  style={{
                    color: isActive ? 'rgba(252,251,248,0.8)' : 'rgba(75,13,36,0.72)',
                  }}
                >
                  {phase.description}
                </p>

                <dl
                  className="mt-5 pt-4 space-y-2.5 text-xs leading-relaxed"
                  style={{
                    borderTop: `1px solid ${isActive ? 'rgba(252,251,248,0.16)' : 'var(--color-line)'}`,
                    color: isActive ? 'rgba(252,251,248,0.85)' : 'rgba(75,13,36,0.78)',
                  }}
                >
                  <div className="flex gap-2">
                    <UserRound size={14} aria-hidden="true" className="shrink-0 mt-0.5" />
                    <dt className="font-bold shrink-0">Owner:</dt>
                    <dd>{phase.owner}</dd>
                  </div>
                  <div className="flex gap-2">
                    <FileCheck2 size={14} aria-hidden="true" className="shrink-0 mt-0.5" />
                    <dt className="font-bold shrink-0">Exit evidence:</dt>
                    <dd>{phase.exitEvidence}</dd>
                  </div>
                </dl>
              </li>
            )
          })}
        </ol>

        <Link
          href="/how-it-works"
          className="inline-flex items-center gap-2 mt-10 text-sm font-semibold"
          style={{ color: 'var(--color-wine)' }}
        >
          See every stage and what each one produces
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
