import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next"
import { DM_Sans, Source_Serif_4 } from "next/font/google"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
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
    default: "nerixim — Software Developer",
    template: "%s | nerixim",
  },
  description: "Full-stack developer based in Japan. Building software across languages and borders.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nerixim.dev",
    siteName: "nerixim",
    title: "nerixim — Software Developer",
    description: "Full-stack developer based in Japan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "nerixim — Software Developer",
    description: "Full-stack developer based in Japan.",
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
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
