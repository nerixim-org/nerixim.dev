export const cardContent = {
  en: {
    name: "Nikita",
    title: "Freelance Software Engineer",
    location: "Japan",
    website: "nerixim.dev",
    websiteUrl: "https://nerixim.dev",
    github: "nerixim",
    githubUrl: "https://github.com/nerixim",
    contactUrl: "https://nerixim.dev/contact",
    contactLabel: "Get in Touch",
    flipHint: "Click to flip",
    saveContact: "Save Contact",
    qrUrl: "https://nerixim.dev",
    tagline: "Building software across languages and borders",
    skills: ["TypeScript", "React", "Next.js", "AI Integration"],
    languages: ["English", "Japanese", "Russian"],
  },
  ja: {
    name: "ニキータ",
    nameRomaji: "Nikita",
    title: "フリーランス ソフトウェアエンジニア",
    location: "日本",
    website: "nerixim.dev",
    websiteUrl: "https://nerixim.dev",
    github: "nerixim",
    githubUrl: "https://github.com/nerixim",
    contactUrl: "https://nerixim.dev/contact",
    contactLabel: "お問い合わせ",
    flipHint: "クリックで裏面へ",
    saveContact: "連絡先を保存",
    qrUrl: "https://nerixim.dev",
    tagline: "言語と国境を越えたソフトウェア開発",
    skills: ["TypeScript", "React", "Next.js", "AI活用"],
    languages: ["英語", "日本語", "ロシア語"],
  },
} as const

export type CardLocale = keyof typeof cardContent

export function generateVCard(locale: CardLocale): string {
  const c = cardContent[locale]
  const name = locale === "ja" ? `${c.name} (${(c as typeof cardContent.ja).nameRomaji})` : c.name

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `N:;${locale === "ja" ? (c as typeof cardContent.ja).nameRomaji : c.name};;;`,
    `TITLE:${c.title}`,
    `URL:${c.websiteUrl}`,
    `X-SOCIALPROFILE;TYPE=github:${c.githubUrl}`,
    "END:VCARD",
  ].join("\r\n")
}

export function downloadVCard(locale: CardLocale) {
  const vcard = generateVCard(locale)
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "nikita-nerixim.vcf"
  a.click()
  URL.revokeObjectURL(url)
}
