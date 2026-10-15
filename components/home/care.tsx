import { care } from '@/lib/content'

/** CARE in every step — four compact cards, the letter beside each word. */
export default function Care() {
  return (
    <section className="py-12 lg:py-16" style={{ background: 'var(--color-parchment)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2
          className="font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-plum)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
        >
          CARE in every step
        </h2>

        <ul className="mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {care.map((item) => (
            <li
              key={item.title}
              className="rounded-xl p-4 lg:p-5"
              style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="font-bold leading-none"
                  style={{
                    color: 'var(--color-wine)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2.25rem',
                  }}
                >
                  {item.letter}
                </span>
                <h3 className="text-lg font-bold leading-snug" style={{ color: 'var(--color-plum)' }}>
                  {item.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.75)' }}>
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
