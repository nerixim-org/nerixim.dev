import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software developer based in Japan. Trilingual (EN/JP/RU). Building products across languages and borders.",
};

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "SwiftUI",
  "React Native",
  "Node.js",
  "Tailwind CSS",
  "AI/LLM Integration",
];

const languages = [
  { name: "Russian", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Japanese", level: "Fluent" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      {/* Top section — Avatar + intro */}
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Image
          src="/avatar-placeholder.svg"
          alt="Nikita"
          width={120}
          height={120}
          className="rounded-full"
          priority
        />
        <div>
          <h1 className="font-heading text-3xl font-semibold">Nikita</h1>
          <p className="mt-1 text-lg text-muted-foreground">
            Software developer, language enthusiast, builder of things.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="mt-16 space-y-5">
        <p className="text-base leading-relaxed text-muted-foreground">
          I&rsquo;m a software developer based in Japan. I was born in Russia,
          studied foreign languages in university, and eventually made my way
          here&nbsp;&mdash; drawn by the culture, the language, and an interest
          in how people communicate across borders.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          I work across the full stack&nbsp;&mdash; TypeScript, React, Next.js
          for the web, SwiftUI for iOS, React Native for cross-platform. I build
          web applications, mobile apps, and APIs. I also work with AI tools and
          integrations, helping businesses adopt them practically.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          What makes my work a bit different is the language side. I&rsquo;m
          fluent in Russian, English, and Japanese, which means I can build
          software that actually works across these markets&nbsp;&mdash; not just
          translated, but culturally adapted.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground">
          I&rsquo;m currently freelancing and building my own products. If you
          have a project that could use someone who bridges cultures and code,
          I&rsquo;d like to hear about it.
        </p>
      </section>

      {/* Skills/tech section */}
      <section className="mt-16">
        <h2 className="font-heading text-xl font-semibold">Tech</h2>
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
        <h2 className="font-heading text-xl font-semibold">Languages</h2>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {languages.map((lang) => (
            <div key={lang.name}>
              <p className="font-medium">{lang.name}</p>
              <p className="text-sm text-muted-foreground">{lang.level}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
