import { getRequestConfig } from "next-intl/server"
import { type Locale, routing } from "./routing"

function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && routing.locales.includes(value as Locale)
}

// biome-ignore lint/style/noDefaultExport: required by next-intl
export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale
  const locale: Locale = isLocale(requestedLocale) ? requestedLocale : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
