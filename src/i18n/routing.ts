import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ja"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 31536000,
  },
})

export type Locale = (typeof routing.locales)[number]
