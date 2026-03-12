import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "interactive-control relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:transition-transform [&_svg]:duration-[var(--duration-quick)] [&_svg]:ease-[var(--ease-standard)] motion-reduce:[&_svg]:transition-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:scale-[0.96] before:shadow-[0_0_0_0_transparent] before:transition-[opacity,transform,box-shadow] before:duration-[var(--duration-standard)] before:ease-[var(--ease-emphasized)] before:content-[''] motion-reduce:before:transition-none focus-visible:outline-none focus-visible:before:opacity-100 focus-visible:before:scale-100 focus-visible:before:shadow-[0_0_0_4px_oklch(0.43_0.08_262_/_0.18)] dark:focus-visible:before:shadow-[0_0_0_4px_oklch(0.78_0.09_262_/_0.22)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:scale-[0.985] active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_12px_28px_rgb(38_48_72/0.16)] hover:bg-primary/95 hover:shadow-[0_1px_0_rgb(255_255_255/0.22)_inset,0_16px_34px_rgb(38_48_72/0.2)] active:shadow-[0_1px_0_rgb(255_255_255/0.14)_inset,0_8px_18px_rgb(38_48_72/0.12)]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-[0_1px_0_rgb(255_255_255/0.72)_inset] hover:bg-accent/85 hover:text-accent-foreground hover:shadow-[0_10px_24px_rgb(15_23_42/0.08)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_0_rgb(255_255_255/0.58)_inset] hover:bg-secondary/88 hover:shadow-[0_10px_24px_rgb(15_23_42/0.07)]",
        ghost: "hover:bg-accent/70 hover:text-accent-foreground active:bg-accent/80 dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
