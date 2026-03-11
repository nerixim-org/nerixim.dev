import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string, style: "short" | "long" = "short", locale?: string): string {
  const userLocale = locale || "en-US"
  return new Date(dateString).toLocaleDateString(userLocale, {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  })
}
