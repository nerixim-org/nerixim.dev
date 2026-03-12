import { describe, expect, it } from "bun:test"

describe("optional haptics", () => {
  it("only enables haptics when vibration is supported and reduced motion is off", async () => {
    const mod = await import("./haptics").catch(() => undefined)

    expect(mod?.canUseOptionalHaptics({ reducedMotion: false, vibrate: () => true })).toBe(true)
    expect(mod?.canUseOptionalHaptics({ reducedMotion: true, vibrate: () => true })).toBe(false)
    expect(mod?.canUseOptionalHaptics({ reducedMotion: false })).toBe(false)
  })

  it("suppresses vibration when reduced motion is enabled", async () => {
    const mod = await import("./haptics").catch(() => undefined)
    let calls = 0
    const vibrate = () => {
      calls += 1
      return true
    }

    expect(mod?.triggerOptionalHaptic({ reducedMotion: true, vibrate }, 8)).toBe(false)
    expect(calls).toBe(0)
  })
})
