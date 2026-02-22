import type { Metadata } from "next"
import { PostCard } from "@/components/blog/post-card"
import { getAllPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on software development, freelancing as a developer in Japan, building products across languages, and working with AI.",
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "nerixim blog",
    description: metadata.description,
    url: `${siteConfig.url}/blog`,
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
      url: `${siteConfig.url}/blog/${post.slug}`,
      author: {
        "@type": "Person",
        name: siteConfig.author,
      },
    })),
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h1 className="text-balance font-heading font-semibold text-3xl">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Writing about freelancing in Japan, building products, and working across languages.
      </p>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">No posts yet.</p>
      )}
    </div>
  )
}
