import { useTranslations } from "next-intl"
import { HapticButtonLink } from "@/components/ui/haptic-button-link"

export function CtaSection() {
  const t = useTranslations("home.cta")

  return (
    <section className="scroll-reveal py-14 md:py-24">
      <div className="section-shell">
        <div className="surface-panel relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12">
          <div
            className="surface-panel-atmospheric pointer-events-none absolute inset-0 rounded-[inherit]"
            aria-hidden="true"
          />
          <div
            className="gradient-rule gradient-rule-animated absolute inset-x-0 top-0 h-px opacity-90"
            aria-hidden="true"
          />
          <div
            className="hero-glow pointer-events-none absolute -top-16 -right-16 size-48 opacity-70 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-balance font-heading font-semibold text-2xl md:text-3xl">{t("heading")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("description")}</p>
            <div className="mt-6">
              <HapticButtonLink size="lg" href="/contact">
                {t("getInTouch")}
              </HapticButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
