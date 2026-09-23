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
          </defs>

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
            <motion.g
              style={{
                scaleY: level,
                transformBox: 'view-box',
                transformOrigin: `${VW / 2}px ${VH}px`,
              }}
            >
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
                        transformBox: 'view-box',
                        transformOrigin: `${VW / 2}px 0px`,
                      }
                }
              />
            </motion.g>
          </motion.g>

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
