import { mdxOptions } from "@/lib/blog"
import { MDXRemote } from "next-mdx-remote/rsc"

type PostBodyProps = {
	content: string
}

export function PostBody({ content }: PostBodyProps) {
	return (
		<div className="prose">
			<MDXRemote
				source={content}
				options={{ mdxOptions }}
			/>
		</div>
	)
}
