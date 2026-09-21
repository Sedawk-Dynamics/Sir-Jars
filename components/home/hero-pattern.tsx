/**
 * Hero ground: dusty rose (#915966) with a tone-on-tone pattern of
 * overlapping concentric-ring swirls, matching the supplied reference.
 *
 * Built as an SVG <pattern> rather than a bitmap so it stays crisp at every
 * DPR and tiles without seams. Each swirl paints a base-coloured disc before
 * its rings, so a later swirl sits on top of the one before it — that
 * occlusion is what produces the overlapping-scales look. Swirls that cross a
 * tile edge are repeated at their wrapped position so the join is invisible.
 *
 * Server component, zero JS, decorative only.
 */

export const HERO_BASE = '#915966'

const TILE = 260
const RADIUS = 128
const RING_GAP = 6

/** Swirl centres in paint order (top to bottom), including edge wraps. */
const CENTRES: [number, number][] = [
  [0, -65],
  [TILE, -65],
  [TILE / 2, 65],
  [0, 195],
  [TILE, 195],
  [TILE / 2, 325],
]

const RINGS = Array.from(
  { length: Math.floor(RADIUS / RING_GAP) },
  (_, i) => (i + 1) * RING_GAP
)

export default function HeroPattern({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      focusable="false"
      width="100%"
      height="100%"
    >
      <defs>
        <pattern
          id="hero-swirl"
          width={TILE}
          height={TILE}
          patternUnits="userSpaceOnUse"
        >
          <rect width={TILE} height={TILE} fill={HERO_BASE} />
          {CENTRES.map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={RADIUS} fill={HERO_BASE} />
              <g fill="none" stroke="#FFF1F4" strokeOpacity="0.075" strokeWidth="1.3">
                {RINGS.map((r) => (
                  <circle key={r} cx={cx} cy={cy} r={r} />
                ))}
              </g>
              {/* A faint darker groove at the rim separates overlapping swirls. */}
              <circle
                cx={cx}
                cy={cy}
                r={RADIUS - 0.5}
                fill="none"
                stroke="#3C0A1E"
                strokeOpacity="0.08"
                strokeWidth="1.5"
              />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-swirl)" />
    </svg>
  )
}
