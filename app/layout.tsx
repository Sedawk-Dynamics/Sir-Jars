import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import CookieManager from '@/components/cookie-manager'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

// Headings (brand guidelines, change guide 28 Sep 2026). Normal style only:
// Turbopack's font loader cannot resolve Google's italic /l/font?kit= URLs.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const SITE_URL = 'https://sixjarsglobal.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Six Jars Global — Practical help to bring your ideas to life.',
    // Every page supplies its own title; this frames it consistently.
    template: '%s | Six Jars Global',
  },
  description:
    'Publishing, media, digital platforms, data and business operations, AI and future-skills training, and cybersecurity and forensics — six services with one contact to guide your work from first brief to finished result. Scope and price agreed with you.',
  keywords: [
    'governed operations',
    'accountable delivery partner',
    'publishing operations',
    'AI governance',
    'cybersecurity',
    'AI skills training',
    'business process operations',
    'digital forensics',
    'Bangalore',
  ],
  authors: [{ name: 'Six Jars Global' }],
  creator: 'Six Jars Global',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Six Jars Global',
    title: 'Six Jars Global — Practical help to bring your ideas to life.',
    description:
      'Six services for individuals and organisations, with one contact to guide the work from first brief to finished result.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Six Jars Global — Practical help to bring your ideas to life.',
    description:
      'Six services for individuals and organisations, with one contact to guide the work from first brief to finished result.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#3A0D27',
  width: 'device-width',
  initialScale: 1,
  // Never block zoom — pinch-zoom is an accessibility requirement.
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieManager />
      </body>
    </html>
  )
}
