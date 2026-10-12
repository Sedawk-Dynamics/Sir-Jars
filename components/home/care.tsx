import { care } from '@/lib/content'

/** CARE in every step — four static cards, the letter above each word. */
export default function Care() {
  return (
    <section className="py-20 lg:py-28" style={{ background: 'var(--color-parchment)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <h2
          className="font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-plum)', fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          CARE in every step
        </h2>

        <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {care.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl p-6"
              style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
            >
              <span
                aria-hidden="true"
                className="block font-bold leading-none"
                style={{
                  color: 'var(--color-wine)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3.5rem',
                }}
              >
                {item.letter}
              </span>
              <h3 className="mt-4 text-xl font-bold" style={{ color: 'var(--color-plum)' }}>
                {item.title}
              </h3>
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
