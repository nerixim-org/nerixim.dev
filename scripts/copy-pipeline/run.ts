import fs from "node:fs"
import path from "node:path"
import { lintLeaves, sanitizeText } from "./lint"
import { MODELS, runLlmObject } from "./llm"
import { critiquePrompt, draftPrompt, judgePrompt, revisePrompt } from "./prompts"
import type { CopyLeaf, Lang, LintIssue, PipelineOutput } from "./types"
import { critiqueOutputSchema, draftOutputSchema, judgeOutputSchema, reviseOutputSchema } from "./types"

const ROOT = path.join(import.meta.dirname, "..", "..")
const PIPELINE_DIR = import.meta.dirname

function usage(): never {
  console.error("Usage: bun scripts/copy-pipeline/run.ts <namespace> --lang ja|en [--force]")
  console.error("Example: bun scripts/copy-pipeline/run.ts home --lang ja")
  process.exit(1)
}

function collectLeaves(value: unknown, prefix: string, leaves: CopyLeaf[]): void {
  if (typeof value === "string") {
    leaves.push({ path: prefix, text: value })
    return
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => collectLeaves(v, `${prefix}[${i}]`, leaves))
    return
  }
  if (typeof value === "object" && value !== null) {
    for (const [k, v] of Object.entries(value)) {
      collectLeaves(v, prefix ? `${prefix}.${k}` : k, leaves)
    }
  }
}

function readCurrentLeaves(lang: Lang, namespace: string): CopyLeaf[] {
  const messages = JSON.parse(fs.readFileSync(path.join(ROOT, "messages", `${lang}.json`), "utf8"))
  const ns = messages[namespace]
  if (ns === undefined) {
    console.error(`Namespace "${namespace}" not found in messages/${lang}.json`)
    process.exit(1)
  }
  const leaves: CopyLeaf[] = []
  collectLeaves(ns, "", leaves)
  return leaves
}

function readRequired(filePath: string, hint: string): string {
  if (!fs.existsSync(filePath)) {
    console.error(`Missing ${filePath}\n${hint}`)
    process.exit(1)
  }
  return fs.readFileSync(filePath, "utf8")
}

function readExemplars(lang: Lang): string[] {
  const dir = path.join(PIPELINE_DIR, "exemplars", lang)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md")
    .sort()
    .map((f) => fs.readFileSync(path.join(dir, f), "utf8").trim())
}

function lintByVariant(variants: { label: string; leaves: CopyLeaf[] }[], lang: Lang): Record<string, LintIssue[]> {
  return Object.fromEntries(variants.map((v) => [v.label, lintLeaves(v.leaves, lang)]))
}

function sanitizeVariants<T extends { variants: { label: string; leaves: CopyLeaf[] }[] }>(output: T, lang: Lang): T {
  return {
    ...output,
    variants: output.variants.map((v) => ({
      ...v,
      leaves: v.leaves.map((l) => ({ ...l, text: sanitizeText(l.text, lang) })),
    })),
  }
}

function renderReview(output: PipelineOutput): string {
  const lines: string[] = [
    `# Copy pipeline review — ${output.namespace} (${output.lang})`,
    "",
    `Generated: ${output.generatedAt}`,
    "",
  ]
  if ("skipped" in output.judge) {
    lines.push(`## Judge: SKIPPED — ${output.judge.skipped}`, "")
  } else {
    lines.push(
      `## Judge verdict: best = variant ${output.judge.bestVariantLabel}, vs current = ${output.judge.vsCurrent.winner}`,
      "",
      output.judge.vsCurrent.reasoning,
      "",
      "| Variant | Nativeness | Voice | Facts |",
      "|---|---|---|---|",
      ...output.judge.perVariant.map((v) => `| ${v.label} | ${v.nativeness} | ${v.voiceFit} | ${v.factFidelity} |`),
      "",
      output.judge.remainingIssues.length > 0
        ? `Remaining issues:\n${output.judge.remainingIssues.map((i) => `- ${i}`).join("\n")}`
        : "No remaining issues flagged.",
      "",
    )
  }
  for (const variant of output.revised.variants) {
    const lint = output.lintAfterRevise[variant.label] ?? []
    lines.push(`## Variant ${variant.label}`, "")
    if (lint.length > 0) {
      lines.push(`⚠ lint: ${lint.map((l) => `${l.path} [${l.rule}] ${l.detail}`).join("; ")}`, "")
    }
    for (const leaf of variant.leaves) {
      lines.push(`- \`${leaf.path}\`: ${leaf.text}`)
    }
    lines.push("")
  }
  lines.push("---", "", "Apply the winning variant with:", "", "```bash")
  lines.push(
    `bun scripts/copy-pipeline/apply.ts ${output.namespace} --lang ${output.lang} --variant <label>`,
    "```",
    "",
    "Then read it aloud once (Pass 4) and run `bun run check:messages`.",
  )
  return lines.join("\n")
}

async function main() {
  const args = process.argv.slice(2)
  const namespace = args.find((a) => !a.startsWith("--"))
  const langIndex = args.indexOf("--lang")
  const lang = (langIndex >= 0 ? args[langIndex + 1] : undefined) as Lang | undefined
  const force = args.includes("--force")
  if (!namespace || (lang !== "ja" && lang !== "en")) usage()

  const outDir = path.join(PIPELINE_DIR, "outputs", lang)
  const outJson = path.join(outDir, `${namespace}.json`)
  const outMd = path.join(outDir, `${namespace}.md`)
  // Same rule as the content pipeline: never silently regenerate existing
  // output — reviewed candidates are too expensive to clobber.
  if (fs.existsSync(outJson) && !force) {
    console.error(`${outJson} already exists. Use --force to regenerate.`)
    process.exit(1)
  }

  const facts = readRequired(
    path.join(PIPELINE_DIR, "facts", `${namespace}.md`),
    `Create a fact sheet first — it is the only source of claims the pipeline may use.`,
  )
  const voice = readRequired(
    path.join(PIPELINE_DIR, "voice", `${lang}.md`),
    `Create voice rules for ${lang} first.`,
  )
  const currentLeaves = readCurrentLeaves(lang, namespace)
  const exemplars = readExemplars(lang)
  if (exemplars.length === 0) {
    console.error(`⚠ No exemplars in scripts/copy-pipeline/exemplars/${lang}/ — judge will run without a nativeness anchor.`)
  }

  const ctx = { lang, namespace, facts, voice, currentLeaves, exemplars }

  const draftP = draftPrompt(ctx)
  const draft = sanitizeVariants(
    await runLlmObject({ stage: "draft", model: MODELS.draft, ...draftP }, draftOutputSchema, "draft"),
    lang,
  )
  const lintAfterDraft = lintByVariant(draft.variants, lang)

  const critiqueP = critiquePrompt(ctx, draft)
  const critique = await runLlmObject(
    { stage: "critique", model: MODELS.critique, ...critiqueP },
    critiqueOutputSchema,
    "critique",
  )

  const reviseP = revisePrompt(ctx, draft, critique, lintAfterDraft)
  const revised = sanitizeVariants(
    await runLlmObject({ stage: "revise", model: MODELS.revise, ...reviseP }, reviseOutputSchema, "revise"),
    lang,
  )
  const lintAfterRevise = lintByVariant(revised.variants, lang)

  const judgeP = judgePrompt(ctx, revised.variants)
  const judge = await runLlmObject({ stage: "judge", model: MODELS.judge, ...judgeP }, judgeOutputSchema, "judge")

  const output: PipelineOutput = {
    namespace,
    lang,
    generatedAt: new Date().toISOString(),
    models: { ...MODELS },
    draft,
    lintAfterDraft,
    critique,
    revised,
    lintAfterRevise,
    judge,
  }

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outJson, `${JSON.stringify(output, null, 2)}\n`)
  fs.writeFileSync(outMd, `${renderReview(output)}\n`)
  console.error(`\nWrote ${outJson}`)
  console.error(`Review: ${outMd}`)
}

main()
