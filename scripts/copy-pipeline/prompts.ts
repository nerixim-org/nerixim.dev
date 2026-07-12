import type { CopyLeaf, CritiqueOutput, DraftOutput, Lang, LintIssue } from "./types"

type PromptContext = {
  lang: Lang
  namespace: string
  facts: string
  voice: string
  currentLeaves: CopyLeaf[]
  exemplars: string[]
}

const LANG_LABEL: Record<Lang, string> = { ja: "Japanese", en: "English" }

function leavesBlock(leaves: CopyLeaf[]): string {
  return leaves.map((l) => `- ${l.path}: ${JSON.stringify(l.text)}`).join("\n")
}

function exemplarBlock(exemplars: string[]): string {
  if (exemplars.length === 0) return "(no exemplars provided)"
  return exemplars.map((e, i) => `### Exemplar ${i + 1}\n${e}`).join("\n\n")
}

export function draftPrompt(ctx: PromptContext): { system: string; user: string } {
  const jaVariants = "1=端正で仕事向け, 2=少し人柄が出る, 3=最も簡潔"
  const enVariants = "1=polished/professional, 2=personal/warm, 3=tersest"
  return {
    system: `You rewrite personal-website copy for a freelance software engineer. Target language: ${LANG_LABEL[ctx.lang]}.
You write FROM FACTS — never translate, never mirror the structure of copy in another language. The result must read as if a native ${LANG_LABEL[ctx.lang]} speaker wrote it about themselves: first-person, calm, concrete, slightly understated, zero marketing gloss. Never add facts that are not in the fact sheet.

Voice rules:
${ctx.voice}`,
    user: `Namespace: ${ctx.namespace}

## Fact sheet (the only allowed source of claims)
${ctx.facts}

## Current copy (for structure/keys ONLY — do not preserve its wording or sentence structure)
${leavesBlock(ctx.currentLeaves)}

## Style exemplars (native-written pages whose tone to match — do not copy phrases)
${exemplarBlock(ctx.exemplars)}

Produce 3 variants (${ctx.lang === "ja" ? jaVariants : enVariants}). Each variant must contain exactly the same set of paths as the current copy. Keep UI micro-labels (buttons, headings like path names suggest) short and functional.`,
  }
}

export function critiquePrompt(ctx: PromptContext, draft: DraftOutput): { system: string; user: string } {
  return {
    system: `You are a strict native ${LANG_LABEL[ctx.lang]} copy editor. You review website copy for:
- translationese (structures mirrored from another language)
- ai-voice (generic LLM-generated feel: symmetric constructions, inflated abstractions, promotional cadence)
- fact-error (claims not supported by the fact sheet) and fact-missing (load-bearing facts dropped)
- voice (violations of the voice rules)
- verbosity (anything cuttable without meaning loss — good copy here is 10-20% shorter than a first draft)
Report concrete issues only; no praise, no padding.

Voice rules:
${ctx.voice}`,
    user: `## Fact sheet
${ctx.facts}

## Drafts to review
${draft.variants.map((v) => `### Variant ${v.label}\n${leavesBlock(v.leaves)}`).join("\n\n")}`,
  }
}

export function revisePrompt(
  ctx: PromptContext,
  draft: DraftOutput,
  critique: CritiqueOutput,
  lint: Record<string, LintIssue[]>,
): { system: string; user: string } {
  return {
    system: `You revise website copy in ${LANG_LABEL[ctx.lang]}, applying editor feedback and mechanical lint findings. Fix every issue unless it conflicts with the fact sheet; compress 10-20% where the critique flags verbosity. Do not introduce new claims. Return all 3 variants, same labels, same paths.

Voice rules:
${ctx.voice}`,
    user: `## Fact sheet
${ctx.facts}

## Drafts
${draft.variants.map((v) => `### Variant ${v.label}\n${leavesBlock(v.leaves)}`).join("\n\n")}

## Editor critique
${critique.issues.map((i) => `- [${i.variantLabel}] ${i.path} (${i.kind}): ${i.problem} → ${i.suggestion}`).join("\n")}

## Mechanical lint findings
${Object.entries(lint)
  .map(([label, issues]) => `### Variant ${label}\n${issues.map((i) => `- ${i.path} [${i.rule}]: ${i.detail}`).join("\n") || "(clean)"}`)
  .join("\n")}`,
  }
}

export function judgePrompt(
  ctx: PromptContext,
  revised: { label: string; leaves: CopyLeaf[] }[],
): { system: string; user: string } {
  return {
    system: `You judge personal-website copy in ${LANG_LABEL[ctx.lang]}. Score each candidate variant on nativeness (would a native freelance engineer write this about themselves?), voiceFit (calm, concrete, understated, first-person), and factFidelity (against the fact sheet). Use the exemplars as the anchor for what native, non-AI copy reads like. Then compare the best candidate against the CURRENT live copy and pick a winner. Be adversarial: hunt for translationese and AI-voice tells. A tie or "current" verdict is a legitimate outcome.`,
    user: `## Fact sheet
${ctx.facts}

## Style exemplars (anchor for nativeness)
${exemplarBlock(ctx.exemplars)}

## CURRENT live copy
${leavesBlock(ctx.currentLeaves)}

## Candidate variants
${revised.map((v) => `### Variant ${v.label}\n${leavesBlock(v.leaves)}`).join("\n\n")}`,
  }
}
