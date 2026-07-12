import type { CopyLeaf, Lang, LintIssue } from "./types"

// Deterministic checks run before any LLM critique. JA rules come from
// docs/copy/ja-copy-workflow.md; EN rules target common AI-generated tells.

type Rule = {
  name: string
  check: (text: string) => string | null
}

function bannedPhrases(name: string, phrases: string[]): Rule {
  return {
    name,
    check: (text) => {
      const hits = phrases.filter((p) => text.includes(p))
      return hits.length > 0 ? `contains: ${hits.join(", ")}` : null
    },
  }
}

function maxPerText(name: string, pattern: RegExp, max: number, label: string): Rule {
  return {
    name,
    check: (text) => {
      const count = (text.match(pattern) ?? []).length
      return count > max ? `${label} ×${count} (max ${max})` : null
    },
  }
}

const JA_RULES: Rule[] = [
  bannedPhrases("ja/positioning-language", [
    "言語と市場をまたぐ",
    "越境",
    "橋渡し",
    "落とし込む",
    "実運用に乗る形で",
    "実務で定着することを前提",
  ]),
  maxPerText("ja/shien-density", /支援/g, 1, "「支援」"),
  maxPerText("ja/matagu", /またぐ|跨ぐ/g, 0, "「またぐ」"),
  {
    name: "ja/parallel-slogan",
    // A×B×C or 「A、B、C。」-style three-part slogans read as translated marketing.
    check: (text) =>
      /[ァ-ヶa-zA-Z一-龠ぁ-ん]+[・×][ァ-ヶa-zA-Z一-龠ぁ-ん]+[・×][ァ-ヶa-zA-Z一-龠ぁ-ん]+/.test(text)
        ? "three-part slogan pattern"
        : null,
  },
  {
    name: "ja/noun-pileup",
    // 4+ consecutive kanji-noun compounds joined without particles.
    check: (text) => {
      const match = text.match(/[一-龠]{8,}/)
      return match ? `long kanji compound: ${match[0]}` : null
    },
  },
]

const EN_AI_PHRASES = [
  "passionate about",
  "seamless",
  "seamlessly",
  "leverage",
  "leveraging",
  "cutting-edge",
  "delve",
  "landscape",
  "robust",
  "empower",
  "elevate",
  "unlock",
  "supercharge",
  "game-chang",
  "best-in-class",
  "world-class",
  "innovative solutions",
  "not just",
  "isn't just",
]

const EN_RULES: Rule[] = [
  {
    name: "en/ai-phrases",
    check: (text) => {
      const lower = text.toLowerCase()
      const hits = EN_AI_PHRASES.filter((p) => lower.includes(p))
      return hits.length > 0 ? `contains: ${hits.join(", ")}` : null
    },
  },
  maxPerText("en/em-dash", /—/g, 1, "em dash"),
  {
    name: "en/rule-of-three",
    // "X, Y, and Z" triads are fine occasionally; two in one string is a tell.
    check: (text) => {
      const count = (text.match(/\w+, \w+[^,.]*, and \w+/g) ?? []).length
      return count >= 2 ? `${count} 'X, Y, and Z' triads in one string` : null
    },
  },
  {
    name: "en/negative-parallelism",
    check: (text) => (/\bnot (just|only|merely)\b[^.]*\bbut\b/i.test(text) ? "'not just X but Y' construction" : null),
  },
]

const COMMON_RULES: Rule[] = [
  {
    // Gemini has been observed emitting NBSP inside Japanese copy (invisible
    // in review, visible to the judge). Sanitize removes these; lint
    // double-checks so nothing invisible ever ships.
    name: "common/invisible-chars",
    check: (text) => {
      const hits = text.match(/[ ​-‏﻿]/g)
      return hits ? `${hits.length} invisible char(s) (NBSP/zero-width)` : null
    },
  },
]

const JA_EXTRA_RULES: Rule[] = [
  {
    name: "ja/space-between-japanese",
    check: (text) =>
      /[一-龠ぁ-んァ-ヶ] +[一-龠ぁ-んァ-ヶ]/.test(text) ? "ASCII space between Japanese characters" : null,
  },
]

export function lintLeaves(leaves: CopyLeaf[], lang: Lang): LintIssue[] {
  const rules = [...COMMON_RULES, ...(lang === "ja" ? [...JA_RULES, ...JA_EXTRA_RULES] : EN_RULES)]
  const issues: LintIssue[] = []
  for (const leaf of leaves) {
    for (const rule of rules) {
      const detail = rule.check(leaf.text)
      if (detail) {
        issues.push({ path: leaf.path, rule: rule.name, detail })
      }
    }
  }
  return issues
}

// Run on every LLM stage output before anything downstream sees it.
export function sanitizeText(text: string, lang: Lang): string {
  let result = text.normalize("NFC").replace(/[​-‏﻿]/g, "")
  if (lang === "ja") {
    // NBSP inside Japanese text is a model artifact, not a space.
    result = result
      .replace(/(?<=[一-龠ぁ-んァ-ヶー、。]) (?=[一-龠ぁ-んァ-ヶー、。])/g, "")
      .replace(/ /g, " ")
  } else {
    result = result.replace(/ /g, " ")
  }
  return result
}
