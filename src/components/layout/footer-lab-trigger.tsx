"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "@/i18n/navigation"
import { registerTripleClick } from "@/lib/triple-click"

type FooterLabTriggerProps = {
  brand: string
  prompt: string
  status: string
}

export function FooterLabTrigger({ brand, prompt, status }: FooterLabTriggerProps) {
  const router = useRouter()
  const [isRevealing, setIsRevealing] = useState(false)
  const recentClicksRef = useRef<number[]>([])
  const navigationTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current)
      }
    }
  }, [])

  const handleBrandClick = () => {
    if (isRevealing) {
      return
    }

    const { recentClicks, triggered } = registerTripleClick(recentClicksRef.current, Date.now())
    recentClicksRef.current = recentClicks

    if (!triggered) {
      return
    }

    setIsRevealing(true)
    const revealDelay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 140 : 680

    navigationTimerRef.current = window.setTimeout(() => {
      setIsRevealing(false)
      recentClicksRef.current = []
      router.push("/lab")
    }, revealDelay)
  }

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className="-m-2.5 flex min-h-10 select-none items-center rounded-full px-4 py-3 font-heading font-semibold text-foreground/72 text-sm tracking-tight transition-colors duration-200 hover:text-foreground"
        style={{ cursor: "default" }}
        onClick={handleBrandClick}
      >
        {brand}
      </button>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full left-0 mb-3 w-56 transition-all duration-300 ${
          isRevealing ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-primary/15 bg-background/95 px-4 py-3 shadow-surface backdrop-blur-sm">
          <div className="gradient-rule gradient-rule-animated -mx-4 -mt-3 mb-3 h-px opacity-80" />
          <p className="font-mono text-[0.68rem] text-primary/85 uppercase tracking-[0.24em]">{prompt}</p>
          <p className="mt-1 text-foreground text-sm">{status}</p>
        </div>
      </div>
    </div>
  )
}
