import { Code2, Languages, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { HapticButtonLink } from "@/components/ui/haptic-button-link"
import { Link } from "@/i18n/navigation"

const capabilityKeys = [
  { key: "development" as const, icon: Code2 },
  { key: "ai" as const, icon: Sparkles },
  { key: "localization" as const, icon: Languages },
]

export function Hero() {
  const t = useTranslations("home.hero")
  const tServices = useTranslations("home.services")

  const capabilities = capabilityKeys.map(({ key, icon }) => ({
    icon,
    title: tServices(`${key}.title`),
  }))

  return (
    <section className="relative overflow-hidden py-20 md:py-36">
      <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden="true" />
      <div
        className="hero-glow pointer-events-none absolute top-0 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 opacity-90 blur-3xl"
        aria-hidden="true"
      />
      <div className="section-shell relative">
        <div className="surface-panel relative overflow-hidden px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <div
            className="surface-panel-atmospheric pointer-events-none absolute inset-0 rounded-[inherit]"
            aria-hidden="true"
          />
          <div
            className="gradient-rule gradient-rule-animated absolute inset-x-0 top-0 h-px opacity-90"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex flex-wrap gap-2">
              {capabilities.map((capability, index) => {
                const Icon = capability.icon

                return (
                  <span
                    key={capability.title}
                    className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-muted-foreground text-sm"
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <Icon className="size-4 text-primary" aria-hidden="true" />
                    {capability.title}
                  </span>
                )
              })}
            </div>

            <h1
              className="mt-6 max-w-4xl animate-fade-in-up text-balance font-heading font-semibold text-4xl tracking-tight md:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              {t("title")}
            </h1>
            <p
              className="mt-6 max-w-2xl animate-fade-in-up text-lg text-muted-foreground leading-relaxed md:text-xl"
              style={{ animationDelay: "180ms" }}
            >
              {t("description")}
            </p>
            <div
              className="mt-8 flex animate-fade-in-up flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <HapticButtonLink size="lg" href="/contact">
                {t("getInTouch")}
              </HapticButtonLink>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">{t("seeMyWork")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
