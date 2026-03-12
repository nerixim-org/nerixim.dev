import { setRequestLocale } from "next-intl/server"
import { CardPage } from "@/components/card/card-page"
import type { Locale } from "@/i18n/routing"
import { resolveCardLocale } from "@/lib/card-config"

export default async function CardRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<{ v?: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const { v = "a" } = await searchParams
  return <CardPage locale={resolveCardLocale(locale)} variant={v} />
}
