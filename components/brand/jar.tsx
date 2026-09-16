/**
 * One jar, matching the reference artwork: a wide, rounded pot with a flat
 * flared lip, a short neck, a full belly and a small foot — no outline, no
 * rim, no band. The form is carried by the glaze alone: a smooth gradient
 * with soft side shading for roundness.
 *
 * The belly is left clear for the capability's icon and name, which the
 * scene lays over it in HTML so the type stays crisp at any size.
 */

export const JAR_VIEWBOX = { w: 120, h: 138 }

export const JAR_PATH =
  'M40 6H80Q84 6 84 10Q84 15 78 17Q76 22 82 28Q104 40 110 68Q114 100 92 124' +
  'L88 132H32L28 124Q6 100 10 68Q16 40 38 28Q44 22 42 17Q36 15 36 10Q36 6 40 6Z'

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
      viewBox={`0 0 ${JAR_VIEWBOX.w} ${JAR_VIEWBOX.h}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* The logo's glaze: lighter at the shoulder, deepening to the foot. */}
        <linearGradient id={`${id}-glaze`} x1="0.2" y1="0" x2="0.55" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        {/* Soft side shading — rounds the body without drawing an edge. */}
        <linearGradient id={`${id}-round`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.24" />
          <stop offset="0.36" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="0.64" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <path d={JAR_PATH} fill={`url(#${id}-glaze)`} />
      <path d={JAR_PATH} fill={`url(#${id}-round)`} />
    </svg>
  )
}
