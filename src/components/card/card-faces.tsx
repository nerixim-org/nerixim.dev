"use client"

import { ArrowRight, Github, Globe, MapPin } from "lucide-react"
import { cardContent } from "@/lib/card-config"
import { QRCodeSVG } from "./qr-code"

export function CardFaceEN({ compact }: { compact?: boolean }) {
  const c = cardContent.en

  return (
    <div className="flex h-full flex-col justify-between p-8 sm:p-10">
      <div>
        <h1 className="font-bold font-heading text-3xl tracking-tight sm:text-4xl">{c.name}</h1>
        <p className="mt-1.5 font-medium text-base text-muted-foreground sm:text-lg">{c.title}</p>
        <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{c.tagline}</p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{c.location}</span>
          </div>
          <a
            href={c.websiteUrl}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>{c.website}</span>
          </a>
          <a
            href={c.githubUrl}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Github className="h-3.5 w-3.5 shrink-0" />
            <span>{c.github}</span>
          </a>
          <a
            href={c.contactUrl}
            className="mt-1 flex items-center gap-1.5 font-medium text-primary text-sm transition-colors hover:underline"
          >
            {c.contactLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        {!compact && (
          <div className="shrink-0 text-foreground opacity-80">
            <QRCodeSVG url={c.qrUrl} size={80} />
          </div>
        )}
      </div>
    </div>
  )
}

export function CardFaceJA({ compact }: { compact?: boolean }) {
  const c = cardContent.ja

  return (
    <div className="flex h-full flex-col justify-between p-8 sm:p-10">
      <div>
        <div>
          <h1 className="font-bold font-heading text-3xl tracking-tight sm:text-4xl">{c.name}</h1>
          <p className="mt-0.5 text-muted-foreground text-sm">{c.nameRomaji}</p>
        </div>
        <p className="mt-1.5 font-medium text-base text-muted-foreground sm:text-lg">{c.title}</p>
        <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{c.tagline}</p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{c.location}</span>
          </div>
          <a
            href={c.websiteUrl}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Globe className="h-3.5 w-3.5 shrink-0" />
            <span>{c.website}</span>
          </a>
          <a
            href={c.githubUrl}
            className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <Github className="h-3.5 w-3.5 shrink-0" />
            <span>{c.github}</span>
          </a>
          <a
            href={c.contactUrl}
            className="mt-1 flex items-center gap-1.5 font-medium text-primary text-sm transition-colors hover:underline"
          >
            {c.contactLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        {!compact && (
          <div className="shrink-0 text-foreground opacity-80">
            <QRCodeSVG url={c.qrUrl} size={80} />
          </div>
        )}
      </div>
    </div>
  )
}
