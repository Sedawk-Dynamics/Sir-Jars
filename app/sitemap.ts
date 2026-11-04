import type { MetadataRoute } from 'next'
import { articles, capabilities, careers } from '@/lib/content'
import { legalDocs, legalOrder } from '@/lib/legal'
import { SITE_URL } from '@/lib/seo'

const absolute = (path: string) => `${SITE_URL}${encodeURI(path)}`

/** Newest of the given ISO dates, or undefined when there are none. */
function latest(dates: (string | undefined)[]) {
  const times = dates.filter(Boolean).map((d) => Date.parse(d!)).filter((t) => !Number.isNaN(t))
  return times.length ? new Date(Math.max(...times)) : undefined
}

/**
 * Derived from the content library, so a new page cannot be left out.
 *
 * lastModified is only set where the content carries a real date: Google
 * ignores lastmod once it learns a site stamps every URL with the build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articlesUpdated = latest(articles.map((a) => a.isoDate))
  const careersUpdated = latest(careers.roles.map((r) => r.datePosted))

  const staticRoutes: { path: string; priority: number; lastModified?: Date }[] = [
    { path: '', priority: 1, lastModified: latest([articlesUpdated?.toISOString(), careersUpdated?.toISOString()]) },
    { path: '/capabilities', priority: 0.9 },
    { path: '/how-it-works', priority: 0.7 },
    { path: '/insights', priority: 0.7, lastModified: articlesUpdated },
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
    { path: '/careers', priority: 0.6, lastModified: careersUpdated },
  ]

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.path}`,
      ...(r.lastModified && { lastModified: r.lastModified }),
      changeFrequency: 'monthly' as const,
      priority: r.priority,
    })),
    ...capabilities.map((c) => ({
      url: `${SITE_URL}/capabilities/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      ...(c.heroImage && { images: [absolute(c.heroImage.src)] }),
    })),
    ...articles.map((a) => ({
      url: `${SITE_URL}/insights/${a.slug}`,
      lastModified: new Date(a.isoDate),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      images: [absolute(a.image)],
    })),
    ...careers.roles.map((r) => ({
      url: `${SITE_URL}/careers/${r.slug}`,
      lastModified: new Date(r.datePosted),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...legalOrder.map((slug) => {
      const reviewed = latest([legalDocs[slug].reviewed, legalDocs[slug].effective])
      return {
        url: `${SITE_URL}/legal/${slug}`,
        ...(reviewed && { lastModified: reviewed }),
        changeFrequency: 'yearly' as const,
        priority: 0.3,
      }
    }),
  ]
}
