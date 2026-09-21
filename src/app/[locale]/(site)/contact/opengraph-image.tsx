import { type Locale, routing } from "@/i18n/routing"
import { OG_SIZE, renderPageOg } from "@/lib/og-card"

export const alt = "nerixim.dev"
export const size = OG_SIZE
export const contentType = "image/png"

// Rendered at build time, one card per locale; the fonts are fetched then.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Image({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return renderPageOg(locale, "contact")
}
