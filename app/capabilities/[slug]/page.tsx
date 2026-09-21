import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Compass, Scale, ShieldCheck } from 'lucide-react'
import PageHeader from '@/components/page-header'
import EvidenceDrawer from '@/components/evidence-drawer'
import { capabilities, engagements, getCapability } from '@/lib/content'

type Params = { params: Promise<{ slug: string }> }

/** Every capability is statically generated, so each has a real, crawlable URL. */
export function generateStaticParams() {
  return capabilities.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const capability = getCapability(slug)
  if (!capability) return {}
  return {
    title: capability.fullName,
    description: capability.summary,
    alternates: { canonical: `/capabilities/${capability.slug}` },
    openGraph: {
      title: `${capability.fullName} | Six Jars Global`,
      description: capability.summary,
      url: `/capabilities/${capability.slug}`,
    },
  }
}

export default async function CapabilityPage({ params }: Params) {
  const { slug } = await params
  const capability = getCapability(slug)
  if (!capability) notFound()

  const index = capabilities.findIndex((c) => c.slug === slug)
  const next = capabilities[(index + 1) % capabilities.length]
  const related = engagements.filter(
    (e) => e.capability === capability.shortName
  )

  return (
    <>
      <PageHeader
        eyebrow={`${capability.number} · ${capability.cue}`}
        title={capability.fullName}
        intro={capability.intro}
        breadcrumbs={[
          { label: 'Capabilities', href: '/capabilities' },
          { label: capability.shortName, href: `/capabilities/${capability.slug}` },
        ]}
      />

      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          {/* "Choose this when" — the fastest way to know you are in the
              right place, so it comes before the detail. */}
          <div
            className="mb-12 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-5"
            style={{ background: 'var(--color-plum)' }}
          >
            <Compass
              size={28}
              aria-hidden="true"
              className="shrink-0"
              style={{ color: 'var(--color-gold)' }}
            />
            <div>
              <h2
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-gold)' }}
              >
                Choose this when
              </h2>
              <p
                className="mt-2 text-lg lg:text-xl leading-relaxed font-semibold"
                style={{ color: 'var(--color-ivory)' }}
              >
                {capability.chooseWhen}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-plum)' }}
              >
                Scope
              </h2>
              <ul className="mt-6 space-y-3">
                {capability.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={17}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-wine)' }}
                    />
                    <span
                      className="text-base leading-relaxed"
                      style={{ color: 'rgba(75,13,36,0.78)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-plum)' }}
              >
                Typical outputs
              </h2>
              <ul className="mt-6 space-y-3">
                {capability.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl p-4 text-base leading-relaxed"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--color-line)',
                      color: 'rgba(75,13,36,0.78)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-12 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-5"
            style={{
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-line)',
            }}
          >
            <ShieldCheck
              size={28}
              aria-hidden="true"
              className="shrink-0"
              style={{ color: 'var(--color-wine)' }}
            />
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: 'var(--color-plum)' }}
              >
                Where human review sits
              </h2>
              <p
                className="text-base leading-relaxed mt-2"
                style={{ color: 'rgba(75,13,36,0.78)' }}
              >
                {capability.humanReview}
              </p>
            </div>
          </div>

          {capability.boundary && (
            <div
              className="mt-6 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-5"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-line)',
                borderLeft: '4px solid var(--color-wine)',
              }}
            >
              <Scale
                size={26}
                aria-hidden="true"
                className="shrink-0"
                style={{ color: 'var(--color-wine)' }}
              />
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                  Boundary for this vertical
                </h2>
                <p
                  className="text-base leading-relaxed mt-2"
                  style={{ color: 'rgba(75,13,36,0.78)' }}
                >
                  {capability.boundary}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section
          className="py-16 lg:py-24"
          style={{ background: 'var(--color-parchment)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2
              className="text-2xl font-bold tracking-tight mb-3"
              style={{ color: 'var(--color-plum)' }}
            >
              Engagement examples
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-2xl"
              style={{ color: 'rgba(75,13,36,0.7)' }}
            >
              Illustrative composites showing the shape of this work. Named client case
              studies are published only with written approval and verified figures.
            </p>
            <div className="grid gap-5">
              {related.map((engagement) => (
                <EvidenceDrawer key={engagement.slug} engagement={engagement} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="on-dark py-16 lg:py-20"
        style={{ background: 'var(--color-plum)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h2
              className="text-2xl lg:text-3xl font-bold tracking-tight"
              style={{ color: 'var(--color-ivory)' }}
            >
              Need {capability.shortName.toLowerCase()} support?
            </h2>
            <p
              className="text-base leading-relaxed mt-3 max-w-xl"
              style={{ color: 'rgba(252,251,248,0.7)' }}
            >
              Tell us what must work and what cannot be compromised. We will route your
              inquiry to a named owner.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={`/contact?route=${encodeURIComponent(capability.shortName)}`}
              className="inline-flex items-center justify-center gap-2 px-7 rounded-full text-base font-bold"
              style={{
                background: 'var(--color-gold)',
                color: 'var(--color-plum)',
                minHeight: 56,
              }}
            >
              Start a conversation
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link
              href={`/capabilities/${next.slug}`}
              className="inline-flex items-center justify-center px-7 rounded-full text-base font-semibold"
              style={{
                background: 'rgba(252,251,248,0.08)',
                border: '1px solid rgba(252,251,248,0.28)',
                color: 'var(--color-ivory)',
                minHeight: 56,
              }}
            >
              Next: {next.shortName}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
