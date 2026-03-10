import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "About — Developer, Language Enthusiast, Builder",
  description:
    "Software developer based in Japan. Trilingual in English, Japanese, and Russian. Building products that work across languages, cultures, and borders.",
}

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "SwiftUI",
  "React Native",
  "Node.js",
  "Tailwind CSS",
  "AI/LLM Integration",
]

const languages = [
  { name: "Russian", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Japanese", level: "Fluent" },
]

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    sameAs: [siteConfig.links.github],
    jobTitle: "Software Developer",
    knowsLanguage: ["en", "ja", "ru"],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires dangerouslySetInnerHTML */}
      {/** biome-ignore lint/style/useNamingConvention: see above */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Top section — Avatar + intro */}
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Image src="/avatar-placeholder.svg" alt="Nikita" width={120} height={120} className="rounded-full" priority />
        <div>
          <h1 className="text-balance font-heading font-semibold text-3xl">Nikita</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Software developer, language enthusiast, builder of things.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="mt-16 space-y-5">
        <p className="text-base text-muted-foreground leading-relaxed">
          I&rsquo;m a software developer based in Japan. I was born in Russia, studied foreign languages in university,
          and eventually made my way here&nbsp;&mdash; drawn by the culture, the language, and an interest in how people
          communicate across borders.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          I work across the full stack&nbsp;&mdash; TypeScript, React, Next.js for the web, SwiftUI for iOS, React
          Native for cross-platform. I build web applications, mobile apps, and APIs. I also work with AI tools and
          integrations, helping businesses adopt them practically.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          What makes my work a bit different is the language side. I&rsquo;m fluent in Russian, English, and Japanese,
          which means I can build software that actually works across these markets&nbsp;&mdash; not just translated,
          but culturally adapted.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          I&rsquo;m currently freelancing and building my own products. I also{" "}
          <Link href="/blog" className="underline underline-offset-4 hover:text-foreground">
            write about
          </Link>{" "}
          freelancing in Japan, taxes, and the things I learn along the way.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          If you have a project that could use someone who bridges cultures and code, I&rsquo;d like to{" "}
          <Link href="/contact" className="underline underline-offset-4 hover:text-foreground">
            hear about it
          </Link>
          .
        </p>
      </section>

      {/* Skills/tech section */}
      <section className="mt-16">
        <h2 className="text-balance font-heading font-semibold text-xl">Tech</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </section>

      {/* Languages section */}
      <section className="mt-16">
        <h2 className="text-balance font-heading font-semibold text-xl">Languages</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div key={lang.name}>
              <p className="font-medium">{lang.name}</p>
              <p className="text-muted-foreground text-sm">{lang.level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
