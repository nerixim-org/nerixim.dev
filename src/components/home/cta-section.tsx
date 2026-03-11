import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export function CtaSection() {
  const t = useTranslations("home.cta")

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-balance font-heading font-semibold text-2xl md:text-3xl">{t("heading")}</h2>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/contact">{t("getInTouch")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
