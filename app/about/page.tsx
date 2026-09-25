import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/page-header'
import ClosingCta from '@/components/home/closing-cta'
import FounderSection from '@/components/founder-section'
import { org } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — Capability, made accountable',
  description:
    'Six Jars Global brings six connected capabilities under one accountable delivery model for organizations, educators and communities. Our positioning, mission, vision and brand promise.',
  alternates: { canonical: '/about' },
}

/**
 * Full mission and vision text lives here rather than on the homepage — the
 * review found the same ideas recurring across many homepage sections, which
 * delayed the outcome story.
 */
const values = [
  {
    name: 'Stewardship',
    desc: 'Treat money, data, content, systems and relationships as entrusted work.',
  },
  {
    name: 'Human judgment',
    desc: 'Use automation to assist; keep accountable people in review, approval and exception handling.',
  },
  {
    name: 'Discretion',
    desc: 'Protect sensitive content, institutional context, personal data and digital evidence.',
  },
  {
    name: 'Connected craft',
    desc: 'Coordinate editorial, creative, technical, operational and forensic disciplines without seams.',
  },
  {
    name: 'Responsible adaptation',
    desc: 'Modernize without erasing organizational identity, purpose, governance or institutional memory.',
  },
  {
    name: 'Proof',
    desc: 'Document scope, decisions, controls, evidence and outcomes; distinguish verified facts from ambition.',
  },
]

const statements = [
  {
    label: 'Positioning',
    accent: 'var(--color-wine)',
    text: 'Six Jars Global brings six connected capabilities under one accountable delivery model for organizations, educators and communities.',
  },
  {
    label: 'Mission',
    accent: 'var(--color-gold)',
    text: 'To turn complex work into clear, secure and measurable outcomes through coordinated expertise, practical technology and responsible execution.',
  },
  {
    label: 'Vision',
    accent: 'var(--color-rose)',
    text: 'A world where every organization and learner can access the skills, systems and safeguards needed to adapt, grow and create lasting value.',
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
          <div className="max-w-2xl mb-12">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              Brand values
            </p>
            <h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{
                color: 'var(--color-ivory)',
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              }}
            >
              The principles that govern every engagement
            </h2>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value, i) => (
              <li
                key={value.name}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(252,251,248,0.05)',
                  border: '1px solid rgba(252,251,248,0.1)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex w-9 h-9 rounded-lg items-center justify-center text-sm font-bold mb-4"
                  style={{
                    background: 'rgba(241,181,59,0.14)',
                    color: 'var(--color-gold)',
                  }}
                >
                  {i + 1}
                </span>
                <h3
                  className="text-base font-bold"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  {value.name}
                </h3>
                <p
                  className="text-sm leading-relaxed mt-2"
                  style={{ color: 'rgba(252,251,248,0.62)' }}
                >
                  {value.desc}
                </p>
              </li>
            ))}
          </ul>

          <blockquote
            className="mt-12 rounded-2xl p-7 lg:p-10 max-w-4xl"
            style={{
              background: 'rgba(241,181,59,0.08)',
              border: '1px solid rgba(241,181,59,0.24)',
            }}
          >
            <p
              className="text-lg lg:text-xl leading-relaxed italic"
              style={{
                color: 'var(--color-ivory)',
                fontFamily: 'var(--font-source-serif)',
              }}
            >
              &ldquo;One named owner connects specialists, approvals, delivery and
              close-out evidence from brief to completion.&rdquo;
            </p>
            <footer
              className="text-xs font-bold tracking-[0.16em] uppercase mt-5"
              style={{ color: 'var(--color-gold)' }}
            >
              Our brand promise
            </footer>
          </blockquote>

          <h2
            className="mt-14 text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            How we say it
          </h2>
          <dl className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
