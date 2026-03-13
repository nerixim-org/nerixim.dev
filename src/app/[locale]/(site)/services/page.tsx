import { Code2, Languages, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/i18n/urls"
import { getPersonDisplayName, siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "services.metadata" })

  return buildPageMetadata(locale, "/services", t("title"), t("description"))
}

const serviceKeys = [
  { key: "development" as const, icon: Code2 },
  { key: "ai" as const, icon: Sparkles },
  { key: "localization" as const, icon: Languages },
]

function ServicesContent({ locale }: { locale: Locale }) {
  const t = useTranslations("services")
  const personName = getPersonDisplayName(locale)

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
          name: personName,
          ...(personName !== siteConfig.personNameCanonical ? { alternateName: siteConfig.personNameCanonical } : {}),
          url: siteConfig.url,
        },
      },
    })),
  }

  return (
    <div className="page-shell max-w-4xl">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      {/** biome-ignore lint/style/useNamingConvention: see above */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-balance font-heading font-semibold text-3xl md:text-4xl">{t("heading")}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground leading-relaxed">{t("description")}</p>

      <div className="mt-12 space-y-8">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <section key={service.title} className="surface-panel p-8 sm:p-10">
              <div className="icon-tile">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-balance font-heading font-semibold text-xl md:text-2xl">{service.title}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground text-sm italic leading-relaxed">
                {t("whoThisIsFor", { who: service.who })}
              </p>
              <ul className="mt-6 grid gap-3 text-muted-foreground text-sm leading-relaxed sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <section className="surface-panel relative mt-16 overflow-hidden px-8 py-10 text-center sm:px-10">
        <div className="gradient-rule absolute inset-x-0 top-0 h-px opacity-90" aria-hidden="true" />
        <h2 className="text-balance font-heading font-semibold text-xl md:text-2xl">{t("cta.heading")}</h2>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" asChild>
            <Link href="/contact">{t("cta.getInTouch")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
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

  return <ServicesContent locale={locale} />
}
