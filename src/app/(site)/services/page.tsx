import { Code2, Languages, Sparkles } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Services — Development, AI, and Localization",
  description:
    "Full-stack web and mobile development, AI integration, and bilingual EN/JP/RU localization for startups and agencies based in Japan.",
}

const services = [
  {
    icon: Code2,
    title: "Software Development",
    items: [
      "Web applications (React, Next.js)",
      "Mobile apps (React Native, SwiftUI)",
      "APIs and backend services",
      "Database design and infrastructure",
    ],
    who: "Startups, SMBs, and agencies needing reliable development capacity.",
  },
  {
    icon: Sparkles,
    title: "AI Integration & Consulting",
    items: [
      "AI-powered workflow automation",
      "LLM integration into existing products",
      "AI tool evaluation and strategy",
      "Custom AI agent development",
    ],
    who: "Businesses looking to adopt AI tools practically, not theoretically.",
  },
  {
    icon: Languages,
    title: "Localization & Cross-Cultural Software",
    items: [
      "EN/JP/RU software localization",
      "Cultural adaptation (not just translation)",
      "i18n architecture and implementation",
      "Bilingual UX consulting",
    ],
    who: "Products expanding into Japan or Russian-speaking markets.",
  },
] as const

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        provider: {
          "@type": "Person",
          name: siteConfig.author,
          url: siteConfig.url,
        },
      },
    })),
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      {/** biome-ignore lint/style/useNamingConvention: see above */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-balance font-heading font-semibold text-3xl">Services</h1>
      <p className="mt-2 mb-12 text-lg text-muted-foreground">
        I help startups, agencies, and businesses build and improve their software.
      </p>

      <div className="space-y-12">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <section key={service.title}>
              <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
              <h2 className="mt-2 text-balance font-heading font-semibold text-xl">{service.title}</h2>
              <ul className="mt-4 list-inside list-disc space-y-1 text-muted-foreground">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-muted-foreground/80 text-sm italic">Who this is for: {service.who}</p>
            </section>
          )
        })}
      </div>

      <section className="mt-16 rounded-lg bg-muted/50 p-8 text-center">
        <h2 className="text-balance font-heading font-semibold text-xl">
          Interested? Let&rsquo;s talk about your project.
        </h2>
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/blog">Read about my experience in Japan</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
