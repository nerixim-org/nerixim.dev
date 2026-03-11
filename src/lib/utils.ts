import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/

export function formatDate(dateString: string, style: "short" | "long" = "short", locale?: string): string {
  const userLocale = locale || "en-US"
  const date = DATE_ONLY_PATTERN.test(dateString) ? new Date(`${dateString}T00:00:00Z`) : new Date(dateString)

  return date.toLocaleDateString(userLocale, {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    ...(DATE_ONLY_PATTERN.test(dateString) ? { timeZone: "UTC" } : {}),
  })
}
