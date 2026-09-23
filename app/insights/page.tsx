import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import InsightList from '@/components/insight-list'
import ClosingCta from '@/components/home/closing-cta'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Practical insight on governed publishing, security baselines, AI oversight and evidence discipline for organizations with complex, high-stakes work.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Practical insight across the six routes."
        intro="Written for the people who have to make these decisions inside an institution — not for a search engine."
        breadcrumbs={[{ label: 'Insights', href: '/insights' }]}
      />

      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <InsightList />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
