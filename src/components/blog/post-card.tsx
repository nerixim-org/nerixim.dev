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
    <Link href={`/blog/${post.slug}`} className="interactive-card-link group/post h-full">
      <article className="surface-panel-interactive h-full rounded-[1.5rem] bg-card/80 p-5">
        <h3 className="font-heading font-semibold text-lg leading-snug transition-colors duration-[var(--duration-standard)] ease-[var(--ease-standard)] group-hover/post:text-primary">
          {post.title}
        </h3>

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

        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/5 text-foreground text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </article>
    </Link>
  )
}
