import { describe, expect, it } from "bun:test"
import { contentSecurityPolicy } from "./csp"

const WHITESPACE = /\s+/

function directives(policy: string): Map<string, string[]> {
  return new Map(
    policy.split(";").map((part) => {
      const [name = "", ...values] = part.trim().split(WHITESPACE)
      return [name, values]
    }),
  )
}

describe("contentSecurityPolicy", () => {
  it("allows Turnstile's script and iframe", () => {
    const policy = directives(contentSecurityPolicy({ dev: false }))
    expect(policy.get("script-src")).toContain("https://challenges.cloudflare.com")
    expect(policy.get("frame-src")).toEqual(["https://challenges.cloudflare.com"])
  })

  it("allows eval only in development", () => {
    expect(
      directives(contentSecurityPolicy({ dev: false }))
        .get("script-src")
        ?.includes("'unsafe-eval'"),
    ).toBe(false)
    expect(directives(contentSecurityPolicy({ dev: true })).get("script-src")).toContain("'unsafe-eval'")
  })

  it("forbids framing, plugins and foreign form targets", () => {
    const policy = directives(contentSecurityPolicy({ dev: false }))
    expect(policy.get("frame-ancestors")).toEqual(["'none'"])
    expect(policy.get("object-src")).toEqual(["'none'"])
    expect(policy.get("form-action")).toEqual(["'self'"])
  })
})
