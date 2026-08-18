import type { Metadata, Viewport } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const SITE_URL = 'https://sixjarsglobal.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Six Jars Global — Mission-critical work. One accountable partner.',
    // Every page supplies its own title; this frames it consistently.
    template: '%s | Six Jars Global',
  },
  description:
    'Six Jars connects publishing, media, digital, data, cybersecurity and forensics for Catholic and mission-led organizations — governed, human-reviewed and proved at close.',
  keywords: [
    'mission-led operations',
    'Catholic organizations',
    'publishing operations',
    'AI governance',
    'cybersecurity',
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
    title: 'Six Jars Global — Mission-critical work. One accountable partner.',
    description:
      'Six connected capabilities for work that must be governed, human-reviewed and proved at close.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Six Jars Global — Mission-critical work. One accountable partner.',
    description:
      'Six connected capabilities for work that must be governed, human-reviewed and proved at close.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4B0D24',
  width: 'device-width',
  initialScale: 1,
  // Never block zoom — pinch-zoom is an accessibility requirement.
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSerif.variable}`}>
      <body className="antialiased font-sans">
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
