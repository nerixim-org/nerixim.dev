import { CtaSection } from "@/components/home/cta-section"
import { Hero } from "@/components/home/hero"
import { ServicesPreview } from "@/components/home/services-preview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <CtaSection />
    </>
  )
}
