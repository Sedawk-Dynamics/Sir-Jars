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
      // /favicon.ico is linked automatically from app/favicon.ico.
      // Google's search-result favicon wants a multiple of 48px.
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Google Search Console "HTML tag" token. GOOGLE_SITE_VERIFICATION overrides
  // it, e.g. to verify a second property. Remove only after switching to DNS.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || 'gLFsJoX1a20dA-GXA4Tnykr3MHDYZswQzZWKZc9yzDE',
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

const GA_ID = 'G-109E92XBB8'

// Google Analytics with Consent Mode v2. Everything starts denied; a visitor's
// stored choice is applied before the tag loads so returning visitors who
// accepted are measured from the first hit. CookieManager sends updates.
const gtagInit = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', wait_for_update: 500
});
try {
  var c = JSON.parse(localStorage.getItem('sjg-cookie-consent-v1') || 'null');
  if (c) gtag('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied'
  });
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${cormorant.variable}`}>
      <head>
        {/* Google tag (gtag.js) — kept first in <head>, as Google asks. */}
        <script dangerouslySetInnerHTML={{ __html: gtagInit }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      </head>
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
