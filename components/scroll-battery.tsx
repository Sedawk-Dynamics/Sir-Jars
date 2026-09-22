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

/**
 * Floating scroll battery.
 *
 * A small battery pinned to the corner of the viewport. Its charge is the
 * reader's progress through the page: scrolling down charges it, scrolling up
 * drains it, and it is always in sync with the scroll position — not a
 * two-state toggle.
 *
 * How it stays smooth
 *  - Everything runs on Framer Motion motion values. They update the DOM
 *    directly on the animation frame, so a scroll never causes a React
 *    re-render. The percentage label is written straight to the text node.
 *  - Scroll progress is sampled by `useScroll` (rAF-batched, passive) and fed
 *    through a spring, so the fill has mass: it eases into the target and
 *    settles, instead of stepping.
 *  - Scroll velocity drives the effects: a charging glow and bolt while going
 *    down, a cooler dimmed state while going up, and a surface that tilts
 *    with the rate of change like liquid settling in a vessel.
 *  - Idle detection toggles a data attribute (no state), which starts a gentle
 *    CSS bob only while the reader is not scrolling.
 *
 * prefers-reduced-motion: the spring, tilt, glow pulse and bob are all off;
 * the fill still tracks scroll position exactly, so the information remains.
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
  const pctRef = useRef<HTMLSpanElement>(null)

  const { scrollYProgress, scrollY } = useScroll()

  // Charge level with mass: stiff enough to stay in sync with the page,
  // damped enough that it settles rather than wobbles.
  const sprung = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  })
  const level = reduce ? scrollYProgress : sprung

  // Direction and intensity of the current scroll, smoothed.
  const velocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(velocity, { stiffness: 90, damping: 22 })

  // Charging (down) lights the battery; discharging (up) cools it.
  const charge = useTransform(smoothVelocity, [0, 1400], [0, 1], { clamp: true })
  const drain = useTransform(smoothVelocity, [-1400, 0], [1, 0], { clamp: true })

  // Liquid surface tilts against the direction of travel, then levels out.
  const tilt = useTransform(smoothVelocity, [-2000, 0, 2000], [7, 0, -7], {
    clamp: true,
  })

  // Colour of the charge: rose when low, into the brand gold when full.
  const fillTop = useTransform(level, [0, 0.5, 1], ['#C2506F', '#E0843A', '#F1B53B'])
  const fillBottom = useTransform(level, [0, 0.5, 1], ['#872143', '#B8452E', '#D99A1F'])

  const glowShadow = useTransform(
    charge,
    (c) => `0 8px 26px -10px rgba(75,13,36,0.45), 0 0 ${6 + c * 18}px ${c * 3}px rgba(241,181,59,${0.1 + c * 0.45})`
  )
  const boltOpacity = useTransform(charge, [0, 0.15, 1], [0, 0.6, 1])
  const boltScale = useTransform(charge, [0, 1], [0.7, 1])
  const cellDim = useTransform(drain, [0, 1], [1, 0.72])

  // Percentage written straight to the DOM — no re-render per frame.
  useMotionValueEvent(level, 'change', (v) => {
    if (pctRef.current) pctRef.current.textContent = `${Math.round(v * 100)}%`
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
    if (pctRef.current) {
      pctRef.current.textContent = `${Math.round(scrollYProgress.get() * 100)}%`
    }
  }, [scrollYProgress])

  // Cell geometry (viewBox units).
  const CELL = { x: 3, y: 9, w: 22, h: 40, r: 5 }

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
        className="scroll-battery__pill flex items-center gap-2 rounded-full pl-2.5 pr-3 py-2"
        style={{
          background: 'rgba(252,251,248,0.86)',
          backdropFilter: 'blur(14px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
          border: '1px solid rgba(112,13,44,0.14)',
          boxShadow: reduce ? '0 8px 26px -10px rgba(75,13,36,0.45)' : glowShadow,
        }}
      >
        <svg viewBox="0 0 28 52" className="w-[15px] h-[28px] sm:w-[17px] sm:h-[32px] overflow-visible">
          <defs>
            <motion.linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
              <motion.stop offset="0" style={{ stopColor: fillTop }} />
              <motion.stop offset="1" style={{ stopColor: fillBottom }} />
            </motion.linearGradient>
            <clipPath id={`${id}-cell`}>
              <rect x={CELL.x} y={CELL.y} width={CELL.w} height={CELL.h} rx={CELL.r} />
            </clipPath>
          </defs>

          {/* Terminal cap */}
          <rect x="9" y="2" width="10" height="5" rx="2" fill="#4B0D24" />

          {/* Case */}
          <rect
            x={CELL.x - 1.5}
            y={CELL.y - 1.5}
            width={CELL.w + 3}
            height={CELL.h + 3}
            rx={CELL.r + 1.5}
            fill="rgba(75,13,36,0.06)"
            stroke="#4B0D24"
            strokeWidth="2"
          />

          {/* Charge: a fill that rises from the base, clipped to the cell, with
              a liquid surface that tilts against the direction of travel. */}
          <motion.g clipPath={`url(#${id}-cell)`} style={{ opacity: reduce ? 1 : cellDim }}>
            <motion.g
              style={{
                scaleY: level,
                transformBox: 'view-box',
                transformOrigin: `14px ${CELL.y + CELL.h}px`,
              }}
            >
              <motion.rect
                x={CELL.x - 6}
                y={CELL.y - 4}
                width={CELL.w + 12}
                height={CELL.h + 4}
                fill={`url(#${id}-fill)`}
                style={
                  reduce
                    ? undefined
                    : {
                        rotate: tilt,
                        transformBox: 'view-box',
                        transformOrigin: `14px ${CELL.y}px`,
                      }
                }
              />
            </motion.g>
            {/* Soft vertical sheen for a glass cell. */}
            <rect
              x={CELL.x + 3}
              y={CELL.y + 3}
              width="3.5"
              height={CELL.h - 6}
              rx="1.75"
              fill="#FFFFFF"
              opacity="0.28"
            />
          </motion.g>

          {/* Charging bolt — lights while scrolling down. */}
          {!reduce && (
            <motion.path
              d="M15.5 17 L9.5 30 H14 L12.5 40 L19 26 H14.5 Z"
              fill="#FFF6DA"
              stroke="#4B0D24"
              strokeWidth="0.8"
              strokeLinejoin="round"
              style={{
                opacity: boltOpacity,
                scale: boltScale,
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
            />
          )}
        </svg>

        <span
          ref={pctRef}
          className="text-[11px] sm:text-xs font-bold tabular-nums tracking-tight"
          style={{ color: 'var(--color-plum)', minWidth: '2.6em' }}
        >
          0%
        </span>
      </motion.div>
    </div>
  )
}
