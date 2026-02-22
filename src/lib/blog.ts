import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { z } from "zod"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

const postFrontmatterSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.string(),
	updated: z.string().optional(),
	tags: z.array(z.string()),
	published: z.boolean().default(true),
})

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>

export type Post = PostFrontmatter & {
	slug: string
	readingTime: string
	content: string
}

// biome-ignore lint/suspicious/noExplicitAny: rehype plugin types are complex and incompatible with next-mdx-remote's expected types
export const mdxOptions: { rehypePlugins: any[] } = {
	rehypePlugins: [
		rehypeSlug,
		[rehypeAutolinkHeadings, { behavior: "wrap" }],
		[
			rehypePrettyCode,
			{ theme: { dark: "github-dark", light: "github-light" } },
		],
	],
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
	const source = await fs.readFile(filePath, "utf-8")
	const { data, content } = matter(source)
	const frontmatter = postFrontmatterSchema.parse(data)
	const stats = readingTime(content)

	return {
		...frontmatter,
		slug,
		readingTime: stats.text,
		content,
	}
}

export async function getAllPosts(): Promise<Post[]> {
	let files: string[]
	try {
		files = await fs.readdir(BLOG_DIR)
	} catch {
		return []
	}

	const mdxFiles = files.filter((f) => f.endsWith(".mdx"))

	const posts = await Promise.all(
		mdxFiles.map(async (file) => {
			const slug = file.replace(/\.mdx$/, "")
			return getPostBySlug(slug)
		}),
	)

	return posts
		.filter((post) => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getRelatedPosts(
	currentSlug: string,
	tags: string[],
	limit = 3,
): Promise<Post[]> {
	const allPosts = await getAllPosts()

	return allPosts
		.filter((post) => post.slug !== currentSlug)
		.map((post) => ({
			post,
			overlap: post.tags.filter((tag) => tags.includes(tag)).length,
		}))
		.filter(({ overlap }) => overlap > 0)
		.sort((a, b) => b.overlap - a.overlap)
		.slice(0, limit)
		.map(({ post }) => post)
}

export function extractHeadings(
	content: string,
): { id: string; text: string; level: number }[] {
	const headingRegex = /^(#{2,3})\s+(.+)$/gm
	const headings: { id: string; text: string; level: number }[] = []
	let match: RegExpExecArray | null

	while (true) {
		match = headingRegex.exec(content)
		if (!match) break
		const text = match[2].trim()
		const id = text
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "")
		headings.push({ id, text, level: match[1].length })
	}

	return headings
}
