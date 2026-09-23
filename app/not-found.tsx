import Link from 'next/link'
import PageHeader from '@/components/page-header'
import { capabilities } from '@/lib/content'

export default function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="That page does not exist."
        intro="The link may be out of date. Here is where everything lives."
      />
      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <ul className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Home', href: '/' },
              { label: 'Capabilities', href: '/capabilities' },
              { label: 'How it works', href: '/how-it-works' },
              { label: 'Insights', href: '/insights' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
              ...capabilities.map((c) => ({
                label: c.shortName,
                href: `/capabilities/${c.slug}`,
              })),
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center rounded-xl px-4 text-base font-semibold"
                  style={{
                    minHeight: 56,
                    background: '#FFFFFF',
                    border: '1px solid var(--color-line)',
                    color: 'var(--color-wine)',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
