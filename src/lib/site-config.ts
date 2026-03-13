import type { Locale } from "@/i18n/routing"

const personDisplayNameByLocale = {
  en: "Nikita",
  ja: "ニキータ",
  ru: "Никита",
  uk: "Нікіта",
} satisfies Record<Locale, string>

export const siteConfig = {
  brandName: "nerixim",
  title: "Nikita — Software Developer",
  description: "Full-stack developer building software across languages and borders. Based in Japan.",
  url: "https://nerixim.dev",
  personNameCanonical: "Nikita",
  personDisplayNameByLocale,
  links: {
    github: "https://github.com/nerixim",
  },
  nav: [
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ],
} as const

export function getPersonDisplayName(locale: Locale): string {
  return siteConfig.personDisplayNameByLocale[locale]
}
