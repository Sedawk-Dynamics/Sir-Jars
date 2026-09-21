'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

/**
 * Every entry is a real route. The review found a single anchor element in the
 * live DOM with navigation rendered as buttons, which cost the site copyable
 * URLs, deep links, back/forward behaviour and crawlable destinations.
 */
const navLinks = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Proof', href: '/proof' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
]

/**
 * Local brand asset, 1878 x 645 (2.912:1). Served from /public rather than the
 * old remote blob URL, so the logo is not a third-party request on first paint
 * and cannot break if that bucket goes away.
 */
export const LOGO_SRC = '/six-jars-global-logo-horizontal.png'
export const LOGO_W = 1878
export const LOGO_H = 645

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // A route change must always close the overlay, including on back/forward.
  useEffect(() => {
    setMobileOpen(false)
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
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header
        className="fixed top-0 left-0 right-0 z-50 glass-ivory transition-shadow duration-300"
        style={{
          height: 'var(--header-h)',
          borderBottom: `1px solid ${scrolled ? 'rgba(75,13,36,0.14)' : 'rgba(228,217,206,0.7)'}`,
          boxShadow: scrolled ? '0 6px 24px rgba(75,13,36,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
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
              // Intrinsic ratio is 2.912:1, so a 40px cap renders ~116px wide
              // and still clears the 44px row comfortably on a 360px screen.
              className="h-12 sm:h-14 lg:h-[68px] w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive(link.href) ? 'var(--color-wine)' : 'rgba(75,13,36,0.72)',
                  background: isActive(link.href) ? 'rgba(112,13,44,0.07)' : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/careers"
              aria-current={isActive('/careers') ? 'page' : undefined}
              className="hidden md:inline-flex items-center justify-center px-5 rounded-full text-sm font-semibold tap-target transition-colors duration-200"
              style={{
                lineHeight: '42px',
                color: 'var(--color-wine)',
                border: '1.5px solid var(--color-wine)',
                background: isActive('/careers') ? 'rgba(112,13,44,0.07)' : 'transparent',
              }}
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-5 rounded-full text-sm font-semibold tap-target transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                background: 'var(--color-wine)',
                color: 'var(--color-ivory)',
                lineHeight: '44px',
              }}
            >
              Start a conversation
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
      </header>

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
              // Respect the notch and the home indicator on iOS.
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)',
            }}
          >
            <nav
              className="flex flex-col px-6 gap-1"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="flex items-center text-xl font-semibold rounded-xl px-4"
                  style={{
                    minHeight: 56,
                    color: isActive(link.href) ? 'var(--color-wine)' : 'rgba(75,13,36,0.82)',
                    background: isActive(link.href) ? 'rgba(112,13,44,0.07)' : 'transparent',
                    borderBottom: '1px solid rgba(228,217,206,0.9)',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/careers"
                aria-current={isActive('/careers') ? 'page' : undefined}
                className="mt-6 flex items-center justify-center rounded-full text-base font-semibold"
                style={{
                  minHeight: 56,
                  color: 'var(--color-wine)',
                  border: '1.5px solid var(--color-wine)',
                }}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="mt-3 flex items-center justify-center rounded-full text-base font-semibold"
                style={{
                  minHeight: 56,
                  background: 'var(--color-gold)',
                  color: 'var(--color-plum)',
                }}
              >
                Start a conversation
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
