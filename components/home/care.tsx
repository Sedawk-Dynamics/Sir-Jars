import { care } from '@/lib/content'

/**
 * CARE in every step — four compact gradient cards. Each card steps one shade
 * further along the logo palette (plum → wine → burgundy → rose), so the row
 * reads as one progression; the letter sits in a gold badge.
 */
const gradients = [
  'linear-gradient(135deg, #3A0D27 0%, #6B153F 100%)',
  'linear-gradient(135deg, #6B153F 0%, #872143 100%)',
  'linear-gradient(135deg, #872143 0%, #9A2E4F 100%)',
  'linear-gradient(135deg, #9A2E4F 0%, #C2506F 100%)',
]

export default function Care() {
  return (
    <section className="py-6 lg:py-8" style={{ background: 'var(--color-parchment)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2
          className="text-center font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-plum)', fontSize: 'clamp(1.5rem, 3vw, 2.125rem)' }}
        >
          CARE in every step
        </h2>

        <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {care.map((item, i) => (
            <li
              key={item.title}
              className="on-dark relative overflow-hidden rounded-xl px-4 py-3 transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: `radial-gradient(circle at 100% 0%, rgba(239,184,60,0.22), transparent 55%), ${gradients[i % gradients.length]}`,
                boxShadow: '0 14px 28px -20px rgba(58,13,39,0.7)',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center font-bold leading-none"
                  style={{
                    color: 'var(--color-gold)',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(239,184,60,0.45)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.375rem',
                  }}
                >
                  {item.letter}
                </span>
                <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--color-ivory)' }}>
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
