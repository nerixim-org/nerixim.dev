"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="font-bold font-heading text-6xl tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
      <Link href="/" className="mt-6 text-sm underline underline-offset-4 transition-colors hover:text-foreground">
        {t("goHome")}
      </Link>
    </div>
  )
}
