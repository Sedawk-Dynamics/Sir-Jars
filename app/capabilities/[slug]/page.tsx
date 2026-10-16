import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check, Compass, Scale, ShieldCheck, Users } from 'lucide-react'
import PageHeader, { verticalVisuals } from '@/components/page-header'
import AcademyPathways from '@/components/academy-pathways'
import EnquiryBlock from '@/components/enquiry-block'
import BackToHome from '@/components/back-to-home'
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
    description: capability.intro,
    alternates: { canonical: `/capabilities/${capability.slug}` },
    openGraph: {
      title: `${capability.fullName} | Six Jars Global`,
      description: capability.intro,
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
  // One visible example per service (change guide, 28 Sep 2026).
  const example = engagements.find((e) => e.capability === capability.shortName)
  const visual = verticalVisuals[capability.slug]
  const heroImage = capability.heroImage ?? (visual && { src: visual.image, alt: visual.alt })

  return (
    <>
      <PageHeader
        eyebrow={`${capability.number} · ${capability.fullName}`}
        title={capability.headline}
        intro={capability.intro}
        breadcrumbs={[
          { label: 'Capabilities', href: '/capabilities' },
          { label: capability.shortName, href: `/capabilities/${capability.slug}` },
        ]}
        image={heroImage?.src}
        imageAlt={heroImage?.alt}
        pattern={visual?.pattern}
        imageSide="right"
        action={
          <Link
            href={`/contact?route=${encodeURIComponent(capability.shortName)}`}
            className="group inline-flex items-center justify-center gap-2 px-7 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--color-gold)', color: '#000000', minHeight: 56 }}
          >
            Tell us what you want to achieve
            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        }
      />

      {capability.audience && (
        <section
          className="py-8 lg:py-10"
          style={{ background: 'var(--color-parchment)', borderBottom: '1px solid var(--color-line)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-5">
            <Users
              size={28}
              aria-hidden="true"
              className="shrink-0"
              style={{ color: 'var(--color-wine)' }}
            />
            <div className="max-w-3xl">
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-plum)' }}
              >
                For you or your organisation
              </h2>
              <p
                className="mt-3 text-base lg:text-lg leading-relaxed"
                style={{ color: 'rgba(0,0,0,0.8)' }}
              >
                {capability.audience}
              </p>
              <p
                className="mt-2 text-base font-semibold"
                style={{ color: 'var(--color-wine)' }}
              >
                We agree what is included and what it will cost before work begins.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-10 lg:py-14" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-plum)' }}
              >
                What we do
              </h2>
              <p
                className="mt-6 text-base leading-[1.8]"
                style={{ color: 'rgba(0,0,0,0.8)' }}
              >
                {capability.overview}
              </p>
            </div>

            <div>
              <h2
                className="text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-plum)' }}
              >
                What you receive
              </h2>
              <ul className="mt-6 space-y-3">
                {capability.deliverables.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl p-4 text-base leading-relaxed"
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--color-line)',
                      color: 'rgba(0,0,0,0.78)',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Why choose this service — the customer reason, after what we do. */}
          <div
            className="mt-8 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-5"
            style={{
              background: 'rgba(239,184,60,0.12)',
              border: '1px solid rgba(239,184,60,0.45)',
              borderLeft: '4px solid var(--color-gold)',
            }}
          >
            <Compass
              size={28}
              aria-hidden="true"
              className="shrink-0"
              style={{ color: 'var(--color-wine)' }}
            />
            <div>
              <h2
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{ color: 'var(--color-wine)' }}
              >
                Why choose this service
              </h2>
              <p
                className="mt-2 text-base lg:text-lg leading-relaxed font-semibold"
                style={{ color: '#000000' }}
              >
                {capability.chooseWhen}
              </p>
            </div>
          </div>

          <div
            className="mt-6 rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row gap-5"
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
                Who reviews the work
              </h2>
              <p
                className="text-base leading-relaxed mt-2"
                style={{ color: 'rgba(0,0,0,0.78)' }}
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
                  Forensic work boundary
                </h2>
                <p
                  className="text-base leading-relaxed mt-2"
                  style={{ color: 'rgba(0,0,0,0.78)' }}
                >
                  {capability.boundary}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {capability.slug === 'ai-academy' && <AcademyPathways />}

      {example && (
        <section
          className="py-10 lg:py-14"
          style={{ background: 'var(--color-parchment)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <h2
              className="text-2xl font-bold tracking-tight mb-3"
              style={{ color: 'var(--color-plum)' }}
            >
              An example of this work
            </h2>
            <p
              className="text-base leading-relaxed mb-8 max-w-2xl"
              style={{ color: 'rgba(0,0,0,0.7)' }}
            >
              Illustrative composites showing the shape of this work. Named client case
              studies are published only with written approval and verified figures.
            </p>

            <article
              className="rounded-2xl p-6 lg:p-8"
              style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
            >
              <h3
                className="text-xl font-bold leading-snug"
                style={{ color: 'var(--color-plum)' }}
              >
                {example.title}
              </h3>
              <p
                className="text-base leading-relaxed mt-3 max-w-3xl"
                style={{ color: 'rgba(0,0,0,0.72)' }}
              >
                {example.context}
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mt-8">
                {[
                  { label: 'Scope', items: example.scope },
                  { label: 'Controls', items: example.controls },
                  { label: 'What the example produces', items: example.artefacts },
                ].map((group) => (
                  <div key={group.label}>
                    <h4
                      className="text-[11px] font-bold tracking-[0.16em] uppercase mb-3"
                      style={{ color: 'var(--color-wine)' }}
                    >
                      {group.label}
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed pl-3"
                          style={{
                            color: 'rgba(0,0,0,0.72)',
                            borderLeft: '2px solid rgba(107,21,63,0.2)',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 rounded-xl p-4"
                style={{ background: 'var(--color-parchment)', border: '1px solid var(--color-line)' }}
              >
                <h4
                  className="text-[11px] font-bold tracking-[0.16em] uppercase mb-2"
                  style={{ color: 'var(--color-wine)' }}
                >
                  Illustrative outcome
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-plum)' }}>
                  {example.outcome}
                </p>
              </div>
            </article>
          </div>
        </section>
      )}

      <EnquiryBlock />

      <section className="py-4" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-end">
          <Link
            href={`/capabilities/${next.slug}`}
            className="group inline-flex items-center justify-center gap-2 px-7 rounded-full text-base font-semibold"
            style={{
              border: '1px solid rgba(107,21,63,0.3)',
              color: 'var(--color-wine)',
              minHeight: 52,
            }}
          >
            Next: {next.shortName}
            <ArrowRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      <BackToHome />
    </>
  )
}
