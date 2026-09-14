'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryCategories, galleryItems, type GalleryItem } from '@/lib/content'

/**
 * Gallery: a filtered masonry grid with a lightbox.
 *
 * Filtering
 *  - Filters are real buttons in a group with `aria-pressed`, not a select,
 *    so the current state is visible without opening anything.
 *  - A live region announces the result count, because a filter that silently
 *    changes what is on screen is invisible to a screen reader user.
 *
 * Lightbox
 *  - Opened from a real button per tile, so every tile is reachable by
 *    keyboard and announces its own title.
 *  - Focus moves into the dialog on open, is trapped inside while it is open,
 *    and returns to the tile that opened it on close.
 *  - Escape closes; arrow keys step through the filtered set.
 *  - Background scroll is locked while it is open.
 */

const SHAPE_CLASS: Record<NonNullable<GalleryItem['shape']>, string> = {
  tall: 'sm:row-span-2 aspect-[3/4] sm:aspect-auto',
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
}

export default function GalleryGrid() {
  const [filter, setFilter] = useState<string>('All')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([])
  /** The tile that opened the lightbox, so focus can be handed back to it. */
  const openerRef = useRef<HTMLElement | null>(null)

  const visible =
    filter === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter)

  const isOpen = openIndex !== null
  const current = isOpen ? visible[openIndex] : undefined

  const close = useCallback(() => {
    setOpenIndex(null)
    openerRef.current?.focus()
    openerRef.current = null
  }, [])

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((i) =>
        i === null ? i : (i + delta + visible.length) % visible.length
      )
    },
    [visible.length]
  )

  // Escape, arrow navigation, and a focus trap — all only while open.
  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      } else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables || focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, step])

  const openAt = (i: number, el: HTMLElement | null) => {
    openerRef.current = el
    setOpenIndex(i)
  }

  const filters = ['All', ...galleryCategories]

  return (
    <>
      {/* ── Filters ──────────────────────────────────────────────────── */}
      <div
        role="group"
        aria-label="Filter the gallery by category"
        className="flex flex-wrap gap-2"
      >
        {filters.map((cat) => {
          const isActive = filter === cat
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setFilter(cat)
                setOpenIndex(null)
              }}
              className="px-5 rounded-full text-sm font-bold transition-colors duration-200"
              style={{
                minHeight: 44,
                background: isActive ? 'var(--color-plum)' : '#FFFFFF',
                color: isActive ? 'var(--color-ivory)' : 'rgba(75,13,36,0.72)',
                border: `1px solid ${isActive ? 'var(--color-plum)' : 'var(--color-line)'}`,
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      <p role="status" className="sr-only">
        {visible.length === 1
          ? '1 image shown'
          : `${visible.length} images shown`}
        {filter === 'All' ? '' : ` in ${filter}`}
      </p>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
        {visible.map((item, i) => (
          <li
            key={item.slug}
            className={SHAPE_CLASS[item.shape ?? 'wide']}
          >
            <button
              type="button"
              ref={(el) => {
                tileRefs.current[i] = el
              }}
              onClick={(e) => openAt(i, e.currentTarget)}
              className="gallery-tile group relative w-full h-full rounded-2xl overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1"
              style={{
                border: '1px solid var(--color-line)',
                boxShadow: '0 14px 40px -26px rgba(75,13,36,0.5)',
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(43,7,21,0.88) 0%, rgba(43,7,21,0.32) 46%, transparent 74%)',
                }}
              />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span
                  className="block text-[10px] font-bold tracking-[0.16em] uppercase"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {item.category}
                </span>
                <span
                  className="block text-base font-bold mt-1.5"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  {item.title}
                </span>
                <span
                  className="gallery-caption block text-[13px] leading-relaxed mt-1.5"
                  style={{ color: 'rgba(252,251,248,0.78)' }}
                >
                  {item.caption}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          style={{ background: 'rgba(20,3,10,0.92)' }}
        >
          {/* Clicking the backdrop closes. Keyboard users have Escape and the
              close button, so this carries no keyboard handler of its own. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            onClick={close}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} — ${current.category}`}
            className="relative w-full max-w-5xl"
          >
            <div
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(241,181,59,0.28)' }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.16em] uppercase"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {current.category}
                </p>
                <h2
                  className="text-xl font-bold mt-1.5"
                  style={{ color: 'var(--color-ivory)' }}
                >
                  {current.title}
                </h2>
                <p
                  className="text-sm leading-relaxed mt-1.5 max-w-xl"
                  style={{ color: 'rgba(252,251,248,0.72)' }}
                >
                  {current.caption}
                </p>
              </div>

              <p
                className="text-xs font-semibold shrink-0"
                style={{ color: 'rgba(252,251,248,0.55)' }}
              >
                {openIndex + 1} of {visible.length}
              </p>
            </div>

            {/* Controls. Placed after the content in DOM order so the trap
                starts on Close, which is the safe default target. */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute -top-2 right-0 sm:-top-4 sm:-right-4 tap-target inline-flex items-center justify-center rounded-full"
              style={{
                background: 'var(--color-gold)',
                color: 'var(--color-plum)',
              }}
              aria-label="Close image viewer"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 tap-target inline-flex items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(20,3,10,0.7)',
                    border: '1px solid rgba(241,181,59,0.4)',
                    color: 'var(--color-ivory)',
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 tap-target inline-flex items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(20,3,10,0.7)',
                    border: '1px solid rgba(241,181,59,0.4)',
                    color: 'var(--color-ivory)',
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
