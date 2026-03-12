import { describe, expect, it } from "bun:test"
import { routing } from "./routing"
import { getLocalizedAlternates, getLocalizedPath, getLocalizedUrl, getOpenGraphLocale } from "./urls"

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
    expect(getLocalizedAlternates("ru" as never, "/about")).toEqual({
      canonical: "/ru/about",
      languages: {
        en: "/about",
        ja: "/ja/about",
        ru: "/ru/about",
        uk: "/uk/about",
        "x-default": "/about",
      },
    })
  })
})

describe("routing", () => {
  it("registers all supported locales", () => {
    expect(routing.locales).toEqual(["en", "ja", "ru", "uk"])
  })
})

describe("getOpenGraphLocale", () => {
  it("maps each locale to its Open Graph code", () => {
    expect(getOpenGraphLocale("en")).toBe("en_US")
    expect(getOpenGraphLocale("ja")).toBe("ja_JP")
    expect(getOpenGraphLocale("ru" as never)).toBe("ru_RU")
    expect(getOpenGraphLocale("uk" as never)).toBe("uk_UA")
  })
})
