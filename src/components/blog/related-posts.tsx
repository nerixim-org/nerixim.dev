import type { Post } from "@/lib/blog"
import { PostCard } from "./post-card"

type RelatedPostsProps = {
	posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
	if (posts.length === 0) return null

	return (
		<section className="mt-16 border-t border-border pt-10">
			<h2 className="mb-6 text-xl font-semibold">Related posts</h2>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</div>
		</section>
	)
}
