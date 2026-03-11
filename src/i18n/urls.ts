import type { Metadata } from "next"
import { siteConfig } from "@/lib/site-config"
import { type Locale, routing } from "./routing"

function normalizePathname(pathname: string): string {
  if (pathname === "/") {
    return pathname
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash
}

export function getLocalizedPath(locale: Locale, pathname = "/"): string {
  const normalizedPathname = normalizePathname(pathname)
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`

  if (normalizedPathname === "/") {
    return prefix || "/"
  }

  return `${prefix}${normalizedPathname}`
}

export function getLocalizedUrl(locale: Locale, pathname = "/"): string {
  return new URL(getLocalizedPath(locale, pathname), siteConfig.url).toString()
}

export function getLocalizedAlternates(locale: Locale, pathname: string): NonNullable<Metadata["alternates"]> {
  const normalizedPathname = normalizePathname(pathname)

  return {
    canonical: getLocalizedPath(locale, normalizedPathname),
    languages: {
      ...Object.fromEntries(routing.locales.map((entry) => [entry, getLocalizedPath(entry, normalizedPathname)])),
      "x-default": getLocalizedPath(routing.defaultLocale, normalizedPathname),
    },
  }
}

export function getOpenGraphLocale(locale: Locale): "en_US" | "ja_JP" {
  return locale === "ja" ? "ja_JP" : "en_US"
}

export function buildPageMetadata(locale: Locale, pathname: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, pathname),
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: getLocalizedUrl(locale, pathname),
      siteName: siteConfig.name,
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  }
}
