import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageHeader from '@/components/page-header'
import { org } from '@/lib/content'

type Params = { params: Promise<{ slug: string }> }

/**
 * Legal destinations exist as real pages so the footer links resolve, can be
 * shared, and can be indexed. Each carries a review note stating plainly that
 * the text is pending counsel sign-off — an honest placeholder beats a
 * confident one on a compliance-oriented site.
 */
const documents = {
  privacy: {
    title: 'Privacy policy',
    intro:
      'How Six Jars Global collects, uses, retains and protects personal data submitted through this website and during an engagement.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'Through this website we collect only what you submit in the contact form: your name, the organization you represent, your email address, an optional capability route and the message you write.',
          'We do not use advertising trackers or sell data to third parties. Aggregate, non-identifying analytics may be used to understand which pages are useful.',
        ],
      },
      {
        heading: 'Why we hold it',
        body: [
          'To respond to your inquiry, route it to an accountable owner, and maintain a record of what was asked and what was answered.',
          'During an engagement we process only the data defined in the written scope, for the retention period stated in that scope.',
        ],
      },
      {
        heading: 'Retention and deletion',
        body: [
          'Inquiry records are retained while a conversation is active and for a defined period afterwards, then deleted.',
          'You may request access to, correction of, or deletion of your data at any time by writing to ' +
            org.email +
            '.',
        ],
      },
      {
        heading: 'Sensitive matters',
        body: [
          'If your inquiry concerns a confidential, security or forensic matter, do not include sensitive detail in the website form. Select "Sensitive matter" and we will send secure-channel instructions before you share anything further.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of engagement',
    intro:
      'The standing terms that frame how Six Jars Global scopes, authorises, delivers and closes an engagement.',
    sections: [
      {
        heading: 'Scope precedes work',
        body: [
          'No work begins before a written scope exists stating what is included, what is excluded, who may authorise changes, and what evidence will be produced at close.',
          'Where a request falls outside our coordination — for example, work that requires a licensed specialist practice — we say so and refer rather than improvise.',
        ],
      },
      {
        heading: 'Authorisation and change',
        body: [
          'Changes to scope require authorisation from a named person on your side, recorded in writing. Verbal changes are confirmed in writing before they take effect.',
        ],
      },
      {
        heading: 'Human review',
        body: [
          'Automation assists our delivery. Accountable people remain responsible for review, approval and exception handling, and the scope names who they are.',
        ],
      },
      {
        heading: 'Closure and evidence',
        body: [
          'Every engagement closes with documented outcomes, decision records and the artefacts named in the scope. We distinguish what was done from what was intended.',
        ],
      },
    ],
  },
  confidentiality: {
    title: 'Confidentiality policy',
    intro:
      'How Six Jars Global handles institutional context, sensitive content, personal data and digital evidence.',
    sections: [
      {
        heading: 'Default posture',
        body: [
          'We treat everything you share as confidential by default, whether or not a separate agreement is in place. Discretion is one of our stated brand values, not a contractual afterthought.',
        ],
      },
      {
        heading: 'Access discipline',
        body: [
          'Access to your material is limited to the people assigned to your engagement. An access register names them, and it is available to you on request.',
        ],
      },
      {
        heading: 'Evidence handling',
        body: [
          'Forensic work proceeds only under documented authorisation stating what is covered, what is excluded and when the authorisation expires.',
          'Every artefact is logged under chain of custody from acquisition through to release.',
        ],
      },
      {
        heading: 'Sub-processors and referrals',
        body: [
          'Where a specialist practice is engaged, we tell you before anything is shared, and the same confidentiality terms flow through in writing.',
        ],
      },
    ],
  },
} as const

export function generateStaticParams() {
  return Object.keys(documents).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const doc = documents[slug as keyof typeof documents]
  if (!doc) return {}
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/legal/${slug}` },
  }
}

export default async function LegalPage({ params }: Params) {
  const { slug } = await params
  const doc = documents[slug as keyof typeof documents]
  if (!doc) notFound()

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
          <div
            className="rounded-2xl p-5 mb-10"
            style={{
              background: 'var(--color-parchment)',
              border: '1px solid var(--color-line)',
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'rgba(75,13,36,0.78)' }}
            >
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
                  {section.body.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-[1.8]"
                      style={{ color: 'rgba(75,13,36,0.8)' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
