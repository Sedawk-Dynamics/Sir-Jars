import Image from 'next/image'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { founder } from '@/lib/content'

/**
 * Cofounder & CEO section — one compact card: portrait on the left, name, a
 * short profile and direct contact on the right.
 */
export default function FounderSection() {

  return (
    <section
      className="py-8 lg:py-10"
      style={{ background: 'var(--color-ivory)' }}
      aria-labelledby="founder-heading"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <article
          className="grid sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)] rounded-3xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--color-line)',
            boxShadow: '0 14px 40px -26px rgba(58,13,39,0.35)',
          }}
        >
          <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-full">
            {founder.photo ? (
              <Image
                src={founder.photo}
                alt={founder.photoAlt}
                fill
                sizes="(max-width: 640px) 100vw, 240px"
                className="object-cover"
                style={{ objectPosition: '58% 22%' }}
              />
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold"
                style={{
                  background: 'radial-gradient(circle at 50% 38%, #872143 0%, #3A0D27 72%)',
                  color: 'var(--color-gold)',
                }}
              >
                {founder.name
                  .split(/\s+/)
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
            )}
          </div>

          <div className="p-6 lg:p-8">
            <p
              className="text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-wine)' }}
            >
              The cofounder &amp; CEO
            </p>
            <h2
              id="founder-heading"
              className="mt-2 text-2xl font-extrabold tracking-tight"
              style={{ color: 'var(--color-plum)' }}
            >
              {founder.name}
            </h2>
            <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--color-wine)' }}>
              {founder.role}, {founder.company}
            </p>

            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: 'rgba(0,0,0,0.78)' }}
            >
              We started Six Jars to make it easier for people to find the right support for
              their work. Whether you come to us with a publication, a digital project or a
              learning need, we agree the work with you, bring in the right specialists and
              stay responsible for the handover.
            </p>

            <div
              className="mt-5 pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
              style={{ borderTop: '1px solid var(--color-line)', color: 'rgba(0,0,0,0.78)' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} aria-hidden="true" style={{ color: 'var(--color-wine)' }} />
                {founder.location}
              </span>
              <a
                href={`mailto:${founder.email}`}
                className="inline-flex items-center gap-1.5 hover:underline break-all"
              >
                <Mail size={14} aria-hidden="true" style={{ color: 'var(--color-wine)' }} />
                {founder.email}
              </a>
              <a
                href={`tel:${founder.phoneHref}`}
                className="inline-flex items-center gap-1.5 hover:underline"
              >
                <Phone size={14} aria-hidden="true" style={{ color: 'var(--color-wine)' }} />
                {founder.phone}
              </a>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold"
                style={{ color: 'var(--color-wine)' }}
              >
                LinkedIn
                <ArrowUpRight size={14} aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
