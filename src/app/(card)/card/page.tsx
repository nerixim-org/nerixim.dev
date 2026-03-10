import { CardPage } from "@/components/card/card-page"

export default async function CardEN({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const { v = "a" } = await searchParams
  return <CardPage locale="en" variant={v} />
}
