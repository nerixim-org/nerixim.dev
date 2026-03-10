import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { DM_Sans, Source_Serif_4 } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

const sourceSerif = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
})

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nerixim.dev"),
  title: {
    default: "nerixim — Software Developer Based in Japan",
    template: "%s | nerixim",
  },
  description:
    "Full-stack developer based in Japan, building software across languages and borders. Web development, AI integration, and localization.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nerixim.dev",
    siteName: "nerixim",
    title: "nerixim — Software Developer Based in Japan",
    description:
      "Full-stack developer based in Japan, building software across languages and borders. Web development, AI integration, and localization.",
  },
  twitter: {
    card: "summary_large_image",
    title: "nerixim — Software Developer Based in Japan",
    description:
      "Full-stack developer based in Japan, building software across languages and borders. Web development, AI integration, and localization.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "theme-color-light": "#faf9f7",
    "theme-color-dark": "#1f2028",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-body antialiased">
        <Providers>
          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
