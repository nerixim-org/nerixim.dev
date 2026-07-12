import { z } from "zod"

export type Lang = "ja" | "en"

// One copy unit = one string leaf in messages/{lang}.json, addressed by path.
export const copyLeafSchema = z.object({
  path: z.string().describe("dot path inside the namespace, e.g. hero.title"),
  text: z.string(),
})
export type CopyLeaf = z.infer<typeof copyLeafSchema>

export const draftOutputSchema = z.object({
  variants: z
    .array(
      z.object({
        label: z.string().describe("short label: 1=端正/polished, 2=人柄/personal, 3=簡潔/terse"),
        leaves: z.array(copyLeafSchema),
      }),
    )
    .length(3),
})
export type DraftOutput = z.infer<typeof draftOutputSchema>

export const critiqueOutputSchema = z.object({
  issues: z.array(
    z.object({
      variantLabel: z.string(),
      path: z.string(),
      kind: z.enum(["translationese", "ai-voice", "fact-error", "fact-missing", "voice", "verbosity"]),
      problem: z.string(),
      suggestion: z.string(),
    }),
  ),
})
export type CritiqueOutput = z.infer<typeof critiqueOutputSchema>

export const reviseOutputSchema = z.object({
  variants: z
    .array(
      z.object({
        label: z.string(),
        leaves: z.array(copyLeafSchema),
      }),
    )
    .length(3),
})
export type ReviseOutput = z.infer<typeof reviseOutputSchema>

export const judgeOutputSchema = z.object({
  perVariant: z.array(
    z.object({
      label: z.string(),
      nativeness: z.number().min(1).max(5),
      voiceFit: z.number().min(1).max(5),
      factFidelity: z.number().min(1).max(5),
      notes: z.string(),
    }),
  ),
  vsCurrent: z.object({
    winner: z.enum(["candidate", "current", "tie"]),
    reasoning: z.string(),
  }),
  bestVariantLabel: z.string(),
  remainingIssues: z.array(z.string()),
})
export type JudgeOutput = z.infer<typeof judgeOutputSchema>

export type LintIssue = {
  path: string
  rule: string
  detail: string
}

export type PipelineOutput = {
  namespace: string
  lang: Lang
  generatedAt: string
  models: Record<string, string>
  draft: DraftOutput
  lintAfterDraft: Record<string, LintIssue[]>
  critique: CritiqueOutput
  revised: ReviseOutput
  lintAfterRevise: Record<string, LintIssue[]>
  judge: JudgeOutput | { skipped: string }
}
