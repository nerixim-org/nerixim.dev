import type { Metadata } from "next"
import { CardPage } from "@/components/card/card-page"

export const metadata: Metadata = {
  title: "名刺 — ニキータ | nerixim",
  description: "日本を拠点に活動するフリーランス ソフトウェアエンジニア。言語と国境を越えたソフトウェア開発。",
  openGraph: {
    title: "ニキータ — フリーランス ソフトウェアエンジニア",
    description: "言語と国境を越えたソフトウェア開発。日本在住。",
  },
}

export default async function CardJA({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v = "a" } = await searchParams
  return <CardPage locale="ja" variant={v} />
}
