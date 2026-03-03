"use client"

import { Download } from "lucide-react"
import { useCallback, useRef, useState } from "react"
import type { CardLocale } from "@/lib/card-config"
import { cardContent, downloadVCard } from "@/lib/card-config"
import { cn } from "@/lib/utils"
import { CardFaceEN, CardFaceJA } from "./card-faces"

export function VariantA({ locale }: { locale: CardLocale }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const c = cardContent[locale]

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) {
      return
    }
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -8, y: x * 8 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  const frontFace = locale === "en" ? <CardFaceEN /> : <CardFaceJA />
  const backFace = locale === "en" ? <CardFaceJA /> : <CardFaceEN />

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="relative w-full max-w-md" style={{ perspective: "1200px" }}>
        <button
          type="button"
          ref={cardRef}
          aria-label={isFlipped ? "Flip card to front" : "Flip card to back"}
          className="w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left"
          onClick={() => setIsFlipped(!isFlipped)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Front face */}
          <div
            className={cn(
              "rounded-2xl border border-border/60 bg-card shadow-black/5 shadow-xl",
              "dark:shadow-black/20",
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.03 260 / 0.05), transparent 50%, oklch(0.45 0.03 260 / 0.03))",
              }}
            />
            <div className="relative" style={{ minHeight: "320px" }}>
              {frontFace}
            </div>
          </div>

          {/* Back face */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl border border-border/60 bg-card shadow-black/5 shadow-xl",
              "dark:shadow-black/20",
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl opacity-50"
              style={{
                background:
                  "linear-gradient(225deg, oklch(0.45 0.03 260 / 0.05), transparent 50%, oklch(0.45 0.03 260 / 0.03))",
              }}
            />
            <div className="relative" style={{ minHeight: "320px" }}>
              {backFace}
            </div>
          </div>
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <p className="text-muted-foreground text-xs">{c.flipHint}</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            downloadVCard(locale)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-foreground"
        >
          <Download className="h-3 w-3" />
          {c.saveContact}
        </button>
      </div>
    </div>
  )
}
