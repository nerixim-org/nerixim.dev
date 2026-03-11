import { Code2, Languages, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "services.metadata" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

const serviceKeys = [
  { key: "development" as const, icon: Code2 },
  { key: "ai" as const, icon: Sparkles },
  { key: "localization" as const, icon: Languages },
]

function ServicesContent() {
  const t = useTranslations("services")

  const services = serviceKeys.map(({ key, icon }) => ({
    icon,
    title: t(`${key}.title`),
    items: t.raw(`${key}.items`) as string[],
    who: t(`${key}.who`),
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        provider: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
        },
      },
    })),
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      {/** biome-ignore lint/style/useNamingConvention: see above */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-balance font-heading font-semibold text-3xl">{t("heading")}</h1>
      <p className="mt-2 mb-12 text-lg text-muted-foreground">{t("description")}</p>

      <div className="space-y-12">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <section key={service.title}>
              <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-2 text-balance font-heading font-semibold text-xl">{service.title}</h2>
              <ul className="mt-4 list-inside list-disc space-y-1 text-muted-foreground">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-muted-foreground/80 text-sm italic">{t("whoThisIsFor", { who: service.who })}</p>
            </section>
          )
        })}
      </div>

      <section className="mt-16 rounded-lg bg-muted/50 p-8 text-center">
        <h2 className="text-balance font-heading font-semibold text-xl">{t("cta.heading")}</h2>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/contact">{t("cta.getInTouch")}</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blog">{t("cta.readBlog")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ServicesContent />
}
