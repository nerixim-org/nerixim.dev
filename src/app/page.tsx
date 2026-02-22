import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <CtaSection />
    </>
  );
}
