import { Badge } from "@/components/ui/badge"
import type { PostFrontmatter } from "@/lib/blog"
import { Calendar, Clock, RefreshCw } from "lucide-react"

type PostHeaderProps = {
	title: string
	date: string
	readingTime: string
	tags: PostFrontmatter["tags"]
	updated?: string
}

function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

export function PostHeader({
	title,
	date,
	readingTime,
	tags,
	updated,
}: PostHeaderProps) {
	return (
		<header className="mb-10 border-b border-border pb-8">
			<h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
				{title}
			</h1>

			<div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
				<span className="flex items-center gap-1.5">
					<Calendar className="size-4" />
					<time dateTime={date}>{formatDate(date)}</time>
				</span>
				<span className="flex items-center gap-1.5">
					<Clock className="size-4" />
					{readingTime}
				</span>
				{updated && (
					<span className="flex items-center gap-1.5">
						<RefreshCw className="size-3.5" />
						Updated {formatDate(updated)}
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
