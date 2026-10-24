import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { FeReader } from "@/components/fe/fe-reader"
import { Link, redirect } from "@/i18n/navigation"
import type { Locale } from "@/i18n/routing"
import { buildPageMetadata } from "@/i18n/urls"
import { getAllPosts } from "@/lib/blog"
import { IPA_URL, questions } from "@/lib/fe/questions"

const ARTICLE_SLUG = "fe-exam-japanese-for-engineers"

type Props = {
  params: Promise<{ locale: Locale }>
}

const TITLE = "Read the Japanese IT Engineer Exam through English"
const DESCRIPTION =
  "20 real Fundamental Information Technology Engineer (FE) Subject A questions, in Japanese, with tap-to-read glosses in English, IT term pairs and short explanations."

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale, "/fe", TITLE, DESCRIPTION)
}

export default async function FePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  if (locale !== "en") {
    redirect({ href: "/fe", locale: "en" })
  }

  const articlePublished = (await getAllPosts()).some((post) => post.slug === ARTICLE_SLUG)

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <h1 className="font-bold font-heading text-3xl leading-tight sm:text-4xl">{TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed">
        The Fundamental Information Technology Engineer exam (基本情報技術者試験, FE) is offered by Japan's IPA in
        Japanese only. These are 20 questions from its published Subject A papers. Tap any dotted word for its reading
        and its meaning in that sentence, pick an answer, and read the key and a short explanation. Each question lists
        the Japanese IT terms next to their English equivalents.
      </p>
      {articlePublished && (
        <p className="mt-3">
          <Link href={`/blog/${ARTICLE_SLUG}`} className="text-primary underline underline-offset-4">
            How to read exam Japanese as an engineer
          </Link>{" "}
          explains the sentence patterns these questions repeat.
        </p>
      )}

      <section
        aria-labelledby="notes-title"
        className="mt-6 rounded-xl border border-border bg-muted p-4 text-sm leading-relaxed"
      >
        <h2 id="notes-title" className="font-semibold text-base">
          Before you rely on this
        </h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            Not affiliated with IPA or ITPEC. The questions are © IPA (独立行政法人情報処理推進機構), reproduced from
            the{" "}
            <a href={IPA_URL} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              published questions
            </a>{" "}
            under IPA's terms for past questions, with the source line on each one. The Japanese wording is IPA's; the
            spaces between Japanese and Latin letters and the furigana of the printed paper are left out.
          </li>
          <li>
            English translations, glosses and explanations are our own, and the keys are IPA's official answers. Where
            ITPEC published the same question in English, its wording is shown as well, unmodified and with its source.
          </li>
          <li>
            The glosses have not yet been reviewed by a human. If one is wrong,{" "}
            <Link href="/contact" className="underline underline-offset-4">
              tell me
            </Link>
            .
          </li>
        </ul>
      </section>

      <div className="mt-8">
        <FeReader questions={questions} />
      </div>
    </div>
  )
}
