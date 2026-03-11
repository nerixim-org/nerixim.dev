declare module "bun:test" {
  export const describe: (...args: unknown[]) => void
  export const it: (...args: unknown[]) => void

  export function expect(value: unknown): {
    toBe(expected: unknown): void
    toContain(expected: unknown): void
    toEqual(expected: unknown): void
  }
}
