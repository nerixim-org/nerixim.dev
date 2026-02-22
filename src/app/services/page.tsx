import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Sparkles, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Software development, AI integration, and localization services.",
};

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
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="font-heading text-3xl font-semibold">Services</h1>
      <p className="mt-2 mb-12 text-lg text-muted-foreground">
        I help startups, agencies, and businesses build and improve their
        software.
      </p>

      <div className="space-y-12">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <section key={service.title}>
              <Icon className="size-6 text-muted-foreground" />
              <h2 className="mt-2 font-heading text-xl font-semibold">
                {service.title}
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-1 text-muted-foreground">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm italic text-muted-foreground/80">
                Who this is for: {service.who}
              </p>
            </section>
          );
        })}
      </div>

      <section className="mt-16 rounded-lg bg-muted/50 p-8 text-center">
        <h2 className="font-heading text-xl font-semibold">
          Interested? Let&rsquo;s talk about your project.
        </h2>
        <Button asChild className="mt-4">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </section>
    </div>
  );
}
