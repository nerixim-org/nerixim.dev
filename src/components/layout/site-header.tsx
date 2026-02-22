"use client"

import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ThemeToggle } from "@/components/layout/theme-toggle"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-border/40 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="font-heading font-semibold text-lg tracking-tight focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
        >
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          {/* Desktop nav */}
          <nav className="mr-2 hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <ThemeToggle />

          {/* Mobile nav trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <MobileNav open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </header>
  )
}
