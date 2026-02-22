import { AlertTriangle, Info, Lightbulb } from "lucide-react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CalloutType = "tip" | "warning" | "note"

const calloutStyles: Record<CalloutType, { icon: typeof Info; border: string; bg: string; iconColor: string }> = {
  tip: {
    icon: Lightbulb,
    border: "border-blue-500/30",
    bg: "bg-blue-500/5",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  note: {
    icon: Info,
    border: "border-border",
    bg: "bg-muted/30",
    iconColor: "text-muted-foreground",
  },
}

export function Callout({ type = "note", children }: { type?: CalloutType; children: ReactNode }) {
  const style = calloutStyles[type]
  const Icon = style.icon

  return (
    <div className={cn("my-6 flex gap-3 rounded-lg border-l-4 p-4", style.border, style.bg)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", style.iconColor)} />
      <div className="text-sm leading-relaxed [&>p]:my-1">{children}</div>
    </div>
  )
}
