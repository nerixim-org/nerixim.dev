import Link from "next/link";
import { Code2, Sparkles, Languages } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const services = [
  {
    title: "Software Development",
    description: "Web apps, mobile apps, APIs. TypeScript, React, Next.js.",
    icon: Code2,
  },
  {
    title: "AI Integration",
    description:
      "AI automation, workflow optimization, intelligent tooling.",
    icon: Sparkles,
  },
  {
    title: "Localization",
    description:
      "EN/JP/RU translation and cultural adaptation for software.",
    icon: Languages,
  },
] as const;

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="font-heading mb-8 text-2xl font-semibold tracking-tight">
          What I do
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Link key={service.title} href="/services" className="group">
              <Card className="h-full transition-colors group-hover:border-foreground/20">
                <CardHeader>
                  <service.icon className="size-5 text-muted-foreground" />
                  <CardTitle className="font-heading text-lg">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
