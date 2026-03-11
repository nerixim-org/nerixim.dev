import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "privacy.metadata" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

function PrivacyContent() {
  const t = useTranslations("privacy")

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-balance font-heading font-semibold text-3xl">{t("heading")}</h1>
      <p className="mt-2 text-muted-foreground">{t("intro")}</p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">{t("dataCollected.heading")}</h2>
      <p className="mt-2 text-muted-foreground">
        {t.rich("dataCollected.content", {
          strong: (chunks) => <strong className="font-medium text-foreground">{chunks}</strong>,
        })}
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">{t("dataUsed.heading")}</h2>
      <p className="mt-2 text-muted-foreground">{t("dataUsed.content")}</p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">{t("analytics.heading")}</h2>
      <p className="mt-2 text-muted-foreground">
        {t.rich("analytics.content", {
          vercelAnalytics: (chunks) => (
            <a
              href="https://vercel.com/docs/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {chunks}
            </a>
          ),
          speedInsights: (chunks) => (
            <a
              href="https://vercel.com/docs/speed-insights"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">{t("cookies.heading")}</h2>
      <p className="mt-2 text-muted-foreground">
        {t.rich("cookies.content", {
          code: (chunks) => (
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">{chunks}</code>
          ),
        })}
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">{t("thirdParty.heading")}</h2>
      <p className="mt-2 text-muted-foreground">
        {t.rich("thirdParty.content", {
          vercel: (chunks) => (
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {chunks}
            </a>
          ),
          cloudflare: (chunks) => (
            <a
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {chunks}
            </a>
          ),
          slack: (chunks) => (
            <a
              href="https://slack.com/trust/privacy/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-foreground"
            >
              {chunks}
            </a>
          ),
        })}
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">{t("contactSection.heading")}</h2>
      <p className="mt-2 text-muted-foreground">
        {t.rich("contactSection.content", {
          contactForm: (chunks) => (
            <Link href="/contact" className="underline underline-offset-4 transition-colors hover:text-foreground">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  )
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <PrivacyContent />
}
