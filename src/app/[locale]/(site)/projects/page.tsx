import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ProjectCard } from "@/components/project-card"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/i18n/urls"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "projects.metadata" })

  return buildPageMetadata(locale, "/projects", t("title"), t("description"))
}

function ProjectsContent() {
  const t = useTranslations("projects")

  const projects = [
    {
      title: t("items.pechka.title"),
      description: t("items.pechka.description"),
      status: "in-progress" as const,
      tags: ["Swift", "SwiftUI", "iOS"],
      statusLabel: t("status.inProgress"),
    },
    {
      title: t("items.nerixim.title"),
      description: t("items.nerixim.description"),
      status: "live" as const,
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      href: "/",
      statusLabel: t("status.live"),
    },
    {
      title: t("items.freelance.title"),
      description: t("items.freelance.description"),
      status: "live" as const,
      tags: ["React", "TypeScript", "Node.js"],
      statusLabel: t("status.live"),
    },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-balance font-heading font-semibold text-3xl">{t("heading")}</h1>
      <p className="mt-2 mb-12 text-lg text-muted-foreground">{t("description")}</p>

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <ProjectsContent />
}
