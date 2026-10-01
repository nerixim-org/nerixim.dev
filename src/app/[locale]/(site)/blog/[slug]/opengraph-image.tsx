import { type Locale, routing } from "@/i18n/routing"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { OG_SIZE, renderOgCard, siblingsFor } from "@/lib/og-card"

export const alt = "Blog post"
export const size = OG_SIZE
export const contentType = "image/png"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return routing.locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })))
}

type Props = {
  params: Promise<{ locale: Locale; slug: string }>
}

export default async function PostOgImage({ params }: Props) {
  const { locale, slug } = await params
  const siblings = await siblingsFor(locale, ["nav", "blog"])
  const kicker = siblings[0]?.label ?? "Blog"

  let title = "nerixim.dev"
  let description: string | undefined
  try {
    const post = await getPostBySlug(slug)
    title = post.title
    description = post.date
      ? new Date(post.date).toLocaleDateString(
          locale === "ja" ? "ja-JP" : locale === "ru" ? "ru-RU" : locale === "uk" ? "uk-UA" : "en-US",
          { year: "numeric", month: "long", day: "numeric" },
        )
      : undefined
  } catch {}

  return renderOgCard({ locale, kicker, title, description, siblings })
}
