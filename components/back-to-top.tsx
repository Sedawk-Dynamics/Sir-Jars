'use client'

import { ArrowUp } from 'lucide-react'

/**
 * Back to top. Scrolls the page to the top (instantly under reduced motion)
 * and moves keyboard focus to the skip target so screen-reader and keyboard
 * users land at the start of the page too — not just sighted mouse users.
 */
export default function BackToTop({ className }: { className?: string }) {
  const onClick = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // Fallback for browsers/containers where window scrolling is a no-op.
    document.scrollingElement?.scrollTo?.({ top: 0, behavior: reduce ? 'auto' : 'smooth' })

    const target = document.body
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      Back to top
      <ArrowUp size={14} aria-hidden="true" />
    </button>
  )
}
