import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — How Your Information Is Handled",
  description:
    "How nerixim.dev handles your information. What the contact form collects, how analytics work, and which third-party services are used.",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-balance font-heading font-semibold text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-muted-foreground">
        This site is a personal portfolio operated by Nikita. Here is a straightforward summary of how your data is
        handled.
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">What data is collected</h2>
      <p className="mt-2 text-muted-foreground">
        The contact form collects your <strong>name</strong>, <strong>email address</strong>, and{" "}
        <strong>message</strong>. Nothing else is collected directly by this site.
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">How data is used</h2>
      <p className="mt-2 text-muted-foreground">
        When you submit the contact form, your message is forwarded to a private Slack channel so I can read and respond
        to it. The data is not stored in a database, sold, or shared with anyone.
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">Analytics</h2>
      <p className="mt-2 text-muted-foreground">
        This site uses{" "}
        <Link
          href="https://vercel.com/docs/analytics"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Vercel Analytics
        </Link>{" "}
        and{" "}
        <Link
          href="https://vercel.com/docs/speed-insights"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Vercel Speed Insights
        </Link>
        . Both are privacy-friendly — they do not use cookies and only collect aggregated, anonymized data such as page
        views and performance metrics.
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">Cookies &amp; local storage</h2>
      <p className="mt-2 text-muted-foreground">
        This site does not set any cookies. The only client-side storage used is{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-sm">localStorage</code> to remember your theme preference
        (light or dark mode).
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">Third-party services</h2>
      <p className="mt-2 text-muted-foreground">
        The site is hosted on{" "}
        <Link
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Vercel
        </Link>
        .{" "}
        <Link
          href="https://www.cloudflare.com/privacypolicy/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Cloudflare Turnstile
        </Link>{" "}
        is used for spam protection on the contact form. Both services may process limited technical data (such as IP
        addresses) as part of normal operation.
      </p>

      <h2 className="mt-8 text-balance font-heading font-semibold text-xl">Contact</h2>
      <p className="mt-2 text-muted-foreground">
        If you have questions about this policy, feel free to reach out via the{" "}
        <Link href="/contact" className="underline underline-offset-4 transition-colors hover:text-foreground">
          contact form
        </Link>
        .
      </p>
    </div>
  )
}
