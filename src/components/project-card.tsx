import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  href?: string
  status: "live" | "in-progress" | "planned"
}

const statusConfig = {
  live: { label: "Live", variant: "default" as const },
  "in-progress": { label: "In Progress", variant: "secondary" as const },
  planned: { label: "Planned", variant: "outline" as const },
}

export function ProjectCard({ title, description, tags, href, status }: ProjectCardProps) {
  const { label, variant } = statusConfig[status]

  const card = (
    <Card className={cn(href && "transition-colors group-hover:border-foreground/20")}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-balance font-heading font-semibold text-lg">{title}</CardTitle>
          <Badge variant={variant}>{label}</Badge>
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
    return (
      <Link href={href} className="group" target="_blank" rel="noopener noreferrer">
        {card}
      </Link>
    )
  }

  return card
}
