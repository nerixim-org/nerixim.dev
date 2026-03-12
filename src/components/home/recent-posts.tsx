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
    <section className="scroll-reveal py-16 md:py-24">
      <div className="section-shell">
        <div className="surface-panel surface-panel-atmospheric px-6 py-8 sm:px-8 sm:py-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-balance font-heading font-semibold text-2xl tracking-tight md:text-3xl">
              {t("heading")}
            </h2>
            <Link
              href="/blog"
              className="interactive-control group inline-flex items-center gap-1 rounded-full px-2 py-1 text-muted-foreground text-sm hover:bg-background/80 hover:text-foreground motion-reduce:transform-none"
            >
              {t("allPosts")}
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-[var(--duration-quick)] ease-[var(--ease-standard)] group-hover:translate-x-0.5 motion-reduce:transform-none"
              />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
