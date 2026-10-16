import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import JarConstellation from '@/components/home/jar-constellation'
import { FlyingDoves } from '@/components/brand/dove'
import HeroPattern, { HERO_BASE } from '@/components/home/hero-pattern'

/**
 * Hero: audience, outcome, operating advantage, one primary CTA.
 *
 * The banner is the founder's sketch made real: the golden dove at the centre,
 * six wobbling jars joined to it, on a dusty-rose ground patterned with
 * tone-on-tone ring swirls, with doves crossing the sky behind. Every jar links to its
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
      style={{ background: HERO_BASE }}
    >
      {/* Decorative ground: dusty rose with tone-on-tone ring swirls. */}
      <HeroPattern className="absolute inset-0 w-full h-full" />

      {/* Doves crossing the scene, every few seconds. */}
      <FlyingDoves />

      {/* Readability wash. On the lighter rose, ivory body text and the gold
          headline fall below AA contrast, so a plum wash sits behind the
          text only: a left-to-right fade on desktop (the jar scene keeps the
          pure rose), an even tint on mobile where text spans the full width.
          With it, gold clears ~5:1 and ivory body text ~7:1. */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        aria-hidden="true"
        style={{ background: 'rgba(60,10,30,0.46)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(100deg, rgba(60,10,30,0.62) 0%, rgba(60,10,30,0.46) 40%, rgba(60,10,30,0) 66%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-8 pb-8 lg:pt-10 lg:pb-10">
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
              Six services. Built around your goals.
            </p>

            <h1
              className="mt-6 font-extrabold tracking-tight leading-[1.05]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
            >
              <span style={{ color: 'var(--color-ivory)' }}>Practical help to </span>
              <span className="text-gold-gradient">bring your ideas to life.</span>
            </h1>

            <p
              className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
              style={{ color: 'rgba(252,251,248,0.78)' }}
            >
              You might be preparing a book, planning a podcast, improving a work process
              or learning a new skill. We bring the right people together and give you one
              contact to guide the work from your first brief to the finished result.
            </p>

            <p
              className="mt-4 text-sm sm:text-base font-semibold"
              style={{ color: 'var(--color-gold)' }}
            >
              For individuals and organisations. Scope and price agreed with you.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--color-gold)',
                  color: '#000000',
                  minHeight: 56,
                  boxShadow: '0 8px 30px rgba(239,184,60,0.28)',
                }}
              >
                Tell us what you want to achieve
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/capabilities"
                className="inline-flex items-center justify-center px-8 rounded-full text-base font-semibold whitespace-nowrap transition-colors duration-200"
                style={{
                  background: 'rgba(252,251,248,0.08)',
                  border: '1px solid rgba(252,251,248,0.28)',
                  color: 'var(--color-ivory)',
                  minHeight: 56,
                }}
              >
                Explore our services
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
              style={{ color: 'rgba(252,251,248,0.94)' }}
            >
              Six jars · six connected capabilities
            </p>
            <p
              className="mt-1.5 text-center text-xs"
              style={{ color: 'rgba(252,251,248,0.9)' }}
            >
              Hover to pause the orbit — select any jar to explore that capability.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
