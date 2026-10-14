import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Shared enquiry block. A light warm-gold field, so it reads as its own
 * section instead of merging into the plum footer directly below it.
 */
export default function EnquiryBlock() {
  return (
    <section
      className="py-20 lg:py-24"
      style={{
        background: '#FBF1DA',
        borderTop: '1px solid rgba(239,184,60,0.45)',
      }}
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2
          className="font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-plum)', fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
        >
          Tell us what you want to achieve
        </h2>
        <p
          className="mt-5 text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(0,0,0,0.78)' }}
        >
          Tell us what you are working on and where you need help. We will discuss what is
          involved, what it will cost and how to get started.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--color-wine)', color: '#FFFFFF', minHeight: 56 }}
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
            className="inline-flex items-center justify-center px-8 rounded-full text-base font-semibold transition-colors duration-200 hover:bg-white"
            style={{
              border: '1px solid var(--color-wine)',
              color: 'var(--color-wine)',
              minHeight: 56,
            }}
          >
            Explore our services
          </Link>
        </div>
      </div>
    </section>
  )
}
