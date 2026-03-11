"use client"

import { Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { LanguageSwitcher } from "@/components/layout/language-switcher"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const t = useTranslations("nav")

  const navItems = navKeys.map(({ key, href }) => ({
    title: t(key),
    href,
  }))

  return (
    <header className="sticky top-0 z-50 border-border/70 border-b bg-background/75 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-heading font-semibold text-lg tracking-tight focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="mr-2 hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                  pathname === item.href
                    ? "bg-accent/80 font-medium text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                    : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
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
            className="md:hidden"
            aria-label={t("openMenu")}
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} navItems={navItems} />
    </header>
  )
}
