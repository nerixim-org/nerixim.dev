"use client"

import { useEffect, useState } from "react"
import { type HapticPattern, triggerOptionalHaptic } from "@/lib/haptics"

export function useOptionalHaptics() {
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setReducedMotion(false)
      return
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const syncPreference = () => setReducedMotion(mediaQuery.matches)

    syncPreference()

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncPreference)
      return () => mediaQuery.removeEventListener("change", syncPreference)
    }

    mediaQuery.addListener(syncPreference)
    return () => mediaQuery.removeListener(syncPreference)
  }, [])

  return (pattern: HapticPattern = 8) =>
    triggerOptionalHaptic(
      {
        reducedMotion,
        vibrate: typeof navigator.vibrate === "function" ? navigator.vibrate.bind(navigator) : undefined,
      },
      pattern,
    )
}
