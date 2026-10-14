import Image from 'next/image'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { capabilities, org } from '@/lib/content'
import { legalDocs, legalOrder } from '@/lib/legal'
import { LOGO_SRC, LOGO_W, LOGO_H } from './site-header'
import BackToTop from './back-to-top'
import { CookieSettingsButton } from './cookie-manager'
import { patternVars } from '@/lib/patterns'

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

function InstagramMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Zm6.2-8.2a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </svg>
  )
}

function XMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
    </svg>
  )
}

function FacebookMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M13.5 21.9v-8.1h2.7l.4-3.2h-3.1V8.6c0-.9.3-1.5 1.6-1.5h1.7V4.2c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7v3.2h2.7v8.1h3.1Z" />
    </svg>
  )
}

/** Social and direct-contact links under the brand block. */
const socialLinks = [
  { label: 'Six Jars Global on LinkedIn', href: org.linkedin, icon: <LinkedInMark />, external: true },
  { label: 'Six Jars Global on Instagram', href: org.instagram, icon: <InstagramMark />, external: true },
  { label: 'Six Jars Global on X', href: org.x, icon: <XMark />, external: true },
  { label: 'Six Jars Global on Facebook', href: org.facebook, icon: <FacebookMark />, external: true },
  { label: `Email ${org.email}`, href: `mailto:${org.email}`, icon: <Mail size={18} aria-hidden="true" /> },
  { label: `Call ${org.phone}`, href: `tel:${org.phoneHref}`, icon: <Phone size={18} aria-hidden="true" /> },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const columnHeading = 'text-xs font-bold tracking-[0.16em] uppercase mb-5 text-gold'
const columnLink = 'text-sm text-ivory/80 hover:text-gold transition-colors'

/**
 * Four columns on desktop (brand · services · company · contact), two on
 * tablet, stacked on mobile; every column starts on the same top line.
 * Legal links and the copyright bar share the same left edge as the columns.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="on-dark patterned pt-16 pb-8"
      style={{ background: 'var(--color-plum)', color: 'var(--color-ivory)', ...patternVars('hatch', 'gold') }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.35fr] gap-x-10 gap-y-12 pb-12">
          {/* Brand */}
          <div>
            {/* The wordmark and jars are burgundy and gold on transparency, so
                they would disappear against the plum footer. Rather than
                recolouring the brand asset, it sits on a light plate. */}
            <Link
              href="/"
              aria-label="Six Jars Global — home"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3"
              style={{ background: 'var(--color-ivory)' }}
            >
              <Image
                src={LOGO_SRC}
                alt="Six Jars Global"
                width={LOGO_W}
                height={LOGO_H}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p
              className="mt-6 font-bold leading-tight text-ivory"
              style={{ fontFamily: 'var(--font-heading)', fontSize: '1.625rem' }}
            >
              Capability, made accountable.
            </p>
            <p className="mt-3 text-sm leading-relaxed max-w-xs text-ivory/75">
              Six services. One contact coordinating the work, with clear approvals and a
              handover you can use.
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-3" aria-label="Social and contact links">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={s.external ? `${s.label} (opens in a new tab)` : s.label}
                    className="tap-target inline-flex items-center justify-center rounded-full text-ivory transition-colors hover:text-black hover:bg-gold"
                    style={{ border: '1px solid rgba(255,255,255,0.3)' }}
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className={columnHeading}>Services</h2>
            <ul className="space-y-3">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/capabilities/${c.slug}`} className={columnLink}>
                    {c.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className={columnHeading}>Company</h2>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={columnLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className={columnHeading}>Contact</h2>
            <address className="not-italic space-y-3 text-sm leading-relaxed text-ivory/80">
              <p className="flex gap-3">
                <MapPin size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-gold" />
                <span>
                  {org.address}
                  <br />
                  <a
                    href={org.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline underline-offset-2"
                  >
                    View on Google Maps
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </span>
              </p>
              <p className="flex gap-3">
                <Phone size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-gold" />
                <a href={`tel:${org.phoneHref}`} className="hover:text-gold transition-colors">
                  {org.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-gold" />
                <a href={`mailto:${org.email}`} className="hover:text-gold transition-colors break-all">
                  {org.email}
                </a>
              </p>
              <p className="flex gap-3">
                <Clock size={16} aria-hidden="true" className="shrink-0 mt-0.5 text-gold" />
                <span>{org.hours}</span>
              </p>
            </address>

            {/* Grievance officer — required to be published under the
                Consumer Protection (E-Commerce) Rules, 2020. */}
            <p
              className="mt-5 pt-4 text-sm leading-relaxed text-ivory/75"
              style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}
            >
              <span className="block text-ivory/90 font-semibold">Grievance officer</span>
              {org.grievanceOfficer}
              <br />
              <a href={`mailto:${org.privacyEmail}`} className="hover:text-gold transition-colors break-all">
                {org.privacyEmail}
              </a>
            </p>
          </div>
        </div>

        {/* Legal links — left-aligned with the columns above. */}
        <nav
          aria-label="Legal"
          className="py-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
            {legalOrder.map((slug) => (
              <li key={slug}>
                <Link href={`/legal/${slug}`} className="text-ivory/75 hover:text-gold transition-colors">
                  {legalDocs[slug].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}
        >
          <div>
            <p className="text-xs text-ivory/70">
              &copy; {year} {org.legalName}. All rights reserved.
            </p>
            <p className="text-xs text-ivory/60 mt-1">
              GSTIN: {org.gstin}
              {org.cin ? <> &middot; CIN: {org.cin}</> : null}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CookieSettingsButton className="inline-flex items-center px-4 rounded-full text-xs font-semibold text-ivory/85 hover:text-gold border border-ivory/25 transition-colors min-h-10" />
            <BackToTop className="inline-flex items-center gap-1.5 px-4 rounded-full text-xs font-bold min-h-10 bg-gold text-black transition-transform hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </footer>
  )
}
