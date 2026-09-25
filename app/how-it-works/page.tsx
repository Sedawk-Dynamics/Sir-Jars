import type { Metadata } from 'next'
import { Check, FileCheck2, UserRound } from 'lucide-react'
import PageHeader from '@/components/page-header'
import ClosingCta from '@/components/home/closing-cta'
import { phases } from '@/lib/content'

export const metadata: Metadata = {
  title: 'How it works — Understand, Plan, Execute, Review, Validate, Improve',
  description:
    'Six stages — Understand, Plan, Execute, Review, Validate and Improve — each with a named owner and the exit evidence that closes it.',
  alternates: { canonical: '/how-it-works' },
}

/**
 * The full six-stage model. Every stage states its accountable owner, the
 * evidence required to exit it, and what it produces.
 */
export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Clear scope. Coordinated delivery. Evidence at close."
        intro="Understand → Plan → Execute → Review → Validate → Improve. Every stage has a named owner and cannot close until its exit evidence exists."
        breadcrumbs={[{ label: 'How it works', href: '/how-it-works' }]}
        image="/images/publishing-ops.png"
        imageAlt="A team reviewing work together at a shared desk."
        pattern="grid"
      />

      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <ol className="grid md:grid-cols-2 gap-6">
            {phases.map((phase) => (
              <li
                key={phase.slug}
                id={phase.slug}
                className="flex flex-col rounded-2xl p-6 lg:p-8 scroll-mt-24"
                style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.18em] uppercase"
                      style={{ color: 'var(--color-rose)' }}
                    >
                      Phase {phase.number}
                    </p>
                    <h2
                      className="text-2xl font-extrabold tracking-tight mt-1"
                      style={{ color: 'var(--color-plum)' }}
                    >
                      {phase.name}
                    </h2>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-5xl font-black leading-none tabular-nums"
                    style={{ color: 'rgba(112,13,44,0.14)' }}
                  >
                    {phase.number}
                  </span>
                </div>

                <p
                  className="mt-3 text-base font-bold leading-snug"
                  style={{ color: 'var(--color-wine)' }}
                >
                  {phase.headline}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'rgba(75,13,36,0.72)' }}
                >
                  {phase.description}
                </p>

                <dl
                  className="mt-5 grid sm:grid-cols-2 gap-3 text-sm"
                  style={{ color: 'rgba(75,13,36,0.8)' }}
                >
                  <div className="rounded-xl p-3.5" style={{ background: 'var(--color-parchment)' }}>
                    <dt
                      className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                      style={{ color: 'var(--color-wine)' }}
                    >
                      <UserRound size={13} aria-hidden="true" /> Named owner
                    </dt>
                    <dd className="mt-1">{phase.owner}</dd>
                  </div>
                  <div className="rounded-xl p-3.5" style={{ background: 'var(--color-parchment)' }}>
                    <dt
                      className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                      style={{ color: 'var(--color-wine)' }}
                    >
                      <FileCheck2 size={13} aria-hidden="true" /> Exit evidence
                    </dt>
                    <dd className="mt-1">{phase.exitEvidence}</dd>
                  </div>
                </dl>

                <h3
                  className="text-[11px] font-bold tracking-[0.16em] uppercase mt-6 mb-3"
                  style={{ color: 'var(--color-wine)' }}
                >
                  Key outputs
                </h3>
                <ul className="space-y-2">
                  {phase.outputs.map((output) => (
                    <li key={output} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        aria-hidden="true"
                        className="mt-0.5 shrink-0"
                        style={{ color: 'var(--color-rose)' }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(75,13,36,0.75)' }}
                      >
                        {output}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
