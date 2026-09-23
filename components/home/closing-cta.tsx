import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Short closing CTA. The detailed form lives on /contact — the homepage asks
 * for the conversation, it does not stage the whole intake in place.
 */
export default function ClosingCta() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ background: 'var(--color-ivory)' }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <p
          className="text-xs font-bold tracking-[0.18em] uppercase"
          style={{ color: 'var(--color-wine)' }}
        >
          Mission, Made Capable.
        </p>
        <h2
          className="mt-4 font-extrabold tracking-tight leading-tight"
          style={{
            color: 'var(--color-plum)',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
          }}
        >
          Tell us what must work — and what cannot be compromised.
        </h2>
        <p
          className="mt-5 text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(75,13,36,0.72)' }}
        >
          Every inquiry is acknowledged with a named owner and a documented next step.
          Sensitive matters get secure-channel guidance before you send any detail.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: 'var(--color-wine)',
              color: 'var(--color-ivory)',
              minHeight: 56,
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
              background: 'transparent',
              border: '1px solid rgba(112,13,44,0.3)',
              color: 'var(--color-wine)',
              minHeight: 56,
            }}
          >
            Explore six capabilities
          </Link>
        </div>
      </div>
    </section>
  )
}
