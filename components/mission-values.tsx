import { patternVars } from '@/lib/patterns'

/**
 * Mission, vision and values — purpose near the hero, and every value turned
 * into an observable behaviour, with its explanation always visible.
 */

const values = [
  {
    name: 'Accountability',
    line: 'Name the owner.',
    proof: 'Every engagement, stage and exception has one named person. You always know who decides and who to call.',
    color: '#3A0D27',
  },
  {
    name: 'Human judgment',
    line: 'Keep people accountable.',
    proof: 'Automation assists, but a named reviewer approves every output that reaches your audience or your records.',
    color: '#3A0D27',
  },
  {
    name: 'Clarity',
    line: 'Show the next step.',
    proof: 'Every reply ends with a dated next step and who owns it — including when the answer is "not us".',
    color: '#6B153F',
  },
  {
    name: 'Responsible innovation',
    line: 'Adopt only useful change.',
    proof: 'New tools are classified as permitted, review-gated or prohibited before use, with the reasoning written down.',
    color: '#9A3070',
  },
  {
    name: 'Inclusion',
    line: 'Design for different needs.',
    proof: 'Content, training and interfaces are checked for accessibility, language and context before release.',
    color: '#9A2E4F',
  },
  {
    name: 'Proof',
    line: 'Separate fact from ambition.',
    proof: 'Close-out packs label what was verified and what is still intended. Commitments are never shown as results.',
    color: '#E0A526',
  },
]

export default function MissionValues() {
  return (
    <section className="py-10 lg:py-14" style={{ background: 'var(--color-ivory)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-12 items-start">
          {/* Mission and vision — two cards sharing the column height. */}
          <div className="flex flex-col gap-5 lg:self-stretch">
            {[
              {
                label: 'Mission',
                text: 'Turn complex work into clear, secure and measurable outcomes through coordinated expertise, practical technology and responsible execution.',
                background: '#3A0A24',
              },
              {
                label: 'Vision',
                text: 'A world where every organization and learner can access the skills, systems and safeguards needed to adapt, grow and create lasting value.',
                background: 'linear-gradient(135deg, var(--color-wine) 0%, var(--color-burgundy) 100%)',
              },
            ].map((card) => (
              <div
                key={card.label}
                className="on-dark patterned rounded-3xl p-7 lg:p-8 flex flex-col justify-center lg:flex-1"
                style={{ background: card.background, ...patternVars('hatch', 'gold') }}
              >
                <h2
                  className="text-xs font-bold tracking-[0.18em] uppercase"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {card.label}
                </h2>
                <p
                  className="mt-4 font-semibold leading-snug"
                  style={{
                    color: 'var(--color-ivory)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
                  }}
                >
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          {/* Values as observable behaviours */}
          <div>
            <h2
              className="text-xs font-bold tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--color-wine)' }}
            >
              Values you can observe
            </h2>
            <ul className="grid sm:grid-cols-2 gap-5">
              {values.map((v) => {
                return (
                  <li
                    key={v.name}
                    className="flex flex-col rounded-2xl p-5 transition-shadow duration-200 hover:shadow-md"
                    style={{ background: '#FFFFFF', border: `2px solid ${v.color}` }}
                  >
                    <h3 className="text-base font-bold" style={{ color: 'var(--color-plum)' }}>
                      {v.name}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(0,0,0,0.8)' }}>
                      {v.line}
                    </p>
                    <p
                      className="mt-3 pt-3 text-sm leading-relaxed"
                      style={{ borderTop: '1px solid var(--color-line)', color: 'rgba(0,0,0,0.78)' }}
                    >
                      {v.proof}
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
