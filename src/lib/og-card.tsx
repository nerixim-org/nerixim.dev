import { ImageResponse } from "next/og"
import { getMessages } from "next-intl/server"
import { type Locale, routing } from "@/i18n/routing"
import { loadGoogleFont } from "@/lib/og-font"
import { siteConfig } from "@/lib/site-config"

export const OG_SIZE = { width: 1200, height: 630 }

// satori renders outside the DOM, so the CSS variables in globals.css are
// unreachable; these mirror the dark theme there. Change both together.
const THEME = {
  paper: "#1f2028",
  ink: "#f0ede8",
  muted: "#9b9aaf",
  accent: "#9ba0c0",
  accentDeep: "#6b6f8e",
  line: "#34364a",
} as const

const CJK_RE = /[　-ヿ㐀-鿿＀-￯]/
const TITLE_MAX = 90
const DESCRIPTION_MAX = 150

export type OgSibling = { locale: Locale; label: string }

export type OgCardProps = {
  locale: Locale
  kicker: string
  title: string
  description?: string
  // The same page in the other languages, current locale first. This is the
  // one thing a card from this site says that a generic one would not: the
  // page exists in four languages, and here is what it is called in each.
  siblings: OgSibling[]
}

// Cuts at the last sentence end that keeps at least half the budget; only
// when there is none does it fall back to a clause break or an ellipsis, so
// a card never ends on a dangling comma.
function shorten(text: string, max: number): string {
  const chars = Array.from(text)
  if (chars.length <= max) {
    return text
  }
  const head = chars.slice(0, max).join("")
  const sentence = Math.max(
    head.lastIndexOf("。"),
    head.lastIndexOf(". "),
    head.lastIndexOf("！"),
    head.lastIndexOf("? "),
  )
  if (sentence >= max / 2) {
    return head.slice(0, sentence + 1).trimEnd()
  }
  const clause = Math.max(head.lastIndexOf("、"), head.lastIndexOf(", "))
  const cut = clause >= max / 2 ? head.slice(0, clause) : head
  return `${cut.trimEnd()}…`
}

function titleSize(title: string): number {
  const n = Array.from(title).length
  const cjk = CJK_RE.test(title)
  if (cjk) {
    return n <= 18 ? 64 : n <= 30 ? 52 : 44
  }
  return n <= 28 ? 68 : n <= 48 ? 56 : 46
}

async function loadFonts(text: string) {
  const fonts = [
    {
      name: "Serif",
      data: await loadGoogleFont("Source Serif 4", text, 600),
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Serif",
      data: await loadGoogleFont("Source Serif 4", text, 400),
      weight: 400 as const,
      style: "normal" as const,
    },
  ]
  if (CJK_RE.test(text)) {
    fonts.push(
      { name: "SerifJP", data: await loadGoogleFont("Noto Serif JP", text, 600), weight: 600, style: "normal" },
      { name: "SerifJP", data: await loadGoogleFont("Noto Serif JP", text, 400), weight: 400, style: "normal" },
    )
  }
  return fonts
}

export async function renderOgCard(props: OgCardProps): Promise<ImageResponse> {
  const title = shorten(props.title, TITLE_MAX)
  const description = props.description ? shorten(props.description, DESCRIPTION_MAX) : ""
  const brand = "nerixim.dev"
  const strip = props.siblings.map((s) => `${s.locale.toUpperCase()}${s.label}`).join("")
  const fonts = await loadFonts(`${brand}N${props.kicker}${title}${description}${strip}…`)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "56px 80px 52px",
        background: THEME.paper,
        color: THEME.ink,
        fontFamily: "Serif, SerifJP",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${THEME.accent}, ${THEME.accentDeep})`,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 22,
              background: THEME.accent,
              color: THEME.paper,
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 24, color: THEME.accent, letterSpacing: "0.05em" }}>{brand}</div>
        </div>
        <div style={{ fontSize: 24, color: THEME.muted }}>{props.kicker}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1, gap: 24 }}>
        <div style={{ fontSize: titleSize(title), fontWeight: 600, lineHeight: 1.2, maxWidth: 1040 }}>{title}</div>
        {description ? (
          <div style={{ fontSize: 26, fontWeight: 400, lineHeight: 1.5, color: THEME.muted, maxWidth: 1000 }}>
            {description}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, fontWeight: 400 }}>
        {props.siblings.map((s, i) => (
          <div
            key={s.locale}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              borderRadius: 999,
              border: `1.5px solid ${i === 0 ? THEME.accent : THEME.line}`,
              background: i === 0 ? THEME.accent : "transparent",
              color: i === 0 ? THEME.paper : THEME.muted,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: "0.1em" }}>{s.locale.toUpperCase()}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  )
}

// Page-level cards are driven by message keys so the seven pages share one
// renderer. `kicker` and `sibling` are read for every locale (the strip);
// `title` and `description` only for the current one.
export type OgPageSpec = {
  kicker: [namespace: string, key: string]
  sibling: [namespace: string, key: string]
  title: [namespace: string, key: string]
  description?: [namespace: string, key: string]
}

export const OG_PAGES = {
  home: {
    kicker: ["metadata", "title.default"],
    sibling: ["home", "hero.title"],
    title: ["home", "hero.title"],
    description: ["home", "hero.description"],
  },
  about: {
    kicker: ["nav", "about"],
    sibling: ["nav", "about"],
    title: ["about", "tagline"],
    description: ["about", "metadata.description"],
  },
  services: {
    kicker: ["nav", "services"],
    sibling: ["nav", "services"],
    title: ["services", "heading"],
    description: ["services", "description"],
  },
  projects: {
    kicker: ["nav", "projects"],
    sibling: ["nav", "projects"],
    title: ["projects", "heading"],
    description: ["projects", "description"],
  },
  blog: {
    kicker: ["nav", "blog"],
    sibling: ["nav", "blog"],
    title: ["blog", "heading"],
    description: ["blog", "description"],
  },
  contact: {
    kicker: ["nav", "contact"],
    sibling: ["nav", "contact"],
    title: ["contact", "heading"],
    description: ["contact", "description"],
  },
  lab: {
    kicker: ["lab", "title"],
    sibling: ["lab", "title"],
    title: ["lab", "title"],
    description: ["lab", "description"],
  },
} as const satisfies Record<string, OgPageSpec>

export type OgPage = keyof typeof OG_PAGES

// Reads one leaf by dotted path from the locale's messages. next-intl's typed
// getTranslations would need a literal namespace per call; the card specs are
// data, so a plain walk keeps the seven pages in one table.
async function message(locale: Locale, [namespace, key]: readonly [string, string]): Promise<string> {
  const messages = await getMessages({ locale })
  let node: unknown = messages
  for (const part of `${namespace}.${key}`.split(".")) {
    node = typeof node === "object" && node !== null ? (node as Record<string, unknown>)[part] : undefined
  }
  if (typeof node !== "string") {
    throw new Error(`OG card: no message at ${namespace}.${key} for ${locale}`)
  }
  return node
}

export async function siblingsFor(locale: Locale, spec: readonly [string, string]): Promise<OgSibling[]> {
  const ordered = [locale, ...routing.locales.filter((l) => l !== locale)]
  return await Promise.all(ordered.map(async (l) => ({ locale: l, label: await message(l, spec) })))
}

export async function renderPageOg(locale: Locale, page: OgPage): Promise<ImageResponse> {
  const spec: OgPageSpec = OG_PAGES[page]
  const [kicker, title, description, siblings] = await Promise.all([
    // The site title is "nerixim — <role>"; the home card already shows the
    // brand top-left, so its kicker is the role alone.
    message(locale, spec.kicker).then((k) => (page === "home" ? (k.split(" — ")[1] ?? k) : k)),
    message(locale, spec.title),
    spec.description ? message(locale, spec.description) : undefined,
    // The home card's strip is the owner's name in each language; every
    // other page shows its own nav label.
    page === "home"
      ? [locale, ...routing.locales.filter((l) => l !== locale)].map((l) => ({
          locale: l,
          label: siteConfig.personDisplayNameByLocale[l],
        }))
      : siblingsFor(locale, spec.sibling),
  ])
  return renderOgCard({ locale, kicker, title, description, siblings })
}
