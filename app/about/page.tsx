import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import EnquiryBlock from '@/components/enquiry-block'
import BackToHome from '@/components/back-to-home'
import FounderSection from '@/components/founder-section'
import MissionValues from '@/components/mission-values'
import { org } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — Capability, made accountable',
  description:
    'Six Jars Global brings six connected services together for individuals, organisations, educators and communities. Our mission, vision, values and promise.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Capability, made accountable."
        intro="Six Jars Global brings six connected services together for individuals, organisations, educators and communities. Start with one service or combine the support your goal needs."
        breadcrumbs={[{ label: 'About', href: '/about' }]}
        image={null}
        pattern="circuit"
      />

      {/* Mission, vision and values. */}
      <MissionValues />

      <section className="py-10 lg:py-12" style={{ background: 'var(--color-parchment)' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="pl-5" style={{ borderLeft: '3px solid var(--color-gold)' }}>
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-plum)' }}
            >
              Our promise
            </h2>
            <p
              className="mt-3 text-base lg:text-lg leading-relaxed"
              style={{ color: 'rgba(0,0,0,0.8)' }}
            >
              You have one person to contact throughout the project. They coordinate the
              specialists, keep decisions clear and make sure you receive the finished work
              and its supporting records.
            </p>
          </div>
        </div>
      </section>

      <FounderSection />

      <section
        className="py-10 lg:py-12"
        style={{ background: 'var(--color-parchment)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold tracking-tight mb-8"
            style={{ color: 'var(--color-plum)' }}
          >
            Company details
          </h2>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { term: 'Legal name', detail: org.legalName },
              { term: 'Registered office', detail: org.registeredOffice },
              { term: 'GSTIN', detail: org.gstin },
              ...(org.cin ? [{ term: 'CIN', detail: org.cin }] : []),
              { term: 'Customer care', detail: `${org.email} · ${org.phone}` },
              { term: 'Grievance officer', detail: `${org.grievanceOfficer} · ${org.privacyEmail}` },
            ].map((row) => (
              <div
                key={row.term}
                className="rounded-2xl p-5"
                style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
              >
                <dt
                  className="text-[11px] font-bold tracking-[0.16em] uppercase"
                  style={{ color: 'var(--color-wine)' }}
                >
                  {row.term}
                </dt>
                <dd
                  className="text-sm leading-relaxed mt-2"
                  style={{ color: 'rgba(0,0,0,0.78)' }}
                >
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <EnquiryBlock />

      <BackToHome />
    </>
  )
}
