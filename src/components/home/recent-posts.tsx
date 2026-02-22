import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { PostCard } from "@/components/blog/post-card"
import { getAllPosts } from "@/lib/blog"

export async function RecentPosts() {
  const posts = await getAllPosts()
  const recentPosts = posts.slice(0, 2)

  if (recentPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-balance font-heading font-semibold text-2xl tracking-tight">Recent writing</h2>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground"
          >
            All posts
            <ArrowRight className="size-3.5" />
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
