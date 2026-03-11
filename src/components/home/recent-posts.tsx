import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { PostCard } from "@/components/blog/post-card"
import { Link } from "@/i18n/navigation"
import { getAllPosts } from "@/lib/blog"

export async function RecentPosts() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 2)
  const t = await getTranslations("home.recentPosts")

  if (recentPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-balance font-heading font-semibold text-2xl tracking-tight">{t("heading")}</h2>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            {t("allPosts")}
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
