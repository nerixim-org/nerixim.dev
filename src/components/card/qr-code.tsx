"use client"

import QRCode from "qrcode"
import { useEffect, useRef } from "react"

export function QRCodeSVG({ url, size = 100, className }: { url: string; size?: number; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }
    QRCode.toString(url, {
      type: "svg",
      width: size,
      margin: 0,
      color: {
        dark: "#000000",
        light: "#00000000",
      },
    }).then((svg) => {
      if (containerRef.current) {
        // Replace hardcoded fill with currentColor so it inherits from parent
        containerRef.current.innerHTML = svg.replaceAll("#000000", "currentColor")
      }
    })
  }, [url, size])

  return <div ref={containerRef} className={className} style={{ width: size, height: size }} />
}
