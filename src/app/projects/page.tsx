import type { Metadata } from "next"
import { ProjectCard } from "@/components/project-card"

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built and am building.",
}

const projects = [
  {
    title: "Pechka",
    description: "A language learning app built around spaced repetition and immersive input.",
    status: "in-progress" as const,
    tags: ["Swift", "SwiftUI", "iOS"],
  },
  {
    title: "nerixim.dev",
    description: "This site. A hub for my work, writing, and tools.",
    status: "live" as const,
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://nerixim.dev",
  },
  {
    title: "Freelance Development",
    description: "Web and mobile projects for clients in Japan and globally.",
    status: "live" as const,
    tags: ["React", "TypeScript", "Node.js"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading font-semibold text-3xl">Projects</h1>
      <p className="mt-2 mb-12 text-lg text-muted-foreground">Things I&rsquo;m building and have built.</p>

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  )
}
