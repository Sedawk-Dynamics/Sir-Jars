import type { Metadata } from 'next'
import { org } from '@/lib/content'

export const SITE_URL = 'https://sixjarsglobal.com'
export const SITE_NAME = 'Six Jars Global'
export const LOCALE = 'en_IN'

/** Site-wide share card (app/opengraph-image.tsx). Service and article
    pages pass their own route's card through `image`; explicit page metadata
    outranks a segment's opengraph-image file, so it must be named here. */
const DEFAULT_OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Six Jars Global — Practical help to bring your ideas to life',
}

/**
 * Complete metadata for one page.
 *
 * Next merges metadata shallowly, so a page that sets `openGraph` replaces the
 * root's object outright, and a page that does not inherits the homepage's
 * og:url and title. Building all three blocks here means every page shares
 * correct, page-specific social tags instead of the homepage's.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  absoluteTitle = false,
  image,
}: {
  /** Page title; the root template appends "| Six Jars Global". */
  title: string
  /** 70–160 characters; Google truncates beyond roughly 155. */
  description: string
  /** Site-relative path, e.g. "/about". Also the canonical URL. */
  path: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  /** Use the title verbatim, without the brand template. */
  absoluteTitle?: boolean
  /** Share-card URL; defaults to the site-wide card. */
  image?: string
}): Metadata {
  const ogImage = image ? { ...DEFAULT_OG_IMAGE, url: image, alt: title } : DEFAULT_OG_IMAGE
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: LOCALE,
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
      images: [ogImage],
      ...(type === 'article' && { publishedTime, modifiedTime, authors }),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@SixJarsGlobal',
      title: socialTitle,
      description,
      images: [ogImage.url],
    },
  }
}

/* ── Structured data (schema.org JSON-LD) ──────────────────────────────── */

const ORG_ID = `${SITE_URL}/#organization`

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: org.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/six-jars-global-logo-horizontal.png`,
  image: `${SITE_URL}/opengraph-image`,
  email: org.email,
  telephone: org.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Cumins Genesis, Flat D-411, 2nd Main Rd, Silver Cloud Layout, Kalkere Main Rd, Horamavu',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560043',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 13.0289617, longitude: 77.6687345 },
  hasMap: org.mapUrl,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  areaServed: 'IN',
  ...(org.cin && { identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: org.cin } }),
  taxID: org.gstin,
  sameAs: [org.linkedin, org.instagram, org.x, org.facebook],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: org.email,
    telephone: org.phone,
    areaServed: 'IN',
    availableLanguage: ['English'],
  },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'en-IN',
  publisher: { '@id': ORG_ID },
}

export function breadcrumbSchema(crumbs: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Home', href: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href === '/' ? '' : c.href}`,
    })),
  }
}

export function articleSchema(a: {
  slug: string
  title: string
  excerpt: string
  isoDate: string
  image: string
  author: { name: string; role: string }
  section: string
}) {
  const url = `${SITE_URL}/insights/${a.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: url,
    url,
    headline: a.title,
    description: a.excerpt,
    image: [`${SITE_URL}${encodeURI(a.image)}`, `${url}/opengraph-image`],
    datePublished: a.isoDate,
    dateModified: a.isoDate,
    articleSection: a.section,
    inLanguage: 'en-IN',
    author: { '@type': 'Person', name: a.author.name, jobTitle: a.author.role, worksFor: { '@id': ORG_ID } },
    publisher: { '@id': ORG_ID },
  }
}

/** Google for Jobs reads this; description must be the full posting text. */
export function jobPostingSchema(r: {
  slug: string
  title: string
  description: string
  datePosted: string
  type: string
  monthlyPay?: number
  email: string
}) {
  const employmentType: Record<string, string> = {
    'Full-time': 'FULL_TIME',
    'Part-time': 'PART_TIME',
    Contract: 'CONTRACTOR',
    Internship: 'INTERN',
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    url: `${SITE_URL}/careers/${r.slug}`,
    title: r.title,
    description: r.description,
    datePosted: r.datePosted,
    employmentType: employmentType[r.type] ?? 'OTHER',
    hiringOrganization: { '@id': ORG_ID, '@type': 'Organization', name: SITE_NAME, sameAs: SITE_URL },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: organizationSchema.address.streetAddress,
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560043',
        addressCountry: 'IN',
      },
    },
    ...(r.monthlyPay && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: { '@type': 'QuantitativeValue', value: r.monthlyPay, unitText: 'MONTH' },
      },
    }),
    applicationContact: { '@type': 'ContactPoint', email: r.email },
    directApply: false,
  }
}

export function serviceSchema(s: { slug: string; name: string; description: string; audience?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/capabilities/${s.slug}#service`,
    url: `${SITE_URL}/capabilities/${s.slug}`,
    name: s.name,
    serviceType: s.name,
    description: s.description,
    provider: { '@id': ORG_ID },
    areaServed: 'IN',
    ...(s.audience && { audience: { '@type': 'Audience', audienceType: s.audience } }),
  }
}
