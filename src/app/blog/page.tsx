import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Development, Freelancing in Japan, and Building Products",
  description:
    "Articles on software development, freelancing as a developer in Japan, building products across languages, and working with AI. Written from real experience.",
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-balance font-heading font-semibold text-3xl">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Posts coming soon. I&rsquo;ll be writing about freelancing in Japan, building products, and working across
        languages.
      </p>
    </div>
  )
}
