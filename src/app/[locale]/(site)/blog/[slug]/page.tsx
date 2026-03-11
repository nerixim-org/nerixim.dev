import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { PostBody } from "@/components/blog/post-body"
import { PostHeader } from "@/components/blog/post-header"
import { RelatedPosts } from "@/components/blog/related-posts"
import { ShareButtons } from "@/components/blog/share-buttons"
import { TableOfContents } from "@/components/blog/table-of-contents"
import type { Locale } from "@/i18n/routing"
import { extractHeadings, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let post: Awaited<ReturnType<typeof getPostBySlug>>
  try {
    post = await getPostBySlug(slug)
  } catch {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.updated && { modifiedTime: post.updated }),
      url: `${siteConfig.url}/blog/${slug}`,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  let post: Awaited<ReturnType<typeof getPostBySlug>>
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  if (!post.published) {
    notFound()
  }

  const headings = extractHeadings(post.content)
  const relatedPosts = await getRelatedPosts(post.slug, post.tags)
  const postUrl = `${siteConfig.url}/blog/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.updated && { dateModified: post.updated }),
    url: postUrl,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    keywords: post.tags,
  }

  return (
    <article className="mx-auto w-full max-w-prose px-4 py-12 sm:px-6 lg:py-16">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml lint/style/useNamingConvention: JSON-LD structured data requires dangerouslySetInnerHTML */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PostHeader
        title={post.title}
        date={post.date}
        readingTime={post.readingTime}
        tags={post.tags}
        updated={post.updated}
      />

      <TableOfContents headings={headings} />

      <PostBody content={post.content} />

      <footer className="mt-12 border-border border-t pt-8">
        <ShareButtons url={postUrl} title={post.title} />
      </footer>

      <RelatedPosts posts={relatedPosts} />
    </article>
  )
}
