import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx"
import { Callout } from "@/components/mdx/callout"
import { mdxOptions } from "@/lib/blog"

const components = {
  ...mdxComponents,
  Callout,
}

type PostBodyProps = {
  content: string
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <div className="prose">
      <MDXRemote source={content} options={{ mdxOptions }} components={components} />
    </div>
  )
}
