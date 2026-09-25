'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * Mission, vision and values — purpose near the hero, and every value turned
 * into an observable behaviour. "Proof" reveals what a client can actually
 * see us do; the text is always in the DOM, only its visibility toggles.
 */

const values = [
  {
    name: 'Accountability',
    line: 'Name the owner.',
    proof: 'Every engagement, stage and exception has one named person. You always know who decides and who to call.',
    color: '#4B0D24',
  },
  {
    name: 'Human judgment',
    line: 'Keep people accountable.',
    proof: 'Automation assists, but a named reviewer approves every output that reaches your audience or your records.',
    color: '#4B0D24',
  },
  {
    name: 'Clarity',
    line: 'Show the next step.',
    proof: 'Every reply ends with a dated next step and who owns it — including when the answer is "not us".',
    color: '#700D2C',
  },
  {
    name: 'Responsible innovation',
    line: 'Adopt only useful change.',
    proof: 'New tools are classified as permitted, review-gated or prohibited before use, with the reasoning written down.',
    color: '#9A3070',
  },
  {
    name: 'Inclusion',
    line: 'Design for different needs.',
    proof: 'Content, training and interfaces are checked for accessibility, language and context before release.',
    color: '#9A2E4F',
  },
  {
    name: 'Proof',
    line: 'Separate fact from ambition.',
    proof: 'Close-out packs label what was verified and what is still intended. Commitments are never shown as results.',
    color: '#E0A526',
  },
]

export default function MissionValues() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-start">
          {/* Mission and vision */}
          <div
            className="on-dark rounded-3xl p-8 lg:p-10 flex flex-col justify-between lg:min-h-full lg:self-stretch"
            style={{ background: '#3A0A24' }}
          >
            <div>
              <h2
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                Mission
              </h2>
              <p
                className="mt-5 font-semibold leading-snug"
                style={{
                  color: 'var(--color-ivory)',
                  fontFamily: 'var(--font-source-serif)',
                  fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                }}
              >
                Turn complex work into clear, secure and measurable outcomes through
                coordinated expertise, practical technology and responsible execution.
              </p>
            </div>
            <div className="mt-12">
              <h2
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                Vision
              </h2>
              <p
                className="mt-3 text-base leading-relaxed"
                style={{ color: 'rgba(252,251,248,0.82)' }}
              >
                A world where every organization and learner can access the skills, systems
                and safeguards needed to adapt, grow and create lasting value.
              </p>
            </div>
          </div>

          {/* Values as observable behaviours */}
          <div>
            <h2
              className="text-xs font-bold tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--color-wine)' }}
            >
              Values you can observe
            </h2>
            <ul className="grid sm:grid-cols-2 gap-5">
              {values.map((v) => {
                const isOpen = open === v.name
                const panelId = `value-${v.name.toLowerCase().replace(/\s+/g, '-')}`
                return (
                  <li
                    key={v.name}
                    className="flex flex-col rounded-2xl p-5 transition-shadow duration-200 hover:shadow-md"
                    style={{ background: '#FFFFFF', border: `2px solid ${v.color}` }}
                  >
                    <h3 className="text-base font-bold" style={{ color: 'var(--color-plum)' }}>
                      {v.name}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(75,13,36,0.8)' }}>
                      {v.line}
                    </p>
                    <p
                      id={panelId}
                      hidden={!isOpen}
                      className="mt-3 pt-3 text-sm leading-relaxed"
                      style={{ borderTop: '1px solid var(--color-line)', color: 'rgba(75,13,36,0.78)' }}
                    >
                      {v.proof}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : v.name)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="mt-3 self-end inline-flex items-center gap-1 text-xs font-semibold"
                      style={{ color: 'var(--color-wine)', minHeight: 28 }}
                    >
                      {isOpen ? 'hide proof' : 'proof'}
                      <ArrowRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform duration-200"
                        style={{ transform: isOpen ? 'rotate(90deg)' : undefined }}
                      />
                      <span className="sr-only"> for {v.name}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
