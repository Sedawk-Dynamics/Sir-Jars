import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check, Mail, Plus, Send } from 'lucide-react'
import PageHeader, { verticalVisuals } from '@/components/page-header'
import BackToHome from '@/components/back-to-home'
import JsonLd from '@/components/json-ld'
import { capabilities, careers, getRole, type Role } from '@/lib/content'
import { patternVars } from '@/lib/patterns'
import { jobPostingSchema, pageMetadata } from '@/lib/seo'

type Params = { params: Promise<{ slug: string }> }

/**
 * One open role, rendered from careers.roles in lib/content.ts. Every role
 * gets a static, crawlable URL and JobPosting data for Google for Jobs.
 */

export function generateStaticParams() {
  return careers.roles.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const role = getRole(slug)
  if (!role) return {}
  return pageMetadata({
    title: `${role.title} — Careers`,
    description: role.summary,
    path: `/careers/${role.slug}`,
  })
}

const applyHref = (role: Role) =>
  `mailto:${careers.email}?subject=${encodeURIComponent(role.applySubject)}`

/** The full posting as simple HTML, which is what JobPosting.description expects. */
function postingHtml(role: Role) {
  const list = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`
  return [
    ...role.about.map((p) => `<p>${p}</p>`),
    '<p>What you will do:</p>',
    list(role.responsibilities.map((r) => `${r.area}: ${r.detail}`)),
    `<p>What we are looking for: ${role.requirements.intro}</p>`,
    list(role.requirements.items),
    '<p>Bonus if you have:</p>',
    list(role.requirements.bonus),
    '<p>What you will get:</p>',
    list(role.benefits),
    '<p>How to apply:</p>',
    list(role.howToApply),
  ].join('')
}

const sectionHeading = 'font-extrabold tracking-tight leading-tight'
const sectionHeadingStyle = { color: 'var(--color-plum)', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }

export default async function RolePage({ params }: Params) {
  const { slug } = await params
  const role = getRole(slug)
  if (!role) notFound()

  const discipline = capabilities.find((c) => c.slug === role.capability)
  const pattern = verticalVisuals[role.capability]?.pattern ?? 'dots'

  return (
    <>
      <JsonLd
        data={jobPostingSchema({
          slug: role.slug,
          title: role.title,
          description: postingHtml(role),
          datePosted: role.datePosted,
          type: role.type,
          monthlyPay: role.monthlyPay,
          email: careers.email,
        })}
      />
      <PageHeader
        eyebrow={`Careers · ${discipline?.fullName ?? role.type}`}
        title={role.title}
        intro={role.summary}
        breadcrumbs={[
          { label: 'Careers', href: '/careers' },
          { label: role.title, href: `/careers/${role.slug}` },
        ]}
        image={null}
        pattern={pattern}
        action={
          <a
            href={applyHref(role)}
            className="inline-flex items-center justify-center gap-2 px-7 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--color-gold)', color: '#000000', minHeight: 56 }}
          >
            <Send size={17} aria-hidden="true" />
            Apply for this role
          </a>
        }
      />

      {/* ── Key facts ────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <dl
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ background: 'var(--color-line)', border: '1px solid var(--color-line)' }}
          >
            {role.facts.map((f) => (
              <div key={f.label} className="p-5" style={{ background: '#FFFFFF' }}>
                <dt
                  className="text-[11px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: 'var(--color-wine)' }}
                >
                  {f.label}
                </dt>
                <dd className="text-base mt-1.5 leading-snug" style={{ color: 'var(--color-plum)' }}>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* ── The role ─────────────────────────────────────────────── */}
          <div className="mt-10 max-w-3xl">
            <h2 className={sectionHeading} style={sectionHeadingStyle}>
              The role
            </h2>
            <div className="mt-4 space-y-4">
              {role.about.map((p) => (
                <p key={p} className="text-base leading-[1.8]" style={{ color: 'rgba(0,0,0,0.8)' }}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What you'll do ───────────────────────────────────────────── */}
      <section className="py-8 lg:py-10" style={{ background: 'var(--color-parchment)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className={sectionHeading} style={sectionHeadingStyle}>
            What you&rsquo;ll do
          </h2>
          <p className="mt-3 text-base leading-relaxed max-w-2xl" style={{ color: 'rgba(0,0,0,0.72)' }}>
            Your work will span four areas, weighted based on the live project needs and your
            strengths.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-4">
            {role.responsibilities.map((r, i) => (
              <li
                key={r.area}
                className="rounded-2xl p-6"
                style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex w-9 h-9 rounded-lg items-center justify-center text-sm font-bold"
                  style={{ background: 'rgba(239,184,60,0.18)', color: 'var(--color-gold-deep)' }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
                  {r.area}
                </h3>
                <p className="mt-2 text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.74)' }}>
                  {r.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What we're looking for / What you'll get ─────────────────── */}
      <section className="py-8 lg:py-10" style={{ background: 'var(--color-ivory)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <h2 className={sectionHeading} style={sectionHeadingStyle}>
              What we&rsquo;re looking for
            </h2>
            <p className="mt-3 text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.72)' }}>
              {role.requirements.intro}
            </p>
            <CheckList items={role.requirements.items} icon="check" />

            <h3 className="mt-8 text-lg font-bold" style={{ color: 'var(--color-plum)' }}>
              Bonus if you have
            </h3>
            <CheckList items={role.requirements.bonus} icon="plus" />
          </div>

          <div>
            <h2 className={sectionHeading} style={sectionHeadingStyle}>
              What you&rsquo;ll get
            </h2>
            <CheckList items={role.benefits} icon="check" />
          </div>
        </div>
      </section>

      {/* ── How to apply ─────────────────────────────────────────────── */}
      <section
        className="on-dark patterned py-8 lg:py-10"
        style={{ background: 'var(--color-plum)', ...patternVars('waves', 'rose') }}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            How to apply
          </p>
          <h2
            className="mt-3 font-extrabold tracking-tight leading-tight"
            style={{ color: 'var(--color-ivory)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Ready to apply?
          </h2>

          <ol className="mt-8 grid md:grid-cols-3 gap-4">
            {role.howToApply.map((step, i) => (
              <li
                key={step}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <span
                  aria-hidden="true"
                  className="text-xs font-bold tracking-[0.16em]"
                  style={{ color: 'var(--color-gold)' }}
                >
                  STEP {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {step}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-base leading-relaxed max-w-3xl" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Email{' '}
            <a
              href={applyHref(role)}
              className="font-semibold underline underline-offset-2"
              style={{ color: 'var(--color-gold)' }}
            >
              {careers.email}
            </a>{' '}
            with the subject line &ldquo;{role.applySubject}&rdquo; and attach your CV. Include a
            link to something you have built — GitHub, a live project, anything that shows how you
            think.
          </p>
          <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We review applications on a rolling basis and respond to everyone.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={applyHref(role)}
              className="inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
              style={{ minHeight: 56, background: 'var(--color-gold)', color: '#000000' }}
            >
              <Mail size={18} aria-hidden="true" />
              Email your application
            </a>
            <Link
              href="/careers#open-roles"
              className="inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-semibold"
              style={{
                minHeight: 56,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.28)',
                color: 'var(--color-ivory)',
              }}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              All open roles
            </Link>
          </div>
        </div>
      </section>

      <BackToHome />
    </>
  )
}

function CheckList({ items, icon }: { items: string[]; icon: 'check' | 'plus' }) {
  const Icon = icon === 'check' ? Check : Plus
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="shrink-0 mt-0.5 w-6 h-6 rounded-full inline-flex items-center justify-center"
            style={{ background: 'rgba(107,21,63,0.08)', color: 'var(--color-wine)' }}
          >
            <Icon size={14} strokeWidth={2.5} />
          </span>
          <span className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.78)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
