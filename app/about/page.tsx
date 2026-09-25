import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/page-header'
import ClosingCta from '@/components/home/closing-cta'
import FounderSection from '@/components/founder-section'
import MissionValues from '@/components/mission-values'
import { org } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — Capability, made accountable',
  description:
    'Six Jars Global brings six connected capabilities under one accountable delivery model for organizations, educators and communities. Our positioning, mission, vision and brand promise.',
  alternates: { canonical: '/about' },
}

const statements = [
  {
    label: 'Positioning',
    accent: 'var(--color-wine)',
    text: 'Six Jars Global brings six connected capabilities under one accountable delivery model for organizations, educators and communities.',
  },
  {
    label: 'Brand promise',
    accent: 'var(--color-gold)',
    text: 'One named owner connects specialists, approvals, delivery and close-out evidence from brief to completion.',
  },
]

const brandLines = [
  { label: 'Master line', text: 'Capability, made accountable.' },
  { label: 'Service line', text: 'Six capabilities. One accountable partner.' },
  { label: 'Hero line', text: 'Complex work. One accountable partner.' },
  { label: 'Operational line', text: 'Clear scope. Coordinated delivery. Evidence at close.' },
  { label: 'Security line', text: 'Protect systems. Preserve evidence. Respond with clarity.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Capability, made accountable."
        intro="Six Jars Global brings six connected capabilities under one accountable delivery model for organizations, educators and communities."
        breadcrumbs={[{ label: 'About', href: '/about' }]}
        image="/images/about-bangalore.png"
        imageAlt="Bengaluru, where Six Jars Global is based."
        pattern="circuit"
      />

      {/* Purpose near the hero; values become observable behaviours. */}
      <MissionValues />

      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/about-bangalore.png"
                alt="Bangalore, where the Six Jars Global coordination hub is based."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              {statements.map((item) => (
                <div
                  key={item.label}
                  className="pl-5"
                  style={{ borderLeft: `3px solid ${item.accent}` }}
                >
                  <h2
                    className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
                    style={{ color: 'var(--color-wine)' }}
                  >
                    {item.label}
                  </h2>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'rgba(75,13,36,0.8)' }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FounderSection />

      <section
        className="on-dark py-16 lg:py-24"
        style={{ background: 'var(--color-plum)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              How we say it
            </p>
            <h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{
                color: 'var(--color-ivory)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              }}
            >
              Six capabilities. One accountable partner.
            </h2>
          </div>

          <dl className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandLines.map((line) => (
              <div
                key={line.label}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(252,251,248,0.05)',
                  border: '1px solid rgba(252,251,248,0.1)',
                }}
              >
                <dt
                  className="text-[11px] font-bold tracking-[0.16em] uppercase"
                  style={{ color: 'rgba(252,251,248,0.55)' }}
                >
                  {line.label}
                </dt>
                <dd
                  className="text-base font-bold mt-2 leading-snug"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  {line.text}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        className="py-16 lg:py-20"
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
              { term: 'Registered office', detail: org.address },
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
                  style={{ color: 'rgba(75,13,36,0.78)' }}
                >
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
