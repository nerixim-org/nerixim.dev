import { setRequestLocale } from "next-intl/server"
import { CtaSection } from "@/components/home/cta-section"
import { Hero } from "@/components/home/hero"
import { RecentPosts } from "@/components/home/recent-posts"
import { ServicesPreview } from "@/components/home/services-preview"
import type { Locale } from "@/i18n/routing"

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <ServicesPreview />
      <RecentPosts />
      <CtaSection />
    </>
  )
}
