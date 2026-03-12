import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { CardPage } from "@/components/card/card-page"
import type { Locale } from "@/i18n/routing"
import type { CardLocale } from "@/lib/card-config"

export default async function CardRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ v?: string }>
}) {
  const { locale } = await params

  if (locale !== "en" && locale !== "ja") {
    notFound()
  }

  setRequestLocale(locale)
  const { v = "a" } = await searchParams
  return <CardPage locale={locale as CardLocale} variant={v} />
}
