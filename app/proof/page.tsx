import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import EvidenceDrawer from '@/components/evidence-drawer'
import ClosingCta from '@/components/home/closing-cta'
import { commitments, engagements } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Proof — engagement examples and our evidence model',
  description:
    'How Six Jars documents scope, controls, artefacts and outcomes — plus illustrative engagement examples showing the shape of the work.',
  alternates: { canonical: '/proof' },
}

/**
 * Proof sits before Insights and before Contact, because institutional buyers
 * need evidence before they submit sensitive or high-value work.
 *
 * Nothing on this page presents an unverified number as a result. Operating
 * commitments are labelled as commitments; engagement examples are labelled as
 * examples. Named case studies appear only once a client approves them.
 */
export default function ProofPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proof"
        title="Evidence at close, not a summary."
        intro="Every engagement ends with documented scope, the controls that applied, the artefacts produced and a plainly-stated outcome — separating what was done from what was intended."
        breadcrumbs={[{ label: 'Proof', href: '/proof' }]}
      />

      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--color-plum)' }}
          >
            Our operating commitments
          </h2>
          <p
            className="mt-3 text-base leading-relaxed max-w-2xl"
            style={{ color: 'rgba(75,13,36,0.72)' }}
          >
            These are commitments we hold ourselves to on every engagement. They are not
            measured performance claims, and we label them that way deliberately.
          </p>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {commitments.map((c) => (
              <li
                key={c.title}
                className="rounded-2xl p-6"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--color-line)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex w-9 h-9 rounded-full items-center justify-center text-sm font-bold mb-4"
                  style={{
                    background: 'var(--color-wine)',
                    color: 'var(--color-ivory)',
                  }}
                >
                  {c.mark}
                </span>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-plum)' }}>
                  {c.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mt-2"
                  style={{ color: 'rgba(75,13,36,0.68)' }}
                >
                  {c.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="py-16 lg:py-24"
        style={{ background: 'var(--color-parchment)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: 'var(--color-plum)' }}
          >
            Engagement examples
          </h2>
          <p
            className="mt-3 text-base leading-relaxed max-w-2xl mb-8"
            style={{ color: 'rgba(75,13,36,0.72)' }}
          >
            Illustrative composites drawn from the shape of our work. They carry no client
            names and no performance figures. Expand any one to see the scope, the controls
            that applied, the artefacts produced and the outcome at close.
          </p>

          <div className="grid gap-5">
            {engagements.map((engagement) => (
              <EvidenceDrawer key={engagement.slug} engagement={engagement} />
            ))}
          </div>

          <div
            className="mt-10 rounded-2xl p-6"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-line)',
            }}
          >
            <h3 className="text-base font-bold" style={{ color: 'var(--color-plum)' }}>
              On verified case studies
            </h3>
            <p
              className="text-sm leading-relaxed mt-2"
              style={{ color: 'rgba(75,13,36,0.72)' }}
            >
              We publish a named case study only when the client has approved the text in
              writing and the figures in it have been verified. Until then, we would rather
              show you the structure of the work honestly than dress an example up as a
              result. If you need references for due diligence, ask — we will arrange them
              directly.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
