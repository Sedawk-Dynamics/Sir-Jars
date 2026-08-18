import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/hero'
import CapabilityCards from '@/components/capability-cards'
import WhySixJars from '@/components/home/why-six-jars'
import PhaseRail from '@/components/home/phase-rail'
import ClosingCta from '@/components/home/closing-cta'
import EvidenceDrawer from '@/components/evidence-drawer'
import InsightList from '@/components/insight-list'
import { engagements } from '@/lib/content'

/**
 * Homepage order, per the review:
 *   hero → proof rail → six capability routes → why → three-phase model
 *   → verified work → insights → short contact CTA.
 *
 * The proof rail is part of <Hero>, so evidence is on screen before the
 * visitor is ever asked for anything. Full mission and vision text moved to
 * /about; the six operational stages moved to /how-it-works.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityCards />
      <WhySixJars />
      <PhaseRail />

      {/* Proof before the ask. Labelled as engagement examples, not as
          case studies, until a client approves publication. */}
      <section id="proof" className="py-20 lg:py-28" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-wine)' }}
            >
              Proof
            </p>
            <h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{
                color: 'var(--color-plum)',
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              }}
            >
              What an engagement actually produces.
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'rgba(75,13,36,0.72)' }}
            >
              These are illustrative engagement examples showing the shape of the work —
              scope, controls, artefacts and outcome. Named client case studies are
              published only with written approval and verified figures.
            </p>
          </div>

          <div className="grid gap-5">
            {engagements.slice(0, 2).map((engagement) => (
              <EvidenceDrawer key={engagement.slug} engagement={engagement} />
            ))}
          </div>

          <Link
            href="/proof"
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold"
            style={{ color: 'var(--color-wine)' }}
          >
            See all engagement examples and our evidence model
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section
        id="insights"
        className="py-20 lg:py-28"
        style={{ background: 'var(--color-parchment)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-wine)' }}
              >
                Insights
              </p>
              <h2
                className="mt-3 font-extrabold tracking-tight leading-tight"
                style={{
                  color: 'var(--color-plum)',
                  fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                }}
              >
                Practical insight across the six routes.
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
              style={{ color: 'var(--color-wine)' }}
            >
              All articles
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <InsightList filterable={false} />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
