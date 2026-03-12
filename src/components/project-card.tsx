import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href?: string
  status: "live" | "in-progress" | "planned"
  statusLabel: string
}

export function ProjectCard({ title, description, tags, href, status, statusLabel }: ProjectCardProps) {
  const variantMap = {
    live: "default" as const,
    "in-progress": "secondary" as const,
    planned: "outline" as const,
  }

  const card = (
    <Card className={cn("h-full border-border/80 bg-card/90", href ? "surface-panel-interactive" : "surface-panel")}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-balance font-heading font-semibold text-lg transition-colors duration-[var(--duration-standard)] ease-[var(--ease-standard)] group-hover/project:text-primary">
            {title}
          </CardTitle>
          <Badge variant={variantMap[status]}>{statusLabel}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  )

  if (href) {
    const isExternal = href.startsWith("http")
    return (
      <Link
        href={href}
        className="interactive-card-link group/project h-full"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {card}
      </Link>
    )
  }

  return card
}
