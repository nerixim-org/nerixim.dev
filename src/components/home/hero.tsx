import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="max-w-3xl font-heading font-semibold text-4xl tracking-tight md:text-5xl lg:text-6xl">
          Building software across languages and borders.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Full-stack developer based in Japan. I ship products in English, Japanese, and Russian.
        </p>
        <div className="mt-8 flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/projects">See my work</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
