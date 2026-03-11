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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-balance font-heading font-semibold text-2xl tracking-tight">{t("heading")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href="/services" className="group">
              <Card className="h-full transition-colors group-hover:border-foreground/20">
                <CardHeader>
                  <service.icon className="size-5 text-muted-foreground" aria-hidden="true" />
                  <CardTitle className="font-heading text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
