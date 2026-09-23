import type { Metadata } from 'next'
import Image from 'next/image'
import PageHeader from '@/components/page-header'
import ClosingCta from '@/components/home/closing-cta'
import FounderSection from '@/components/founder-section'
import { org } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About — the mission-aligned operating partner',
  description:
    'Six Jars Global is a Bengaluru-based coordination hub for organizations with complex, high-stakes work. Our mission, vision, values and brand promise.',
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
    desc: 'Treat mission, money, data, content, systems and relationships as entrusted work.',
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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="The mission-aligned operating partner."
        intro="A Bengaluru-based coordination hub giving organizations access to disciplined delivery across six connected capabilities."
        breadcrumbs={[{ label: 'About', href: '/about' }]}
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

            <div>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'rgba(75,13,36,0.8)' }}
              >
                We are not a generic outsourcing firm. The strategic advantage we offer is
                culturally literate, human-reviewed, governed execution — connecting the
                right discipline, people, process and technology with one accountable path
                from brief to evidence.
              </p>

              <div
                className="mt-8 pl-5"
                style={{ borderLeft: '3px solid var(--color-gold)' }}
              >
                <h2
                  className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'var(--color-wine)' }}
                >
                  Mission
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(75,13,36,0.78)' }}
                >
                  To strengthen organizations with trusted publishing, media, digital,
                  operational, learning, cybersecurity and forensic capacity —
                  coordinating people, systems and evidence so their work can go further,
                  safer and longer.
                </p>
              </div>

              <div
                className="mt-6 pl-5"
                style={{ borderLeft: '3px solid var(--color-rose)' }}
              >
                <h2
                  className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
                  style={{ color: 'var(--color-wine)' }}
                >
                  Vision
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(75,13,36,0.78)' }}
                >
                  A world in which every organization can access the accountable systems,
                  creative capability, digital resilience and human judgment it needs to
                  remain relevant, secure and effective across generations.
                </p>
              </div>
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
              &ldquo;When an organization faces work that matters, Six Jars Global
              connects the right discipline, people, process and technology — with sector
              fluency, human judgment, discretion, and one accountable path from brief to
              evidence.&rdquo;
            </p>
            <footer
              className="text-xs font-bold tracking-[0.16em] uppercase mt-5"
              style={{ color: 'var(--color-gold)' }}
            >
              Our brand promise
            </footer>
          </blockquote>
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
