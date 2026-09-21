import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/page-header'
import { org } from '@/lib/content'
import { legalDocs, legalOrder } from '@/lib/legal'

type Params = { params: Promise<{ slug: string }> }

/**
 * Legal and policy pages, rendered from lib/legal.ts.
 *
 * Documents from the approved legal pack carry their effective date, version
 * and review date at the top, as the documents themselves require. Only a
 * document still marked `underReview` shows the pending-sign-off note.
 */

export function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const doc = legalDocs[slug]
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/legal/${slug}` },
  }
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params
  const doc = legalDocs[slug]
  if (!doc) notFound()

  const others = legalOrder.filter((s) => s !== slug)

  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={doc.title}
        intro={doc.intro}
        breadcrumbs={[{ label: doc.title, href: `/legal/${slug}` }]}
      />

      <section className="py-14 lg:py-20" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          {doc.effective && (
            <dl
              className="grid grid-cols-3 gap-4 rounded-2xl p-5 mb-10"
              style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
            >
              {[
                { term: 'Effective date', detail: doc.effective },
                { term: 'Version', detail: doc.version },
                { term: 'Last reviewed', detail: doc.reviewed },
              ].map((row) => (
                <div key={row.term}>
                  <dt
                    className="text-[11px] font-bold tracking-[0.14em] uppercase"
                    style={{ color: 'var(--color-wine)' }}
                  >
                    {row.term}
                  </dt>
                  <dd className="text-sm mt-1" style={{ color: 'rgba(75,13,36,0.8)' }}>
                    {row.detail}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {doc.underReview && (
            <div
              className="rounded-2xl p-5 mb-10"
              style={{
                background: 'var(--color-parchment)',
                border: '1px solid var(--color-line)',
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(75,13,36,0.78)' }}>
                <span className="font-bold">Under review. </span>
                This document states our operating practice and is pending sign-off by
                counsel. For anything contractual, the terms in your signed engagement
                document take precedence. Questions to{' '}
                <a
                  href={`mailto:${org.email}`}
                  className="underline underline-offset-2"
                  style={{ color: 'var(--color-wine)' }}
                >
                  {org.email}
                </a>
                .
              </p>
            </div>
          )}

          <div className="space-y-10">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2
                  className="text-xl font-bold tracking-tight"
                  style={{ color: 'var(--color-plum)' }}
                >
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((block, i) =>
                    typeof block === 'string' ? (
                      <p
                        key={i}
                        className="text-base leading-[1.8]"
                        style={{ color: 'rgba(75,13,36,0.8)' }}
                      >
                        {block}
                      </p>
                    ) : (
                      <ul key={i} className="space-y-2 pl-5 list-disc marker:text-[var(--color-wine)]">
                        {block.list.map((item) => (
                          <li
                            key={item}
                            className="text-base leading-[1.75]"
                            style={{ color: 'rgba(75,13,36,0.8)' }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <nav
            aria-label="Other policies"
            className="mt-14 pt-8"
            style={{ borderTop: '1px solid var(--color-line)' }}
          >
            <h2
              className="text-xs font-bold tracking-[0.16em] uppercase"
              style={{ color: 'var(--color-wine)' }}
            >
              Other policies
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((s) => (
                <li key={s}>
                  <Link
                    href={`/legal/${s}`}
                    className="inline-flex items-center px-4 rounded-full text-sm font-semibold"
                    style={{
                      minHeight: 40,
                      background: '#FFFFFF',
                      border: '1px solid var(--color-line)',
                      color: 'var(--color-plum)',
                    }}
                  >
                    {legalDocs[s].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  )
}
