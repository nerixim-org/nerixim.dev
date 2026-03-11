import { describe, expect, it } from "bun:test"
import { getLocalizedAlternates, getLocalizedPath, getLocalizedUrl } from "./urls"

describe("getLocalizedPath", () => {
  it("keeps the default locale unprefixed", () => {
    expect(getLocalizedPath("en", "/about")).toBe("/about")
    expect(getLocalizedPath("en", "/")).toBe("/")
  })

  it("prefixes non-default locales", () => {
    expect(getLocalizedPath("ja", "/about")).toBe("/ja/about")
    expect(getLocalizedPath("ja", "/")).toBe("/ja")
  })
})

describe("getLocalizedUrl", () => {
  it("builds absolute URLs for localized routes", () => {
    expect(getLocalizedUrl("en", "/blog/post")).toBe("https://nerixim.dev/blog/post")
    expect(getLocalizedUrl("ja", "/blog/post")).toBe("https://nerixim.dev/ja/blog/post")
  })
})

describe("getLocalizedAlternates", () => {
  it("returns canonical and language alternates for a pathname", () => {
    expect(getLocalizedAlternates("ja", "/about")).toEqual({
      canonical: "/ja/about",
      languages: {
        en: "/about",
        ja: "/ja/about",
        "x-default": "/about",
      },
    })
  })
})
