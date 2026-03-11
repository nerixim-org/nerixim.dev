import { Code2, Languages, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"

const serviceKeys = [
  { key: "development" as const, icon: Code2 },
  { key: "ai" as const, icon: Sparkles },
  { key: "localization" as const, icon: Languages },
]

export function ServicesPreview() {
  const t = useTranslations("home.services")

  const services = serviceKeys.map(({ key, icon }) => ({
    title: t(`${key}.title`),
    description: t(`${key}.description`),
    icon,
  }))

  return (
    <section className="py-14 md:py-24">
      <div className="section-shell">
        <h2 className="max-w-2xl text-balance font-heading font-semibold text-2xl tracking-tight md:text-3xl">
          {t("heading")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href="/services"
              className="group block animate-fade-in-up"
              style={{ animationDelay: `${index * 90 + 80}ms` }}
            >
              <Card className="surface-panel-interactive h-full gap-0 py-0">
                <CardHeader className="gap-3 px-5 pt-5 pb-3 sm:px-6 sm:pt-6">
                  <div className="icon-tile">
                    <service.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="font-heading text-lg leading-snug">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pt-0 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
