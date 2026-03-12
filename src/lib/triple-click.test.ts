import { describe, expect, it } from "bun:test"
import { registerTripleClick } from "./triple-click"

describe("registerTripleClick", () => {
  it("triggers on the third click when all clicks land inside the detection window", () => {
    let recentClicks: number[] = []

    ;({ recentClicks } = registerTripleClick(recentClicks, 0, 420))
    ;({ recentClicks } = registerTripleClick(recentClicks, 160, 420))
    const thirdClick = registerTripleClick(recentClicks, 320, 420)

    expect(thirdClick.triggered).toBe(true)
    expect(thirdClick.recentClicks).toEqual([])
  })

  it("ignores slow clicks that fall outside the detection window", () => {
    let recentClicks: number[] = []

    ;({ recentClicks } = registerTripleClick(recentClicks, 0, 420))
    ;({ recentClicks } = registerTripleClick(recentClicks, 300, 420))
    const thirdClick = registerTripleClick(recentClicks, 860, 420)

    expect(thirdClick.triggered).toBe(false)
    expect(thirdClick.recentClicks).toEqual([860])
  })
})
