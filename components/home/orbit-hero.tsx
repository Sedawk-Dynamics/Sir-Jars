'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Jar from '@/components/brand/jar'
import { Dove } from '@/components/brand/dove'
import { capabilities } from '@/lib/content'

/**
 * Hero orbit: six jars in continuous circular motion around a central dove.
 *
 * Motion contract
 *  - The ring carries the jars; each jar counter-rotates at the same rate so
 *    it stays upright. Both run on compositor-only transforms.
 *  - Rotation pauses on hover and on focus-within. A control drifting away
 *    from the pointer is not a control, and that pause is what lets the orbit
 *    be decorative motion AND a real navigation affordance at once.
 *  - prefers-reduced-motion collapses every animation (globals.css), leaving
 *    the jars at their laid-out positions. Nothing here gates content.
 *
 * Accessibility contract — carried over from the static orbit, with the
 * roving-tabindex focus bug fixed: arrow keys now move real DOM focus, not
 * only the selected index.
 *  - Jars are real buttons in a tablist with a roving tabindex.
 *  - One shared panel, always rendered and populated on first paint.
 *  - Every panel state carries a real link to that capability page.
 */

const RADIUS = 38 // percent of the container, from centre

/**
 * Secondary "mixed" palette: one colour per jar, all from the logo family but
 * lifted to tints that actually clear contrast on dark plum — wine and
 * burgundy at full strength disappear into the ground.
 */
const MIXED_TONES = [
  '#F1B53B', // gold
  '#FFD37A', // light gold
  '#E8A0B4', // rose tint
  '#C2506F', // rose light
  '#D9A05B', // bronze
  '#F4C9A8', // warm sand
]

const UNIFORM_TONE = '#F1B53B'

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    left: `${50 + RADIUS * Math.cos(angle)}%`,
    top: `${50 + RADIUS * Math.sin(angle)}%`,
  }
}

export default function OrbitHero({
  jars = 'uniform',
}: {
  /** 'uniform' — every jar in one logo colour. 'mixed' — one colour each. */
  jars?: 'uniform' | 'mixed'
}) {
  const [selected, setSelected] = useState(0)
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = capabilities[selected]
  const total = capabilities.length

  const toneFor = (i: number) =>
    jars === 'mixed' ? MIXED_TONES[i % MIXED_TONES.length] : UNIFORM_TONE

  // Roving tabindex: move real DOM focus, not only the selected index.
  const focusNode = (i: number) => {
    setSelected(i)
    nodeRefs.current[i]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      focusNode((selected + 1) % total)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      focusNode((selected - 1 + total) % total)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusNode(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusNode(total - 1)
    }
  }

  return (
    <div className="w-full">
      <div className="orbit-stage relative w-full max-w-[480px] mx-auto aspect-square">
        {/* ── Decorative rings. The dashed ring counter-rotates against the
            jars, which is what gives the scene depth rather than a flat spin. */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="orbit-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F1B53B" stopOpacity="0.20" />
              <stop offset="60%" stopColor="#872143" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#4B0D24" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="50" cy="50" r="46" fill="url(#orbit-core-glow)" />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="rgba(241,181,59,0.30)"
            strokeWidth="0.35"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS - 8}
            fill="none"
            stroke="rgba(252,251,248,0.10)"
            strokeWidth="0.3"
          />
          <g className="orbit-ring-dashed" style={{ transformOrigin: '50px 50px' }}>
            <circle
              cx="50"
              cy="50"
              r={RADIUS + 7}
              fill="none"
              stroke="rgba(241,181,59,0.22)"
              strokeWidth="0.3"
              strokeDasharray="1.4 3.2"
            />
          </g>
        </svg>

        {/* ── Centre: the secular dove — simplified, no leaf. ─────────── */}
        <div
          className="orbit-core absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center text-center"
          style={{ width: '31%', height: '31%' }}
          aria-hidden="true"
        >
          <Dove size={46} tone="var(--color-gold)" flap />
          <span
            className="mt-1.5 text-[8px] sm:text-[9px] font-extrabold tracking-[0.16em] leading-tight"
            style={{ color: 'rgba(252,251,248,0.72)' }}
          >
            ACCOUNTABLE
            <br />
            DELIVERY
          </span>
        </div>

        {/* ── Orbiting jars ───────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Select a capability"
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="orbit-spin absolute inset-0"
        >
          {capabilities.map((c, i) => {
            const pos = nodePosition(i, total)
            const isSelected = i === selected
            const tone = toneFor(i)
            return (
              <div
                key={c.slug}
                className="absolute"
                style={{ ...pos, transform: 'translate(-50%, -50%)' }}
              >
                {/* Counter-rotation: the jar stays upright as the ring turns. */}
                <div className="orbit-spin-rev">
                  <button
                    type="button"
                    role="tab"
                    ref={(el) => {
                      nodeRefs.current[i] = el
                    }}
                    id={`orbit-tab-${c.slug}`}
                    aria-selected={isSelected}
                    aria-controls="orbit-panel"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => setSelected(i)}
                    onFocus={() => setSelected(i)}
                    className="flex flex-col items-center justify-center rounded-full transition-[background,border-color,box-shadow,transform] duration-300"
                    style={{
                      width: 74,
                      height: 74,
                      background: isSelected
                        ? 'rgba(241,181,59,0.16)'
                        : 'rgba(20,3,10,0.55)',
                      backdropFilter: 'blur(6px)',
                      WebkitBackdropFilter: 'blur(6px)',
                      border: `1px solid ${isSelected ? tone : 'rgba(241,181,59,0.26)'}`,
                      boxShadow: isSelected
                        ? `0 0 30px ${tone}59`
                        : '0 4px 18px rgba(20,3,10,0.45)',
                      transform: `scale(${isSelected ? 1.1 : 1})`,
                    }}
                  >
                    <Jar size={26} tone={tone} />
                    <span
                      className="mt-1 text-[9px] font-bold leading-tight px-1.5 text-center"
                      style={{
                        color: isSelected
                          ? 'var(--color-ivory)'
                          : 'rgba(252,251,248,0.8)',
                      }}
                    >
                      {c.shortName}
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Shared detail panel. Always present, never hover-gated. ───── */}
      <div
        id="orbit-panel"
        role="tabpanel"
        aria-labelledby={`orbit-tab-${active.slug}`}
        tabIndex={0}
        className="mt-6 rounded-2xl p-5 sm:p-6"
        style={{
          background: 'rgba(20,3,10,0.58)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(241,181,59,0.24)',
        }}
      >
        <p
          className="text-[11px] font-bold tracking-widest uppercase"
          style={{ color: 'var(--color-gold)' }}
        >
          {active.number} · {active.cue}
        </p>
        <h3 className="text-lg font-bold mt-1.5" style={{ color: 'var(--color-ivory)' }}>
          {active.fullName}
        </h3>
        <p
          className="text-sm leading-relaxed mt-2"
          style={{ color: 'rgba(252,251,248,0.72)' }}
        >
          {active.summary}
        </p>
        <Link
          href={`/capabilities/${active.slug}`}
          className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold"
          style={{ color: 'var(--color-gold)' }}
        >
          View capability
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
