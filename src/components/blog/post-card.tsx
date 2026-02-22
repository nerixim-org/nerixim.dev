import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/blog"

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/50">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="font-heading font-semibold text-lg leading-snug group-hover:text-primary">{post.title}</h3>

        <div className="mt-2 flex items-center gap-3 text-muted-foreground text-xs">
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {post.readingTime}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">{post.description}</p>
      </Link>

      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  )
}
