import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/** Plain text page navigation above the footer, so Home is always one step away. */
export default function BackToHome() {
  return (
    <nav
      aria-label="Page navigation"
      className="py-3"
      style={{ background: 'var(--color-ivory)', borderTop: '1px solid var(--color-line)' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          style={{ color: 'var(--color-wine)' }}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </nav>
  )
}
