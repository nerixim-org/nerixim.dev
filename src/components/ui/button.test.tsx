import { describe, expect, it } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"
import { Button } from "./button"

describe("Button", () => {
  it("includes tactile interaction classes for press feedback and motion-safe transforms", () => {
    const markup = renderToStaticMarkup(<Button>Label</Button>)

    expect(markup).toContain("active:scale-[0.985]")
    expect(markup).toContain("motion-reduce:transform-none")
    expect(markup).toContain("[&amp;_svg]:transition-transform")
    expect(markup).toContain("focus-visible:before:opacity-100")
  })
})
