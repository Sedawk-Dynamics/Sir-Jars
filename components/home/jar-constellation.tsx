import Link from 'next/link'
import {
  BookOpen,
  Clapperboard,
  Database,
  GraduationCap,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import Jar from '@/components/brand/jar'
import Image from 'next/image'
import { capabilities } from '@/lib/content'

/**
 * Hero scene, from the founder's sketch: the golden dove at the centre, six
 * labelled jars around it, each joined to the dove by a line.
 *
 * Motion
 *  - The ring of jars orbits the dove continuously; each jar counter-rotates
 *    so it stays upright, and the lines turn with the ring so every jar stays
 *    connected. The orbit pauses while the pointer or focus is in the scene,
 *    so a jar never slides out from under a click.
 *  - Jars wobble on their foot, each on its own period and phase so the set
 *    never moves in lockstep. Their ground shadows squash with the rock.
 *  - The dove (the brand's gold dove artwork) hovers gently in place.
 *  - Light travels outward along the connecting lines, dove to jar.
 *  - Hovering or focusing a jar steadies it and lifts it — it is a link, and a
 *    link should hold still when you reach for it.
 *  - prefers-reduced-motion collapses all of it (globals.css).
 *
 * Every jar is a real link to its capability page, so the scene is the
 * capability navigation, not a picture of it. Server component — no JS.
 */

type JarStyle = 'logo' | 'uniform'

/** Sampled from the six jars in the logo, left to right. */
const LOGO_GLAZES: Record<string, [string, string]> = {
  publishing: ['#8E2A36', '#5E0F1D'], // centre-left deep red-brown
  media: ['#A3386F', '#5C1440'], // orchid
  'digital-platforms': ['#B0204A', '#6A0418'], // crimson
  'data-operations': ['#B03A52', '#7A1E33'], // rose red
  'ai-academy': ['#94275F', '#4F0E30'], // plum magenta
  'cybersecurity-forensics': ['#7B2F5E', '#35102A'], // aubergine
}

/** "All jars in one logo colour" — the gold from the logo's arc. */
const UNIFORM_GLAZE: [string, string] = ['#FBD983', '#C98B18']

/**
 * Starting order around the ring, clockwise from the top, per the sketch:
 * Publishing, Media, Digital + AI, Data operations, Cybersecurity, Digital
 * forensics. Every jar sits on one true circle, so the orbit is a clean
 * rotation rather than jars drifting in and out.
 */
const RING_RADIUS = 35 // percent of the scene, from centre

const LAYOUT: Record<
  string,
  { slot: number; label: string; Icon: typeof BookOpen }
> = {
  publishing: { slot: 0, label: 'Publishing & Print Operations', Icon: BookOpen },
  media: { slot: 1, label: 'Media & Content Operations', Icon: Clapperboard },
  'digital-platforms': { slot: 2, label: 'Digital Platforms & Automation', Icon: Workflow },
  'data-operations': { slot: 3, label: 'Data & Business Operations', Icon: Database },
  'ai-academy': { slot: 4, label: 'AI & Future Skills Academy', Icon: GraduationCap },
  'cybersecurity-forensics': { slot: 5, label: 'Cybersecurity & Forensics', Icon: ShieldCheck },
}

function slotPosition(slot: number) {
  const angle = (slot / 6) * Math.PI * 2 - Math.PI / 2
  return {
    x: 50 + RING_RADIUS * Math.cos(angle),
    y: 50 + RING_RADIUS * Math.sin(angle),
  }
}

export default function JarConstellation({ jars = 'logo' }: { jars?: JarStyle }) {
  const placed = capabilities
    .filter((c) => LAYOUT[c.slug])
    .map((c, i) => ({ ...c, ...LAYOUT[c.slug], ...slotPosition(LAYOUT[c.slug].slot), i }))

  return (
    <div className="jar-scene relative w-full max-w-[640px] mx-auto aspect-square">
      {/* Warm light behind the composition, so the dark glazes still read. */}
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(241,181,59,0.22) 0%, rgba(135,33,67,0.32) 38%, rgba(75,13,36,0) 70%)',
        }}
      />

      {/* Orbit track — stays still while the ring turns along it. */}
      <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <circle
          cx="500"
          cy="500"
          r={RING_RADIUS * 10}
          fill="none"
          stroke="rgba(241,181,59,0.22)"
          strokeWidth="1.5"
          strokeDasharray="2 9"
        />
      </svg>

      {/* The rotating ring: lines and jars turn together. */}
      <div className="jar-orbit absolute inset-0">
      {/* Connecting lines, dove to jar. A faint solid rail with light
          travelling outward along it. */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="jar-line" cx="500" cy="500" r="480" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F1B53B" stopOpacity="0.9" />
            <stop offset="1" stopColor="#F1B53B" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        {placed.map((j) => (
          <g key={j.slug}>
            <line
              x1="500"
              y1="500"
              x2={j.x * 10}
              y2={j.y * 10}
              stroke="url(#jar-line)"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
            <line
              x1="500"
              y1="500"
              x2={j.x * 10}
              y2={j.y * 10}
              stroke="#FFD37A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="4 26"
              className="jar-line-flow"
              style={{ animationDelay: `${j.i * -0.4}s` }}
            />
          </g>
        ))}
      </svg>

      {/* The six jars — each a link to its capability. */}
      <ul className="absolute inset-0">
        {placed.map((j) => {
          const [top, bottom] = jars === 'uniform' ? UNIFORM_GLAZE : LOGO_GLAZES[j.slug]
          const ink = jars === 'uniform' ? 'var(--color-plum)' : 'var(--color-ivory)'
          return (
            <li
              key={j.slug}
              className="absolute"
              style={{
                left: `${j.x}%`,
                top: `${j.y}%`,
                width: 'clamp(74px, 21.5%, 136px)',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Counter-rotation keeps the jar upright as the ring turns. */}
              <span className="jar-orbit-counter block">
              <Link
                href={`/capabilities/${j.slug}`}
                className="jar-link group block relative rounded-2xl"
                aria-label={`${j.fullName} — view capability`}
              >
                {/* Ground shadow squashes as the jar rocks. */}
                <span
                  aria-hidden="true"
                  className="jar-shadow absolute left-1/2 -bottom-[3%] w-[62%] h-[6%] rounded-[50%]"
                  style={{
                    background: 'radial-gradient(closest-side, rgba(10,1,5,0.65), transparent)',
                    animationDuration: `${3 + (j.i % 3) * 0.45}s`,
                    animationDelay: `${j.i * -0.55}s`,
                  }}
                />

                <span
                  className="jar-wobble block relative"
                  style={{
                    animationDuration: `${3 + (j.i % 3) * 0.45}s`,
                    animationDelay: `${j.i * -0.55}s`,
                  }}
                >
                  <span className="jar-lift block relative">
                    <Jar
                      id={`jar-${j.slug}`}
                      top={top}
                      bottom={bottom}
                      className="block w-full h-auto jar-halo"
                    />
                    {/* Icon and name on the belly, set in HTML so both stay
                        crisp at every size the jar renders at. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-[15%] top-[30%] bottom-[13%] flex flex-col items-center justify-center gap-[6%] text-center"
                      style={{
                        color: ink,
                        filter:
                          jars === 'uniform'
                            ? 'none'
                            : 'drop-shadow(0 1px 2px rgba(20,3,10,0.55))',
                      }}
                    >
                      <j.Icon
                        strokeWidth={1.6}
                        className="w-[30%] h-auto shrink-0"
                        style={{ aspectRatio: '1 / 1' }}
                      />
                      <span
                        className="font-bold uppercase leading-[1.25]"
                        style={{
                          fontSize: 'clamp(5.6px, 0.8vw, 8px)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {j.label}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
              </span>
            </li>
          )
        })}
      </ul>
      </div>

      {/* The golden dove — fixed at the centre, above the ring. Sized so the
          six jars share the stage with it rather than orbiting a centrepiece. */}
      <div
        className="dove-hover absolute left-1/2 top-1/2 w-[44%]"
        aria-hidden="true"
      >
        <div className="dove-glow">
          {/* 1549×1400 transparent PNG — the brand's gold dove artwork. */}
          <Image
            src="/images/dove-gold.png"
            alt=""
            width={1549}
            height={1400}
            priority
            sizes="(max-width: 1024px) 44vw, 280px"
            className="block w-full h-auto"
          />
        </div>
      </div>

    </div>
  )
}
