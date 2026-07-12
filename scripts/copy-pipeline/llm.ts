import { google } from "@ai-sdk/google"
import { createOpenAI } from "@ai-sdk/openai"
import type { LanguageModel } from "ai"
import { generateText, Output } from "ai"
import type { ZodType } from "zod"

// Same routing convention as storyling-content-pipeline/src/llm.ts:
// `openrouter/` prefix goes via OpenRouter, everything else is Gemini.
function resolveModel(model: string): LanguageModel {
  if (model.startsWith("openrouter/")) {
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      throw new Error(`Model ${model} needs OPENROUTER_API_KEY in .env`)
    }
    const openrouter = createOpenAI({ baseURL: "https://openrouter.ai/api/v1", apiKey })
    return openrouter.chat(model.slice("openrouter/".length))
  }
  return google(model)
}

export const MODELS = {
  draft: "gemini-3.1-pro-preview",
  critique: "gemini-3.1-pro-preview",
  revise: "gemini-3.1-pro-preview",
  // Cross-model judge on purpose — a different provider grading the output
  // avoids self-preference (same reasoning as the content pipeline's judge).
  judge: "openrouter/openai/gpt-5.5",
} as const

export type Stage = keyof typeof MODELS

export type LlmPrompt = {
  stage: Stage
  model: string
  system: string
  user: string
}

const DEFAULT_TIMEOUT_MS = 5 * 60 * 1000
const MAX_ATTEMPTS = 4

async function withRetry<T>(prompt: LlmPrompt, run: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    const startedAt = Date.now()
    try {
      const result = await run()
      console.error(`[${prompt.stage}] ${prompt.model} ok in ${Math.round((Date.now() - startedAt) / 1000)}s`)
      return result
    } catch (error) {
      const elapsed = Math.round((Date.now() - startedAt) / 1000)
      if (attempt >= MAX_ATTEMPTS) {
        console.error(`[${prompt.stage}] ${prompt.model} failed after ${elapsed}s — giving up`)
        throw error
      }
      const message = error instanceof Error ? error.message : String(error)
      console.error(
        `[${prompt.stage}] ${prompt.model} failed after ${elapsed}s (${message}) — retry ${attempt}/${MAX_ATTEMPTS - 1}`,
      )
    }
  }
}

export async function runLlmObject<T>(prompt: LlmPrompt, schema: ZodType<T>, schemaName?: string): Promise<T> {
  const result = await withRetry(prompt, () =>
    generateText({
      model: resolveModel(prompt.model),
      system: prompt.system,
      prompt: prompt.user,
      output: Output.object({ schema, name: schemaName }),
      maxRetries: 0,
      abortSignal: AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
    }),
  )
  return result.output as T
}
