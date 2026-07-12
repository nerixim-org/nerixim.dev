import fs from "node:fs"
import path from "node:path"
import type { Lang, PipelineOutput } from "./types"

const ROOT = path.join(import.meta.dirname, "..", "..")

function usage(): never {
  console.error("Usage: bun scripts/copy-pipeline/apply.ts <namespace> --lang ja|en --variant <label>")
  process.exit(1)
}

// Mirrors collectLeaves in run.ts: paths are dot-joined keys with [i] for arrays.
function setByPath(root: Record<string, unknown>, leafPath: string, text: string): void {
  const parts = leafPath.split(".").flatMap((part) => {
    const segments: (string | number)[] = []
    const match = part.match(/^([^[]+)((\[\d+\])*)$/)
    if (!match?.[1]) throw new Error(`Bad path segment: ${part}`)
    segments.push(match[1])
    for (const idx of match[2]?.match(/\d+/g) ?? []) {
      segments.push(Number(idx))
    }
    return segments
  })
  let current: unknown = root
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i] as string | number
    current = (current as Record<string | number, unknown>)[key]
    if (current === undefined) throw new Error(`Path not found in messages: ${leafPath}`)
  }
  const last = parts[parts.length - 1] as string | number
  const container = current as Record<string | number, unknown>
  if (typeof container[last] !== "string") throw new Error(`Not a string leaf: ${leafPath}`)
  container[last] = text
}

function main() {
  const args = process.argv.slice(2)
  const namespace = args.find((a) => !a.startsWith("--"))
  const lang = args[args.indexOf("--lang") + 1] as Lang | undefined
  const variantLabel = args[args.indexOf("--variant") + 1]
  if (!namespace || (lang !== "ja" && lang !== "en") || !variantLabel || args.indexOf("--variant") < 0) usage()

  const outJson = path.join(import.meta.dirname, "outputs", lang, `${namespace}.json`)
  const output = JSON.parse(fs.readFileSync(outJson, "utf8")) as PipelineOutput
  const variant = output.revised.variants.find((v) => v.label === variantLabel)
  if (!variant) {
    console.error(`Variant "${variantLabel}" not found. Available: ${output.revised.variants.map((v) => v.label).join(", ")}`)
    process.exit(1)
  }

  const messagesPath = path.join(ROOT, "messages", `${lang}.json`)
  const messages = JSON.parse(fs.readFileSync(messagesPath, "utf8"))
  const ns = messages[namespace]
  if (ns === undefined) {
    console.error(`Namespace "${namespace}" not found in messages/${lang}.json`)
    process.exit(1)
  }

  for (const leaf of variant.leaves) {
    setByPath(ns, leaf.path, leaf.text)
  }

  fs.writeFileSync(messagesPath, `${JSON.stringify(messages, null, 2)}\n`)
  console.error(`Applied variant ${variantLabel} (${variant.leaves.length} strings) to messages/${lang}.json [${namespace}]`)
  console.error("Now: read it aloud once, then `bun run check:messages`.")
}

main()
