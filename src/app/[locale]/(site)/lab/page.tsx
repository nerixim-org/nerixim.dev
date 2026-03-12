import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import { useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/i18n/urls"

type Props = {
  params: Promise<{ locale: Locale }>
}

type LabEntry = {
  href: string
  id: "variantA" | "variantB" | "variantC"
  label: string
  tags: string[]
  accentClassName: string
  previewClassName: string
  orbitClassName: string
}

const labEntries: LabEntry[] = [
  {
    href: "/card?v=a",
    id: "variantA",
    label: "v=a",
    tags: ["Card", "Motion", "Tilt"],
    accentClassName: "from-amber-300/26 via-primary/6 to-transparent dark:from-amber-200/12",
    previewClassName:
      "from-amber-200/70 via-background/60 to-primary/10 dark:from-amber-100/10 dark:via-background/20 dark:to-primary/20",
    orbitClassName: "border-amber-400/35 dark:border-amber-100/18",
  },
  {
    href: "/card?v=b",
    id: "variantB",
    label: "v=b",
    tags: ["Canvas", "Network", "Atmosphere"],
    accentClassName: "from-sky-300/26 via-primary/8 to-transparent dark:from-sky-200/14",
    previewClassName:
      "from-sky-200/70 via-background/60 to-primary/12 dark:from-sky-100/12 dark:via-background/18 dark:to-primary/22",
    orbitClassName: "border-sky-400/35 dark:border-sky-100/20",
  },
  {
    href: "/card?v=c",
    id: "variantC",
    label: "v=c",
    tags: ["WebGL", "Shader", "Particles"],
    accentClassName: "from-slate-400/24 via-primary/10 to-transparent dark:from-slate-200/12",
    previewClassName:
      "from-slate-300/55 via-background/60 to-primary/14 dark:from-slate-100/10 dark:via-background/20 dark:to-primary/24",
    orbitClassName: "border-slate-400/32 dark:border-slate-100/18",
  },
]

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "lab.metadata" })

  return buildPageMetadata(locale, "/lab", t("title"), t("description"))
}

function LabContent() {
  const t = useTranslations("lab")
  const tProjectStatus = useTranslations("projects.status")

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-[-10rem] left-[8%] h-[24rem] w-[24rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.08 262 / 18%) 0%, transparent 72%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[4%] bottom-[-8rem] h-[22rem] w-[22rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.76 0.06 296 / 14%) 0%, transparent 72%)" }}
        aria-hidden="true"
      />

      <div className="section-shell relative">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
          <section className="surface-panel relative overflow-hidden px-6 py-8 sm:px-10 sm:py-10">
            <div className="gradient-rule gradient-rule-animated absolute inset-x-0 top-0 h-px opacity-90" />
            <div
              className="pointer-events-none absolute inset-y-0 right-[-12%] hidden w-[42%] lg:block"
              aria-hidden="true"
            >
              <div className="absolute top-10 right-14 h-40 w-40 rounded-full border border-primary/10" />
              <div className="lab-spin-slow absolute top-6 right-10 h-52 w-52 rounded-full border border-primary/12 border-dashed" />
              <div className="lab-spin-reverse absolute top-16 right-20 h-28 w-28 rounded-full border border-foreground/8" />
            </div>

            <p className="section-kicker">{t("eyebrow")}</p>
            <h1 className="mt-5 max-w-4xl text-balance font-heading font-semibold text-4xl tracking-tight md:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground leading-relaxed md:text-xl">
              {t("description")}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-background/80 px-4 py-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.45)]">
                <span className="font-mono text-foreground text-sm tracking-[0.22em]">
                  {String(labEntries.length).padStart(2, "0")}
                </span>
                <span className="text-muted-foreground text-sm">{t("statsLabel")}</span>
              </div>
              <p className="max-w-xl text-muted-foreground text-sm leading-relaxed">{t("note")}</p>
            </div>
          </section>

          <aside className="surface-panel relative isolate overflow-hidden px-6 py-6 lg:translate-y-5 lg:rotate-[-1.25deg]">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/88 to-primary/6 dark:to-primary/10" />
            <div
              className="absolute -right-10 -bottom-10 h-36 w-36 rounded-full border border-primary/12"
              aria-hidden="true"
            />
            <div className="absolute top-6 right-6 h-28 w-28" aria-hidden="true">
              <div className="lab-spin-slow h-full w-full rounded-full border border-primary/15 border-dashed" />
              <div className="lab-spin-reverse absolute inset-[20%] rounded-full border border-foreground/10" />
            </div>

            <div className="relative">
              <p className="font-mono text-[0.68rem] text-muted-foreground uppercase tracking-[0.26em]">
                {t("eyebrow")}
              </p>
              <div className="mt-5 flex items-end gap-3">
                <span className="font-heading text-6xl leading-none tracking-tight">
                  {String(labEntries.length).padStart(2, "0")}
                </span>
                <p className="max-w-[9rem] pb-1 text-muted-foreground text-sm leading-snug">{t("statsLabel")}</p>
              </div>

              <div className="mt-8 space-y-3">
                {labEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className="rounded-2xl border border-border/70 bg-background/78 px-4 py-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-heading text-base leading-tight">{t(`items.${entry.id}.title`)}</p>
                        <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.22em]">
                          {entry.label}
                        </p>
                      </div>
                      <span className="font-mono text-muted-foreground text-xs tracking-[0.2em]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {labEntries.map((entry) => (
            <Link key={entry.id} href={entry.href} className="group block h-full">
              <Card className="relative h-full overflow-hidden border-border/80 bg-card/88 py-0 shadow-surface transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-standard)] hover:-translate-y-1 hover:border-foreground/10 hover:shadow-surface-hover">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${entry.accentClassName}`}
                  aria-hidden="true"
                />

                <div className="relative px-6 pt-6">
                  <div
                    className={`relative h-40 overflow-hidden rounded-[1.4rem] border border-border/70 bg-gradient-to-br ${entry.previewClassName}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_36%),linear-gradient(140deg,transparent,rgba(77,103,157,0.08))]" />
                    <div className="absolute inset-4 rounded-[1.1rem] border border-background/60 bg-background/26 backdrop-blur-md dark:border-white/8 dark:bg-background/12" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-3 py-1.5 backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="font-mono text-[0.66rem] text-muted-foreground uppercase tracking-[0.22em]">
                        {entry.label}
                      </span>
                    </div>
                    <div className="absolute right-4 bottom-4 font-mono text-foreground/18 text-xs tracking-[0.3em]">
                      {entry.tags[0]}
                    </div>
                    <div
                      className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    >
                      <div
                        className={`lab-spin-slow h-full w-full rounded-full border border-dashed ${entry.orbitClassName}`}
                      />
                      <div className="lab-spin-reverse absolute inset-[18%] rounded-full border border-foreground/10" />
                      <div className="absolute inset-[38%] rounded-full bg-primary/10 blur-[1px]" />
                    </div>
                    <div className="absolute inset-x-7 bottom-7 h-px bg-gradient-to-r from-transparent via-foreground/16 to-transparent" />
                    <div className="absolute inset-y-7 right-8 w-px bg-gradient-to-b from-transparent via-foreground/10 to-transparent" />
                  </div>
                </div>

                <CardHeader className="relative pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary" className="border border-primary/10 bg-primary/6 text-foreground">
                      {tProjectStatus("live")}
                    </Badge>
                    <span className="font-mono text-[0.72rem] text-muted-foreground uppercase tracking-[0.22em]">
                      {entry.label}
                    </span>
                  </div>
                  <CardTitle className="font-heading text-xl leading-tight">{t(`items.${entry.id}.title`)}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {t(`items.${entry.id}.description`)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative pb-2">
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-background/80 text-[0.7rem]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="relative mt-auto justify-between pt-5 pb-6 text-muted-foreground text-sm">
                  <span>{t("open")}</span>
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return <LabContent />
}
