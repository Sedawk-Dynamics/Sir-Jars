import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    // The enquiry endpoint is not a page; keep it out of crawl budget.
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
