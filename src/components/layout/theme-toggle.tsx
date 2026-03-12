"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useOptionalHaptics } from "@/hooks/use-optional-haptics"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const pulse = useOptionalHaptics()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-11 rounded-full"
      aria-label="Toggle theme"
      onClick={() => {
        pulse(6)
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }}
    >
      <Sun
        className="size-4 rotate-0 scale-100 transition-transform duration-[var(--duration-standard)] ease-[var(--ease-emphasized)] motion-reduce:transition-none dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-4 rotate-90 scale-0 transition-transform duration-[var(--duration-standard)] ease-[var(--ease-emphasized)] motion-reduce:transition-none dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
    </Button>
  )
}
