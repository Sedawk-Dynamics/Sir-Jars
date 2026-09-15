/**
 * One jar, drawn as the jars in the logo are: a tall, slender vase with a
 * small flared lip, a narrow neck, broad rounded shoulders and a long taper
 * to a small foot — and no outline, rim or band. The form is carried by the
 * glaze alone: a smooth gradient with soft side shading for roundness.
 */

export const JAR_VIEWBOX = { w: 100, h: 190 }

export const JAR_PATH =
  'M36 4H64Q67 4 66 8Q64 14 60 17Q57 22 60 30Q66 38 80 48Q98 62 97 92' +
  'Q96 130 80 168L76 184H24L20 168Q4 130 3 92Q2 62 20 48Q34 38 40 30' +
  'Q43 22 40 17Q36 14 34 8Q33 4 36 4Z'

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
          <stop offset="0" stopColor="#000000" stopOpacity="0.22" />
          <stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      <path d={JAR_PATH} fill={`url(#${id}-glaze)`} />
      <path d={JAR_PATH} fill={`url(#${id}-round)`} />
    </svg>
  )
}
