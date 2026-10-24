import { annotations, type Topic } from "./annotations"
import ipaSource from "./ipa-source.json"
import officialData from "./itpec-official.json"
import { parseMarkup, type Segment } from "./parse"

export const KANA = ["ア", "イ", "ウ", "エ"] as const
export type Kana = (typeof KANA)[number]

type IpaEntry = { year: number; no: number; stem: string; choices: string[]; key: string }
type OfficialEntry = {
  source: string
  stem: string
  choices: Record<string, string>
  key: string
  map: Record<string, string>
}

export type Question = {
  id: string
  topic: Topic
  sourceLine: string
  stem: { text: string; segments: Segment[]; en: string }
  choices: { kana: Kana; text: string; segments: Segment[]; en: string }[]
  key: Kana
  ownKey: Kana
  terms: { ja: string; en: string }[]
  pattern: { ja: string; en: string }
  explanation: string
  official?: {
    source: string
    stem: string
    choices: { label: string; text: string; kana: Kana }[]
    keyKana: Kana
  }
}

export const IPA_URL = "https://www.ipa.go.jp/shiken/mondai-kaiotu/sg_fe/koukai/index.html"

export function buildSourceLine(year: number, no: number): string {
  return `出典：令和${year}年度 基本情報技術者試験 科目A 公開問題 問${no}`
}

const ipa = ipaSource as Record<string, IpaEntry>
const official = officialData as Record<string, OfficialEntry>

export function buildQuestions(): Question[] {
  return annotations.map((annotation) => {
    const source = ipa[annotation.id]
    const off = official[annotation.id]
    return {
      id: annotation.id,
      topic: annotation.topic,
      sourceLine: buildSourceLine(source.year, source.no),
      stem: { text: source.stem, segments: parseMarkup(annotation.stem), en: annotation.stemEn },
      choices: KANA.map((kana, i) => ({
        kana,
        text: source.choices[i],
        segments: parseMarkup(annotation.choices[i]),
        en: annotation.choicesEn[i],
      })),
      key: source.key as Kana,
      ownKey: annotation.ownKey,
      terms: annotation.terms,
      pattern: annotation.pattern,
      explanation: annotation.explanation,
      ...(off
        ? {
            official: {
              source: off.source,
              stem: off.stem,
              choices: Object.entries(off.choices).map(([label, text]) => ({
                label,
                text,
                kana: off.map[label] as Kana,
              })),
              keyKana: off.map[off.key] as Kana,
            },
          }
        : {}),
    }
  })
}

export const questions: Question[] = buildQuestions()
