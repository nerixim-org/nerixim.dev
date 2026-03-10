import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Card — Nikita | nerixim",
  description: "Freelance Software Engineer based in Japan. Building software across languages and borders.",
  openGraph: {
    title: "Nikita — Freelance Software Engineer",
    description: "Building software across languages and borders. Based in Japan.",
  },
}

export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
