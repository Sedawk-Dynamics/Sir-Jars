import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import JarConstellation from '@/components/home/jar-constellation'
import { FlyingDoves } from '@/components/brand/dove'
import { commitments } from '@/lib/content'

/**
 * Hero: audience, outcome, operating advantage, one primary CTA.
 *
 * The banner is the founder's sketch made real: the golden dove at the centre,
 * six wobbling jars joined to it, over a perspective grid and soft colour
 * blooms, with doves crossing the sky behind. Every jar links to its
 * capability, so the picture doubles as navigation.
 *
 * The section itself stays a server component and the copy is plain static
 * markup — nothing in the first screen waits on JavaScript or on an entrance
 * animation. Motion enhances visible content; it never gates it.
 */
export default function Hero() {
  return (
    <section
      className="on-dark relative overflow-hidden"
      style={{ background: 'var(--color-plum)' }}
    >
      {/* Decorative ground: colour blooms, then the perspective grid. */}
      <div className="hero-bloom absolute inset-0" aria-hidden="true" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />

      {/* Doves crossing the scene, every few seconds. */}
      <FlyingDoves />

      {/* Readability scrim: the headline column must clear AA contrast
          wherever the blooms happen to land. */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, rgba(43,7,21,0.92) 0%, rgba(43,7,21,0.72) 44%, rgba(43,7,21,0.18) 100%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-14 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-12 items-center">
          <div>
            <p
              className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-gold)' }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-px w-8"
                style={{ background: 'var(--color-gold)' }}
              />
              For Catholic and mission-led organizations
            </p>

            <h1
              className="mt-6 font-extrabold tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.5rem, 4.6vw, 4rem)' }}
            >
              <span style={{ color: 'var(--color-ivory)' }}>Mission-critical work.</span>
              <br />
              <span className="text-gold-gradient">One accountable partner.</span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: 'rgba(252,251,248,0.78)' }}
            >
              Six Jars connects publishing, media, digital, data, cybersecurity and
              forensics — so your organization can move faster without losing judgment,
              discretion or control.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-gold)',
                  color: 'var(--color-plum)',
                  minHeight: 56,
                  boxShadow: '0 8px 30px rgba(241,181,59,0.28)',
                }}
              >
                Start a conversation
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/capabilities"
                className="inline-flex items-center justify-center px-8 rounded-full text-base font-semibold transition-colors duration-200"
                style={{
                  background: 'rgba(252,251,248,0.08)',
                  border: '1px solid rgba(252,251,248,0.28)',
                  color: 'var(--color-ivory)',
                  minHeight: 56,
                }}
              >
                Explore six capabilities
              </Link>
            </div>

            <p
              className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm"
              style={{ color: 'rgba(252,251,248,0.66)' }}
            >
              <ShieldCheck size={16} aria-hidden="true" style={{ color: 'var(--color-gold)' }} />
              Sensitive matter?{' '}
              <Link
                href="/contact?path=sensitive"
                className="font-semibold underline underline-offset-4"
                style={{ color: 'var(--color-gold)' }}
              >
                Get secure-channel guidance first
              </Link>
            </p>
          </div>

          <div>
            {/* jars="logo" — each jar in its own logo colour (option 2).
                jars="uniform" — every jar in the logo gold (option 1). */}
            <JarConstellation jars="logo" />
            <p
              className="mt-2 text-center text-xs font-bold tracking-[0.18em] uppercase"
              style={{ color: 'rgba(252,251,248,0.55)' }}
            >
              Select a jar to explore a capability
            </p>
          </div>
        </div>
      </div>

      {/* Proof rail — operating commitments, explicitly labelled as such.
          No invented metrics sit next to a call to action. */}
      <div
        className="relative"
        style={{
          background: 'rgba(20,3,10,0.72)',
          borderTop: '1px solid rgba(241,181,59,0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
          <h2 className="sr-only">Our operating commitments</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((c) => (
              <li key={c.title} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(241,181,59,0.16)',
                    color: 'var(--color-gold)',
                    border: '1px solid rgba(241,181,59,0.35)',
                  }}
                >
                  {c.mark}
                </span>
                <span>
                  <span
                    className="block text-sm font-bold"
                    style={{ color: 'var(--color-ivory)' }}
                  >
                    {c.title}
                  </span>
                  <span
                    className="block text-xs leading-relaxed mt-0.5"
                    style={{ color: 'rgba(252,251,248,0.6)' }}
                  >
                    {c.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs" style={{ color: 'rgba(252,251,248,0.42)' }}>
            These are operating commitments we hold ourselves to. Verified engagement
            outcomes are documented under{' '}
            <Link
              href="/proof"
              className="underline underline-offset-2"
              style={{ color: 'rgba(252,251,248,0.7)' }}
            >
              Proof
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
