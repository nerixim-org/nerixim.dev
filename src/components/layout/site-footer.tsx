import { Github } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-8">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <Link
            href="/privacy"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            Privacy
          </Link>
        </div>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          aria-label="GitHub"
        >
          <Github className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </footer>
  )
}
