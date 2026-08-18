import type { MetadataRoute } from 'next'
import { articles, capabilities } from '@/lib/content'
import { SITE_URL } from './layout'

/** Derived from the content library, so a new page cannot be left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/capabilities',
    '/how-it-works',
    '/proof',
    '/insights',
    '/about',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
    '/legal/confidentiality',
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    })),
    ...capabilities.map((c) => ({
      url: `${SITE_URL}/capabilities/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/insights/${a.slug}`,
      lastModified: new Date(a.isoDate),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
