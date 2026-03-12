"use client"

import type * as React from "react"
import { useOptionalHaptics } from "@/hooks/use-optional-haptics"
import { Link } from "@/i18n/navigation"
import { Button } from "./button"

type HapticButtonLinkProps = Pick<React.ComponentProps<typeof Button>, "className" | "size" | "variant"> &
  Omit<React.ComponentProps<typeof Link>, "children"> & {
    children: React.ReactNode
    hapticPattern?: number | number[]
  }

export function HapticButtonLink({
  children,
  className,
  hapticPattern = 8,
  onClick,
  size,
  variant,
  ...linkProps
}: HapticButtonLinkProps) {
  const pulse = useOptionalHaptics()

  return (
    <Button asChild className={className} size={size} variant={variant}>
      <Link
        {...linkProps}
        onClick={(event) => {
          pulse(hapticPattern)
          onClick?.(event)
        }}
      >
        {children}
      </Link>
    </Button>
  )
}
