'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { capabilities } from '@/lib/content'

/**
 * The six-capability orbit.
 *
 * Accessibility contract, from the review:
 *  - The instruction reads "Select a capability", never "Hover over any node".
 *    Touch users cannot hover, so hover is an enhancement and never the only
 *    way to reach the content.
 *  - Nodes are real buttons: pointer, tap, keyboard focus and screen readers
 *    all reach them, and arrow keys move between them like a toolbar.
 *  - One shared detail panel, always rendered. Nothing is revealed only on
 *    hover, and the panel starts populated so the first paint is not empty.
 *  - Each panel state carries a real link to that capability page.
 */

const RADIUS = 38 // percent of the container, from centre

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + RADIUS * Math.cos(angle)}%`,
    top: `${50 + RADIUS * Math.sin(angle)}%`,
  }
}

export default function CapabilityOrbit({
  variant = 'dark',
}: {
  variant?: 'dark' | 'light'
}) {
  const [selected, setSelected] = useState(0)
  const active = capabilities[selected]
  const isDark = variant === 'dark'

  const ink = isDark ? '#FCFBF8' : '#4B0D24'
  const nodeBg = isDark ? 'rgba(135,33,67,0.9)' : '#FFFFFF'
  const nodeBorder = isDark ? 'rgba(241,181,59,0.4)' : 'rgba(112,13,44,0.2)'

  const onKeyDown = (e: React.KeyboardEvent) => {
    const total = capabilities.length
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((i) => (i + 1) % total)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((i) => (i - 1 + total) % total)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setSelected(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setSelected(total - 1)
    }
  }

  return (
    <div className="w-full">
      <div className="relative w-full max-w-[440px] mx-auto aspect-square">
        {/* Orbit ring and spokes. Decorative — the buttons carry the meaning. */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke={isDark ? 'rgba(241,181,59,0.28)' : 'rgba(112,13,44,0.18)'}
            strokeWidth="0.4"
          />
          {capabilities.map((c, i) => {
            const angle = (i / capabilities.length) * Math.PI * 2 - Math.PI / 2
            return (
              <line
                key={c.slug}
                x1="50"
                y1="50"
                x2={50 + RADIUS * Math.cos(angle)}
                y2={50 + RADIUS * Math.sin(angle)}
                stroke={
                  i === selected
                    ? 'rgba(241,181,59,0.75)'
                    : isDark
                      ? 'rgba(241,181,59,0.16)'
                      : 'rgba(112,13,44,0.12)'
                }
                strokeWidth={i === selected ? '0.5' : '0.3'}
              />
            )
          })}
        </svg>

        {/* Hub */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-center"
          style={{
            width: '27%',
            height: '27%',
            background: 'var(--color-gold)',
            color: 'var(--color-plum)',
            boxShadow: '0 0 40px rgba(241,181,59,0.35)',
          }}
          aria-hidden="true"
        >
          <span className="text-[11px] sm:text-xs font-extrabold leading-tight tracking-tight">
            SIX
            <br />
            JARS
          </span>
        </div>

        {/* Nodes — a roving-tabindex group, so the orbit is one tab stop. */}
        <div
          role="tablist"
          aria-label="Select a capability"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="absolute inset-0"
        >
          {capabilities.map((c, i) => {
            const pos = nodePosition(i, capabilities.length)
            const isSelected = i === selected
            return (
              <button
                key={c.slug}
                type="button"
                role="tab"
                id={`orbit-tab-${c.slug}`}
                aria-selected={isSelected}
                aria-controls="orbit-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onMouseEnter={() => setSelected(i)}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center transition-all duration-300"
                style={{
                  ...pos,
                  width: 72,
                  height: 72,
                  background: isSelected ? 'var(--color-gold)' : nodeBg,
                  color: isSelected ? 'var(--color-plum)' : ink,
                  border: `1px solid ${isSelected ? 'var(--color-gold)' : nodeBorder}`,
                  boxShadow: isSelected
                    ? '0 0 28px rgba(241,181,59,0.45)'
                    : '0 2px 12px rgba(75,13,36,0.18)',
                  transform: `translate(-50%, -50%) scale(${isSelected ? 1.08 : 1})`,
                }}
              >
                <span className="text-[9px] font-bold opacity-60 leading-none">
                  {c.number}
                </span>
                <span className="text-[10px] font-bold leading-tight mt-1 px-1 text-center">
                  {c.shortName}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* One shared detail panel. Always present, never hover-gated. */}
      <div
        id="orbit-panel"
        role="tabpanel"
        aria-labelledby={`orbit-tab-${active.slug}`}
        tabIndex={0}
        className="mt-6 rounded-2xl p-5 sm:p-6"
        style={{
          background: isDark ? 'rgba(252,251,248,0.07)' : '#FFFFFF',
          border: `1px solid ${isDark ? 'rgba(241,181,59,0.22)' : 'var(--color-line)'}`,
        }}
      >
        <p
          className="text-[11px] font-bold tracking-widest uppercase"
          style={{ color: isDark ? 'var(--color-gold)' : 'var(--color-wine)' }}
        >
          {active.number} · {active.cue}
        </p>
        <h3
          className="text-lg font-bold mt-1.5"
          style={{ color: ink }}
        >
          {active.fullName}
        </h3>
        <p
          className="text-sm leading-relaxed mt-2"
          style={{ color: isDark ? 'rgba(252,251,248,0.72)' : 'rgba(75,13,36,0.72)' }}
        >
          {active.summary}
        </p>
        <p
          className="text-sm leading-relaxed mt-3 pl-3"
          style={{
            color: isDark ? 'rgba(252,251,248,0.6)' : 'rgba(75,13,36,0.62)',
            borderLeft: `2px solid ${isDark ? 'rgba(241,181,59,0.5)' : 'var(--color-gold)'}`,
          }}
        >
          <span className="font-semibold">Human review: </span>
          {active.humanReview}
        </p>
        <Link
          href={`/capabilities/${active.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold"
          style={{ color: isDark ? 'var(--color-gold)' : 'var(--color-wine)' }}
        >
          View capability
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
