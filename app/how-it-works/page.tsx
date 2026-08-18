import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import PageHeader from '@/components/page-header'
import ClosingCta from '@/components/home/closing-cta'
import { phases } from '@/lib/content'

export const metadata: Metadata = {
  title: 'How it works — Understand, Execute, Prove',
  description:
    'Three phases on the surface, six operational stages underneath: Discover, Assess, Govern, Deliver, Validate and Evolve — and what each one produces.',
  alternates: { canonical: '/how-it-works' },
}

/**
 * The full six-stage model. The homepage shows the three phases; every
 * operational stage and its outputs live here, on a route that can be linked.
 */
export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="Understand. Execute. Prove."
        intro="Authorisation is documented before work begins, governance is established before delivery, and evidence is documented before an engagement closes."
        breadcrumbs={[{ label: 'How it works', href: '/how-it-works' }]}
      />

      <div style={{ background: 'var(--color-ivory)' }}>
        {phases.map((phase, phaseIndex) => (
          <section
            key={phase.slug}
            id={phase.slug}
            className="py-16 lg:py-20"
            style={{
              background:
                phaseIndex % 2 === 1 ? 'var(--color-parchment)' : 'var(--color-ivory)',
            }}
          >
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p
                  className="text-xs font-bold tracking-[0.18em] uppercase"
                  style={{ color: 'var(--color-wine)' }}
                >
                  Phase {phaseIndex + 1} of 3
                </p>
                <h2
                  className="mt-3 font-extrabold tracking-tight leading-tight"
                  style={{
                    color: 'var(--color-plum)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                  }}
                >
                  {phase.name}
                </h2>
                <p
                  className="mt-3 text-lg font-semibold"
                  style={{ color: 'var(--color-wine)' }}
                >
                  {phase.headline}
                </p>
                <p
                  className="mt-3 text-base leading-relaxed"
                  style={{ color: 'rgba(75,13,36,0.72)' }}
                >
                  {phase.description}
                </p>
              </div>

              <ol className="grid md:grid-cols-2 gap-5 mt-10">
                {phase.stages.map((stage) => (
                  <li
                    key={stage.number}
                    id={`stage-${stage.number}`}
                    className="rounded-2xl p-6 lg:p-7"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--color-line)',
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-2xl font-black leading-none"
                        style={{ color: 'rgba(112,13,44,0.28)' }}
                      >
                        {stage.number}
                      </span>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: 'var(--color-plum)' }}
                      >
                        {stage.name}
                      </h3>
                    </div>
                    <p
                      className="text-sm leading-relaxed mt-4"
                      style={{ color: 'rgba(75,13,36,0.72)' }}
                    >
                      {stage.description}
                    </p>

                    <h4
                      className="text-[11px] font-bold tracking-[0.16em] uppercase mt-6 mb-3"
                      style={{ color: 'var(--color-wine)' }}
                    >
                      Key outputs
                    </h4>
                    <ul className="space-y-2">
                      {stage.outputs.map((output) => (
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
        ))}
      </div>

      <ClosingCta />
    </>
  )
}
