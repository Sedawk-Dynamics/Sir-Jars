'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { capabilities } from '@/lib/content'

/**
 * Site header.
 *
 * Structure: Home, a Capabilities mega-menu holding the six verticals, then
 * Insights, About and Careers at equal weight, and one primary call to
 * action — "Discuss your project".
 *
 * Behaviour
 *  - The bar hides when the reader scrolls down and returns the moment they
 *    scroll up, so long pages read without a band across the top. It always
 *    returns at the top of the page, and never hides while a menu is open.
 *    Driven by a Framer Motion value, so scrolling causes no re-render.
 *  - The mega-menu opens on hover and on focus, closes on Escape, on a route
 *    change and on click-away, and is a real button/panel pair with
 *    aria-expanded and aria-controls.
 *
 * Every entry is a real link, so URLs are copyable, crawlable and work with
 * back/forward.
 */

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
]

/**
 * Local brand asset, 1878 x 645 (2.912:1). Served from /public rather than a
 * remote blob, so the logo is not a third-party request on first paint.
 */
export const LOGO_SRC = '/six-jars-global-logo-horizontal.png'
export const LOGO_W = 1878
export const LOGO_H = 645

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const megaRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const { scrollY } = useScroll()
  const lastY = useRef(0)

  // Hide on the way down, reveal on the way up. State flips only when the
  // direction actually changes, so this is a handful of renders per page.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = lastY.current
    lastY.current = y
    setScrolled(y > 24)
    if (megaOpen || mobileOpen) return
    if (y < 120) {
      setHidden(false)
      return
    }
    if (y > previous + 6) setHidden(true)
    else if (y < previous - 6) setHidden(false)
  })

  // A route change closes everything, including on back/forward.
  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
    setHidden(false)
  }, [pathname])

  // While the full-screen menu is open the page behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setMegaOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  const inCapabilities = pathname.startsWith('/capabilities')

  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMegaSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120)
  }

  const linkStyle = (active: boolean) => ({
    color: active ? 'var(--color-wine)' : 'rgba(75,13,36,0.78)',
    background: active ? 'rgba(112,13,44,0.07)' : 'transparent',
  })

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 glass-ivory"
        initial={false}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        style={{
          height: 'var(--header-h)',
          borderBottom: `1px solid ${scrolled ? 'rgba(75,13,36,0.14)' : 'rgba(228,217,206,0.7)'}`,
          boxShadow: scrolled ? '0 6px 24px rgba(75,13,36,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Six Jars Global — home"
          >
            <Image
              src={LOGO_SRC}
              alt="Six Jars Global"
              width={LOGO_W}
              height={LOGO_H}
              className="h-12 sm:h-14 lg:h-[68px] w-auto object-contain"
              priority
            />
          </Link>

          {/* One nav row, every item on the same baseline. */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            <Link
              href="/"
              aria-current={isActive('/') ? 'page' : undefined}
              className="px-3 h-10 inline-flex items-center rounded-lg text-sm font-medium transition-colors duration-200"
              style={linkStyle(isActive('/'))}
            >
              Home
            </Link>

            {/* Capabilities mega-menu */}
            <div
              ref={megaRef}
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              onFocus={openMega}
              onBlur={closeMegaSoon}
            >
              <button
                type="button"
                aria-expanded={megaOpen}
                aria-controls="capabilities-mega"
                aria-current={inCapabilities ? 'page' : undefined}
                onClick={() => setMegaOpen((v) => !v)}
                className="px-3 h-10 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                style={linkStyle(inCapabilities)}
              >
                Capabilities
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200"
                  style={{ transform: megaOpen ? 'rotate(180deg)' : 'none' }}
                />
              </button>

              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    id="capabilities-mega"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(92vw,860px)] rounded-2xl p-3 overflow-hidden"
                    style={{
                      background: 'var(--color-ivory)',
                      border: '1px solid var(--color-line)',
                      boxShadow: '0 28px 60px -28px rgba(75,13,36,0.45)',
                    }}
                  >
                    <ul className="grid sm:grid-cols-2 gap-1">
                      {capabilities.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/capabilities/${c.slug}`}
                            className="group flex gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-[color:var(--color-parchment)]"
                          >
                            <span
                              aria-hidden="true"
                              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-extrabold"
                              style={{
                                background: 'var(--color-plum)',
                                color: 'var(--color-gold)',
                              }}
                            >
                              {c.number}
                            </span>
                            <span className="min-w-0">
                              <span
                                className="block text-sm font-bold"
                                style={{ color: 'var(--color-plum)' }}
                              >
                                {c.fullName}
                              </span>
                              <span
                                className="block text-xs leading-relaxed mt-0.5"
                                style={{ color: 'rgba(75,13,36,0.66)' }}
                              >
                                {c.summary}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div
                      className="mt-2 pt-3 px-3 pb-1 flex flex-wrap items-center gap-x-6 gap-y-2"
                      style={{ borderTop: '1px solid var(--color-line)' }}
                    >
                      <Link
                        href="/capabilities"
                        className="text-sm font-bold"
                        style={{ color: 'var(--color-wine)' }}
                      >
                        All six capabilities →
                      </Link>
                      <Link
                        href="/how-it-works"
                        className="text-sm font-semibold"
                        style={{ color: 'rgba(75,13,36,0.7)' }}
                      >
                        How it works
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks
              .filter((l) => l.href !== '/')
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="px-3 h-10 inline-flex items-center rounded-lg text-sm font-medium transition-colors duration-200"
                  style={linkStyle(isActive(link.href))}
                >
                  {link.label}
                </Link>
              ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-6 h-11 rounded-full text-sm font-bold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--color-wine)', color: 'var(--color-ivory)' }}
            >
              Discuss your project
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden tap-target inline-flex items-center justify-center rounded-lg"
              style={{ color: 'var(--color-wine)' }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden overflow-y-auto"
            style={{
              background: 'var(--color-ivory)',
              paddingTop: 'calc(var(--header-h) + 1rem)',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)',
            }}
          >
            <nav className="flex flex-col px-6 gap-1" aria-label="Mobile">
              <Link
                href="/"
                aria-current={isActive('/') ? 'page' : undefined}
                className="flex items-center text-xl font-semibold rounded-xl px-4"
                style={{
                  minHeight: 56,
                  ...linkStyle(isActive('/')),
                  borderBottom: '1px solid rgba(228,217,206,0.9)',
                }}
              >
                Home
              </Link>

              <p
                className="mt-4 mb-1 px-4 text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{ color: 'rgba(75,13,36,0.5)' }}
              >
                Capabilities
              </p>
              {capabilities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/capabilities/${c.slug}`}
                  className="flex items-center gap-3 rounded-xl px-4 text-base font-semibold"
                  style={{
                    minHeight: 52,
                    color: 'rgba(75,13,36,0.82)',
                    borderBottom: '1px solid rgba(228,217,206,0.9)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs font-extrabold"
                    style={{ color: 'var(--color-wine)' }}
                  >
                    {c.number}
                  </span>
                  {c.fullName}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-1">
                {navLinks
                  .filter((l) => l.href !== '/')
                  .map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className="flex items-center text-xl font-semibold rounded-xl px-4"
                      style={{
                        minHeight: 56,
                        ...linkStyle(isActive(link.href)),
                        borderBottom: '1px solid rgba(228,217,206,0.9)',
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>

              <Link
                href="/contact"
                className="mt-6 flex items-center justify-center rounded-full text-base font-bold"
                style={{
                  minHeight: 56,
                  background: 'var(--color-wine)',
                  color: 'var(--color-ivory)',
                }}
              >
                Discuss your project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer so page content never starts underneath the fixed header. */}
      <div aria-hidden="true" style={{ height: 'var(--header-h)' }} />
    </>
  )
}
