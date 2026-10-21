import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import CookieManager from '@/components/cookie-manager'
import ScrollBattery from '@/components/scroll-battery'
import JsonLd from '@/components/json-ld'
import { LOCALE, SITE_NAME, SITE_URL, organizationSchema, websiteSchema } from '@/lib/seo'
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Six Jars Global — Practical help to bring your ideas to life',
    // Every page supplies its own title; this frames it consistently.
    template: '%s | Six Jars Global',
  },
  description:
    'Publishing, media, digital platforms, data operations, AI skills training and cybersecurity from Bengaluru — six services, one accountable contact.',
  applicationName: SITE_NAME,
  // Ignored by Google, still read by some smaller engines. Kept to real service terms.
  keywords: [
    'Six Jars Global',
    'publishing services Bengaluru',
    'book publishing and print operations',
    'media and content production',
    'website and app development',
    'business process automation',
    'data and business operations',
    'AI skills training',
    'cybersecurity services',
    'digital forensics India',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // No canonical here: it would be inherited by any page that forgets its own.
  // Each page sets one through pageMetadata().
  openGraph: {
    type: 'website',
    locale: LOCALE,
    siteName: SITE_NAME,
  },
  twitter: { card: 'summary_large_image', site: '@SixJarsGlobal' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Google Search Console: set GOOGLE_SITE_VERIFICATION to the token from the
  // "HTML tag" method (or verify by DNS instead and leave it unset).
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
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
    <html lang="en-IN" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollBattery />
        <CookieManager />
      </body>
    </html>
  )
}
