"use client"

import { Download } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { CardLocale } from "@/lib/card-config"
import { cardContent, downloadVCard } from "@/lib/card-config"
import { cn } from "@/lib/utils"
import { CardFaceEN, CardFaceJA } from "./card-faces"

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return
    }

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    const nodeCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 12000))
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }))

    const connectionDistance = 150
    const isDark = document.documentElement.classList.contains("dark")
    const dotColor = isDark ? "rgba(200, 200, 220, 0.5)" : "rgba(60, 60, 80, 0.35)"
    const lineColor = isDark ? "rgba(200, 200, 220," : "rgba(60, 60, 80,"

    function animate() {
      if (!(ctx && canvas)) {
        return
      }
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const nodes = nodesRef.current
      const mouse = mouseRef.current

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > w) {
          node.vx *= -1
        }
        if (node.y < 0 || node.y > h) {
          node.vy *= -1
        }

        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          node.vx -= dx * 0.00005
          node.vy -= dy * 0.00005
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `${lineColor} ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath()
        ctx.fillStyle = dotColor
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouse)
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("mousemove", handleMouse)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" />
}

export function VariantB({ locale }: { locale: CardLocale }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [entered, setEntered] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const c = cardContent[locale]

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) {
      return
    }
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -14, y: x * 14 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  const frontFace = locale === "en" ? <CardFaceEN /> : <CardFaceJA />
  const backFace = locale === "en" ? <CardFaceJA /> : <CardFaceEN />

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <ConstellationBackground />

      <div
        className="relative w-full max-w-md"
        style={{
          perspective: "1200px",
          opacity: entered ? 1 : 0,
          transform: entered ? "scale(1)" : "scale(0.9)",
          transition: "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
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
              "rounded-2xl border border-border/40 bg-card/80 shadow-2xl shadow-black/10 backdrop-blur-xl",
              "dark:bg-card/70 dark:shadow-black/30",
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.03 260 / 0.08), transparent 40%, oklch(0.75 0.03 260 / 0.04))",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.08)",
              }}
            />
            <div className="relative" style={{ minHeight: "320px" }}>
              {frontFace}
            </div>
          </div>

          {/* Back face */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl border border-border/40 bg-card/80 shadow-2xl shadow-black/10 backdrop-blur-xl",
              "dark:bg-card/70 dark:shadow-black/30",
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(225deg, oklch(0.45 0.03 260 / 0.08), transparent 40%, oklch(0.75 0.03 260 / 0.04))",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "inset 0 0 0 1px oklch(1 0 0 / 0.08)",
              }}
            />
            <div className="relative" style={{ minHeight: "320px" }}>
              {backFace}
            </div>
          </div>
        </button>
      </div>

      <div
        className="relative mt-6 flex items-center gap-3"
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 0.6s ease-out 0.3s",
        }}
      >
        <p className="text-muted-foreground text-xs">{c.flipHint}</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            downloadVCard(locale)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-card/50 px-3 py-1.5 font-medium text-muted-foreground text-xs backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
        >
          <Download className="h-3 w-3" />
          {c.saveContact}
        </button>
      </div>
    </div>
  )
}
