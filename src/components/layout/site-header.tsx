"use client"

import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { useOptionalHaptics } from "@/hooks/use-optional-haptics"
import { Link, usePathname } from "@/i18n/navigation"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const navKeys = [
  { key: "about" as const, href: "/about" as const },
  { key: "services" as const, href: "/services" as const },
  { key: "projects" as const, href: "/projects" as const },
  { key: "blog" as const, href: "/blog" as const },
  { key: "contact" as const, href: "/contact" as const },
]

export function SiteHeader() {
  const pathname = usePathname()
  const pulse = useOptionalHaptics()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const t = useTranslations("nav")

  useEffect(() => {
    const syncScrolled = () => setIsScrolled(window.scrollY > 10)

    syncScrolled()
    window.addEventListener("scroll", syncScrolled, { passive: true })

    return () => window.removeEventListener("scroll", syncScrolled)
  }, [])

  const navItems = navKeys.map(({ key, href }) => ({
    title: t(key),
    href,
  }))

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-[var(--duration-standard)] ease-[var(--ease-standard)]",
        isScrolled
          ? "border-border/85 bg-background/88 shadow-[0_10px_30px_rgb(15_23_42/0.05)] backdrop-blur-2xl dark:shadow-[0_10px_30px_rgb(2_6_23/0.24)]"
          : "border-border/65 bg-background/72 backdrop-blur-xl",
      )}
    >
      <div className="section-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="interactive-control -ml-3 rounded-full px-3 py-1.5 font-heading font-semibold text-lg tracking-tight hover:bg-background/80 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 motion-reduce:transform-none"
        >
          {siteConfig.brandName}
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="mr-2 hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "interactive-control rounded-full px-3 py-1.5 text-sm hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 motion-reduce:transform-none",
                  pathname === item.href
                    ? "bg-accent/80 font-medium text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.55),inset_0_0_0_1px_var(--border)]"
                    : "text-muted-foreground hover:bg-background/86 hover:text-foreground hover:shadow-[0_8px_20px_rgb(15_23_42/0.06)]",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile nav trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="size-11 rounded-full md:hidden"
            aria-label={t("openMenu")}
            onClick={() => {
              pulse(6)
              setMobileNavOpen(true)
            }}
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} navItems={navItems} />
    </header>
  )
}
