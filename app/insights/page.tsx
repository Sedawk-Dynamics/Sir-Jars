import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import InsightList from '@/components/insight-list'
import EnquiryBlock from '@/components/enquiry-block'
import BackToHome from '@/components/back-to-home'

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
        intro="Practical ideas to help you publish, create, build, organise, learn and protect what matters. Each article gives you a useful next step."
        breadcrumbs={[{ label: 'Insights', href: '/insights' }]}
        image={null}
        pattern="waves"
      />

      <section className="py-10 lg:py-14" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <InsightList layout="rows" />
        </div>
      </section>

      <EnquiryBlock />

      <BackToHome />
    </>
  )
}
