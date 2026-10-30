'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Menu, X } from 'lucide-react'

/**
 * Site header (developer change guide, 28 Sep 2026).
 *
 * Desktop: logo left, links centre, one primary button right. Mobile: logo
 * and a Menu button; the menu holds every link and the same primary action.
 *
 * The bar hides when the reader scrolls down and returns the moment they
 * scroll up, so long pages read without a band across the top. It always
 * returns at the top of the page, and never hides while the menu is open.
 */

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/capabilities' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
]

const CTA = { label: 'Tell us what you want to achieve', href: '/contact' }

/**
 * Local brand asset, 1878 x 645 (2.912:1). Served from /public rather than a
 * remote blob, so the logo is not a third-party request on first paint.
 */
export const LOGO_SRC = '/six-jars-global-logo-horizontal.png'
export const LOGO_W = 1878
export const LOGO_H = 645

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const { scrollY } = useScroll()
  const lastY = useRef(0)

  // Hide on the way down, reveal on the way up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = lastY.current
    lastY.current = y
    setScrolled(y > 24)
    if (mobileOpen) return
    if (y < 120) {
      setHidden(false)
      return
    }
    if (y > previous + 6) setHidden(true)
    else if (y < previous - 6) setHidden(false)
  })

  // A route change closes the menu, including on back/forward.
  useEffect(() => {
    setMobileOpen(false)
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
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  const linkStyle = (active: boolean) => ({
    color: active ? 'var(--color-wine)' : 'rgba(0,0,0,0.78)',
    background: active ? 'rgba(107,21,63,0.07)' : 'transparent',
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
          borderBottom: `1px solid ${scrolled ? 'rgba(58,13,39,0.14)' : 'rgba(228,217,206,0.7)'}`,
          boxShadow: scrolled ? '0 6px 24px rgba(58,13,39,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full flex items-center gap-4 lg:gap-6">
          <Link href="/" className="flex items-center shrink-0" aria-label="Six Jars Global — home">
            <Image
              src={LOGO_SRC}
              alt="Six Jars Global"
              width={LOGO_W}
              height={LOGO_H}
              className="h-12 sm:h-14 lg:h-[68px] w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-1" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="px-2 xl:px-3 h-10 inline-flex items-center rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={linkStyle(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0 ml-auto lg:ml-0">
            <Link
              href={CTA.href}
              className="hidden lg:inline-flex items-center justify-center px-6 h-11 rounded-full text-sm font-bold whitespace-nowrap transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--color-wine)', color: '#FFFFFF' }}
            >
              {CTA.label}
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden inline-flex items-center gap-2 px-3 rounded-lg text-sm font-semibold"
              style={{ color: 'var(--color-wine)', minHeight: 44 }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              {mobileOpen ? 'Close' : 'Menu'}
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
              {navLinks.map((link) => (
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

              <Link
                href={CTA.href}
                className="mt-6 flex items-center justify-center text-center px-6 rounded-full text-base font-bold"
                style={{ minHeight: 56, background: 'var(--color-wine)', color: '#FFFFFF' }}
              >
                {CTA.label}
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
