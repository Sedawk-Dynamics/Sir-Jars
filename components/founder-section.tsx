'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
} from 'lucide-react'
import { founder } from '@/lib/content'

/**
 * Founder section: portrait card on the left, tabbed detail panel on the right.
 *
 * Accessibility
 *  - A real ARIA tablist with a roving tabindex. Arrow keys move DOM focus,
 *    Home/End jump to the ends, and the panel is bound back to its tab.
 *  - Every panel is rendered into the DOM; inactive ones are `hidden` rather
 *    than unmounted, so the content stays crawlable and the panel height does
 *    not jump as you move between tabs.
 *  - The portrait is a real <Image> with meaningful alt text; the quote badge
 *    and every icon are decorative and hidden from assistive tech.
 */
export default function FounderSection() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabs = founder.tabs
  const total = tabs.length

  const focusTab = (i: number) => {
    setActive(i)
    tabRefs.current[i]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      focusTab((active + 1) % total)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      focusTab((active - 1 + total) % total)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusTab(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusTab(total - 1)
    }
  }

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="founder-heading"
    >
      {/* Warm parchment wash behind the cards — depth without another border. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(40rem 28rem at 82% 12%, rgba(241,181,59,0.10), transparent 65%), radial-gradient(34rem 24rem at 4% 88%, rgba(112,13,44,0.07), transparent 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-wine)' }}
          >
            The founder
          </p>
          <h2
            id="founder-heading"
            className="mt-3 font-extrabold tracking-tight leading-tight"
            style={{
              color: 'var(--color-plum)',
              fontSize: 'clamp(1.875rem, 4.2vw, 2.75rem)',
            }}
          >
            One accountable owner — not a rotating account team.
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: 'rgba(75,13,36,0.72)' }}
          >
            Six Jars Global is a one-person company by design. The person who
            scopes your engagement is the person answerable for it at close.
          </p>
        </div>

        <div className="mt-10 lg:mt-12 grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 lg:gap-8 items-start">
          {/* ── Portrait card ───────────────────────────────────────── */}
          <article
            className="rounded-3xl overflow-hidden"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-line)',
              boxShadow: '0 18px 50px -24px rgba(75,13,36,0.35)',
            }}
          >
            <div className="relative aspect-[4/5] w-full">
              {founder.photo ? (
                <Image
                  src={founder.photo}
                  alt={founder.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  className="object-cover"
                />
              ) : (
                // No portrait supplied yet: a monogram, never a stand-in photo.
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 38%, #872143 0%, #4B0D24 72%)',
                  }}
                >
                  <span
                    className="font-extrabold tracking-tight"
                    style={{
                      color: 'var(--color-gold)',
                      fontSize: 'clamp(4rem, 12vw, 7rem)',
                      fontFamily: 'var(--font-serif)',
                    }}
                  >
                    {founder.name
                      .split(/\s+/)
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                </div>
              )}
              {/* Bottom scrim so the badge and any light photo still separate. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(43,7,21,0.55) 0%, transparent 42%)',
                }}
              />
              {founder.quote && (
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--color-gold)',
                    color: 'var(--color-plum)',
                    boxShadow: '0 6px 20px rgba(241,181,59,0.4)',
                  }}
                >
                  <Quote size={18} />
                </span>
              )}
            </div>

            <div className="p-6 lg:p-7">
              <h3
                className="text-xl font-extrabold tracking-tight"
                style={{ color: 'var(--color-plum)' }}
              >
                {founder.name}
              </h3>
              <p
                className="text-sm font-bold mt-1"
                style={{ color: 'var(--color-wine)' }}
              >
                {founder.role}
              </p>
              <p className="text-sm mt-0.5" style={{ color: 'rgba(75,13,36,0.6)' }}>
                {founder.company}
              </p>

              {founder.quote && (
                <blockquote
                  className="mt-5 pl-4 text-[15px] leading-relaxed italic"
                  style={{
                    borderLeft: '3px solid var(--color-gold)',
                    color: 'rgba(75,13,36,0.8)',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  {founder.quote}
                </blockquote>
              )}

              <ul
                className="mt-6 space-y-3 pt-5"
                style={{ borderTop: '1px solid var(--color-line)' }}
              >
                <li className="flex items-center gap-3">
                  <MapPin
                    size={15}
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ color: 'var(--color-wine)' }}
                  />
                  <span className="text-sm" style={{ color: 'rgba(75,13,36,0.78)' }}>
                    {founder.location}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail
                    size={15}
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ color: 'var(--color-wine)' }}
                  />
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-sm hover:underline break-all"
                    style={{ color: 'rgba(75,13,36,0.78)' }}
                  >
                    {founder.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone
                    size={15}
                    aria-hidden="true"
                    className="shrink-0"
                    style={{ color: 'var(--color-wine)' }}
                  />
                  <a
                    href={`tel:${founder.phoneHref}`}
                    className="text-sm hover:underline"
                    style={{ color: 'rgba(75,13,36,0.78)' }}
                  >
                    {founder.phone}
                  </a>
                </li>
              </ul>

              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  minHeight: 48,
                  background: 'var(--color-plum)',
                  color: 'var(--color-ivory)',
                }}
              >
                Connect on LinkedIn
                <ArrowUpRight size={15} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </article>

          {/* ── Tabbed detail panel ─────────────────────────────────── */}
          <div
            className="rounded-3xl p-5 sm:p-7 lg:p-8"
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-line)',
              boxShadow: '0 18px 50px -30px rgba(75,13,36,0.3)',
            }}
          >
            <div
              role="tablist"
              aria-label="About the founder"
              onKeyDown={onKeyDown}
              className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-full"
              style={{ background: 'var(--color-parchment)' }}
            >
              {tabs.map((tab, i) => {
                const isActive = i === active
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    id={`founder-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`founder-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className="px-5 rounded-full text-sm font-bold transition-colors duration-200"
                    style={{
                      minHeight: 40,
                      background: isActive ? 'var(--color-plum)' : 'transparent',
                      color: isActive ? 'var(--color-ivory)' : 'rgba(75,13,36,0.7)',
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {tabs.map((tab, i) => (
              <div
                key={tab.id}
                role="tabpanel"
                id={`founder-panel-${tab.id}`}
                aria-labelledby={`founder-tab-${tab.id}`}
                tabIndex={0}
                hidden={i !== active}
                className="mt-7 founder-panel"
              >
                {tab.kind === 'prose' ? (
                  <div className="space-y-4">
                    {tab.body?.map((para) => (
                      <p
                        key={para}
                        className="text-base leading-relaxed"
                        style={{ color: 'rgba(75,13,36,0.78)' }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {tab.items?.map((item) => (
                      <li
                        key={item.name}
                        className="rounded-2xl p-4 flex gap-3 transition-colors duration-200 hover:border-[color:var(--color-gold)]"
                        style={{
                          background: 'var(--color-ivory)',
                          border: '1px solid var(--color-line)',
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'rgba(112,13,44,0.08)',
                            color: 'var(--color-wine)',
                          }}
                        >
                          <ShieldCheck size={15} />
                        </span>
                        <span>
                          <span
                            className="block text-sm font-bold"
                            style={{ color: 'var(--color-plum)' }}
                          >
                            {item.name}
                          </span>
                          <span
                            className="block text-[13px] leading-relaxed mt-1"
                            style={{ color: 'rgba(75,13,36,0.68)' }}
                          >
                            {item.detail}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Credential strip — the same claims the rest of the site makes,
                attached to the person who is accountable for them. */}
            <ul
              className="mt-8 pt-6 flex flex-wrap gap-2"
              style={{ borderTop: '1px solid var(--color-line)' }}
            >
              {founder.credentials.map((c) => (
                <li
                  key={c}
                  className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-2 rounded-full"
                  style={{
                    background: 'rgba(241,181,59,0.16)',
                    color: 'var(--color-gold-deep)',
                    border: '1px solid rgba(241,181,59,0.4)',
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
