export type HapticPattern = number | number[]

export type OptionalHapticsEnvironment = {
  reducedMotion: boolean
  vibrate?: (pattern: HapticPattern) => boolean
}

export function canUseOptionalHaptics({ reducedMotion, vibrate }: OptionalHapticsEnvironment): boolean {
  return !reducedMotion && typeof vibrate === "function"
}

export function triggerOptionalHaptic(environment: OptionalHapticsEnvironment, pattern: HapticPattern = 8): boolean {
  if (!canUseOptionalHaptics(environment)) {
    return false
  }

  const { vibrate } = environment
  if (!vibrate) {
    return false
  }

  try {
    return vibrate(pattern) !== false
  } catch {
    return false
  }
}
