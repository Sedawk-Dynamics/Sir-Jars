'use client'

import { useEffect, useId, useRef } from 'react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { JAR_PATH, JAR_VIEWBOX } from '@/components/brand/jar'

/**
 * Floating scroll jar.
 *
 * The brand's jar, pinned to the corner of the viewport and filling as the
 * reader moves through the page: scrolling down fills it, scrolling up empties
 * it, and the level always matches the scroll position — not a two-state
 * toggle. The percentage sits inside the jar.
 *
 * How it stays smooth
 *  - Everything runs on Framer Motion motion values, which write to the DOM on
 *    the animation frame, so scrolling never causes a React re-render. The
 *    percentage is written straight to its text node.
 *  - Scroll progress is sampled by `useScroll` (rAF-batched, passive) and fed
 *    through a spring, so the level has mass: it eases toward the target and
 *    settles instead of stepping.
 *  - Scroll velocity drives the rest: a warm glow while filling, a dimmer
 *    cast while emptying, and a liquid surface that tilts with the rate of
 *    change, like contents settling in a vessel.
 *  - Idle detection flips a data attribute (no state), so the gentle bob runs
 *    only when the reader is not scrolling.
 *
 * prefers-reduced-motion: spring, tilt, glow and bob are all off; the level
 * still tracks scroll position exactly, so the information survives.
 *
 * Decorative and pointer-transparent — it never blocks content or clicks.
 */

type Corner = 'bottom-right' | 'bottom-left'

export default function ScrollBattery({
  corner = 'bottom-right',
}: {
  corner?: Corner
}) {
  const id = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  // Two text layers (halo + ink) — both carry the same live percentage.
  const pctRef = useRef<SVGTSpanElement>(null)
  const pctHaloRef = useRef<SVGTSpanElement>(null)

  const { scrollYProgress, scrollY } = useScroll()

  // Level with mass: stiff enough to stay with the page, damped enough to settle.
  const sprung = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  })
  const level = reduce ? scrollYProgress : sprung

  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { stiffness: 90, damping: 22 })

  // Filling (down) warms the jar; emptying (up) cools it.
  const filling = useTransform(smoothVelocity, [0, 1400], [0, 1], { clamp: true })
  const draining = useTransform(smoothVelocity, [-1400, 0], [1, 0], { clamp: true })

  // The surface tilts against the direction of travel, then levels out.
  const tilt = useTransform(smoothVelocity, [-2000, 0, 2000], [7, 0, -7], {
    clamp: true,
  })

  // Rose when low, brand gold when full.
  const fillTop = useTransform(level, [0, 0.5, 1], ['#C2506F', '#E0843A', '#F1B53B'])
  const fillBottom = useTransform(level, [0, 0.5, 1], ['#872143', '#B8452E', '#D99A1F'])

  const contentsDim = useTransform(draining, [0, 1], [1, 0.72])

  // Top edge of the contents (the fill rect spans y=-6..VH, scaled from the
  // base), so the liquid surface ellipse rides exactly on the level.
  const surfaceY = useTransform(level, (v) => JAR_VIEWBOX.h - (JAR_VIEWBOX.h + 6) * v)
  // The contents slide up from below the base rather than scaling: Framer
  // Motion sets its own transform-origin on SVG, so a scaleY grew from the
  // middle of the jar instead of the bottom.
  const fillOffset = useTransform(level, (v) => (JAR_VIEWBOX.h + 6) * (1 - v))
  const glowFilter = useTransform(
    filling,
    (c) =>
      `drop-shadow(0 8px 20px rgba(20,3,10,0.4)) drop-shadow(0 0 ${4 + c * 14}px rgba(241,181,59,${0.12 + c * 0.42}))`
  )

  // Percentage written straight to the DOM — no re-render per frame.
  useMotionValueEvent(level, 'change', (v) => {
    const text = `${Math.round(v * 100)}%`
    if (pctRef.current) pctRef.current.textContent = text
    if (pctHaloRef.current) pctHaloRef.current.textContent = text
  })

  // Idle detection: bob only while the reader is not scrolling.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    let t: ReturnType<typeof setTimeout> | undefined
    const unsubscribe = scrollY.on('change', () => {
      el.dataset.scrolling = 'true'
      clearTimeout(t)
      t = setTimeout(() => {
        el.dataset.scrolling = 'false'
      }, 220)
    })
    return () => {
      unsubscribe()
      clearTimeout(t)
    }
  }, [scrollY])

  // Seed the label for a page restored mid-scroll.
  useEffect(() => {
    const text = `${Math.round(scrollYProgress.get() * 100)}%`
    if (pctRef.current) pctRef.current.textContent = text
    if (pctHaloRef.current) pctHaloRef.current.textContent = text
  }, [scrollYProgress])

  const { w: VW, h: VH } = JAR_VIEWBOX

  return (
    <div
      ref={rootRef}
      data-scrolling="false"
      aria-hidden="true"
      className={`scroll-battery pointer-events-none fixed z-40 ${
        corner === 'bottom-right' ? 'right-4 sm:right-6' : 'left-4 sm:left-6'
      }`}
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' }}
    >
      <motion.div
        className="scroll-battery__pill"
        style={{
          filter: reduce ? 'drop-shadow(0 8px 20px rgba(20,3,10,0.4))' : glowFilter,
        }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-[44px] h-[51px] sm:w-[52px] sm:h-[60px] overflow-visible"
        >
          <defs>
            <motion.linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0.35" y2="1">
              <motion.stop offset="0" style={{ stopColor: fillTop }} />
              <motion.stop offset="1" style={{ stopColor: fillBottom }} />
            </motion.linearGradient>
            <clipPath id={`${id}-jar`}>
              <path d={JAR_PATH} />
            </clipPath>
            {/* 3D shading: darker at both sides, a lit band left of centre —
                the way light falls across a rounded vessel. */}
            <linearGradient id={`${id}-round`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#1A0410" stopOpacity="0.55" />
              <stop offset="0.22" stopColor="#1A0410" stopOpacity="0.08" />
              <stop offset="0.36" stopColor="#FFFFFF" stopOpacity="0.22" />
              <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.78" stopColor="#1A0410" stopOpacity="0.18" />
              <stop offset="1" stopColor="#1A0410" stopOpacity="0.6" />
            </linearGradient>
            {/* Base shading: the belly darkens toward the foot. */}
            <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.55" stopColor="#1A0410" stopOpacity="0" />
              <stop offset="1" stopColor="#1A0410" stopOpacity="0.4" />
            </linearGradient>
            {/* Glossy specular highlight on the upper-left shoulder. */}
            <radialGradient id={`${id}-gloss`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${id}-ground`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#14030A" stopOpacity="0.55" />
              <stop offset="1" stopColor="#14030A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact shadow on the ground. */}
          <ellipse cx={VW / 2} cy={VH + 2} rx={44} ry={7} fill={`url(#${id}-ground)`} />

          {/* Empty vessel: warm ivory glass so it reads on light and dark. */}
          <path
            d={JAR_PATH}
            fill="rgba(252,251,248,0.92)"
            stroke="#4B0D24"
            strokeWidth="2.5"
          />

          {/* Contents rising from the base, clipped to the jar. */}
          <motion.g
            clipPath={`url(#${id}-jar)`}
            style={{ opacity: reduce ? 1 : contentsDim }}
          >
            <motion.g style={{ y: fillOffset }}>
              <motion.rect
                x={-VW}
                y={-6}
                width={VW * 3}
                height={VH + 6}
                fill={`url(#${id}-fill)`}
                style={
                  reduce
                    ? undefined
                    : {
                        rotate: tilt,
                        // Pivot on the middle of the surface (top edge).
                        originX: 0.5,
                        originY: 0,
                      }
                }
              />
            </motion.g>

            {/* Liquid surface — a lit ellipse riding on the level. */}
            <motion.ellipse
              cx={VW / 2}
              cy={surfaceY}
              rx={VW / 2}
              ry={5}
              style={{ fill: fillTop }}
            />
            <motion.ellipse
              cx={VW / 2}
              cy={surfaceY}
              rx={VW / 2}
              ry={5}
              fill="rgba(255,255,255,0.28)"
            />
          </motion.g>

          {/* Volume: side shading, base shading and gloss, over glass and contents. */}
          <g clipPath={`url(#${id}-jar)`}>
            <rect x={0} y={0} width={VW} height={VH} fill={`url(#${id}-round)`} />
            <rect x={0} y={0} width={VW} height={VH} fill={`url(#${id}-base)`} />
            <ellipse
              cx={36}
              cy={58}
              rx={10}
              ry={24}
              transform="rotate(18 36 58)"
              fill={`url(#${id}-gloss)`}
            />
            <ellipse cx={34} cy={96} rx={4} ry={9} fill={`url(#${id}-gloss)`} opacity={0.5} />
          </g>

          {/* Mouth of the jar: the dark opening seen from slightly above. */}
          <ellipse cx={VW / 2} cy={9} rx={19} ry={3.2} fill="#2A0716" opacity={0.75} />
          <ellipse
            cx={VW / 2}
            cy={8.4}
            rx={19}
            ry={3.2}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.2"
          />

          {/* Rim, so the lip stays crisp over the contents. */}
          <path
            d={JAR_PATH}
            fill="none"
            stroke="#4B0D24"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Percentage, inside the jar. Painted twice: a dark halo underneath
              keeps it legible whether it sits on ivory glass or on contents. */}
          <text
            x={VW / 2}
            y={VH * 0.66}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="30"
            fontWeight="800"
            letterSpacing="-0.5"
            stroke="rgba(252,251,248,0.85)"
            strokeWidth="5"
            strokeLinejoin="round"
            fill="none"
          >
            <tspan ref={pctHaloRef}>0%</tspan>
          </text>
          <text
            x={VW / 2}
            y={VH * 0.66}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="30"
            fontWeight="800"
            letterSpacing="-0.5"
            fill="#4B0D24"
          >
            <tspan ref={pctRef}>0%</tspan>
          </text>
        </svg>
      </motion.div>
    </div>
  )
}
