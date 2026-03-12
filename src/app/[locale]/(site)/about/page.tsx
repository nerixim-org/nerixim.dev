import type { Metadata } from "next"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/i18n/urls"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about.metadata" })

  return buildPageMetadata(locale, "/about", t("title"), t("description"))
}

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "SwiftUI",
  "React Native",
  "Node.js",
  "Tailwind CSS",
  "AI/LLM Integration",
]

function AboutContent() {
  const t = useTranslations("about")
  const siteConfig = { author: "Nikita", url: "https://nerixim.dev", links: { github: "https://github.com/nerixim" } }

  const languages = [
    { name: t("languages.russian"), level: t("languages.russianLevel") },
    { name: t("languages.english"), level: t("languages.englishLevel") },
    { name: t("languages.japanese"), level: t("languages.japaneseLevel") },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github],
    jobTitle: "Software Developer",
    knowsLanguage: ["en", "ja", "ru", "uk"],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  }

  return (
    <div className="page-shell max-w-4xl">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      {/** biome-ignore lint/style/useNamingConvention: see above */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="surface-panel flex flex-col items-center gap-6 px-8 py-10 text-center md:flex-row md:text-left">
        <Image
          src="/avatar-placeholder.svg"
          alt={t("name")}
          width={120}
          height={120}
          className="rounded-full border border-border/80 bg-surface-muted p-2 shadow-surface"
          priority
        />
        <div>
          <h1 className="text-balance font-heading font-semibold text-3xl md:text-4xl">{t("name")}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{t("tagline")}</p>
        </div>
      </div>

      <section className="surface-panel mt-16 px-8 py-10">
        <p className="max-w-3xl text-foreground text-lg leading-relaxed">{t("story.p1")}</p>
        <div className="mt-6 space-y-5">
          <p className="text-base text-muted-foreground leading-relaxed">{t("story.p2")}</p>
          <p className="text-base text-muted-foreground leading-relaxed">{t("story.p3")}</p>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("story.p4_pre")}
            <Link href="/blog" className="underline underline-offset-4 hover:text-foreground">
              {t("story.p4_link")}
            </Link>
            {t("story.p4_post")}
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            {t("story.p5_pre")}
            <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
              {t("story.p5_link")}
            </Link>
            {t("story.p5_post")}
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-balance font-heading font-semibold text-xl">{t("tech.heading")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="border border-primary/10 bg-primary/5 text-foreground">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-balance font-heading font-semibold text-xl">{t("languages.heading")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {languages.map((lang) => (
            <div key={lang.name} className="surface-panel p-4">
              <p className="font-medium">{lang.name}</p>
              <p className="mt-1 text-muted-foreground text-sm">{lang.level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <AboutContent />
}
