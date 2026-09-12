/**
 * The dove, in the secular reading the brief asks for: body, head and two
 * swept wings, and deliberately no olive leaf. It keeps the silhouette the
 * logo concept is built on while staying legible to a non-Catholic audience,
 * which is the whole point of dropping the leaf.
 *
 * The wings sit in their own <g> so a flap can be animated on that group
 * alone — the body stays put, which is what makes the motion read as flight
 * rather than as the whole glyph pulsing.
 */
export function Dove({
  size = 40,
  tone = 'currentColor',
  className,
  flap = false,
}: {
  size?: number
  tone?: string
  className?: string
  /** Animate the wings. Ignored under prefers-reduced-motion (see globals.css). */
  flap?: boolean
}) {
  return (
    <svg
      width={size}
      height={(size * 48) / 64}
      viewBox="0 0 64 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Body, head and beak in one sweep — tail at the left, beak at the right. */}
      <path
        d="M6 33.5c8.5 4.2 21.5 3.8 31.5-3.2 4.8-3.4 8.2-7.8 9.8-11.8l8-1.6-7.6-3.1c-3-1.2-6.1 0-7.7 2.5C34.6 24 22.2 28.8 9 27.8Z"
        fill={tone}
      />
      {/* Eye — punched out of the head so it reads at 28px. */}
      <circle cx="46.6" cy="16.4" r="1.15" fill="var(--color-plum, #4B0D24)" />

      <g
        style={{ transformOrigin: '28px 29px' }}
        className={flap ? 'dove-wings' : undefined}
      >
        {/* Upper wing */}
        <path
          d="M25.4 27.6c.9-8 4.9-16.6 12.2-23-4.1 9.3-5.6 17.6-4.4 25.1Z"
          fill={tone}
          fillOpacity="0.92"
        />
        {/* Lower wing */}
        <path
          d="M21.6 30.2c-1.9 4.3-6 9.2-12.1 13.4 6.1-2.8 11.2-6.4 14.8-10.6Z"
          fill={tone}
          fillOpacity="0.7"
        />
      </g>
    </svg>
  )
}

/**
 * Background flight layer.
 *
 * Two doves cross the scene on long, offset loops so the sky is never empty
 * for more than a couple of seconds and never crowded either. Entirely
 * decorative and pointer-transparent; under prefers-reduced-motion the
 * animations collapse and the doves simply sit off-stage.
 */
export function FlyingDoves({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      <div className="dove-flight dove-flight--a">
        <Dove size={54} tone="rgba(241,181,59,0.30)" flap />
      </div>
      <div className="dove-flight dove-flight--b">
        <Dove size={34} tone="rgba(252,251,248,0.18)" flap />
      </div>
    </div>
  )
}

export default Dove
