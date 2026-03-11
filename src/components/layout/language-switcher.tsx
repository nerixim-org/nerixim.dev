"use client"

import { Globe } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const targetLocale: Locale = locale === "en" ? "ja" : "en"
  const localeCookieName =
    typeof routing.localeCookie === "object" && routing.localeCookie ? routing.localeCookie.name : "NEXT_LOCALE"

  function switchLocale() {
    if (targetLocale === routing.defaultLocale) {
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API support is still uneven, and this needs to work broadly.
      document.cookie = `${localeCookieName}=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`
      window.location.assign(`${pathname}${window.location.search}${window.location.hash}`)
      return
    }

    router.replace(pathname, { locale: targetLocale })
  }

  return (
    <Button variant="ghost" size="icon" onClick={switchLocale} aria-label={t("label")}>
      <Globe className="size-4" aria-hidden="true" />
      <span className="sr-only">{t(targetLocale)}</span>
    </Button>
  )
}
