'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Analytics } from '@vercel/analytics/next'
import { X } from 'lucide-react'

/**
 * Cookie manager.
 *
 * Essential technologies always run. Optional categories stay off until the
 * visitor records a choice, and the choice can be reopened at any time from
 * the footer ("Cookie settings"), as the Cookie Notice promises.
 *
 * The choice is kept in localStorage and mirrored to a first-party cookie so
 * a future server render can read it.
 */

type Choice = { analytics: boolean; functional: boolean; marketing: boolean }

const STORAGE_KEY = 'sjg-cookie-consent-v1'
const OPEN_EVENT = 'sjg:open-cookie-settings'

const categories: { key: keyof Choice | 'essential'; name: string; desc: string }[] = [
  {
    key: 'essential',
    name: 'Essential',
    desc: 'Security, form submission and remembering this choice. Always on.',
  },
  {
    key: 'analytics',
    name: 'Analytics',
    desc: 'Anonymous page-view measurement that helps us improve the site.',
  },
  {
    key: 'functional',
    name: 'Functional',
    desc: 'Remembers preferences such as filters between visits.',
  },
  {
    key: 'marketing',
    name: 'Marketing',
    desc: 'Not used today. Stays off unless you switch it on.',
  },
]

function readChoice(): Choice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Choice) : null
  } catch {
    return null
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choice))
  } catch {
    /* storage blocked — the choice still applies for this page view */
  }
  const value = encodeURIComponent(JSON.stringify(choice))
  document.cookie = `${STORAGE_KEY}=${value}; Max-Age=${60 * 60 * 24 * 180}; Path=/; SameSite=Lax${
    location.protocol === 'https:' ? '; Secure' : ''
  }`
}

/** Opens the preferences dialog from anywhere (e.g. the footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Manage cookies
    </button>
  )
}

export default function CookieManager() {
  const [choice, setChoice] = useState<Choice | null>(null)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [draft, setDraft] = useState<Choice>({ analytics: false, functional: false, marketing: false })
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const stored = readChoice()
    setChoice(stored)
    setBannerOpen(stored === null)

    const open = () => {
      setDraft(readChoice() ?? { analytics: false, functional: false, marketing: false })
      setPanelOpen(true)
    }
    window.addEventListener(OPEN_EVENT, open)
    return () => window.removeEventListener(OPEN_EVENT, open)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (panelOpen && !dialog.open) dialog.showModal()
    if (!panelOpen && dialog.open) dialog.close()
  }, [panelOpen])

  const commit = useCallback((next: Choice) => {
    saveChoice(next)
    setChoice(next)
    setBannerOpen(false)
    setPanelOpen(false)
  }, [])

  const all = { analytics: true, functional: true, marketing: true }
  const none = { analytics: false, functional: false, marketing: false }

  return (
    <>
      {choice?.analytics && <Analytics />}

      {bannerOpen && !panelOpen && (
        <section
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-4 sm:bottom-4 sm:max-w-md z-[60] rounded-2xl p-5 shadow-2xl"
          style={{ background: 'var(--color-plum)', color: 'var(--color-ivory)', border: '1px solid rgba(241,181,59,0.3)' }}
        >
          <p className="text-sm font-bold">Your cookie choices</p>
          <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(252,251,248,0.75)' }}>
            We use essential technologies to run this site. Optional analytics stay off
            until you choose. Read the{' '}
            <Link href="/legal/cookies" className="underline underline-offset-2" style={{ color: 'var(--color-gold)' }}>
              Cookie Notice
            </Link>
            .
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              type="button"
              onClick={() => commit(all)}
              className="px-4 rounded-full text-sm font-bold"
              style={{ minHeight: 40, background: 'var(--color-gold)', color: 'var(--color-plum)' }}
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={() => commit(none)}
              className="px-4 rounded-full text-sm font-bold"
              style={{ minHeight: 40, border: '1px solid rgba(252,251,248,0.4)', color: 'var(--color-ivory)' }}
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={openCookieSettings}
              className="px-2 text-sm font-semibold underline underline-offset-2"
              style={{ minHeight: 40, color: 'var(--color-ivory)' }}
            >
              Manage
            </button>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-dialog-title"
        onClose={() => setPanelOpen(false)}
        className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-2xl p-0 backdrop:bg-black/50"
        style={{ background: 'var(--color-ivory)', color: 'var(--color-plum)' }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="cookie-dialog-title" className="text-lg font-bold">
              Manage cookies
            </h2>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Close cookie settings"
              className="tap-target inline-flex items-center justify-center rounded-lg"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="mt-4 space-y-3">
            {categories.map((cat) => {
              const locked = cat.key === 'essential'
              const checked = locked ? true : draft[cat.key as keyof Choice]
              const id = `cookie-${cat.key}`
              return (
                <li
                  key={cat.key}
                  className="flex items-start justify-between gap-4 rounded-xl p-4"
                  style={{ background: '#FFFFFF', border: '1px solid var(--color-line)' }}
                >
                  <label htmlFor={id} className="text-sm">
                    <span className="font-bold block">{cat.name}</span>
                    <span className="block mt-0.5 leading-relaxed" style={{ color: 'rgba(75,13,36,0.7)' }}>
                      {cat.desc}
                    </span>
                  </label>
                  <input
                    id={id}
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={locked}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [cat.key]: e.target.checked }))
                    }
                    className="mt-1 w-5 h-5 shrink-0 accent-wine"
                  />
                </li>
              )
            })}
          </ul>

          <div className="flex flex-wrap justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => commit(none)}
              className="px-4 rounded-full text-sm font-bold"
              style={{ minHeight: 44, border: '1px solid var(--color-line)' }}
            >
              Reject optional
            </button>
            <button
              type="button"
              onClick={() => commit(draft)}
              className="px-5 rounded-full text-sm font-bold"
              style={{ minHeight: 44, background: 'var(--color-wine)', color: 'var(--color-ivory)' }}
            >
              Save choices
            </button>
          </div>
        </div>
      </dialog>
    </>
  )
}
