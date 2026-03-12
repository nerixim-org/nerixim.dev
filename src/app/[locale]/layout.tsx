import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { ConsoleSignature } from "@/components/layout/console-signature"
import type { Locale } from "@/i18n/routing"
import { routing } from "@/i18n/routing"
import { getOpenGraphLocale } from "@/i18n/urls"
import { Providers } from "../providers"
import "../globals.css"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = (await params).locale as Locale
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    metadataBase: new URL("https://nerixim.dev"),
    title: {
      default: t("title.default"),
      template: t("title.template"),
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      siteName: "nerixim",
      title: t("title.default"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title.default"),
      description: t("description"),
    },
    icons: {
      icon: "/favicon.svg",
    },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const requestedLocale = (await params).locale

  if (!routing.locales.includes(requestedLocale as Locale)) {
    notFound()
  }

  const locale = requestedLocale as Locale
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      style={
        {
          "--font-heading":
            '"Georgia", "Times New Roman", "Source Serif 4", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
          "--font-body":
            '"Segoe UI", "Verdana", "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif',
        } as React.CSSProperties
      }
    >
      <head>
        <meta name="theme-color" content="#faf9f7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1f2028" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased">
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <ConsoleSignature />
            {children}
            <Analytics />
            <SpeedInsights />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
