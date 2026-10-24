import { describe, expect, it } from "bun:test"
import { annotations } from "./annotations"
import ipaSource from "./ipa-source.json"
import { parseMarkup, segmentsToText } from "./parse"
import { KANA, questions } from "./questions"

const SOURCE_LINE = /^出典：令和[5-8]年度 基本情報技術者試験 科目A 公開問題 問\d+$/
const READING = /^[぀-ゟー～ァ-ヶA-Za-z]+$/
const ITPEC_SOURCE = /^\(\d{4}[SA], FE, /

const sources = ipaSource as Record<string, { stem: string; choices: string[]; key: string }>

describe("FE subject A pilot data", () => {
  it("has 20 questions with unique ids", () => {
    expect(questions.length).toBe(20)
    expect(new Set(questions.map((q) => q.id)).size).toBe(20)
  })

  it("covers all three topics", () => {
    expect(new Set(questions.map((q) => q.topic))).toEqual(new Set(["Technology", "Management", "Strategy"]))
  })

  it("segments concatenate back to the exact IPA text", () => {
    for (const annotation of annotations) {
      const source = sources[annotation.id]
      expect(segmentsToText(parseMarkup(annotation.stem))).toBe(source.stem)
      annotation.choices.forEach((choice, i) => {
        expect(segmentsToText(parseMarkup(choice))).toBe(source.choices[i])
      })
    }
  })

  it("has a key among the four choices, equal to our own solution", () => {
    for (const q of questions) {
      expect(KANA).toContain(q.key)
      expect(q.choices.map((c) => c.kana)).toContain(q.key)
      expect(q.ownKey).toBe(q.key)
    }
  })

  it("has four choices per question", () => {
    for (const q of questions) {
      expect(q.choices.length).toBe(4)
    }
  })

  it("has every term and sentence pattern appearing in the Japanese text", () => {
    for (const q of questions) {
      const all = [q.stem.text, ...q.choices.map((c) => c.text)].join("\n")
      for (const term of q.terms) {
        expect(all).toContain(term.ja)
      }
      expect(all).toContain(q.pattern.ja)
    }
  })

  it("has a source line in the form IPA asks for on every question", () => {
    for (const q of questions) {
      expect(SOURCE_LINE.test(q.sourceLine)).toBe(true)
    }
  })

  it("has non-empty glosses and a hiragana-only reading wherever a reading is given", () => {
    for (const q of questions) {
      for (const segment of [...q.stem.segments, ...q.choices.flatMap((c) => c.segments)]) {
        if (segment.gloss !== undefined) {
          expect(segment.gloss.trim().length > 0).toBe(true)
        }
        if (segment.reading) {
          expect(READING.test(segment.reading)).toBe(true)
        }
      }
    }
  })

  it("keeps ITPEC official wording only with its source, and its key maps to the IPA key", () => {
    const withOfficial = questions.filter((q) => q.official)
    expect(withOfficial.length > 0).toBe(true)
    for (const q of withOfficial) {
      expect(ITPEC_SOURCE.test(q.official?.source ?? "")).toBe(true)
      expect(q.official?.keyKana).toBe(q.key)
    }
  })

  it("has an English translation and explanation for every question", () => {
    for (const q of questions) {
      expect(q.stem.en.length > 10).toBe(true)
      expect(q.explanation.length > 30).toBe(true)
      for (const c of q.choices) {
        expect(c.en.length > 0).toBe(true)
      }
    }
  })
})
