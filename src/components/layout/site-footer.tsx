import { Github } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { siteConfig } from "@/lib/site-config"

export function SiteFooter() {
  const t = useTranslations("footer")

  return (
    <footer className="mt-16">
      <div className="section-shell">
        <div className="gradient-rule h-px opacity-80" />
      </div>
      <div className="section-shell flex flex-wrap items-center gap-x-4 gap-y-2 py-8 sm:justify-between sm:py-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <Link
            href="/privacy"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          >
            {t("privacy")}
          </Link>
        </div>
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
          aria-label="GitHub"
        >
          <Github className="size-4" aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
