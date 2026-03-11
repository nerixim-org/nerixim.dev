import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ContactForm } from "@/components/contact-form"
import type { Locale } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact.metadata" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: "contact" })

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 md:py-24">
      <h1 className="text-balance font-heading font-semibold text-3xl">{t("heading")}</h1>
      <p className="mt-2 mb-8 text-muted-foreground">{t("description")}</p>
      <ContactForm />
    </div>
  )
}
