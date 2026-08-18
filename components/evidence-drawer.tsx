'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Engagement } from '@/lib/content'

/**
 * Evidence drawer: scope, controls, artefacts and outcome for one engagement.
 *
 * Uses a native disclosure pattern (button + aria-expanded + aria-controls)
 * rather than a hover reveal, so it works on touch, keyboard and screen
 * readers identically. The collapsed content is present in the DOM, which
 * also keeps it crawlable.
 */
export default function EvidenceDrawer({
  engagement,
  variant = 'light',
}: {
  engagement: Engagement
  variant?: 'light' | 'dark'
}) {
  const [open, setOpen] = useState(false)
  const isDark = variant === 'dark'
  const panelId = `evidence-${engagement.slug}`

  const ink = isDark ? 'var(--color-ivory)' : 'var(--color-plum)'
  const muted = isDark ? 'rgba(252,251,248,0.68)' : 'rgba(75,13,36,0.68)'
  const accent = isDark ? 'var(--color-gold)' : 'var(--color-wine)'

  const groups: { label: string; items: string[] }[] = [
    { label: 'Scope', items: engagement.scope },
    { label: 'Controls', items: engagement.controls },
    { label: 'Artefacts produced', items: engagement.artefacts },
  ]

  return (
    <article
      className="rounded-2xl overflow-hidden"
      style={{
        background: isDark ? 'rgba(252,251,248,0.05)' : '#FFFFFF',
        border: `1px solid ${isDark ? 'rgba(252,251,248,0.12)' : 'var(--color-line)'}`,
      }}
    >
      <div className="p-6">
        <p
          className="text-[11px] font-bold tracking-[0.16em] uppercase"
          style={{ color: accent }}
        >
          {engagement.capability} · Engagement example
        </p>
        <h3 className="text-lg font-bold mt-2 leading-snug" style={{ color: ink }}>
          {engagement.title}
        </h3>
        <p className="text-sm leading-relaxed mt-3" style={{ color: muted }}>
          {engagement.context}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold rounded-lg"
          style={{ color: accent, minHeight: 44 }}
        >
          {open ? 'Hide the evidence' : 'Show scope, controls and artefacts'}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'none' }}
          />
        </button>
      </div>

      <div
        id={panelId}
        hidden={!open}
        className="px-6 pb-6"
        style={{
          borderTop: `1px solid ${isDark ? 'rgba(252,251,248,0.12)' : 'var(--color-line)'}`,
        }}
      >
        <div className="grid sm:grid-cols-3 gap-6 pt-6">
          {groups.map((group) => (
            <div key={group.label}>
              <h4
                className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3"
                style={{ color: accent }}
              >
                {group.label}
              </h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed pl-3"
                    style={{
                      color: muted,
                      borderLeft: `2px solid ${
                        isDark ? 'rgba(241,181,59,0.35)' : 'rgba(112,13,44,0.2)'
                      }`,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-6 rounded-xl p-4"
          style={{
            background: isDark ? 'rgba(241,181,59,0.1)' : 'var(--color-parchment)',
            border: `1px solid ${isDark ? 'rgba(241,181,59,0.25)' : 'var(--color-line)'}`,
          }}
        >
          <h4
            className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2"
            style={{ color: accent }}
          >
            Outcome at close
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: ink }}>
            {engagement.outcome}
          </p>
        </div>
      </div>
    </article>
  )
}
