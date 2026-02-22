"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2.5 text-base transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t px-4 py-4">
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
