import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import InsightList from '@/components/insight-list'
import ClosingCta from '@/components/home/closing-cta'

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Short articles on publishing, media, digital systems, business operations, skills and security — each with a practical place to start.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Useful ideas for the work in front of you."
        intro="Short articles on publishing, media, digital systems, business operations, skills and security. Each one looks at a familiar problem and gives you a practical place to start."
        breadcrumbs={[{ label: 'Insights', href: '/insights' }]}
        image="/images/insights-editorial.png"
        imageAlt="A colleague reviewing research material at a desk."
        pattern="waves"
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
