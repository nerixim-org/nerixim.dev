"use client"

import dynamic from "next/dynamic"
import type { CardLocale } from "@/lib/card-config"
import { VariantA } from "./variant-a"

const VariantB = dynamic(() => import("./variant-b").then((m) => m.VariantB), {
  loading: () => <VariantA locale="en" />,
  ssr: false,
})

const VariantC = dynamic(() => import("./variant-c").then((m) => m.VariantC), {
  loading: () => <VariantA locale="en" />,
  ssr: false,
})

export function CardPage({ locale, variant }: { locale: CardLocale; variant: string }) {
  switch (variant) {
    case "b":
      return <VariantB locale={locale} />
    case "c":
      return <VariantC locale={locale} />
    default:
      return <VariantA locale={locale} />
  }
}
