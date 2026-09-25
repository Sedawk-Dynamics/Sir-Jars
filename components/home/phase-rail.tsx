'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileCheck2, UserRound } from 'lucide-react'
import { phases } from '@/lib/content'

/** One brand tone per stage, dark to light across the path. */
const stageColors = ['#3A0A24', '#6A1438', '#5E0F1E', '#5C2548', '#9A3070', '#8E2640']

/**
 * Delivery path: Understand → Plan → Execute → Review → Validate → Improve.
 *
 * Six numbered stops on one gold line. Selecting a stop shows its headline,
 * named owner and exit evidence underneath.
 *
 * Motion contract: every stage, label and caption is in the DOM from first
 * paint. The only animation is the gold line drawing across once the section
 * scrolls into view. Reduced-motion and no-JS visitors get the finished line.
 */
export default function PhaseRail() {
  const [selected, setSelected] = useState(0)
  const [drawn, setDrawn] = useState(false)
  const railRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true)
      return
    }
    const el = railRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const active = phases[selected]

  return (
    <section
      id="how-we-work"
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-parchment)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
          style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(75,13,36,0.55)',
          }}
        >
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-wine)' }}
          >
            How it works
          </p>
          <h2
            className="mt-3 font-semibold tracking-tight leading-tight"
            style={{
              color: 'var(--color-plum)',
              fontFamily: 'var(--font-source-serif)',
              fontSize: 'clamp(1.75rem, 3.6vw, 2.5rem)',
            }}
          >
            A visible delivery path with named ownership
          </h2>

          {/* ── The path ─────────────────────────────────────────────── */}
          <ol
            ref={railRef}
            className="relative mt-12 lg:mt-16 grid gap-8 lg:gap-0 lg:grid-cols-6"
          >
            {/* Gold line — vertical on mobile, horizontal from the first
                circle's centre to the last one's on desktop. */}
            <span
              aria-hidden="true"
              className="absolute left-7 top-7 bottom-7 w-1 rounded-full lg:hidden"
              style={{
                background: 'var(--color-gold)',
                transformOrigin: 'top',
                transform: drawn ? 'scaleY(1)' : 'scaleY(0)',
                transition: 'transform 1.2s cubic-bezier(.2,.7,.2,1)',
              }}
            />
            <span
              aria-hidden="true"
              className="hidden lg:block absolute top-[34px] h-1 rounded-full"
              style={{
                left: 'calc(100% / 12)',
                right: 'calc(100% / 12)',
                background: 'var(--color-gold)',
                transformOrigin: 'left',
                transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 1.4s cubic-bezier(.2,.7,.2,1)',
              }}
            />

            {phases.map((phase, i) => {
              const isSelected = i === selected
              return (
                <li
                  key={phase.slug}
                  className="relative flex lg:flex-col items-center gap-5 lg:gap-0 lg:text-center"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={isSelected}
                    aria-label={`Stage ${i + 1}: ${phase.name}. Show owner and exit evidence.`}
                    className="relative z-10 shrink-0 inline-flex items-center justify-center w-14 h-14 lg:w-[72px] lg:h-[72px] rounded-full text-xl lg:text-2xl font-bold transition-transform duration-200 hover:scale-105 focus-visible:outline-offset-4"
                    style={{
                      background: stageColors[i],
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-source-serif)',
                      border: '3px solid var(--color-gold)',
                      boxShadow: isSelected
                        ? '0 0 0 5px rgba(241,181,59,0.35), 0 12px 24px -10px rgba(75,13,36,0.6)'
                        : '0 6px 14px -8px rgba(75,13,36,0.5)',
                    }}
                  >
                    {i + 1}
                  </button>
                  <div className="lg:mt-5">
                    <h3
                      className="text-base font-bold"
                      style={{ color: 'var(--color-plum)' }}
                    >
                      {phase.name}
                    </h3>
                    <p
                      className="text-sm mt-1"
                      style={{ color: 'rgba(75,13,36,0.7)' }}
                    >
                      {phase.short}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* ── Selected stage detail ───────────────────────────────── */}
          <div
            aria-live="polite"
            className="mt-12 grid md:grid-cols-[1.4fr_1fr] gap-6 rounded-2xl p-6 lg:p-7"
            style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-line)' }}
          >
            <div>
              <p
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-rose)' }}
              >
                Phase {active.number} · {active.name}
              </p>
              <p
                className="mt-2 text-lg font-bold leading-snug"
                style={{ color: 'var(--color-plum)' }}
              >
                {active.headline}
              </p>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'rgba(75,13,36,0.75)' }}
              >
                {active.description}
              </p>
            </div>
            <dl className="space-y-3 text-sm" style={{ color: 'rgba(75,13,36,0.82)' }}>
              <div className="rounded-xl p-3.5" style={{ background: '#FFFFFF' }}>
                <dt
                  className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: 'var(--color-wine)' }}
                >
                  <UserRound size={13} aria-hidden="true" /> Named owner
                </dt>
                <dd className="mt-1">{active.owner}</dd>
              </div>
              <div className="rounded-xl p-3.5" style={{ background: '#FFFFFF' }}>
                <dt
                  className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: 'var(--color-wine)' }}
                >
                  <FileCheck2 size={13} aria-hidden="true" /> Exit evidence
                </dt>
                <dd className="mt-1">{active.exitEvidence}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--color-wine)' }}
          >
            See every stage and what each one produces
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <p className="text-xs" style={{ color: 'rgba(75,13,36,0.6)' }}>
            Understand → Plan → Execute → Review → Validate → Improve
          </p>
        </div>
      </div>
    </section>
  )
}
