import fs from "node:fs"
import path from "node:path"

const baseLocale = "en" as const
const locales = ["en", "ja"] as const

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }
type JsonObject = { [key: string]: JsonValue }

const enMessages = readMessages(baseLocale)
const localeMessages = {
  en: enMessages,
  ja: readMessages("ja"),
} satisfies Record<(typeof locales)[number], typeof enMessages>

function readMessages(locale: (typeof locales)[number]): JsonObject {
  const filePath = path.join(process.cwd(), "messages", `${locale}.json`)
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as JsonObject
}

function isObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function collectMatches(source: string, pattern: RegExp): string[] {
  return Array.from(source.matchAll(pattern), (match) => match[1]).sort()
}

function compareSets(kind: string, pathLabel: string, locale: string, base: string[], actual: string[], errors: string[]) {
  const baseValue = base.join(", ")
  const actualValue = actual.join(", ")

  if (baseValue !== actualValue) {
    errors.push(`${locale}: ${pathLabel} has mismatched ${kind}. expected [${baseValue}] but found [${actualValue}]`)
  }
}

function compareMessages(base: JsonValue, actual: JsonValue, pathLabel: string, locale: string, errors: string[]) {
  if (Array.isArray(base)) {
    if (!Array.isArray(actual)) {
      errors.push(`${locale}: ${pathLabel} should be an array`)
      return
    }

    if (base.length !== actual.length) {
      errors.push(`${locale}: ${pathLabel} should have ${base.length} item(s), found ${actual.length}`)
    }

    const itemCount = Math.min(base.length, actual.length)
    for (let index = 0; index < itemCount; index += 1) {
      compareMessages(base[index], actual[index], `${pathLabel}[${index}]`, locale, errors)
    }
    return
  }

  if (isObject(base)) {
    if (!isObject(actual)) {
      errors.push(`${locale}: ${pathLabel} should be an object`)
      return
    }

    for (const key of Object.keys(base)) {
      if (!(key in actual)) {
        errors.push(`${locale}: missing key ${pathLabel}.${key}`)
        continue
      }

      compareMessages(base[key], actual[key], `${pathLabel}.${key}`, locale, errors)
    }

    for (const key of Object.keys(actual)) {
      if (!(key in base)) {
        errors.push(`${locale}: unexpected key ${pathLabel}.${key}`)
      }
    }
    return
  }

  if (typeof base === "string") {
    if (typeof actual !== "string") {
      errors.push(`${locale}: ${pathLabel} should be a string`)
      return
    }

    compareSets("placeholders", pathLabel, locale, collectMatches(base, /\{([A-Za-z0-9_]+)\}/g), collectMatches(actual, /\{([A-Za-z0-9_]+)\}/g), errors)
    compareSets("rich-text tags", pathLabel, locale, collectMatches(base, /<\/?([A-Za-z][A-Za-z0-9]*)>/g), collectMatches(actual, /<\/?([A-Za-z][A-Za-z0-9]*)>/g), errors)
    return
  }

  if (typeof base !== typeof actual) {
    errors.push(`${locale}: ${pathLabel} should be a ${typeof base}`)
  }
}

const errors: string[] = []

for (const locale of locales) {
  if (locale === baseLocale) {
    continue
  }

  compareMessages(localeMessages[baseLocale], localeMessages[locale], baseLocale, locale, errors)
}

if (errors.length > 0) {
  console.error("Translation validation failed:")
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(`Translation validation passed for ${locales.join(", ")}`)
