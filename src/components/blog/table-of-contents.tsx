"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

type Heading = {
  id: string
  text: string
  level: number
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [isOpen, setIsOpen] = useState(false)

  if (headings.length === 0) {
    return null
  }

  return (
    <nav aria-label="Table of contents" className="mb-10">
      {/* Mobile: collapsible */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-lg border border-border bg-muted/50 px-4 py-3 font-medium text-sm"
        >
          Table of Contents
          <ChevronDown className={cn("size-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && <HeadingList headings={headings} className="mt-2 px-4" />}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden rounded-lg border border-border bg-muted/30 p-5 lg:block">
        <p className="mb-3 font-medium text-muted-foreground text-sm">Table of Contents</p>
        <HeadingList headings={headings} />
      </div>
    </nav>
  )
}

function HeadingList({ headings, className }: { headings: Heading[]; className?: string }) {
  return (
    <ul className={cn("space-y-1.5 text-sm", className)}>
      {headings.map((heading) => (
        <li key={heading.id} className={cn(heading.level === 3 && "ml-4")}>
          <a href={`#${heading.id}`} className="text-muted-foreground transition-colors hover:text-foreground">
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
