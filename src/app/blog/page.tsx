import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about development, freelancing in Japan, and building products.",
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading font-semibold text-3xl">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Posts coming soon. I&rsquo;ll be writing about freelancing in Japan, building products, and working across
        languages.
      </p>
    </div>
  )
}
