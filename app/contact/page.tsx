import type { Metadata } from 'next'
import { MapPin, Phone, Mail } from 'lucide-react'
import PageHeader from '@/components/page-header'
import ContactForm from '@/components/contact-form'
import { contactPaths, org, type ContactPathId } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what must work and what cannot be compromised. Every inquiry is acknowledged with a named owner and a documented next step.',
  alternates: { canonical: '/contact' },
}

type Search = { searchParams: Promise<{ path?: string; route?: string }> }

const validPaths = contactPaths.map((p) => p.id) as string[]

export default async function ContactPage({ searchParams }: Search) {
  const params = await searchParams
  // Links elsewhere on the site can preconfigure the intent and the route,
  // e.g. /contact?route=Cybersecurity from a capability page.
  const path = (
    params.path && validPaths.includes(params.path) ? params.path : 'project'
  ) as ContactPathId

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what must work — and what cannot be compromised."
        intro="You will receive a structured next step, not a generic sales reply."
        breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
      />

      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
            <div>
              <ContactForm defaultPath={path} defaultRoute={params.route ?? ''} />
            </div>

            <aside className="flex flex-col gap-5">
              <div
                className="on-dark rounded-2xl p-7"
                style={{ background: 'var(--color-plum)' }}
              >
                <h2
                  className="text-lg font-bold mb-6"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  Reach us directly
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <MapPin
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-gold)' }}
                    />
                    <address
                      className="not-italic text-sm leading-relaxed"
                      style={{ color: 'rgba(252,251,248,0.78)' }}
                    >
                      {org.address}
                    </address>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-gold)' }}
                    />
                    <a
                      href={`tel:${org.phoneHref}`}
                      className="text-sm hover:underline"
                      style={{ color: 'rgba(252,251,248,0.9)' }}
                    >
                      {org.phone}
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0"
                      style={{ color: 'var(--color-gold)' }}
                    />
                    <a
                      href={`mailto:${org.email}`}
                      className="text-sm hover:underline break-all"
                      style={{ color: 'rgba(252,251,248,0.9)' }}
                    >
                      {org.email}
                    </a>
                  </li>
                </ul>
              </div>

              <div
                className="rounded-2xl p-7"
                style={{
                  background: 'var(--color-parchment)',
                  border: '1px solid var(--color-line)',
                }}
              >
                <h2
                  className="text-base font-bold mb-4"
                  style={{ color: 'var(--color-plum)' }}
                >
                  Our response protocol
                </h2>
                <ul className="space-y-3">
                  {[
                    'Every inquiry is acknowledged within 24 hours.',
                    'A named owner is assigned to your inquiry.',
                    'A structured next step follows within 2 business days.',
                    'Sensitive matters receive secure-channel guidance first.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                        style={{ background: 'var(--color-wine)' }}
                      />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(75,13,36,0.78)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p
                  className="text-xs leading-relaxed mt-5 pt-4"
                  style={{
                    color: 'rgba(75,13,36,0.6)',
                    borderTop: '1px solid var(--color-line)',
                  }}
                >
                  These are our stated response commitments, not measured averages.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
