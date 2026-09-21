import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Clapperboard,
  Database,
  GraduationCap,
  MapPin,
  Send,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import PageHeader from '@/components/page-header'
import { capabilities, careers } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Work across six connected capabilities for Catholic and mission-led organizations — with human judgment in the loop and named ownership of every piece of work.',
  alternates: { canonical: '/careers' },
}

/** Same icon per capability as the hero jars, so the two read as one system. */
const ICONS: Record<string, typeof BookOpen> = {
  publishing: BookOpen,
  media: Clapperboard,
  'digital-platforms': Workflow,
  'data-operations': Database,
  'ai-academy': GraduationCap,
  'cybersecurity-forensics': ShieldCheck,
}

const applyHref = (subject: string) =>
  `mailto:${careers.email}?subject=${encodeURIComponent(subject)}`

export default function CareersPage() {
  const { roles } = careers

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Do work that matters — and own it."
        intro="Join a team that connects six disciplines for Catholic and mission-led organizations, where people stay accountable and judgment is never automated away."
        breadcrumbs={[{ label: 'Careers', href: '/careers' }]}
      />

      {/* ── Why work here ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-wine)' }}
            >
              Why Six Jars
            </p>
            <h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{ color: 'var(--color-plum)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              What working here is actually like
            </h2>
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 gap-5">
            {careers.reasons.map((r, i) => (
              <li
                key={r.title}
                className="rounded-2xl p-6 lg:p-7"
                style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex w-9 h-9 rounded-lg items-center justify-center text-sm font-bold"
                  style={{ background: 'rgba(241,181,59,0.18)', color: 'var(--color-gold-deep)' }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                  {r.title}
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: 'rgba(75,13,36,0.74)' }}
                >
                  {r.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Where you could work ─────────────────────────────────────── */}
      <section className="py-16 lg:py-24" style={{ background: 'var(--color-parchment)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-wine)' }}
            >
              Six disciplines
            </p>
            <h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{ color: 'var(--color-plum)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              Where you could work
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: 'rgba(75,13,36,0.72)' }}>
              We hire into the same six capabilities we deliver. Read about each one
              before you apply — it tells you what the work involves day to day.
            </p>
          </div>

          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((c) => {
              const Icon = ICONS[c.slug] ?? Briefcase
              return (
                <li key={c.slug}>
                  <Link
                    href={`/capabilities/${c.slug}`}
                    className="group flex gap-4 h-full rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--color-plum)', color: 'var(--color-gold)' }}
                    >
                      <Icon size={20} strokeWidth={1.7} />
                    </span>
                    <span>
                      <span className="block text-base font-bold" style={{ color: 'var(--color-plum)' }}>
                        {c.fullName}
                      </span>
                      <span
                        className="block text-sm leading-relaxed mt-1"
                        style={{ color: 'rgba(75,13,36,0.68)' }}
                      >
                        {c.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ── Open roles ───────────────────────────────────────────────── */}
      <section
        id="open-roles"
        className="py-16 lg:py-24"
        style={{ background: 'var(--color-ivory)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="font-extrabold tracking-tight leading-tight"
            style={{ color: 'var(--color-plum)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Open roles
          </h2>

          {roles.length > 0 ? (
            <ul className="mt-8 space-y-4">
              {roles.map((role) => {
                const discipline = capabilities.find((c) => c.slug === role.capability)
                return (
                  <li
                    key={role.slug}
                    className="rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
                    style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
                  >
                    <div>
                      <p
                        className="text-[11px] font-bold tracking-[0.16em] uppercase"
                        style={{ color: 'var(--color-wine)' }}
                      >
                        {discipline?.shortName ?? 'Six Jars Global'} · {role.type}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                        {role.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: 'rgba(75,13,36,0.72)' }}>
                        {role.summary}
                      </p>
                      <p
                        className="mt-2 inline-flex items-center gap-1.5 text-sm"
                        style={{ color: 'rgba(75,13,36,0.6)' }}
                      >
                        <MapPin size={14} aria-hidden="true" />
                        {role.location}
                      </p>
                    </div>
                    <a
                      href={applyHref(`${careers.subject}: ${role.title}`)}
                      className="shrink-0 inline-flex items-center justify-center gap-2 px-6 rounded-full text-sm font-bold"
                      style={{ minHeight: 48, background: 'var(--color-wine)', color: 'var(--color-ivory)' }}
                    >
                      Apply for this role
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : (
            // No vacancy is advertised that does not exist. An honest empty
            // state with a real next step beats a stale or invented listing.
            <div
              className="mt-8 rounded-2xl p-7 lg:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6"
              style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
            >
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(241,181,59,0.18)', color: 'var(--color-gold-deep)' }}
                >
                  <Briefcase size={22} />
                </span>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                    No open roles right now
                  </h3>
                  <p
                    className="mt-1.5 text-base leading-relaxed max-w-xl"
                    style={{ color: 'rgba(75,13,36,0.72)' }}
                  >
                    We still want to hear from people who fit how we work. Send a general
                    application and we will keep it on file for the next opening in your
                    discipline.
                  </p>
                </div>
              </div>
              <a
                href={applyHref(`${careers.subject}: general`)}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-7 rounded-full text-sm font-bold"
                style={{ minHeight: 52, background: 'var(--color-wine)', color: 'var(--color-ivory)' }}
              >
                <Send size={16} aria-hidden="true" />
                Send a general application
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── How we hire ──────────────────────────────────────────────── */}
      <section className="on-dark py-16 lg:py-24" style={{ background: 'var(--color-plum)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              How we hire
            </p>
            <h2
              className="mt-3 font-extrabold tracking-tight leading-tight"
              style={{ color: 'var(--color-ivory)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
            >
              The same accountability we promise clients
            </h2>
          </div>

          <ol className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {careers.process.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(252,251,248,0.05)',
                  border: '1px solid rgba(252,251,248,0.12)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="text-xs font-bold tracking-[0.16em]"
                  style={{ color: 'var(--color-gold)' }}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-base font-bold" style={{ color: 'var(--color-ivory)' }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(252,251,248,0.66)' }}>
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <a
              href={applyHref(careers.subject)}
              className="inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ minHeight: 56, background: 'var(--color-gold)', color: 'var(--color-plum)' }}
            >
              Apply now
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 rounded-full text-base font-semibold"
              style={{
                minHeight: 56,
                background: 'rgba(252,251,248,0.08)',
                border: '1px solid rgba(252,251,248,0.28)',
                color: 'var(--color-ivory)',
              }}
            >
              Read about who we are
            </Link>
          </div>
          <p className="mt-4 text-sm" style={{ color: 'rgba(252,251,248,0.6)' }}>
            Applications go to{' '}
            <a href={applyHref(careers.subject)} className="underline underline-offset-2" style={{ color: 'var(--color-gold)' }}>
              {careers.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
