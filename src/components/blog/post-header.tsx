"use client"

import { Calendar, Clock, RefreshCw } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import type { PostFrontmatter } from "@/lib/blog"
import { formatDate } from "@/lib/utils"

type PostHeaderProps = {
  title: string
  date: string
  readingTime: string
  tags: PostFrontmatter["tags"]
  updated?: string
}

export function PostHeader({ title, date, readingTime, tags, updated }: PostHeaderProps) {
  const locale = useLocale()
  const t = useTranslations("blog")

  return (
    <header className="mb-10 border-border border-b pb-8">
      <h1 className="font-bold font-heading text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
        <span className="flex items-center gap-1.5">
          <Calendar aria-hidden="true" className="size-4" />
          <time dateTime={date}>{formatDate(date, "long", locale)}</time>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock aria-hidden="true" className="size-4" />
          {t("readingTime", { time: readingTime })}
        </span>
        {updated && (
          <span className="flex items-center gap-1.5">
            <RefreshCw aria-hidden="true" className="size-3.5" />
            {t("updated", { date: formatDate(updated, "long", locale) })}
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </header>
  )
}
