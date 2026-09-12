/**
 * The Six Jars mark, as a single jar.
 *
 * Stroke-led rather than filled, so it reads as a precise instrument at 28px
 * on a dark ground instead of a heavy blob. `tone` is the outline and the
 * band; the body carries the same colour at low alpha so the jar has volume
 * without becoming a solid shape.
 *
 * Purely decorative wherever it appears — the surrounding control carries the
 * accessible name — so it is always aria-hidden.
 */
export default function Jar({
  size = 28,
  tone = 'currentColor',
  className,
}: {
  size?: number
  tone?: string
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Body — faint fill for volume, crisp outline for definition. */}
      <path
        d="M5.2 9.6c0-1.9 1.5-3.4 3.4-3.4h6.8c1.9 0 3.4 1.5 3.4 3.4v8.6c0 1.9-1.5 3.4-3.4 3.4H8.6c-1.9 0-3.4-1.5-3.4-3.4V9.6Z"
        fill={tone}
        fillOpacity="0.14"
        stroke={tone}
        strokeWidth="1.4"
      />
      {/* Neck */}
      <path
        d="M9 6.2V4.9h6v1.3"
        stroke={tone}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Lid */}
      <rect
        x="7.3"
        y="2.2"
        width="9.4"
        height="2.7"
        rx="1.35"
        fill={tone}
        fillOpacity="0.3"
        stroke={tone}
        strokeWidth="1.4"
      />
      {/* Label band — the surface the capability is 'held' on. */}
      <path
        d="M8.1 12.4h7.8v4.6H8.1z"
        stroke={tone}
        strokeWidth="1.2"
        strokeOpacity="0.75"
      />
    </svg>
  )
}
