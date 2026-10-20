import type { Metadata } from 'next'
import PageHeader from '@/components/page-header'
import { patternVars } from '@/lib/patterns'

export const metadata: Metadata = {
  title: 'About Color Options',
  description: 'A visual comparison of color directions for the About section Mission and Vision cards.',
  robots: { index: false, follow: false },
}

const messageCards = [
  {
    label: 'Mission',
    text: 'Turn complex work into clear, secure and measurable outcomes through coordinated expertise, practical technology and responsible execution.',
  },
  {
    label: 'Vision',
    text: 'A world where every organization and learner can access the skills, systems and safeguards needed to adapt, grow and create lasting value.',
  },
]

const palettes = [
  {
    name: 'Palette A · Aubergine Mission',
    description: 'From the first supplied palette: muted aubergine for Mission, with a magenta-to-crimson Vision gradient.',
    mission: '#612A4D',
    vision: 'linear-gradient(135deg, #9A336D 0%, #962B41 100%)',
    visionStart: '#9A336D',
    visionEnd: '#962B41',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Palette A · Crimson Mission',
    description: 'The same supplied colors reversed: crimson for Mission, with an aubergine-to-magenta Vision gradient.',
    mission: '#962B41',
    vision: 'linear-gradient(135deg, #612A4D 0%, #9A336D 100%)',
    visionStart: '#612A4D',
    visionEnd: '#9A336D',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Palette B · Plum Mission',
    description: 'From the second supplied palette: deep plum for Mission, a wine-to-oxblood Vision gradient and an amber accent.',
    mission: '#3A0D27',
    vision: 'linear-gradient(135deg, #6B153F 0%, #66111C 100%)',
    visionStart: '#6B153F',
    visionEnd: '#66111C',
    accent: '#E3971D',
    accentName: 'Amber',
  },
  {
    name: 'Palette B · Oxblood Mission',
    description: 'The second palette rearranged: oxblood for Mission, a plum-to-wine Vision gradient and the amber accent.',
    mission: '#66111C',
    vision: 'linear-gradient(135deg, #3A0D27 0%, #6B153F 100%)',
    visionStart: '#3A0D27',
    visionEnd: '#6B153F',
    accent: '#E3971D',
    accentName: 'Amber',
  },
  {
    name: 'Signature Plum',
    description: 'A confident, brand-led direction using the site’s established plum and wine tones.',
    mission: '#3A0D27',
    vision: 'linear-gradient(135deg, #6B153F 0%, #872143 100%)',
    visionStart: '#6B153F',
    visionEnd: '#872143',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Rosewood',
    description: 'A warmer, softer evolution of the current burgundy with the familiar gold accent.',
    mission: '#642A3E',
    vision: 'linear-gradient(135deg, #78364B 0%, #8A4055 100%)',
    visionStart: '#78364B',
    visionEnd: '#8A4055',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Deep Garnet',
    description: 'A richer, redder take that leans on the brand burgundy and rose for more warmth and energy.',
    mission: '#5A0F23',
    vision: 'linear-gradient(135deg, #7A1530 0%, #9A2E4F 100%)',
    visionStart: '#7A1530',
    visionEnd: '#9A2E4F',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Mulberry',
    description: 'A cooler berry-purple family that stays in the plum world but feels fresher and more modern.',
    mission: '#4A1638',
    vision: 'linear-gradient(135deg, #6E2552 0%, #8C3466 100%)',
    visionStart: '#6E2552',
    visionEnd: '#8C3466',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Midnight Aubergine',
    description: 'A deep, almost-black violet for a premium, understated feel where the gold labels really pop.',
    mission: '#24102C',
    vision: 'linear-gradient(135deg, #3D1A47 0%, #552461 100%)',
    visionStart: '#3D1A47',
    visionEnd: '#552461',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
  {
    name: 'Espresso & Wine',
    description: 'A grounded, earthy pairing: warm espresso brown for Mission against a wine gradient for Vision.',
    mission: '#3B2420',
    vision: 'linear-gradient(135deg, #6B153F 0%, #872143 100%)',
    visionStart: '#6B153F',
    visionEnd: '#872143',
    accent: '#EFB83C',
    accentName: 'Brand gold',
  },
]

export default function AboutColorOptionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Design preview"
        title="About section color directions"
        intro="Options for refreshing the Mission and Vision cards, starting with the two supplied brand palettes, while keeping the Six Jars Global look cohesive."
        breadcrumbs={[
          { label: 'About', href: '/about' },
          { label: 'Color options', href: '/about/color-options' },
        ]}
        image={null}
        pattern="hatch"
      />

      <section className="py-8 lg:py-12" style={{ background: 'var(--color-parchment)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {palettes.map((palette, index) => (
              <article
                key={palette.name}
                className="rounded-3xl p-5 sm:p-7"
                style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p
                      className="text-xs font-bold tracking-[0.18em] uppercase"
                      style={{ color: 'var(--color-wine)' }}
                    >
                      Option {index + 1}
                    </p>
                    <h2
                      className="mt-2 text-2xl font-bold"
                      style={{ color: 'var(--color-plum)' }}
                    >
                      {palette.name}
                    </h2>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.72)' }}>
                      {palette.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3" aria-label={`${palette.name} color palette`}>
                  {[
                    { label: 'Mission', color: palette.mission },
                    { label: 'Vision start', color: palette.visionStart },
                    { label: 'Vision end', color: palette.visionEnd },
                    { label: palette.accentName, color: palette.accent },
                  ].map((swatch) => (
                    <div key={swatch.label}>
                      <div
                        className="h-10 rounded-lg"
                        style={{ background: swatch.color, border: '1px solid rgba(0,0,0,0.12)' }}
                        aria-hidden="true"
                      />
                      <p className="mt-1.5 text-xs font-semibold" style={{ color: 'var(--color-plum)' }}>
                        {swatch.label}
                      </p>
                      <p className="text-xs" style={{ color: 'rgba(0,0,0,0.68)' }}>
                        {swatch.color}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-4">
                  {messageCards.map((card) => (
                    <div
                      key={card.label}
                      className="on-dark patterned flex min-h-40 flex-col justify-center rounded-2xl p-6 sm:p-7"
                      style={{
                        background: card.label === 'Mission' ? palette.mission : palette.vision,
                        ...patternVars('hatch', 'gold'),
                      }}
                    >
                      <h3
                        className="text-xs font-bold tracking-[0.18em] uppercase"
                        style={{ color: palette.accent }}
                      >
                        {card.label}
                      </h3>
                      <p
                        className="mt-3 font-semibold leading-snug"
                        style={{
                          color: '#FFFFFF',
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
                        }}
                      >
                        {card.text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.72)' }}>
            All options retain white card text, gold or amber labels and the existing hatch pattern. The live About section is unchanged.
          </p>
        </div>
      </section>
    </>
  )
}
