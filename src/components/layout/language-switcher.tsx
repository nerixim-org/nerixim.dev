"use client"

import { Globe } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useOptionalHaptics } from "@/hooks/use-optional-haptics"
import { usePathname, useRouter } from "@/i18n/navigation"
import { type Locale, routing } from "@/i18n/routing"

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher")
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const pulse = useOptionalHaptics()
  const [open, setOpen] = useState(false)

  const localeCookieName =
    typeof routing.localeCookie === "object" && routing.localeCookie ? routing.localeCookie.name : "NEXT_LOCALE"

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      return
    }

    pulse(8)

    if (nextLocale === routing.defaultLocale) {
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API support is still uneven, and this needs to work broadly.
      document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`
      window.location.assign(`${pathname}${window.location.search}${window.location.hash}`)
      return
    }

    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("label")}
          className="group size-11 rounded-full data-[state=open]:bg-accent/70 data-[state=open]:text-foreground"
          onClick={() => pulse(6)}
        >
          <Globe
            className="size-4 transition-transform duration-200 ease-[var(--ease-standard)] group-data-[state=open]:rotate-12 group-data-[state=open]:scale-110 motion-reduce:transition-none"
            aria-hidden="true"
          />
          <span className="sr-only">{t(locale)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuLabel>{t("label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale} onValueChange={(nextLocale) => switchLocale(nextLocale as Locale)}>
          {routing.locales.map((entry) => (
            <DropdownMenuRadioItem key={entry} value={entry}>
              {t(entry)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
