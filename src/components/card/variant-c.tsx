"use client"

import { Download } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { CardLocale } from "@/lib/card-config"
import { cardContent, downloadVCard } from "@/lib/card-config"
import { cn } from "@/lib/utils"
import { CardFaceEN, CardFaceJA } from "./card-faces"

function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) {
      return
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision highp float;
      uniform float time;
      uniform vec2 resolution;
      uniform float darkMode;

      // Simplex-like noise
      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float t = time * 0.15;

        float n1 = snoise(uv * 2.0 + t * 0.3);
        float n2 = snoise(uv * 4.0 - t * 0.2);
        float n3 = snoise(uv * 1.5 + vec2(t * 0.1, t * 0.15));

        float combined = n1 * 0.5 + n2 * 0.25 + n3 * 0.25;

        // Topographic lines
        float lines = abs(fract(combined * 6.0) - 0.5) * 2.0;
        lines = smoothstep(0.0, 0.05, lines);

        vec3 bgLight = vec3(0.976, 0.973, 0.965);
        vec3 bgDark = vec3(0.078, 0.082, 0.098);
        vec3 bg = mix(bgLight, bgDark, darkMode);

        vec3 lineColorLight = vec3(0.36, 0.37, 0.44);
        vec3 lineColorDark = vec3(0.55, 0.56, 0.65);
        vec3 lineCol = mix(lineColorLight, lineColorDark, darkMode);

        float lineOpacity = mix(0.10, 0.14, darkMode);
        vec3 color = mix(bg, lineCol, (1.0 - lines) * lineOpacity);

        // Subtle gradient overlay
        float gradient = uv.y * 0.02 * (1.0 - 2.0 * darkMode);
        color += gradient;

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const glCtx = gl

    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = glCtx.createShader(type)
      if (!shader) {
        return null
      }
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    const program = gl.createProgram()
    if (!(program && vertexShader && fragmentShader)) {
      return
    }
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    // biome-ignore lint/correctness/useHookAtTopLevel: gl.useProgram is a WebGL call, not a React hook
    gl.useProgram(program)

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, "time")
    const resolutionLoc = gl.getUniformLocation(program, "resolution")
    const darkModeLoc = gl.getUniformLocation(program, "darkMode")

    const startTime = Date.now()

    function render() {
      if (!(gl && canvas)) {
        return
      }
      const isDark = document.documentElement.classList.contains("dark") ? 1.0 : 0.0
      gl.uniform1f(timeLoc, (Date.now() - startTime) / 1000)
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height)
      gl.uniform1f(darkModeLoc, isDark)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animRef.current = requestAnimationFrame(render)
    }

    render()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" />
}

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return
    }

    const dpr = Math.min(window.devicePixelRatio, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedY: -(Math.random() * 0.2 + 0.05),
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.3 + 0.1,
    }))

    function animate() {
      if (!ctx) {
        return
      }
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      const isDark = document.documentElement.classList.contains("dark")

      for (const p of particles) {
        p.y += p.speedY
        p.x += p.speedX
        if (p.y < -10) {
          p.y = h + 10
          p.x = Math.random() * w
        }

        ctx.beginPath()
        ctx.fillStyle = isDark ? `rgba(180, 180, 210, ${p.opacity})` : `rgba(80, 80, 120, ${p.opacity})`
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0" />
}

export function VariantC({ locale }: { locale: CardLocale }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [entered, setEntered] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 })
  const c = cardContent[locale]

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 200)
    return () => clearTimeout(t)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) {
      return
    }
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -20, y: x * 20 })
    setGlintPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  const frontFace = locale === "en" ? <CardFaceEN /> : <CardFaceJA />
  const backFace = locale === "en" ? <CardFaceJA /> : <CardFaceEN />

  const holographicGradient = `
    radial-gradient(
      circle at ${glintPos.x}% ${glintPos.y}%,
      oklch(0.75 0.1 260 / 0.12) 0%,
      oklch(0.7 0.08 300 / 0.06) 25%,
      oklch(0.65 0.06 200 / 0.04) 50%,
      transparent 70%
    )
  `

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      <ShaderBackground />
      <FloatingParticles />

      <div
        className="relative w-full max-w-md"
        style={{
          perspective: "1000px",
          opacity: entered ? 1 : 0,
          transform: entered ? "scale(1) translateY(0)" : "scale(0.85) translateY(30px)",
          transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s",
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
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Front face */}
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-border/30 bg-card/90 shadow-2xl shadow-black/15 backdrop-blur-2xl",
              "dark:bg-card/80 dark:shadow-black/40",
            )}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute inset-0 rounded-2xl" style={{ background: holographicGradient }} />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.12), inset 0 0 0 1px oklch(1 0 0 / 0.05)",
              }}
            />
            <div className="relative" style={{ minHeight: "320px" }}>
              {frontFace}
            </div>
          </div>

          {/* Back face */}
          <div
            className={cn(
              "absolute inset-0 overflow-hidden rounded-2xl border border-border/30 bg-card/90 shadow-2xl shadow-black/15 backdrop-blur-2xl",
              "dark:bg-card/80 dark:shadow-black/40",
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-0 rounded-2xl" style={{ background: holographicGradient }} />
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.12), inset 0 0 0 1px oklch(1 0 0 / 0.05)",
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
          transition: "opacity 0.6s ease-out 0.6s",
        }}
      >
        <p className="text-muted-foreground text-xs">{c.flipHint}</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            downloadVCard(locale)
          }}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 font-medium text-muted-foreground text-xs backdrop-blur-md transition-colors hover:bg-accent/80 hover:text-foreground"
        >
          <Download className="h-3 w-3" />
          {c.saveContact}
        </button>
      </div>
    </div>
  )
}
