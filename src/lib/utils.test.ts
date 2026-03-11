import { describe, expect, it } from "bun:test"
import { formatDate } from "./utils"

describe("formatDate", () => {
  it("does not shift plain YYYY-MM-DD values backward in western timezones", () => {
    expect(formatDate("2026-02-26", "short", "en-US")).toBe("Feb 26, 2026")
  })

  it("formats Japanese dates with a Japanese locale", () => {
    expect(formatDate("2026-02-26", "long", "ja-JP")).toContain("2026")
    expect(formatDate("2026-02-26", "long", "ja-JP")).toContain("2")
  })
})
