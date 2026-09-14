/**
 * One jar, in the logo's amphora silhouette: flared lip, narrow neck, broad
 * shoulders, a belly that tapers to a small foot.
 *
 * Lit like glazed ceramic — a vertical colour gradient, a soft gloss streak on
 * the left of the belly, a gold rim at the lip and a thin gold outline so the
 * darker logo colours still separate from a dark plum ground.
 */

export const JAR_PATH =
  'M36 6H84Q86 6 86 9Q86 13 80 15Q74 18 74 28Q74 40 92 52Q112 66 110 96' +
  'Q108 128 86 150L84 154H36L34 150Q12 128 10 96Q8 66 28 52Q46 40 46 28' +
  'Q46 18 40 15Q34 13 34 9Q34 6 36 6Z'

export default function Jar({
  id,
  top,
  bottom,
  className,
}: {
  /** Unique per instance — gradient ids are document-global. */
  id: string
  top: string
  bottom: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`${id}-glaze`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <radialGradient id={`${id}-gloss`} cx="0.3" cy="0.55" r="0.5">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d={JAR_PATH}
        fill={`url(#${id}-glaze)`}
        stroke="rgba(241,181,59,0.62)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
      {/* Gloss across the left of the belly. */}
      <path d={JAR_PATH} fill={`url(#${id}-gloss)`} />
      <ellipse
        cx="33"
        cy="92"
        rx="5"
        ry="24"
        fill="#FFFFFF"
        fillOpacity="0.16"
        transform="rotate(12 33 92)"
      />
      {/* Gold rim at the lip and a band at the shoulder. */}
      <path d="M36 7H84" stroke="#F1B53B" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M24 57Q60 66 96 57"
        stroke="#F1B53B"
        strokeOpacity="0.55"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}
