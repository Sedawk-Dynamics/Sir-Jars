import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { patternVars } from '@/lib/patterns'

/**
 * Shared enquiry block (developer change guide, 28 Sep 2026): plum field,
 * white text, primary action in gold with black text.
 */
export default function EnquiryBlock() {
  return (
    <section
      className="on-dark patterned py-20 lg:py-28"
      style={{ background: 'var(--color-plum)', ...patternVars('diagonal') }}
    >
      <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <h2
          className="font-extrabold tracking-tight leading-tight"
          style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
        >
          Tell us what you want to achieve
        </h2>
        <p
          className="mt-5 text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          Tell us what you are working on and where you need help. We will discuss what is
          involved, what it will cost and how to get started.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-8 rounded-full text-base font-bold transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: 'var(--color-gold)', color: '#000000', minHeight: 56 }}
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
            className="inline-flex items-center justify-center px-8 rounded-full text-base font-semibold transition-colors duration-200"
            style={{
              border: '1px solid rgba(255,255,255,0.45)',
              color: '#FFFFFF',
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
