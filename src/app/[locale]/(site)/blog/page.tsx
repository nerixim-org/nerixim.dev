import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { PostCard } from "@/components/blog/post-card"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata, getLocalizedUrl } from "@/i18n/urls"
import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog.metadata" })

  return buildPageMetadata(locale, "/blog", t("title"), t("description"))
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "blog" })
  const posts = await getAllPosts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "nerixim blog",
    description: t("metadata.description"),
    url: getLocalizedUrl(locale, "/blog"),
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      ...(post.updated && { dateModified: post.updated }),
      url: getLocalizedUrl(locale, `/blog/${post.slug}`),
      author: {
        "@type": "Person",
        name: siteConfig.author,
      },
    })),
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      {/** biome-ignore lint/style/useNamingConvention: see above */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-balance font-heading font-semibold text-3xl">{t("heading")}</h1>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">{t("noPosts")}</p>
      )}
    </div>
  )
}
