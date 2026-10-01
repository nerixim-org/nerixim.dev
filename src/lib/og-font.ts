// Fonts for ImageResponse (satori): it cannot use next/font or system fonts,
// and without a CJK face Japanese renders as empty boxes. We ask Google Fonts
// for a subset covering only the characters a card draws (a few KB) and
// request a TrueType file by sending an old User-Agent (the default answer is
// woff2, which satori does not read). Runs at build time for static routes;
// the cache keeps one fetch per distinct family, weight and text.
const TRUETYPE_SRC = /src: url\((.+?)\) format\('(?:truetype|opentype|woff)'\)/
const cache = new Map<string, Promise<ArrayBuffer>>()

export async function loadGoogleFont(family: string, text: string, weight: 400 | 600 = 600): Promise<ArrayBuffer> {
  const chars = Array.from(new Set(Array.from(text)))
    .sort()
    .join("")
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(chars)}`
  const cached = cache.get(url)
  if (cached) {
    return cached
  }
  const pending = (async () => {
    const css = await (
      await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0" },
      })
    ).text()
    const match = css.match(TRUETYPE_SRC)
    if (!match?.[1]) {
      throw new Error(`Google Fonts returned no TrueType source for ${family} ${weight}`)
    }
    return (await fetch(match[1])).arrayBuffer()
  })()
  cache.set(url, pending)
  return await pending
}
