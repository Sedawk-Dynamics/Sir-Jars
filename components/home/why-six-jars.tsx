import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const reasons = [
  {
    title: 'Context-aware, not merely low-cost',
    body: 'Sector fluency, discretion and care shape how the work is scoped — not just how cheaply it can be delivered.',
  },
  {
    title: 'Accountable, with names attached',
    body: 'One coordinating partner across six disciplines. Every approval, exception and handover has a person behind it, and you can see who.',
  },
  {
    title: 'Evidence-led at close',
    body: 'Engagements end with documented scope, controls, artefacts and outcomes — separating what was done from what was intended.',
  },
]

/** Why Six Jars — the operating advantage, stated once, without repeating
 *  the mission and vision text that now lives on About. */
export default function WhySixJars() {
  return (
    <section
      className="on-dark py-20 lg:py-28"
      style={{ background: 'var(--color-plum)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            Why Six Jars
          </p>
          <h2
            className="mt-3 font-extrabold tracking-tight leading-tight"
            style={{
              color: 'var(--color-ivory)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
            }}
          >
            The advantage is governed execution, not cheap capacity.
          </h2>
        </div>

        <ul className="grid md:grid-cols-3 gap-5 mt-12">
          {reasons.map((r, i) => (
            <li
              key={r.title}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(252,251,248,0.05)',
                border: '1px solid rgba(252,251,248,0.1)',
              }}
            >
              <span
                aria-hidden="true"
                className="block h-0.5 w-9 rounded-full mb-5"
                style={{ background: 'var(--color-gold)' }}
              />
              <h3
                className="text-base font-bold"
                style={{ color: 'var(--color-ivory)' }}
              >
                {r.title}
              </h3>
              <p
                className="text-sm leading-relaxed mt-2"
                style={{ color: 'rgba(252,251,248,0.65)' }}
              >
                {r.body}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 mt-10 text-sm font-semibold"
          style={{ color: 'var(--color-gold)' }}
        >
          Read our mission, vision and values
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
