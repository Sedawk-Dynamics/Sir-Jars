import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/home/hero'
import CapabilityCards from '@/components/capability-cards'
import WhySixJars from '@/components/home/why-six-jars'
import PhaseRail from '@/components/home/phase-rail'
import ClosingCta from '@/components/home/closing-cta'
import InsightList from '@/components/insight-list'

/**
 * Homepage order, per the review:
 *   hero → commitments rail → six capability routes → why → three-phase
 *   model → insights → short contact CTA.
 *
 * Full mission and vision text lives on /about; the six operational stages on
 * /how-it-works.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityCards />
      <WhySixJars />
      <PhaseRail />

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
