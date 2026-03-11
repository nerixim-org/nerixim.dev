"use client"

import { Calendar, Clock } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"
import type { Post } from "@/lib/blog"
import { formatDate } from "@/lib/utils"

export function PostCard({ post }: { post: Post }) {
  const locale = useLocale()
  const t = useTranslations("blog")

  return (
    <article className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/50">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="font-heading font-semibold text-lg leading-snug group-hover:text-primary">{post.title}</h3>

        <div className="mt-2 flex items-center gap-3 text-muted-foreground text-xs">
          <span className="flex items-center gap-1">
            <Calendar aria-hidden="true" className="size-3" />
            <time dateTime={post.date}>{formatDate(post.date, "short", locale)}</time>
          </span>
          <span className="flex items-center gap-1">
            <Clock aria-hidden="true" className="size-3" />
            {t("readingTime", { time: post.readingTime })}
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
