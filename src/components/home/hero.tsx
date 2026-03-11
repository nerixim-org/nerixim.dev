import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export function Hero() {
  const t = useTranslations("home.hero")

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="max-w-3xl text-balance font-heading font-semibold text-4xl tracking-tight md:text-5xl lg:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">{t("description")}</p>
        <div className="mt-8 flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/projects">{t("seeMyWork")}</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">{t("getInTouch")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
