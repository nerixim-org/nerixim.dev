export type Segment = {
  text: string
  reading?: string
  gloss?: string
}

const MARK = /\{([^|{}]+)\|([^|{}]*)\|([^{}]+)\}/g

export function parseMarkup(marked: string): Segment[] {
  const segments: Segment[] = []
  let last = 0
  for (const match of marked.matchAll(MARK)) {
    const start = match.index ?? 0
    if (start > last) {
      segments.push({ text: marked.slice(last, start) })
    }
    const [, text, reading, gloss] = match
    segments.push({ text, ...(reading ? { reading } : {}), gloss })
    last = start + match[0].length
  }
  if (last < marked.length) {
    segments.push({ text: marked.slice(last) })
  }
  return segments
}

export function segmentsToText(segments: Segment[]): string {
  return segments.map((segment) => segment.text).join("")
}
