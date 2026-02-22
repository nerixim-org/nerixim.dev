import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-balance font-heading font-semibold text-2xl md:text-3xl">
          Have a project? Let&rsquo;s talk.
        </h2>
        <p className="mt-4 text-muted-foreground">
          I&rsquo;m currently available for freelance work and collaborations.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
