import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { CtaSection } from "@/components/home/cta-section"
import { Hero } from "@/components/home/hero"
import { RecentPosts } from "@/components/home/recent-posts"
import { ServicesPreview } from "@/components/home/services-preview"
import type { Locale } from "@/i18n/routing"
import { getLocalizedAlternates, getLocalizedUrl, getOpenGraphLocale } from "@/i18n/urls"
import { siteConfig } from "@/lib/site-config"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const title = t("title.default")
  const description = t("description")

  return {
    alternates: getLocalizedAlternates(locale, "/"),
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(locale),
      url: getLocalizedUrl(locale, "/"),
      siteName: siteConfig.brandName,
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="home-canvas">
      <Hero />
      <ServicesPreview />
      <RecentPosts />
      <CtaSection />
    </div>
  )
}
