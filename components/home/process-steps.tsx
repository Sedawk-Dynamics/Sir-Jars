import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const steps = [
  { name: 'Understand', detail: 'Your goal and point of contact' },
  { name: 'Plan', detail: 'Agreed plan and approvals' },
  { name: 'Execute', detail: 'Coordinated delivery' },
  { name: 'Review', detail: 'Human review' },
  { name: 'Validate', detail: 'Checked handover' },
  { name: 'Improve', detail: 'Review and next steps' },
]

/** How it works — six numbered steps, all visible without interaction. */
export default function ProcessSteps() {
  return (
    <section id="how-we-work" className="py-20 lg:py-28" style={{ background: 'var(--color-ivory)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <p
          className="text-xs font-bold tracking-[0.18em] uppercase"
          style={{ color: 'var(--color-wine)' }}
        >
          How it works
        </p>
        <h2
          className="mt-3 font-bold tracking-tight leading-tight max-w-3xl"
          style={{ color: 'var(--color-plum)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          A clear plan from first conversation to handover
        </h2>

        <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, i) => (
            <li
              key={step.name}
              className="rounded-2xl p-5"
              style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
            >
              <span
                aria-hidden="true"
                className="inline-flex w-9 h-9 rounded-full items-center justify-center text-sm font-bold"
                style={{ background: 'var(--color-plum)', color: 'var(--color-gold)' }}
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                {step.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.75)' }}>
                {step.detail}
              </p>
            </li>
          ))}
        </ol>

        <Link
          href="/how-it-works"
          className="group mt-10 inline-flex items-center gap-2 px-7 rounded-full text-base font-bold"
          style={{ minHeight: 52, background: 'var(--color-wine)', color: '#FFFFFF' }}
        >
          See how it works
          <ArrowRight
            size={17}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  )
}
