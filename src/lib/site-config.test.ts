import { describe, expect, it } from "bun:test"
import { getPersonDisplayName, siteConfig } from "./site-config"

describe("siteConfig identity", () => {
  it("keeps brand and canonical person name separate", () => {
    expect(siteConfig.brandName).toBe("nerixim")
    expect(siteConfig.personNameCanonical).toBe("Nikita")
  })

  it("returns localized display names where approved", () => {
    expect(getPersonDisplayName("en")).toBe("Nikita")
    expect(getPersonDisplayName("ja")).toBe("ニキータ")
    expect(getPersonDisplayName("ru")).toBe("Никита")
    expect(getPersonDisplayName("uk")).toBe("Нікіта")
  })
})
