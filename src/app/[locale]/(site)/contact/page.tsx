import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ContactForm } from "@/components/contact-form"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/i18n/urls"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact.metadata" })

  return buildPageMetadata(locale, "/contact", t("title"), t("description"))
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "contact" })

  return (
    <div className="page-shell max-w-3xl">
      <h1 className="text-balance font-heading font-semibold text-3xl md:text-4xl">{t("heading")}</h1>
      <p className="mt-3 mb-8 max-w-2xl text-muted-foreground leading-relaxed">{t("description")}</p>
      <ContactForm />
    </div>
  )
}
