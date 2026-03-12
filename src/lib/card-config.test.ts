import { describe, expect, it } from "bun:test"
import { resolveCardLocale } from "./card-config"

describe("resolveCardLocale", () => {
  it("keeps english and japanese locales unchanged", () => {
    expect(resolveCardLocale("en")).toBe("en")
    expect(resolveCardLocale("ja")).toBe("ja")
  })

  it("falls back unsupported site locales to english for card variants", () => {
    expect(resolveCardLocale("ru")).toBe("en")
    expect(resolveCardLocale("uk")).toBe("en")
  })
})
