import { setRequestLocale } from "next-intl/server"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import type { Locale } from "@/i18n/routing"

export default async function SiteLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="site-main flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
