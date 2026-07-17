import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'id']
  const staticPages = ['', '/about', '/projects', '/achievements', '/contact']

  const entries: MetadataRoute.Sitemap = []

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      })
    }
  }

  return entries
}
