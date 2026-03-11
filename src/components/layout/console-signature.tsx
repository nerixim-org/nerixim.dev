"use client"

import { useEffect } from "react"

type ConsoleWindow = Window & {
  neriximConsoleSignatureShown?: boolean
}

export function ConsoleSignature() {
  useEffect(() => {
    const consoleWindow = window as ConsoleWindow

    if (consoleWindow.neriximConsoleSignatureShown) {
      return
    }

    consoleWindow.neriximConsoleSignatureShown = true

    console.info(
      "%cnerixim%c hello / こんにちは / привет",
      "background:#4d679d;color:#f8fafc;padding:4px 10px;border-radius:999px;font-weight:700;",
      "color:#667085;padding-left:8px;",
    )
    console.info("If you're reading the console on purpose, we should probably build something together.")
  }, [])

  return null
}
