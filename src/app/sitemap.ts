import type { MetadataRoute } from "next"
import { routing } from "@/i18n/routing"
import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const posts = await getAllPosts()
  const locales = routing.locales

  const staticPages: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`
    const isDefaultLocale = locale === routing.defaultLocale

    staticPages.push(
      {
        url: `${siteConfig.url}${prefix}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: isDefaultLocale ? 1.0 : 0.9,
      },
      {
        url: `${siteConfig.url}${prefix}/about`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${siteConfig.url}${prefix}/services`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${siteConfig.url}${prefix}/projects`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${siteConfig.url}${prefix}/lab`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${siteConfig.url}${prefix}/blog`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${siteConfig.url}${prefix}/contact`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${siteConfig.url}${prefix}/privacy`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      },
    )
  }

  const localizedBlogPages: MetadataRoute.Sitemap = locales.flatMap((locale) => {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`

    return posts.map((post) => ({
      url: `${siteConfig.url}${prefix}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 0.7 : 0.6,
    }))
  })

  return [...staticPages, ...localizedBlogPages]
}
