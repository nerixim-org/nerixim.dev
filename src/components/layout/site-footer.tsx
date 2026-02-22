import Link from "next/link";
import { Github } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer>
      <Separator />
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground transition-colors hover:text-foreground"
          aria-label="GitHub"
        >
          <Github className="size-4" />
        </Link>
      </div>
    </footer>
  );
}
