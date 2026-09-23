import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { capabilities, org } from '@/lib/content'
import { legalDocs, legalOrder } from '@/lib/legal'
import { LOGO_SRC, LOGO_W, LOGO_H } from './site-header'

/** Brand marks were dropped from lucide v1, so LinkedIn ships inline. */
function LinkedInMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.9-11.75V21.5h5.16v-6.5c0-1.72.33-3.38 2.46-3.38 2.1 0 2.13 1.96 2.13 3.49v6.39h5.15v-7.42c0-4.47-.96-7.9-6.18-7.9-2.5 0-4.19 1.37-4.88 2.68h-.07V9.75h-4.77Z" />
    </svg>
  )
}

/**
 * Footer destinations are anchors, not buttons, and every one resolves to a
 * page that exists. Legal identifiers render only when verified — the review
 * flagged `CIN: Bangalore, India` as a credibility defect on a site whose
 * entire pitch is governance.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="on-dark pt-16 pb-8"
      style={{ background: 'var(--color-plum)', color: 'var(--color-ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12 mb-14">
          <div className="col-span-2 md:col-span-4">
            {/* The wordmark and jars are burgundy and gold on transparency, so
                they would disappear against the plum footer. Rather than
                recolouring the brand asset, it sits on a warm-ivory plate —
                the logo stays exactly as drawn. */}
            <span
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 mb-5"
              style={{ background: 'var(--color-ivory)' }}
            >
              <Image
                src={LOGO_SRC}
                alt="Six Jars Global"
                width={LOGO_W}
                height={LOGO_H}
                className="h-16 w-auto object-contain"
              />
            </span>
            <p className="text-sm leading-relaxed max-w-xs text-ivory/70">
              Mission, Made Capable.
            </p>
            <p className="text-sm leading-relaxed max-w-xs mt-2 text-ivory/55">
              Six connected capabilities, one accountable partner, for work that must be
              governed, human-reviewed and proved at close.
            </p>

            <ul className="flex items-center gap-3 mt-6">
              <li>
                <a
                  href={org.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-target inline-flex items-center justify-center rounded-xl transition-colors"
                  style={{ background: 'rgba(252,251,248,0.08)' }}
                  aria-label="Six Jars Global on LinkedIn (opens in a new tab)"
                >
                  <LinkedInMark />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${org.email}`}
                  className="tap-target inline-flex items-center justify-center rounded-xl transition-colors"
                  style={{ background: 'rgba(252,251,248,0.08)' }}
                  aria-label={`Email ${org.email}`}
                >
                  <Mail size={18} />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${org.phoneHref}`}
                  className="tap-target inline-flex items-center justify-center rounded-xl transition-colors"
                  style={{ background: 'rgba(252,251,248,0.08)' }}
                  aria-label={`Call ${org.phone}`}
                >
                  <Phone size={18} />
                </a>
              </li>
            </ul>

            <Link
              href="/careers"
              className="group mt-6 inline-flex items-center gap-2 px-5 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                minHeight: 44,
                background: 'var(--color-gold)',
                color: 'var(--color-plum)',
              }}
            >
              Careers at Six Jars
              <ArrowRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <nav className="md:col-span-3" aria-label="Capabilities">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-4 text-ivory/45">
              Capabilities
            </h2>
            <ul className="space-y-3">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Company">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-4 text-ivory/45">
              Company
            </h2>
            <ul className="space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'How it works', href: '/how-it-works' },
                { label: 'Insights', href: '/insights' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label="Legal and contact">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-4 text-ivory/45">
              Legal
            </h2>
            <ul className="space-y-3">
              {legalOrder.map((slug) => ({
                label: legalDocs[slug].title,
                href: `/legal/${slug}`,
              })).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ivory/70 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <address className="not-italic mt-6 text-sm leading-relaxed text-ivory/55">
              {org.address}
              <br />
              <a
                href={`tel:${org.phoneHref}`}
                className="hover:text-gold transition-colors"
              >
                {org.phone}
              </a>
              <br />
              <a
                href={`mailto:${org.email}`}
                className="hover:text-gold transition-colors"
              >
                {org.email}
              </a>
              <br />
              <span className="text-ivory/45">{org.hours}</span>
            </address>

            {/* Grievance officer — required to be published under the
                Consumer Protection (E-Commerce) Rules, 2020. */}
            <p className="mt-4 text-sm leading-relaxed text-ivory/55">
              Grievance officer: {org.grievanceOfficer}
              <br />
              <a
                href={`mailto:${org.privacyEmail}`}
                className="hover:text-gold transition-colors"
              >
                {org.privacyEmail}
              </a>
            </p>
          </nav>
        </div>

        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(252,251,248,0.12)' }}
        >
          <p className="text-xs text-ivory/45">
            &copy; {year} {org.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-ivory/40">
            GSTIN: {org.gstin}
            {/* CIN renders only once verified against the incorporation
                certificate. An unverified identifier is worse than none. */}
            {org.cin ? <> &middot; CIN: {org.cin}</> : null}
          </p>
        </div>
      </div>
    </footer>
  )
}
